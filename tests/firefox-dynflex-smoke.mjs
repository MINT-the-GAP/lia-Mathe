import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function findFirefox() {
  const candidates = [
    process.env.FIREFOX_PATH,
    process.platform === 'win32' && process.env.ProgramFiles
      ? path.join(process.env.ProgramFiles, 'Mozilla Firefox', 'firefox.exe')
      : null,
    process.platform === 'win32' && process.env['ProgramFiles(x86)']
      ? path.join(process.env['ProgramFiles(x86)'], 'Mozilla Firefox', 'firefox.exe')
      : null,
    process.platform === 'darwin' ? '/Applications/Firefox.app/Contents/MacOS/firefox' : null,
    process.platform === 'linux' ? '/usr/bin/firefox' : null,
  ].filter(Boolean);

  return candidates.find(candidate => existsSync(candidate)) || null;
}

async function freePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  await new Promise(resolve => server.close(resolve));
  return port;
}

async function buildFixturePayload() {
  const [readme, bundle, fixture] = await Promise.all([
    readFile(path.join(root, 'README.md'), 'utf8'),
    readFile(path.join(root, 'dist', 'index.js'), 'utf8'),
    readFile(path.join(root, 'tests', 'fixtures', 'firefox-dynflex.md'), 'utf8'),
  ]);
  const headerMatch = readme.match(/^<!--([\s\S]*?)-->/);
  if (!headerMatch) throw new Error('Could not extract the lia-Mathe template header.');

  const extractMacro = (name) => {
    const match = headerMatch[1].match(new RegExp(`@${name}:[\\s\\S]*?^@end$`, 'm'));
    if (!match) throw new Error(`Could not extract @${name} from the lia-Mathe template header.`);
    return match[0];
  };
  const extractInlineMacro = (name) => {
    const match = headerMatch[1].match(new RegExp(`^@${name}:.*$`, 'm'));
    if (!match) throw new Error(`Could not extract @${name} from the lia-Mathe template header.`);
    return match[0];
  };
  const header = [
    'author: MINT-the-GAP',
    'version: 0.0.2',
    'language: de',
    extractInlineMacro('Strichliste'),
    extractMacro('circleQuizC'),
    extractMacro('rectQuizC'),
  ].join('\n\n');
  const body = fixture.replace(/^<!--[\s\S]*?-->\s*/, '');

  const course = `<!--
${header}

script: https://cdn.jsdelivr.net/gh/MINT-the-GAP/lia-DynFlex@9ef8f05c0eae8b51e183efbfe34c5b38e41488c8/dist/index.js
-->

${body}`;
  return { course, bundle };
}

async function connectWebSocket(url, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  let lastError = null;

  while (Date.now() < deadline) {
    try {
      return await new Promise((resolve, reject) => {
        const socket = new WebSocket(url);
        socket.addEventListener('open', () => resolve(socket), { once: true });
        socket.addEventListener('error', event => reject(new Error(event.message || 'WebSocket connection failed')), { once: true });
      });
    } catch (error) {
      lastError = error;
      await sleep(100);
    }
  }

  throw lastError || new Error('Timed out connecting to Firefox WebDriver BiDi');
}

class Bidi {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id == null) return;
      const task = this.pending.get(message.id);
      if (!task) return;
      this.pending.delete(message.id);
      if (message.type === 'success') task.resolve(message.result);
      else task.reject(new Error(JSON.stringify(message)));
    });
  }

  command(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(context, expression, awaitPromise = false) {
    const response = await this.command('script.evaluate', {
      expression,
      target: { context },
      awaitPromise,
      resultOwnership: 'none',
    });
    if (response.type === 'exception') throw new Error(response.exceptionDetails?.text || 'Firefox evaluation failed');
    return response.result?.value;
  }

  async evaluateJson(context, expression, awaitPromise = false) {
    const wrapped = awaitPromise
      ? `(async()=>JSON.stringify(await (${expression})))()`
      : `JSON.stringify(${expression})`;
    return JSON.parse(await this.evaluate(context, wrapped, awaitPromise));
  }
}

function diagnosticExpression() {
  return `(() => {
    const svgs = Array.from(document.querySelectorAll('.fq-mount > svg.fq-svg'));
    const tallies = Array.from(document.querySelectorAll('.lia-tally[data-lia-tally-count]'));
    return {
      url: location.href,
      title: document.title,
      bodyText: (document.body && document.body.innerText || '').slice(0, 500),
      apiHere: !!window.__LIA_FRACTION_QUIZ__,
      apiTop: (() => { try { return !!window.top.__LIA_FRACTION_QUIZ__; } catch (_) { return false; } })(),
      dynItems: document.querySelectorAll('.dynFlex > .dynFlexItem').length,
      mounts: document.querySelectorAll('.fq-mount').length,
      ranges: document.querySelectorAll('.fq-range input[type="range"]').length,
      insideSvgs: svgs.filter(svg => !!svg.closest('.dynFlex')).length,
      outsideSvgs: svgs.filter(svg => !svg.closest('.dynFlex')).length,
      tallies: tallies.map(host => {
        const svg = host.querySelector(':scope > svg[data-lia-tally-marks]');
        const rect = svg && svg.getBoundingClientRect();
        return {
          count: Number(host.getAttribute('data-lia-tally-count')),
          marks: svg ? svg.querySelectorAll('[data-lia-tally-mark]').length : 0,
          inTable: !!host.closest('table'),
          label: host.getAttribute('aria-label'),
          width: rect && rect.width,
          height: rect && rect.height,
          visible: !!svg && getComputedStyle(svg).display !== 'none',
        };
      }),
      svgs: svgs.map(svg => {
        const rect = svg.getBoundingClientRect();
        return {
          id: svg.parentElement && svg.parentElement.id,
          connected: svg.isConnected,
          width: rect.width,
          height: rect.height,
          parts: svg.querySelectorAll('[data-fq-part]').length,
          circles: svg.querySelectorAll('circle').length,
          rects: svg.querySelectorAll('rect').length,
          lines: svg.querySelectorAll('line').length,
          rows: Number(svg.getAttribute('data-fq-rows') || 0),
          cols: Number(svg.getAttribute('data-fq-cols') || 0),
          display: getComputedStyle(svg).display,
          flex: getComputedStyle(svg).flex,
          visibility: getComputedStyle(svg).visibility,
          opacity: getComputedStyle(svg).opacity,
        };
      }),
    };
  })()`;
}

function assertHealthy(state, expectedParts = null) {
  assert.equal(state.apiHere, true);
  assert.equal(state.apiTop, true);
  assert.equal(state.dynItems, 2);
  assert.equal(state.mounts, 4);
  assert.equal(state.ranges, 6);
  assert.equal(state.insideSvgs, 2);
  assert.equal(state.outsideSvgs, 2);
  assert.equal(state.svgs.length, 4);
  assert.deepEqual(state.tallies.map(tally => tally.count).sort((a, b) => a - b), [8, 17]);
  assert.deepEqual(state.tallies.map(tally => tally.marks).sort((a, b) => a - b), [8, 17]);
  assert.equal(state.tallies.filter(tally => tally.inTable).length, 1);

  for (const tally of state.tallies) {
    assert.equal(tally.label, `Strichliste: ${tally.count}`);
    assert.ok(tally.width > 0, `tally ${tally.count} has zero width`);
    assert.ok(tally.height > 0, `tally ${tally.count} has zero height`);
    assert.equal(tally.visible, true);
  }

  for (const svg of state.svgs) {
    assert.equal(svg.connected, true);
    assert.ok(svg.width > 0, `${svg.id} has zero width`);
    assert.ok(svg.height > 0, `${svg.id} has zero height`);
    assert.equal(svg.display, 'block');
    assert.equal(svg.visibility, 'visible');
    assert.notEqual(svg.opacity, '0');
    if (expectedParts) {
      const expected = svg.id.includes('circle') ? expectedParts.circle : expectedParts.rect;
      assert.equal(svg.parts, expected, `${svg.id} has the wrong number of parts`);
      if (svg.id.includes('circle')) {
        assert.equal(svg.circles, expected === 1 ? 3 : 2);
        assert.equal(svg.lines, expected === 1 ? 0 : expected);
      } else {
        assert.equal(svg.rects, expected + 1);
        assert.equal(svg.lines, svg.rows + svg.cols + 2);
      }
    }
  }
}

async function waitForHealthy(bidi, context, expectedParts = null, timeoutMs = 25000) {
  const deadline = Date.now() + timeoutMs;
  let state = null;
  let lastError = null;

  while (Date.now() < deadline) {
    state = await bidi.evaluateJson(context, diagnosticExpression());
    try {
      assertHealthy(state, expectedParts);
      return state;
    } catch (error) {
      lastError = error;
      await sleep(200);
    }
  }

  throw new Error(`${lastError ? lastError.message : 'Firefox widget timeout'}\n${JSON.stringify(state, null, 2)}`);
}

async function waitForFixture(bidi, context, timeoutMs = 25000) {
  const deadline = Date.now() + timeoutMs;
  let state = null;

  while (Date.now() < deadline) {
    state = await bidi.evaluateJson(context, diagnosticExpression());
    if (state.dynItems === 2 && state.mounts === 4 && state.ranges === 6) return state;
    await sleep(100);
  }

  throw new Error(`Firefox fixture timeout\n${JSON.stringify(state, null, 2)}`);
}

async function terminateBrowser(browser, profile) {
  if (!browser) return;
  if (process.platform === 'win32') {
    if (browser.exitCode === null) {
      spawnSync('taskkill.exe', ['/PID', String(browser.pid), '/T', '/F'], { windowsHide: true });
    }
    const escapedProfile = profile.replace(/'/g, "''");
    const command = `$profile = '${escapedProfile}'; Get-CimInstance Win32_Process -Filter "Name = 'firefox.exe'" | Where-Object { $_.CommandLine -like ('*' + $profile + '*') } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }`;
    spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', command], { windowsHide: true });
  } else if (browser.exitCode === null) {
    browser.kill('SIGTERM');
  }
}

async function main() {
  if (typeof WebSocket === 'undefined') {
    throw new Error('This smoke test requires a Node.js version with the global WebSocket API.');
  }

  const firefox = findFirefox();
  if (!firefox) throw new Error('Firefox was not found. Set FIREFOX_PATH to its executable.');

  const remotePort = await freePort();
  const profile = await mkdtemp(path.join(os.tmpdir(), 'lia-mathe-firefox-'));
  const browserLog = [];
  let browser = null;
  let bidi = null;

  try {
    const payload = await buildFixturePayload();

    browser = spawn(firefox, [
      '--headless',
      '--no-remote',
      '--profile', profile,
      '--remote-debugging-port', String(remotePort),
      'about:blank',
    ], {
      env: { ...process.env, MOZ_ACCELERATED: '0', MOZ_WEBRENDER: '0' },
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    });
    browser.stdout.on('data', chunk => browserLog.push(String(chunk)));
    browser.stderr.on('data', chunk => browserLog.push(String(chunk)));

    const socket = await connectWebSocket(`ws://127.0.0.1:${remotePort}/session`);
    bidi = new Bidi(socket);
    await bidi.command('session.new', { capabilities: { alwaysMatch: {} } });
    const tree = await bidi.command('browsingContext.getTree');
    const context = tree.contexts[0].context;
    const courseUrl = 'https://liascript.github.io/course/?data:text/markdown;base64,' +
      Buffer.from(payload.course).toString('base64') + '#1';
    await bidi.command('browsingContext.navigate', { context, url: courseUrl, wait: 'complete' });
    await waitForFixture(bidi, context);
    const executableBundle = payload.bundle.replace(/\n?\/\/# sourceMappingURL=.*$/m, '');
    await bidi.evaluate(context, `(0,eval)(${JSON.stringify(executableBundle)})`);

    const initial = await waitForHealthy(bidi, context);
    const removedTally = await bidi.evaluate(context, `(() => {
      const svg = document.querySelector('table .lia-tally > svg[data-lia-tally-marks]');
      if (!svg) return false;
      svg.remove();
      return true;
    })()`);
    assert.equal(removedTally, true);
    await waitForHealthy(bidi, context);
    const tallyEdgeState = await bidi.evaluateJson(context, `(async() => {
      const fixture = document.createElement('div');
      fixture.hidden = true;
      fixture.innerHTML = ['0', '5', '6', '-1'].map(value =>
        '<span class="lia-tally" data-lia-tally-count="' + value + '">' + value + '</span>'
      ).join('');
      document.body.appendChild(fixture);
      const deadline = Date.now() + 3000;
      while (fixture.querySelectorAll('svg[data-lia-tally-marks]').length < 3 && Date.now() < deadline) {
        await new Promise(resolve => setTimeout(resolve, 25));
      }
      const result = Array.from(fixture.querySelectorAll('.lia-tally')).map(host => ({
        raw: host.getAttribute('data-lia-tally-count'),
        rendered: host.getAttribute('data-lia-tally-rendered'),
        marks: host.querySelectorAll('[data-lia-tally-mark]').length,
        svg: !!host.querySelector('svg[data-lia-tally-marks]'),
        label: host.getAttribute('aria-label'),
      }));
      fixture.remove();
      return result;
    })()`, true);
    assert.deepEqual(tallyEdgeState, [
      { raw: '0', rendered: '0', marks: 0, svg: true, label: 'Strichliste: 0' },
      { raw: '5', rendered: '5', marks: 5, svg: true, label: 'Strichliste: 5' },
      { raw: '6', rendered: '6', marks: 6, svg: true, label: 'Strichliste: 6' },
      { raw: '-1', rendered: 'invalid:-1', marks: 0, svg: false, label: 'Ungültige Strichliste' },
    ]);
    const frameState = await bidi.evaluateJson(context, `(async() => {
      const frame = document.createElement('iframe');
      frame.id = 'fq-document-regression-frame';
      frame.style.cssText = 'display:block;width:260px;height:520px';
      document.body.appendChild(frame);
      const doc = frame.contentDocument;
      const circleUid = 'frame_circle';
      const rectUid = 'frame_rect';
      doc.body.innerHTML =
        '<div id="fq-circle-wrap-' + circleUid + '" class="fq-widget" data-fq-kind="circle" data-fq-uid="' + circleUid + '">' +
          '<div id="fq-circle-host-' + circleUid + '" class="fq-widget" data-fq-kind="circle" data-fq-uid="' + circleUid + '">' +
            '<div id="fq-circle-mount-' + circleUid + '" class="fq-mount"></div>' +
            '<div id="fq-circle-range-' + circleUid + '" class="fq-range"><input type="range" min="1" max="32" value="4"></div>' +
          '</div>' +
        '</div>' +
        '<div id="fq-rect-wrap-' + rectUid + '" class="fq-widget" data-fq-kind="rect" data-fq-uid="' + rectUid + '">' +
          '<div id="fq-rect-host-' + rectUid + '" class="fq-widget" data-fq-kind="rect" data-fq-uid="' + rectUid + '">' +
            '<div id="fq-rect-mount-' + rectUid + '" class="fq-mount"></div>' +
            '<div id="fq-rect-rows-wrap-' + rectUid + '" class="fq-range"><input type="range" min="1" max="20" value="1"></div>' +
            '<div id="fq-rect-cols-wrap-' + rectUid + '" class="fq-range"><input type="range" min="1" max="20" value="1"></div>' +
          '</div>' +
        '</div>';
      const circleMount = doc.getElementById('fq-circle-mount-' + circleUid);
      const rectMount = doc.getElementById('fq-rect-mount-' + rectUid);
      const macroWindow = frame.contentWindow;
      const localApiBefore = !!macroWindow.__LIA_FRACTION_QUIZ__;
      let api = macroWindow.__LIA_FRACTION_QUIZ__;
      if (!api) api = macroWindow.top.__LIA_FRACTION_QUIZ__;
      api.mountCircle(circleUid, '1/4', circleMount);
      api.mountRect(rectUid, '1/23', rectMount);
      api.onReveal(rectUid, rectMount);
      const deadline = Date.now() + 3000;
      while (
        (!circleMount.querySelector('svg.fq-svg') || !rectMount.querySelector('svg.fq-svg')) &&
        Date.now() < deadline
      ) {
        await new Promise(resolve => setTimeout(resolve, 25));
      }
      const svg = circleMount.querySelector('svg.fq-svg');
      const rectSvg = rectMount.querySelector('svg.fq-svg');
      const box = svg && svg.getBoundingClientRect();
      const widgets = api.getAllWidgets(rectMount);
      return {
        svg: !!svg,
        localApiBefore,
        topFallback: api === macroWindow.top.__LIA_FRACTION_QUIZ__,
        correctDocument: !!svg && svg.ownerDocument === doc,
        styleInjected: !!doc.getElementById('__LIA_FRACTION_QUIZ_STYLE_V8__'),
        width: box && box.width,
        height: box && box.height,
        rectParts: rectSvg && rectSvg.querySelectorAll('[data-fq-part]').length,
        rectRows: rectSvg && Number(rectSvg.getAttribute('data-fq-rows')),
        rectCols: rectSvg && Number(rectSvg.getAttribute('data-fq-cols')),
        routedWidget: !!widgets[rectUid],
        routedCheck: api.check(rectUid, rectMount),
      };
    })()`, true);
    assert.deepEqual(frameState, {
      svg: true,
      localApiBefore: false,
      topFallback: true,
      correctDocument: true,
      styleInjected: true,
      width: 200,
      height: 200,
      rectParts: 23,
      rectRows: 23,
      rectCols: 1,
      routedWidget: true,
      routedCheck: true,
    });

    await bidi.evaluate(context, `(() => {
      const set = (input, value) => {
        input.value = String(value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      };
      document.querySelectorAll('[id^="fq-circle-range-"] input[type="range"]').forEach(input => set(input, 5));
      document.querySelectorAll('[id^="fq-rect-rows-wrap-"] input[type="range"]').forEach(input => set(input, 2));
      document.querySelectorAll('[id^="fq-rect-cols-wrap-"] input[type="range"]').forEach(input => set(input, 3));
    })()`);
    await waitForHealthy(bidi, context, { circle: 5, rect: 6 });

    const damagedCount = await bidi.evaluate(context, `(() => {
      const svgs = Array.from(document.querySelectorAll('.fq-mount > svg.fq-svg'));
      svgs.forEach(svg => {
        const kind = svg.getAttribute('data-fq-kind');
        const requiredPart = kind === 'circle'
          ? svg.querySelector('circle:last-of-type')
          : svg.querySelector('line:last-of-type');
        if (requiredPart) requiredPart.remove();
      });
      return svgs.length;
    })()`);
    assert.equal(damagedCount, 4);
    await waitForHealthy(bidi, context, { circle: 5, rect: 6 });

    const removedCount = await bidi.evaluate(context, `(() => {
      const svgs = Array.from(document.querySelectorAll('.fq-mount > svg.fq-svg'));
      svgs.forEach(svg => svg.remove());
      return svgs.length;
    })()`);
    assert.equal(removedCount, 4);
    await waitForHealthy(bidi, context, { circle: 5, rect: 6 });

    const replacedCount = await bidi.evaluate(context, `(() => {
      const mounts = Array.from(document.querySelectorAll('.fq-mount'));
      mounts.forEach(mount => mount.replaceWith(mount.cloneNode(false)));
      return mounts.length;
    })()`);
    assert.equal(replacedCount, 4);
    await waitForHealthy(bidi, context, { circle: 5, rect: 6 });

    const replacedSlide = await bidi.evaluate(context, `(() => {
      const mount = document.querySelector('.fq-mount');
      const slide = mount && mount.closest('.lia-slide__content');
      if (!slide) return 0;
      const mountCount = slide.querySelectorAll('.fq-mount').length;
      const replacement = slide.cloneNode(true);
      replacement.querySelectorAll('svg.fq-svg').forEach(svg => svg.remove());
      slide.replaceWith(replacement);
      return mountCount;
    })()`);
    assert.equal(replacedSlide, 4);
    const recovered = await waitForHealthy(bidi, context, { circle: 5, rect: 6 });

    const destroyState = await bidi.evaluateJson(context, `(async() => {
      const frame = document.getElementById('fq-document-regression-frame');
      const frameMount = frame.contentDocument.getElementById('fq-rect-mount-frame_rect');
      const mainMount = document.querySelector('.fq-mount');
      window.__LIA_FRACTION_QUIZ__.destroy();
      frameMount.querySelector('svg.fq-svg').remove();
      mainMount.querySelector('svg.fq-svg').remove();
      await new Promise(resolve => setTimeout(resolve, 100));
      return {
        frameRecovered: !!frameMount.querySelector('svg.fq-svg'),
        mainRecovered: !!mainMount.querySelector('svg.fq-svg'),
      };
    })()`, true);
    assert.deepEqual(destroyState, { frameRecovered: false, mainRecovered: false });

    console.log(JSON.stringify({
      firefox,
      initialSvgSizes: initial.svgs.map(({ id, width, height }) => ({ id, width, height })),
      recoveredSvgSizes: recovered.svgs.map(({ id, width, height }) => ({ id, width, height })),
    }, null, 2));
  } catch (error) {
    if (browserLog.length) error.message += `\nFirefox log:\n${browserLog.join('').slice(-4000)}`;
    throw error;
  } finally {
    if (bidi) {
      try {
        const id = bidi.nextId++;
        bidi.socket.send(JSON.stringify({ id, method: 'browser.close', params: {} }));
        await sleep(500);
      } catch {}
      try { bidi.socket.close(); } catch {}
    }
    await terminateBrowser(browser, profile);
    await sleep(500);
    await rm(profile, { recursive: true, force: true, maxRetries: 20, retryDelay: 100 });
  }
}

main().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
