import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => readFile(path.join(root, relativePath), 'utf8');

test('all public fraction macros retry and fall back to the root window', async () => {
  const readme = await read('README.md');

  assert.equal((readme.match(/const started = Date\.now\(\);/g) || []).length, 8);
  assert.equal((readme.match(/window\.top\.__LIA_FRACTION_QUIZ__/g) || []).length, 8);
  assert.equal((readme.match(/Date\.now\(\) - started < 5000/g) || []).length, 8);
  assert.equal((readme.match(/host\.querySelector\(':scope > svg\.fq-svg'\)/g) || []).length, 8);
  assert.doesNotMatch(readme, /const _api = window\.__LIA_FRACTION_QUIZ__/);
});

test('the bundle exposes APIs in root and content contexts', async () => {
  const source = await read('src/index.ts');
  const macros = await read('README.md');

  assert.match(source, /\(ROOT as any\)\.__LIA_FRACTION_QUIZ__ = publicAPI/);
  assert.match(source, /\(CONTENT_WINDOW as any\)\.__LIA_FRACTION_QUIZ__ = publicAPI/);
  assert.match(source, /injectStyleOnce\(ROOT_DOCUMENT\)/);
  assert.match(source, /injectStyleOnce\(CONTENT_DOCUMENT\)/);
  assert.match(source, /byDocument: WeakMap<Document, FQStore>/);
  assert.match(source, /registry\.all\.forEach\(entry => entry\.destroy\(\)\)/);
  assert.match(source, /host\?\.ownerDocument/);
  assert.equal((macros.match(/mount(?:Circle|Rect)\(uid, target, host\)/g) || []).length, 8);
});

test('deep DOM replacements are observed without unconditional rerenders', async () => {
  const source = await read('src/store.ts');

  assert.match(source, /subtree: true/);
  assert.match(source, /private hasHealthyRender\(uid: string\): boolean/);
  assert.match(source, /if \(!this\.hasHealthyRender\(widgetUid\)\) this\.render\(widgetUid\)/);
  assert.match(source, /svgs\.length !== 1/);
  assert.match(source, /data-fq-rows/);
  assert.match(source, /revealed exact solutions may/);
  assert.match(source, /MOUNT_TIMEOUT_MS/);
});

test('SVG sizing avoids making the graphic a Firefox flex item', async () => {
  const source = await read('src/style.ts');

  assert.match(source, /\.fq-mount \{\s*display: block;/);
  assert.match(source, /\.fq-mount svg \{[\s\S]*flex: none;/);
  assert.doesNotMatch(source, /\.fq-mount \{\s*display: flex;/);
});

test('the browser fixture covers C variants inside and outside DynFlex', async () => {
  const fixture = await read('tests/fixtures/firefox-dynflex.md');

  assert.equal((fixture.match(/@circleQuizC\(/g) || []).length, 2);
  assert.equal((fixture.match(/@rectQuizC\(/g) || []).length, 2);
  assert.match(fixture, /<section class="dynFlex"/);
  assert.match(fixture, /import: \.\.\/\.\.\/README\.md/);
});
