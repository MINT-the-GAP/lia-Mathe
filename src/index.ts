// Entry point: initialises styles and the fraction/math quiz bridges.

import { MATH_QUIZ_KEY } from './constants';
import { MathQuizBridge } from './mathQuiz';
import { MathQuizPublicAPI } from './types';

import { STORE_KEY, DEBUG_OBSERVER_KEY } from "./constants";
import { injectStyleOnce } from "./style";
import { FQStore, installDebugDomObserver } from "./store";
import { FQPublicAPI } from "./types";

function getRootWindow(): Window & typeof globalThis {
  let w: any = window;
  while (true) {
    try {
      const parent = w.parent;
      if (!parent || parent === w) break;
      void parent.document;
      w = parent;
    } catch (e) {
      break;
    }
  }
  return w;
}

function getDoc(): Document {
  const ROOT = getRootWindow();
  try {
    if (ROOT && ROOT.document) return ROOT.document;
  } catch (e) {}
  return document;
}

const ROOT = getRootWindow();
const CONTENT_WINDOW = window;
const ROOT_DOCUMENT = getDoc();
const CONTENT_DOCUMENT = document;

let mathQuizBridge: MathQuizBridge = (ROOT as any)[MATH_QUIZ_KEY];
if (!mathQuizBridge) {
  mathQuizBridge = new MathQuizBridge(getDoc());
  (ROOT as any)[MATH_QUIZ_KEY] = mathQuizBridge;
}
mathQuizBridge.install();

injectStyleOnce(ROOT_DOCUMENT);
if (CONTENT_DOCUMENT !== ROOT_DOCUMENT) injectStyleOnce(CONTENT_DOCUMENT);
installDebugDomObserver(ROOT, DEBUG_OBSERVER_KEY);

interface FQStoreRegistry {
  byDocument: WeakMap<Document, FQStore>;
  all: Set<FQStore>;
}
let registry: FQStoreRegistry = (ROOT as any)[STORE_KEY];
if (
  !registry ||
  !registry.byDocument ||
  typeof registry.byDocument.get !== 'function' ||
  !registry.all ||
  typeof registry.all.add !== 'function'
) {
  registry = {
    byDocument: new WeakMap<Document, FQStore>(),
    all: new Set<FQStore>(),
  };
  (ROOT as any)[STORE_KEY] = registry;
}

function getStore(doc: Document = CONTENT_DOCUMENT): FQStore {
  let store = registry.byDocument.get(doc);
  if (!store) {
    store = new FQStore(doc);
    registry.byDocument.set(doc, store);
    registry.all.add(store);
  }
  injectStyleOnce(doc);
  return store;
}

getStore();

// Expose only the public API (FQPublicAPI) on the root window
const publicAPI: FQPublicAPI = {
  mountCircle: (uid: string, target: string, host?: Element) =>
    getStore(host?.ownerDocument || CONTENT_DOCUMENT).mountCircle(uid, target),
  mountRect: (uid: string, target: string, host?: Element) =>
    getStore(host?.ownerDocument || CONTENT_DOCUMENT).mountRect(uid, target),
  check: (uid: string, host?: Element) =>
    getStore(host?.ownerDocument || CONTENT_DOCUMENT).check(uid),
  onReveal: (uid: string, host?: Element) =>
    getStore(host?.ownerDocument || CONTENT_DOCUMENT).onReveal(uid),
  getAllWidgets: (host?: Element) =>
    getStore(host?.ownerDocument || CONTENT_DOCUMENT).getAllWidgets(),
  destroy: () => {
    registry.all.forEach(entry => entry.destroy());
    const debugObs = (ROOT as any)[DEBUG_OBSERVER_KEY];
    if (debugObs && typeof debugObs.disconnect === 'function') {
      try { debugObs.disconnect(); } catch (e) {}
      (ROOT as any)[DEBUG_OBSERVER_KEY] = null;
    }
  }
};

(ROOT as any).__LIA_FRACTION_QUIZ__ = publicAPI;
(CONTENT_WINDOW as any).__LIA_FRACTION_QUIZ__ = publicAPI;

const mathQuizAPI: MathQuizPublicAPI = {
  refresh: () => mathQuizBridge.refresh(),
  destroy: () => mathQuizBridge.destroy()
};

(ROOT as any).__LIA_MATH_QUIZ__ = mathQuizAPI;
(CONTENT_WINDOW as any).__LIA_MATH_QUIZ__ = mathQuizAPI;
