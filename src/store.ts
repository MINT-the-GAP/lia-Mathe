// FQStore: manages all widget state, DOM binding, rendering, and quiz bridge logic.

import { FQKind, FQMeta, FQNodes, FQFraction, FQWidget, FQPublicAPI, FQWidgetSnapshot } from "./types";
import { MAX_CIRCLE_PARTS, MAX_RECT_DIM, MOUNT_TIMEOUT_MS, DEBUG_FQ } from "./constants";
import { parseFraction, boolArray, bestFactorPair, clampInt } from "./fraction";
import { renderCircleSVG, renderRectSVG } from "./renderer";

// Key used to mark that a wrap element already has a delegated click handler installed.
const QUIZ_SOURCE_SELECTOR = '.fq-native-quiz-source[data-fq-quiz]';
const QUIZ_NATIVE_ATTRIBUTE = 'data-fq-quiz-native';
const QUIZ_CLASS = 'fq-native-quiz';
const CLICK_INSTALLED_KEY = "__fqClickInstalled";

function debug(tag: string, ...rest: unknown[]): void {
  if (!DEBUG_FQ) return;
  try { console.log("[FQDBG]", tag, ...rest); } catch (e) {}
}

function detectUiLanguage(doc: Document): string {
  const langs: string[] = [];
  try {
    const root = (window as any);
    const lia = root.LIA || root.lia;
    if (lia) {
      if (typeof lia.language === "string") langs.push(lia.language);
      if (lia.settings && typeof lia.settings.language === "string") langs.push(lia.settings.language);
      if (typeof lia.lang === "string") langs.push(lia.lang);
    }
  } catch (e) {}
  try {
    if (doc.documentElement) langs.push(doc.documentElement.lang || "");
  } catch (e) {}
  try {
    if (navigator.languages) {
      for (let i = 0; i < navigator.languages.length; i++) langs.push(navigator.languages[i] || "");
    }
    if (navigator.language) langs.push(navigator.language);
  } catch (e) {}
  for (const raw of langs) {
    const base = raw.trim().toLowerCase().split("-")[0];
    if (base) return base;
  }
  return "de";
}

interface FQLabels { subdivisions: string; rows: string; cols: string; }

function getLabels(lang: string): FQLabels {
  if (lang === "de") return { subdivisions: "Unterteilungen", rows: "Zeilen", cols: "Spalten" };
  return { subdivisions: "Subdivisions", rows: "Rows", cols: "Columns" };
}

function localizeRangeLabels(doc: Document, uid: string, kind: string): void {
  const labels = getLabels(detectUiLanguage(doc));
  if (kind === "circle") {
    const range = doc.getElementById("fq-circle-range-" + uid);
    if (range) range.setAttribute("data-label", labels.subdivisions);
  }
  if (kind === "rect") {
    const rowsWrap = doc.getElementById("fq-rect-rows-wrap-" + uid);
    const colsWrap = doc.getElementById("fq-rect-cols-wrap-" + uid);
    if (rowsWrap) rowsWrap.setAttribute("data-label", labels.rows);
    if (colsWrap) colsWrap.setAttribute("data-label", labels.cols);
  }
}

function nodeLabel(node: Node | null): string {
  if (!node) return "(null)";
  if (node.nodeType !== 1) return "(" + node.nodeName + ")";
  const el = node as HTMLElement;
  const id = el.id ? "#" + el.id : "";
  const cls = el.className && typeof el.className === "string"
    ? "." + el.className.trim().replace(/\s+/g, ".")
    : "";
  return el.tagName.toLowerCase() + id + cls;
}

function nodeTouchesWidget(node: Node | null): boolean {
  if (!node || node.nodeType !== 1) return false;
  const el = node as HTMLElement;
  if (el.id && /^fq-/.test(el.id)) return true;
  if (el.classList) {
    if (
      el.classList.contains("fq-widget") ||
      el.classList.contains("fq-mount") ||
      el.classList.contains("fq-range")
    ) return true;
  }
  try {
    return !!el.querySelector('[id^="fq-"], .fq-widget, .fq-mount, .fq-range');
  } catch (e) {
    return false;
  }
}

export function installDebugDomObserver(root: Window & typeof globalThis, key: string): void {
  if (!DEBUG_FQ) return;
  if ((root as any)[key]) return;
  if (typeof MutationObserver === "undefined") return;

  const doc = document;
  const target = doc.body || doc.documentElement;
  if (!target) return;

  const obs = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type !== "childList") continue;
      const added: string[] = [];
      const removed: string[] = [];
      m.addedNodes.forEach(n => { if (nodeTouchesWidget(n)) added.push(nodeLabel(n)); });
      m.removedNodes.forEach(n => { if (nodeTouchesWidget(n)) removed.push(nodeLabel(n)); });
      if (added.length || removed.length) {
        debug("dom-mutation", { target: nodeLabel(m.target), added, removed });
      }
    }
  });

  obs.observe(target, { childList: true, subtree: true });
  (root as any)[key] = obs;
  debug("debug-dom-observer-installed");
}

export class FQStore implements FQPublicAPI {
  private widgets: Record<string, FQWidget> = Object.create(null);
  private domObserver: MutationObserver | null = null;
  private mountAttempts: Record<string, () => void> = Object.create(null);
  private destroyed = false;

  readonly version = 5;

  constructor(private readonly doc: Document = document) {}

  // Returns the widget for uid, creating it lazily if it doesn't exist yet.
  getWidget(uid: string, kind?: FQKind | ""): FQWidget {
    uid = String(uid == null ? "" : uid);
    if (!this.widgets[uid]) {
      this.widgets[uid] = {
        meta: {
          uid,
          kind: (kind || "") as FQKind | "",
          target: { num: 0, den: 1, value: 0, raw: "0" },
          locked: false,
          solved: false,
          revealed: false,
          ready: false
        },
        nodes: {
          uid,
          kind: "",
          wrap: null,
          host: null,
          mount: null,
          circleInput: null,
          rowsInput: null,
          colsInput: null,
          quizSource: null,
          quizInput: null,
          _quizObserver: null,
          _quizScope: null,
          _quizClickHandler: null,
          _quizBridgeInstalled: false
        },
        state: []
      };
    }
    if (kind) this.widgets[uid].meta.kind = kind as FQKind;
    return this.widgets[uid];
  }

  // Convenience accessors — kept for internal clarity.
  private meta(uid: string): FQMeta { return this.getWidget(uid).meta; }
  private nodes(uid: string): FQNodes { return this.getWidget(uid).nodes; }
  private state(uid: string): boolean[] { return this.getWidget(uid).state; }

  // Resolves rect dims from widget state, falling back to meta values.
  private getDims(uid: string) {
    const w = this.getWidget(uid);
    return w.dims || { rows: w.meta.rows || 1, cols: w.meta.cols || 1 };
  }

  private findQuizBinding(uid: string): {
    source: HTMLElement;
    input: HTMLInputElement;
    scope: HTMLElement;
  } | null {
    const sources = Array.from(
      this.doc.querySelectorAll<HTMLElement>(QUIZ_SOURCE_SELECTOR)
    );
    const sourceIndex = sources.findIndex(
      source => source.getAttribute('data-fq-quiz') === uid
    );
    if (sourceIndex < 0) return null;

    const source = sources[sourceIndex];
    const ownScope = source.closest('.lia-quiz') as HTMLElement | null;
    const ownInput = ownScope
      ? ownScope.querySelector<HTMLInputElement>('input.lia-quiz__input')
      : null;
    if (ownScope && ownInput) return { source, input: ownInput, scope: ownScope };

    const view = this.doc.defaultView || window;
    const following = ((view as any).Node && (view as any).Node.DOCUMENT_POSITION_FOLLOWING) || 4;
    const boundary = sources[sourceIndex + 1] || null;
    const sourceSlide = source.closest('.lia-slide__content');
    const inputs = Array.from(this.doc.querySelectorAll<HTMLInputElement>(
      'input.lia-quiz__input:not(.lia-math-quiz-proxy)'
    ));

    for (const input of inputs) {
      const scope = input.closest('.lia-quiz') as HTMLElement | null;
      if (!scope) continue;
      if (sourceSlide && input.closest('.lia-slide__content') !== sourceSlide) continue;
      if (!(source.compareDocumentPosition(input) & following)) continue;
      if (boundary && !(input.compareDocumentPosition(boundary) & following)) continue;
      return { source, input, scope };
    }

    return null;
  }

  private refreshQuizBinding(uid: string): boolean {
    const nodes = this.nodes(uid);
    const binding = this.findQuizBinding(uid);
    if (!binding) {
      if (nodes.quizSource && !nodes.quizSource.isConnected) nodes.quizSource = null;
      if (nodes.quizInput && !nodes.quizInput.isConnected) nodes.quizInput = null;
      return false;
    }

    if (nodes.quizInput && nodes.quizInput !== binding.input && nodes.quizInput.isConnected) {
      nodes.quizInput.removeAttribute(QUIZ_NATIVE_ATTRIBUTE);
    }
    if (nodes._quizScope && nodes._quizScope !== binding.scope && nodes._quizScope.isConnected) {
      nodes._quizScope.classList.remove(QUIZ_CLASS);
      nodes._quizScope.removeAttribute('data-fq-quiz');
    }

    nodes.quizSource = binding.source;
    nodes.quizInput = binding.input;
    binding.input.setAttribute(QUIZ_NATIVE_ATTRIBUTE, uid);
    binding.scope.classList.add(QUIZ_CLASS);
    binding.scope.setAttribute('data-fq-quiz', uid);
    this.ensureQuizBridge(uid, binding.scope);
    return true;
  }

  private syncQuizInput(uid: string): void {
    const nodes = this.nodes(uid);
    const input = nodes.quizInput;
    const source = nodes.quizSource;
    if (!input || !source || !input.isConnected || input.disabled) return;

    const answer = source.getAttribute('data-fq-answer') || `fqok${uid}`;
    const nextValue = this.isCorrect(uid) ? answer : `fqno${uid}`;
    if (input.value === nextValue) return;

    input.value = nextValue;
    const view = input.ownerDocument.defaultView || window;
    input.dispatchEvent(new view.Event('input', { bubbles: true }));
    input.dispatchEvent(new view.Event('change', { bubbles: true }));
  }

  // Attaches input+change listeners to a range input without duplicating the guard.
  private bindRangeInput(input: HTMLInputElement, boundKey: string, uid: string, handler: () => void): void {
    if ((input as any)[boundKey] === uid) return;
    (input as any)[boundKey] = uid;
    input.addEventListener("input", handler, true);
    input.addEventListener("change", handler, true);
  }

  refreshNodes(uid: string): FQNodes {
    uid = String(uid == null ? "" : uid);
    const w = this.getWidget(uid);
    const nodes = w.nodes;

    const prevWrap = nodes.wrap;
    const prevHost = nodes.host;
    const prevMount = nodes.mount;
    const prevCircleInput = nodes.circleInput;
    const prevRowsInput = nodes.rowsInput;
    const prevColsInput = nodes.colsInput;

    const circleWrap = this.doc.getElementById("fq-circle-wrap-" + uid);
    const rectWrap = this.doc.getElementById("fq-rect-wrap-" + uid);

    if (circleWrap) {
      nodes.kind = "circle";
      nodes.wrap = circleWrap;
      nodes.host = this.doc.getElementById("fq-circle-host-" + uid);
      nodes.mount = this.doc.getElementById("fq-circle-mount-" + uid);
      const rangeWrap = this.doc.getElementById("fq-circle-range-" + uid);
      nodes.circleInput = rangeWrap ? rangeWrap.querySelector('input[type="range"]') : null;
      nodes.rowsInput = null;
      nodes.colsInput = null;
    } else if (rectWrap) {
      nodes.kind = "rect";
      nodes.wrap = rectWrap;
      nodes.host = this.doc.getElementById("fq-rect-host-" + uid);
      nodes.mount = this.doc.getElementById("fq-rect-mount-" + uid);
      const rowsWrap = this.doc.getElementById("fq-rect-rows-wrap-" + uid);
      const colsWrap = this.doc.getElementById("fq-rect-cols-wrap-" + uid);
      nodes.rowsInput = rowsWrap ? rowsWrap.querySelector('input[type="range"]') : null;
      nodes.colsInput = colsWrap ? colsWrap.querySelector('input[type="range"]') : null;
      nodes.circleInput = null;
    } else {
      nodes.wrap = null;
      nodes.host = null;
      nodes.mount = null;
      nodes.circleInput = null;
      nodes.rowsInput = null;
      nodes.colsInput = null;
    }

    if (prevWrap && prevWrap !== nodes.wrap) debug("wrap-replaced", uid, nodes.kind, nodeLabel(nodes.wrap));
    if (!prevWrap && nodes.wrap) debug("wrap-found", uid, nodes.kind, nodeLabel(nodes.wrap));
    if (prevHost && prevHost !== nodes.host) debug("host-replaced", uid, nodes.kind, nodeLabel(nodes.host));
    if (prevMount && prevMount !== nodes.mount) debug("mount-replaced", uid, nodes.kind, nodeLabel(nodes.mount));
    if (prevCircleInput && prevCircleInput !== nodes.circleInput) debug("circle-input-replaced", uid);
    if (prevRowsInput && prevRowsInput !== nodes.rowsInput) debug("rows-input-replaced", uid);
    if (prevColsInput && prevColsInput !== nodes.colsInput) debug("cols-input-replaced", uid);

    if (nodes.circleInput) this.bindCircleInput(uid, nodes.circleInput);
    if (nodes.rowsInput || nodes.colsInput) this.bindRectInputs(uid, nodes.rowsInput, nodes.colsInput);
    localizeRangeLabels(this.doc, uid, nodes.kind);
    if (nodes.wrap) {
      this.installClickDelegation(uid, nodes.wrap);
      this.installDomObserver();
    }
    this.refreshQuizBinding(uid);

    return nodes;
  }

  // Attaches a single delegated click handler on wrap once — never re-attached on re-render.
  private installClickDelegation(uid: string, wrap: HTMLElement): void {
    if ((wrap as any)[CLICK_INSTALLED_KEY]) return;
    (wrap as any)[CLICK_INSTALLED_KEY] = true;

    wrap.addEventListener("click", (evt) => {
      const w = this.getWidget(uid);
      if (w.meta.locked) return;
      const el = evt.target && (evt.target as Element).closest
        ? (evt.target as Element).closest("[data-fq-part]")
        : null;
      if (!el) return;
      const i = parseInt(el.getAttribute("data-fq-part") || "", 10);
      if (!Number.isFinite(i)) return;
      this.toggle(uid, i);
      this.render(uid);
    }, true);
  }

  // One observer per document repairs widgets after LiaScript or DynFlex replaces DOM nodes.
  private installDomObserver(): void {
    if (this.domObserver) return;
    if (typeof MutationObserver === "undefined") return;

    const obs = new MutationObserver(() => {
      for (const widgetUid in this.widgets) {
        this.refreshNodes(widgetUid);
        this.syncDomState(widgetUid);
        if (!this.hasHealthyRender(widgetUid)) this.render(widgetUid);
      }
    });

    try {
      obs.observe(this.doc, { childList: true, subtree: true });
      this.domObserver = obs;
    } catch (e) {}
  }

  private hasHealthyRender(uid: string): boolean {
    const nodes = this.nodes(uid);
    const mount = nodes.mount;
    if (!mount || !mount.isConnected) return false;

    const w = this.getWidget(uid);
    const svgs = mount.querySelectorAll(':scope > svg.fq-svg');
    if (svgs.length !== 1) return false;
    const svg = svgs[0];
    const kind = svg.getAttribute('data-fq-kind');
    const parts = parseInt(svg.getAttribute('data-fq-parts') || '', 10);
    if (kind !== w.meta.kind || parts !== w.state.length) return false;
    if (svg.querySelectorAll('[data-fq-part]').length !== w.state.length) return false;

    if (kind === 'circle') {
      const expectedCircles = w.state.length === 1 ? 3 : 2;
      const expectedLines = w.state.length === 1 ? 0 : w.state.length;
      return (
        svg.querySelectorAll('circle').length === expectedCircles &&
        svg.querySelectorAll('line').length === expectedLines
      );
    }
    const dims = this.getDims(uid);
    return (
      parseInt(svg.getAttribute('data-fq-rows') || '', 10) === dims.rows &&
      parseInt(svg.getAttribute('data-fq-cols') || '', 10) === dims.cols &&
      svg.querySelectorAll('rect').length === w.state.length + 1 &&
      svg.querySelectorAll('line').length === dims.rows + dims.cols + 2
    );
  }

  parseTarget(raw: unknown): FQFraction {
    return parseFraction(raw);
  }

  setTarget(uid: string, raw: unknown, kind?: FQKind | ""): FQFraction {
    const meta = this.getWidget(uid, kind).meta;
    meta.target = parseFraction(raw);
    debug("setTarget", uid, { kind: meta.kind, target: meta.target });
    return meta.target;
  }

  ensureCircle(uid: string, parts: unknown, options?: { preserve?: boolean }): boolean[] {
    const w = this.getWidget(uid, "circle");
    const n = clampInt(parts, 1, MAX_CIRCLE_PARTS, 1);
    const prev = w.state.length > 0 ? w.state : [];
    w.state = boolArray(n, options?.preserve ? prev : null);
    w.meta.parts = n;
    w.meta.kind = "circle";
    delete w.dims;
    return w.state;
  }

  ensureRect(uid: string, rows: unknown, cols: unknown, options?: { preserve?: boolean }): boolean[] {
    const w = this.getWidget(uid, "rect");
    const r = clampInt(rows, 1, MAX_RECT_DIM, 1);
    const c = clampInt(cols, 1, MAX_RECT_DIM, 1);
    const prev = w.state.length > 0 ? w.state : [];
    w.dims = { rows: r, cols: c };
    w.state = boolArray(r * c, options?.preserve ? prev : null);
    w.meta.rows = r;
    w.meta.cols = c;
    w.meta.kind = "rect";
    return w.state;
  }

  // Unified locked-guard + delegate for both circle and rect dimension changes.
  setCircleParts(uid: string, parts: unknown, options?: { force?: boolean; preserve?: boolean }): boolean[] {
    const meta = this.getWidget(uid, "circle").meta;
    if (meta.locked && !options?.force) return this.state(uid).length > 0 ? this.state(uid) : this.ensureCircle(uid, 1);
    return this.ensureCircle(uid, parts, options);
  }

  setRectDims(uid: string, rows: unknown, cols: unknown, options?: { force?: boolean; preserve?: boolean }): boolean[] {
    const meta = this.getWidget(uid, "rect").meta;
    if (meta.locked && !options?.force) return this.state(uid).length > 0 ? this.state(uid) : this.ensureRect(uid, 1, 1);
    return this.ensureRect(uid, rows, cols, options);
  }

  private buildCircleSolution(targetRaw: unknown) {
    const t = parseFraction(targetRaw);
    const parts = Math.max(1, t.den | 0);
    const active = Array(parts).fill(false);
    for (let i = 0; i < Math.min(parts, t.num | 0); i++) active[i] = true;
    return { type: "circle" as const, target: t, parts, active };
  }

  private buildRectSolution(targetRaw: unknown) {
    const t = parseFraction(targetRaw);
    const pair = bestFactorPair(t.den);
    const { rows, cols } = pair;
    const total = rows * cols;
    const active = Array(total).fill(false);
    for (let i = 0; i < Math.min(total, t.num | 0); i++) active[i] = true;
    return { type: "rect" as const, target: t, rows, cols, active };
  }

  getSolution(uid: string) {
    const meta = this.meta(uid);
    if (meta.kind === "circle") return this.buildCircleSolution(meta.target);
    if (meta.kind === "rect") return this.buildRectSolution(meta.target);
    return null;
  }

  isLocked(uid: string): boolean {
    return !!this.meta(uid).locked;
  }

  // Unified toggle — replaces toggleCircle + toggleRect.
  toggle(uid: string, index: number): boolean {
    const w = this.getWidget(uid);
    const { meta, state } = w;
    if (meta.locked || !meta.ready) return false;
    if (state.length === 0) {
      if (meta.kind === "circle") this.ensureCircle(uid, meta.parts || 1);
      else if (meta.kind === "rect") this.ensureRect(uid, w.dims?.rows || 1, w.dims?.cols || 1);
    }
    const i = index | 0;
    if (i < 0 || i >= w.state.length) return false;
    w.state[i] = !w.state[i];
    return w.state[i];
  }

  countSelected(uid: string): number {
    const state = this.state(uid);
    if (!state.length) return 0;
    let k = 0;
    for (let i = 0; i < state.length; i++) if (state[i]) k++;
    return k;
  }

  countTotal(uid: string): number {
    const state = this.state(uid);
    return state.length || 1;
  }

  isCorrect(uid: string): boolean {
    const meta = this.meta(uid);
    if (!meta.ready) return false;
    const t = meta.target || { num: 0, den: 1 };
    return this.countSelected(uid) * t.den === t.num * this.countTotal(uid);
  }

  lock(uid: string): boolean {
    this.meta(uid).locked = true;
    this.syncDomState(uid);
    return true;
  }

  markSolved(uid: string): boolean {
    const meta = this.meta(uid);
    if (!meta.ready) return false;
    meta.solved = true;
    meta.revealed = false;
    meta.locked = true;
    this.syncDomState(uid);
    this.render(uid);
    return true;
  }

  applySolution(uid: string) {
    const w = this.getWidget(uid);
    const sol = this.getSolution(uid);
    if (!sol) return null;

    debug("applySolution:start", uid, { kind: w.meta.kind, solution: sol });

    if (sol.type === "circle") {
      this.setCircleParts(uid, sol.parts, { force: true, preserve: false });
      w.state = boolArray(sol.parts, sol.active);
      w.meta.parts = sol.parts;
    } else {
      this.setRectDims(uid, sol.rows, sol.cols, { force: true, preserve: false });
      w.state = boolArray(sol.rows * sol.cols, sol.active);
      w.dims = { rows: sol.rows, cols: sol.cols };
      w.meta.rows = sol.rows;
      w.meta.cols = sol.cols;
    }

    this.syncInputs(uid, true);
    this.render(uid);

    debug("applySolution:end", uid, { kind: w.meta.kind });
    return sol;
  }

  markRevealed(uid: string): boolean {
    const meta = this.meta(uid);
    if (!meta.ready) return false;
    if (meta.revealed && meta.locked) return true;
    meta.revealed = true;
    meta.solved = false;
    meta.locked = true;
    this.applySolution(uid);
    this.syncDomState(uid);
    return true;
  }

  register(uid: string, options: {
    kind?: FQKind | "";
    wrap?: HTMLElement | null;
    host?: HTMLElement | null;
    mount?: HTMLElement | null;
    circleInput?: HTMLInputElement | null;
    rowsInput?: HTMLInputElement | null;
    colsInput?: HTMLInputElement | null;
    target?: unknown;
    initialParts?: unknown;
    initialRows?: unknown;
    initialCols?: unknown;
  }): FQNodes {
    const opts = options || {};
    const kind = (opts.kind || "") as FQKind | "";
    const w = this.getWidget(uid, kind);
    const { meta, nodes } = w;

    debug("register:start", uid, { kind });

    if (kind) nodes.kind = kind;
    if (opts.wrap) nodes.wrap = opts.wrap;
    if (opts.host) nodes.host = opts.host;
    if (opts.mount) nodes.mount = opts.mount;
    if (opts.circleInput) nodes.circleInput = opts.circleInput;
    if (opts.rowsInput) nodes.rowsInput = opts.rowsInput;
    if (opts.colsInput) nodes.colsInput = opts.colsInput;

    if (opts.target !== undefined) this.setTarget(uid, opts.target, kind || meta.kind);

    if (kind === "circle") {
      const hasState = w.state.length > 0;
      if (!hasState) {
        this.ensureCircle(uid, opts.initialParts != null ? opts.initialParts : 1, { preserve: false });
      } else {
        meta.parts = w.state.length;
        meta.kind = "circle";
      }
    } else if (kind === "rect") {
      const dims = w.dims;
      const hasState =
        !!dims &&
        w.state.length === clampInt(dims.rows, 1, MAX_RECT_DIM, 1) * clampInt(dims.cols, 1, MAX_RECT_DIM, 1);
      if (!hasState) {
        this.ensureRect(uid, opts.initialRows != null ? opts.initialRows : 1, opts.initialCols != null ? opts.initialCols : 1, { preserve: false });
      } else {
        meta.rows = clampInt(dims.rows, 1, MAX_RECT_DIM, 1);
        meta.cols = clampInt(dims.cols, 1, MAX_RECT_DIM, 1);
        meta.kind = "rect";
      }
    }

    if (nodes.circleInput) this.bindCircleInput(uid, nodes.circleInput);
    if (nodes.rowsInput || nodes.colsInput) this.bindRectInputs(uid, nodes.rowsInput, nodes.colsInput);
    localizeRangeLabels(this.doc, uid, kind || nodes.kind);
    meta.ready = true;
    if (nodes.wrap) {
      this.installClickDelegation(uid, nodes.wrap);
      this.installDomObserver();
    }
    this.refreshQuizBinding(uid);

    this.syncInputs(uid, true);
    this.syncDomState(uid);
    this.render(uid);

    debug("register:end", uid, { kind: meta.kind });
    return nodes;
  }

  bindCircleInput(uid: string, input: HTMLInputElement): void {
    this.bindRangeInput(input, "__fqCircleBoundUid", uid, () => {
      if (this.isLocked(uid)) { this.syncInputs(uid, true); return; }
      this.setCircleParts(uid, clampInt(input.value, 1, MAX_CIRCLE_PARTS, 1), { preserve: false });
      this.render(uid);
    });
  }

  bindRectInputs(uid: string, rowsInput: HTMLInputElement | null, colsInput: HTMLInputElement | null): void {
    if (rowsInput) {
      this.bindRangeInput(rowsInput, "__fqRectRowsBoundUid", uid, () => {
        if (this.isLocked(uid)) { this.syncInputs(uid, true); return; }
        const rows = clampInt(rowsInput.value, 1, MAX_RECT_DIM, 1);
        const cols = colsInput ? clampInt(colsInput.value, 1, MAX_RECT_DIM, 1) : this.getDims(uid).cols;
        this.setRectDims(uid, rows, cols, { preserve: false });
        this.render(uid);
      });
    }
    if (colsInput) {
      this.bindRangeInput(colsInput, "__fqRectColsBoundUid", uid, () => {
        if (this.isLocked(uid)) { this.syncInputs(uid, true); return; }
        const cols = clampInt(colsInput.value, 1, MAX_RECT_DIM, 1);
        const rows = rowsInput ? clampInt(rowsInput.value, 1, MAX_RECT_DIM, 1) : this.getDims(uid).rows;
        this.setRectDims(uid, rows, cols, { preserve: false });
        this.render(uid);
      });
    }
  }

  syncInputs(uid: string, forceValue: boolean): void {
    const nodes = this.nodes(uid);
    const w = this.getWidget(uid);
    const { meta } = w;

    if (meta.kind === "circle" && nodes.circleInput) {
      const parts = w.state.length || meta.parts || 1;
      if (forceValue || String(nodes.circleInput.value) !== String(parts)) nodes.circleInput.value = String(parts);
      nodes.circleInput.disabled = !!meta.locked;
    }

    if (meta.kind === "rect") {
      const dims = this.getDims(uid);
      if (nodes.rowsInput) {
        if (forceValue || String(nodes.rowsInput.value) !== String(dims.rows)) nodes.rowsInput.value = String(dims.rows);
        nodes.rowsInput.disabled = !!meta.locked;
      }
      if (nodes.colsInput) {
        if (forceValue || String(nodes.colsInput.value) !== String(dims.cols)) nodes.colsInput.value = String(dims.cols);
        nodes.colsInput.disabled = !!meta.locked;
      }
    }
  }

  syncDomState(uid: string): void {
    const nodes = this.nodes(uid);
    const meta = this.meta(uid);
    const targets = [nodes.wrap, nodes.host, nodes.mount];

    for (const el of targets) {
      if (!el || !el.setAttribute) continue;
      el.setAttribute("data-fq-locked", meta.locked ? "1" : "0");
      el.setAttribute("data-fq-solved", meta.solved ? "1" : "0");
      el.setAttribute("data-fq-revealed", meta.revealed ? "1" : "0");
    }

    this.syncInputs(uid, false);
    this.syncQuizInput(uid);
  }

  render(uid: string): boolean {
    const nodes = this.nodes(uid);
    const meta = this.meta(uid);
    if (!nodes.mount) return false;

    if (meta.kind === "circle") return this.renderCircle(uid, nodes.mount);
    if (meta.kind === "rect") return this.renderRect(uid, nodes.mount);
    return false;
  }

  private renderCircle(uid: string, mount: HTMLElement): boolean {
    const w = this.getWidget(uid, "circle");
    const arr = w.state.length > 0 ? w.state : this.ensureCircle(uid, w.meta.parts || 1);
    renderCircleSVG(mount, arr);
    this.syncDomState(uid);
    return true;
  }

  private renderRect(uid: string, mount: HTMLElement): boolean {
    const w = this.getWidget(uid, "rect");
    const dims = this.getDims(uid);
    const arr = w.state.length > 0 ? w.state : this.ensureRect(uid, dims.rows, dims.cols);
    // Interactive inputs are clamped in ensureRect; revealed exact solutions may
    // legitimately need a larger prime factor (for example 1/23).
    const rows = Math.max(1, Math.floor(Number(dims.rows) || 1));
    const cols = Math.max(1, Math.floor(Number(dims.cols) || 1));
    renderRectSVG(mount, arr, rows, cols);
    this.syncDomState(uid);
    return true;
  }

  private labelOf(el: Element | null): string {
    if (!el) return "";
    const parts: string[] = [];
    try { parts.push(el.textContent || ""); } catch (e) {}
    try { if (el.className) parts.push(String(el.className)); } catch (e) {}
    const attrs = ["title", "aria-label", "data-action", "data-title", "name", "value"];
    for (const attr of attrs) {
      try {
        const v = el.getAttribute && el.getAttribute(attr);
        if (v) parts.push(v);
      } catch (e) {}
    }
    return parts.join(" ").replace(/\s+/g, " ").trim().toLowerCase();
  }

  private isRevealButton(el: Element | null): boolean {
    return /(aufl|aufl[oö]sen|l[oö]sung|show solution|solution|resolve)/i.test(this.labelOf(el));
  }

  private isCheckButton(el: Element | null): boolean {
    if (!el) return false;
    if (el.classList.contains('lia-quiz__check')) return true;
    return /(pruefen|check)/i.test(this.labelOf(el));
  }

  private looksRevealed(scope: Element): boolean {
    if (!scope) return false;
    // LiaScript sets class "resolved" on the .lia-quiz wrapper when the solution is revealed
    if (scope.classList.contains("resolved")) return true;
    // Fallback: text-sniff the feedback element
    const feedback = scope.querySelector(".lia-quiz__feedback");
    const text = ((feedback && feedback.textContent) || "").toLowerCase();
    return /(aufgel|aufl[oö]s|l[oö]sung|show solution|resolved|solution)/i.test(text);
  }

  private syncQuizState(uid: string, scope: HTMLElement): void {
    const meta = this.meta(uid);
    if (!meta.ready) return;

    if (this.looksRevealed(scope)) {
      if (!meta.revealed || !meta.locked) this.markRevealed(uid);
      return;
    }

    if (scope.classList.contains('solved')) {
      if (!this.isCorrect(uid)) this.applySolution(uid);
      if (!meta.solved || !meta.locked) this.markSolved(uid);
    }
  }

  ensureQuizBridge(uid: string, scope: HTMLElement): void {
    const nodes = this.nodes(uid);
    const meta = this.meta(uid);

    if (!scope) return;
    if (nodes._quizBridgeInstalled && nodes._quizScope === scope && scope.isConnected) {
      this.syncQuizState(uid, scope);
      this.syncQuizInput(uid);
      return;
    }

    if (nodes._quizObserver) {
      try { nodes._quizObserver.disconnect(); } catch (e) {}
      nodes._quizObserver = null;
    }

    if (nodes._quizScope && nodes._quizClickHandler) {
      try { nodes._quizScope.removeEventListener("click", nodes._quizClickHandler, true); } catch (e) {}
    }

    const clickHandler = (evt: Event) => {
      const btn = evt.target && (evt.target as Element).closest
        ? (evt.target as Element).closest("button, input[type='button'], input[type='submit']")
        : null;
      if (!btn || !meta.ready) return;

      if (this.isCheckButton(btn)) {
        this.syncQuizInput(uid);
        setTimeout(() => { this.syncQuizState(uid, scope); }, 0);
        return;
      }

      if (this.isRevealButton(btn)) {
        debug("quiz-reveal-click", uid, { label: this.labelOf(btn) });
        setTimeout(() => { this.markRevealed(uid); }, 0);
      }
    };

    scope.addEventListener("click", clickHandler, true);

    let obs: MutationObserver | null = null;
    if (typeof MutationObserver !== "undefined") {
      obs = new MutationObserver(() => {
        this.syncQuizState(uid, scope);
      });
      try {
        // LiaScript mutates the class attribute on the .lia-quiz wrapper to add "resolved"
        obs.observe(scope, {
          attributes: true,
          attributeFilter: ['class'],
          subtree: false,
        });
      } catch (e) {
        obs = null;
      }
    }

    nodes._quizBridgeInstalled = true;
    nodes._quizScope = scope;
    nodes._quizClickHandler = clickHandler;
    nodes._quizObserver = obs;
    this.syncQuizState(uid, scope);
    this.syncQuizInput(uid);
  }

  onCheck(uid: string, passed: boolean): boolean {
    if (passed) this.markSolved(uid);
    return !!passed;
  }

  onReveal(uid: string): boolean {
    return this.markRevealed(uid);
  }

  check(uid: string): boolean {
    uid = String(uid == null ? "" : uid);
    if (!this.isCorrect(uid)) return false;
    if (!this.isLocked(uid)) this.onCheck(uid, true);
    return true;
  }

  // Single mount implementation — kind determines the DOM id prefix used to find elements.
  mount(uid: string, kind: FQKind, target: string): void {
    uid = String(uid == null ? "" : uid);
    this.destroyed = false;
    if (this.mountAttempts[uid]) this.mountAttempts[uid]();
    const p = `fq-${kind}-`;
    let widgetRegistered = false;
    
    // Try to find and register elements immediately
    const tryMount = (): boolean => {
      if (widgetRegistered) {
        this.refreshQuizBinding(uid);
        return !!this.nodes(uid).quizInput;
      }

      const wrap  = this.doc.getElementById(p + "wrap-"  + uid);
      const host  = this.doc.getElementById(p + "host-"  + uid);
      const mount = this.doc.getElementById(p + "mount-" + uid);
      
      if (kind === "circle") {
        const rangeWrap = this.doc.getElementById(p + "range-" + uid);
        const input = rangeWrap ? rangeWrap.querySelector<HTMLInputElement>('input[type="range"]') : null;
        if (wrap && host && mount && input) {
          this.register(uid, { kind, wrap, host, mount, circleInput: input, target, initialParts: input.value || 1 });
          widgetRegistered = true;
          return !!this.nodes(uid).quizInput;
        }
      } else {
        const rowsWrap = this.doc.getElementById(p + "rows-wrap-" + uid);
        const colsWrap = this.doc.getElementById(p + "cols-wrap-" + uid);
        const rowsInput = rowsWrap ? rowsWrap.querySelector<HTMLInputElement>('input[type="range"]') : null;
        const colsInput = colsWrap ? colsWrap.querySelector<HTMLInputElement>('input[type="range"]') : null;
        if (wrap && host && mount && rowsInput && colsInput) {
          this.register(uid, { kind, wrap, host, mount, rowsInput, colsInput, target, initialRows: rowsInput.value || 1, initialCols: colsInput.value || 1 });
          widgetRegistered = true;
          return !!this.nodes(uid).quizInput;
        }
      }
      return false;
    };
    
    // First attempt — most elements are already in the DOM
    if (tryMount()) return;
    
    // Elements not ready yet — use MutationObserver to detect when they appear
    let observer: MutationObserver | null = null;
    let fallbackTimer: number | null = null;
    
    const cleanup = () => {
      if (observer) {
        try { observer.disconnect(); } catch (e) {}
        observer = null;
      }
      if (fallbackTimer !== null) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      if (this.mountAttempts[uid] === cleanup) delete this.mountAttempts[uid];
    };
    this.mountAttempts[uid] = cleanup;
    
    if (typeof MutationObserver !== "undefined") {
      observer = new MutationObserver(() => {
        if (this.destroyed) return cleanup();
        if (tryMount()) {
          debug("mount-observer-success", uid, kind);
          cleanup();
        }
      });
      
      // Observe document.body (or documentElement) for added nodes
      const observeTarget = this.doc.body || this.doc.documentElement;
      if (observeTarget) {
        try {
          observer.observe(observeTarget, { childList: true, subtree: true });
        } catch (e) {
          observer = null;
        }
      }
    }
    
    // Final retry at the end of the bounded mount window.
    fallbackTimer = setTimeout(() => {
      if (this.destroyed) return cleanup();
      if (tryMount()) {
        debug("mount-fallback-success", uid, kind);
      } else {
        debug("mount-timeout", uid, kind, "elements not found");
      }
      cleanup();
    }, MOUNT_TIMEOUT_MS) as unknown as number;
  }

  // Public API wrappers — delegate to the unified mount.
  mountCircle(uid: string, target: string): void { this.mount(uid, "circle", target); }
  mountRect(uid: string, target: string): void { this.mount(uid, "rect", target); }

  getAllWidgets(): Record<string, FQWidgetSnapshot> {
    const out: Record<string, FQWidgetSnapshot> = Object.create(null);
    for (const uid in this.widgets) {
      const w = this.widgets[uid];
      out[uid] = {
        state: w.state.slice(),
        meta: {
          uid: w.meta.uid,
          kind: w.meta.kind,
          solved: w.meta.solved,
          revealed: w.meta.revealed,
          locked: w.meta.locked,
          ready: w.meta.ready,
        },
      };
    }
    return out;
  }

  destroy(): void {
    this.destroyed = true;
    for (const uid in this.mountAttempts) this.mountAttempts[uid]();
    if (this.domObserver) {
      try { this.domObserver.disconnect(); } catch (e) {}
      this.domObserver = null;
    }
    for (const uid in this.widgets) {
      const nodes = this.widgets[uid].nodes;
      if (nodes._quizObserver) {
        try { nodes._quizObserver.disconnect(); } catch (e) {}
        nodes._quizObserver = null;
      }
      if (nodes._quizScope && nodes._quizClickHandler) {
        try { nodes._quizScope.removeEventListener('click', nodes._quizClickHandler, true); } catch (e) {}
      }
      if (nodes.quizInput) nodes.quizInput.removeAttribute(QUIZ_NATIVE_ATTRIBUTE);
      if (nodes._quizScope) {
        nodes._quizScope.classList.remove(QUIZ_CLASS);
        nodes._quizScope.removeAttribute('data-fq-quiz');
      }
      nodes._quizBridgeInstalled = false;
    }
  }
}
