// Entry point: initialises style, debug observer, and the singleton FQStore on the root window.

import { STORE_KEY, DEBUG_OBSERVER_KEY } from "./constants";
import { injectStyleOnce } from "./style";
import { FQStore, installDebugDomObserver } from "./store";
import { FQPublicAPI } from "./types";

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

// Create the singleton store if it doesn't exist
if (!(ROOT as any)[STORE_KEY]) {
  (ROOT as any)[STORE_KEY] = new FQStore();
}

// Get the internal store instance
const store: FQStore = (ROOT as any)[STORE_KEY];

// Expose only the public API (FQPublicAPI) on the root window
const publicAPI: FQPublicAPI = {
  mountCircle: (uid: string, target: string) => store.mountCircle(uid, target),
  mountRect: (uid: string, target: string) => store.mountRect(uid, target),
  check: (uid: string) => store.check(uid),
  onReveal: (uid: string) => store.onReveal(uid),
  getAllWidgets: () => store.getAllWidgets(),
  destroy: () => {
    store.destroy();
    const debugObs = (ROOT as any)[DEBUG_OBSERVER_KEY];
    if (debugObs && typeof debugObs.disconnect === 'function') {
      try { debugObs.disconnect(); } catch (e) {}
      (ROOT as any)[DEBUG_OBSERVER_KEY] = null;
    }
  }
};

(ROOT as any).__LIA_FRACTION_QUIZ__ = publicAPI;
