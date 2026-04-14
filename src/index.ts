// Entry point: initialises style, debug observer, and the singleton FQStore on the root window.

import { STORE_KEY, DEBUG_OBSERVER_KEY } from "./constants";
import { injectStyleOnce } from "./style";
import { FQStore, installDebugDomObserver } from "./store";

function getRootWindow(): Window & typeof globalThis {
  let w: any = window;
  try {
    while (w.parent && w.parent !== w) w = w.parent;
  } catch (e) {}
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

injectStyleOnce(getDoc());
installDebugDomObserver(ROOT, DEBUG_OBSERVER_KEY);

if (!(ROOT as any)[STORE_KEY]) {
  (ROOT as any)[STORE_KEY] = new FQStore();
}

(ROOT as any).__LIA_FRACTION_QUIZ__ = (ROOT as any)[STORE_KEY];
(window as any).__LIA_FRACTION_QUIZ__ = (ROOT as any)[STORE_KEY];
