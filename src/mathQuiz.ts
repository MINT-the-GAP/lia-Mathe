// Bridges native LiaScript text inputs into placeholders rendered by KaTeX.

import { MathQuizPublicAPI } from './types';

const SOURCE_SELECTOR = '.lia-math-quiz-source[data-lia-math-quiz]';
const SLOT_SELECTOR = '.lia-math-quiz-slot';
const PROXY_CLASS = 'lia-math-quiz-proxy';
const NATIVE_CLASS = 'lia-math-quiz-native';
const NATIVE_ATTRIBUTE = 'data-lia-math-quiz-native';
const MOUNTED_ATTRIBUTE = 'data-lia-math-quiz-mounted';

interface SlotRef {
  formula: HTMLElement;
  slot: HTMLElement;
}

interface DesiredBinding extends SlotRef {
  uid: string;
  source: HTMLElement;
  nativeInput: HTMLInputElement;
  container: HTMLElement;
}

interface MathQuizBinding extends DesiredBinding {
  proxyInput: HTMLInputElement;
  inputObserver: MutationObserver | null;
  shadowObserver: MutationObserver | null;
  resizeObserver: ResizeObserver | null;
  sourceAriaHidden: string | null;
  sourceMounted: string | null;
  nativeAriaHidden: string | null;
  nativeTabIndex: string | null;
  nativeMarker: string | null;
  nativeHadClass: boolean;
  onProxyInput: () => void;
  onProxyChange: () => void;
  onProxyKeydown: (event: KeyboardEvent) => void;
  onNativeInput: () => void;
}

interface ContainerRef {
  count: number;
  changedPosition: boolean;
  previousPosition: string;
}

function closestElement(target: EventTarget | null, selector: string): Element | null {
  const element = target && (target as Element).closest ? target as Element : null;
  return element ? element.closest(selector) : null;
}

function copyStateClasses(source: HTMLInputElement, target: HTMLInputElement): void {
  const structural = new Set(['lia-input', 'lia-quiz__input', PROXY_CLASS, NATIVE_CLASS]);
  const classes = Array.from(source.classList).filter(name => !structural.has(name));
  target.className = ['lia-input', 'lia-quiz__input', PROXY_CLASS].concat(classes).join(' ');
}

export class MathQuizBridge implements MathQuizPublicAPI {
  private readonly doc: Document;
  private readonly win: Window;
  private readonly bindings = new Map<string, MathQuizBinding>();
  private readonly containers = new Map<HTMLElement, ContainerRef>();
  private observer: MutationObserver | null = null;
  private installed = false;
  private scanScheduled = false;
  private frameId: number | null = null;
  private timers: number[] = [];

  constructor(doc: Document) {
    this.doc = doc;
    this.win = doc.defaultView || window;
  }

  install(): void {
    if (this.installed) return;
    this.installed = true;

    const MutationObserverCtor = (this.win as any).MutationObserver as typeof MutationObserver | undefined;
    const target = this.doc.body || this.doc.documentElement;
    if (MutationObserverCtor && target) {
      this.observer = new MutationObserverCtor(() => this.scheduleScan());
      this.observer.observe(target, { childList: true, subtree: true });
    }

    this.doc.addEventListener('click', this.onDocumentClick, true);
    this.win.addEventListener('resize', this.onWindowResize);
    this.scheduleScan();
    this.scheduleFollowUp(50);
    this.scheduleFollowUp(250);

    const fonts = (this.doc as any).fonts;
    if (fonts && fonts.ready && typeof fonts.ready.then === 'function') {
      fonts.ready.then(() => {
        if (this.installed) this.layoutAll();
      });
    }
  }

  refresh(): void {
    this.scheduleScan();
  }

  private scheduleScan(): void {
    if (!this.installed || this.scanScheduled) return;
    this.scanScheduled = true;

    const run = () => {
      this.scanScheduled = false;
      this.frameId = null;
      if (!this.installed) return;
      this.scan();
    };

    if (typeof this.win.requestAnimationFrame === 'function') {
      this.frameId = this.win.requestAnimationFrame(run);
    } else {
      this.scheduleFollowUp(0, run);
    }
  }

  private scheduleFollowUp(delay: number, callback?: () => void): void {
    const id = this.win.setTimeout(() => {
      this.timers = this.timers.filter(timer => timer !== id);
      if (!this.installed) return;
      if (callback) callback();
      else {
        this.scan();
        this.layoutAll();
      }
    }, delay);
    this.timers.push(id);
  }

  private slotsOf(formula: HTMLElement): SlotRef[] {
    const root = formula.shadowRoot;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLElement>(SLOT_SELECTOR))
      .map(slot => ({ formula, slot }));
  }

  private inputAfter(
    source: HTMLElement,
    boundary: HTMLElement | null,
    inputs: HTMLInputElement[],
    usedInputs: Set<HTMLInputElement>
  ): HTMLInputElement | null {
    const following = ((this.win as any).Node && (this.win as any).Node.DOCUMENT_POSITION_FOLLOWING) || 4;
    const sourceSlide = source.closest('.lia-slide__content');
    for (const input of inputs) {
      if (usedInputs.has(input)) continue;
      if (!input.closest('.lia-quiz')) continue;
      if (sourceSlide !== input.closest('.lia-slide__content')) continue;
      if (!(source.compareDocumentPosition(input) & following)) continue;
      if (boundary && !(input.compareDocumentPosition(boundary) & following)) continue;
      return input;
    }
    return null;
  }

  private desiredBindings(): Map<string, DesiredBinding> {
    const desired = new Map<string, DesiredBinding>();
    const usedInputs = new Set<HTMLInputElement>();
    let pendingSlots: SlotRef[] = [];
    const nodes = Array.from(
      this.doc.querySelectorAll<HTMLElement>(`lia-formula, ${SOURCE_SELECTOR}`)
    ).filter(node => !node.closest('.lia-quiz'));
    const inputs = Array.from(this.doc.querySelectorAll<HTMLInputElement>(
      `input.lia-quiz__input:not(.${PROXY_CLASS})`
    ));

    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      if (node.matches('lia-formula')) {
        const slots = this.slotsOf(node);
        pendingSlots = slots;
        continue;
      }

      const uid = node.getAttribute('data-lia-math-quiz') || '';
      const nativeInput = this.inputAfter(
        node,
        nodes[index + 1] || null,
        inputs,
        usedInputs
      );
      let next: SlotRef | undefined = pendingSlots[0];
      const sourceSlide = node.closest('.lia-slide__content');
      const formulaSlide = next ? next.formula.closest('.lia-slide__content') : null;
      if (next && sourceSlide !== formulaSlide) {
        pendingSlots = [];
        next = undefined;
      } else {
        next = pendingSlots.shift();
      }
      if (!uid || !nativeInput || !next || !next.formula.parentElement) continue;
      usedInputs.add(nativeInput);

      desired.set(uid, {
        uid,
        source: node,
        nativeInput,
        formula: next.formula,
        slot: next.slot,
        container: next.formula.parentElement
      });
    }

    return desired;
  }

  private scan(): void {
    const desired = this.desiredBindings();

    for (const [uid, binding] of Array.from(this.bindings.entries())) {
      const next = desired.get(uid);
      const changed =
        !next ||
        next.source !== binding.source ||
        next.nativeInput !== binding.nativeInput ||
        next.formula !== binding.formula ||
        next.slot !== binding.slot ||
        next.container !== binding.container ||
        !binding.source.isConnected ||
        !binding.proxyInput.isConnected;

      if (changed) {
        this.disposeBinding(binding);
        this.bindings.delete(uid);
      }
    }

    for (const [uid, next] of Array.from(desired.entries())) {
      const current = this.bindings.get(uid);
      if (current) {
        this.syncBinding(current);
        continue;
      }
      this.createBinding(next);
    }

    this.layoutAll();
  }

  private retainContainer(container: HTMLElement): void {
    const current = this.containers.get(container);
    if (current) {
      current.count++;
      return;
    }

    let computedPosition = '';
    try {
      computedPosition = this.win.getComputedStyle(container).position;
    } catch (error) {}

    const changedPosition = !computedPosition || computedPosition === 'static';
    const previousPosition = container.style.position;
    if (changedPosition) container.style.position = 'relative';

    this.containers.set(container, {
      count: 1,
      changedPosition,
      previousPosition
    });
  }

  private releaseContainer(container: HTMLElement): void {
    const current = this.containers.get(container);
    if (!current) return;
    current.count--;
    if (current.count > 0) return;

    if (current.changedPosition && container.style.position === 'relative') {
      container.style.position = current.previousPosition;
    }
    this.containers.delete(container);
  }

  private createBinding(next: DesiredBinding): void {
    const proxyInput = this.doc.createElement('input');
    proxyInput.type = 'text';
    proxyInput.placeholder = next.nativeInput.placeholder || '?';
    proxyInput.autocomplete = 'off';
    proxyInput.spellcheck = false;
    proxyInput.style.visibility = 'hidden';
    proxyInput.setAttribute('data-lia-math-quiz-proxy', next.uid);
    proxyInput.setAttribute(
      'aria-label',
      next.nativeInput.getAttribute('aria-label') || 'quiz answer'
    );
    copyStateClasses(next.nativeInput, proxyInput);

    const binding: MathQuizBinding = {
      ...next,
      proxyInput,
      inputObserver: null,
      shadowObserver: null,
      resizeObserver: null,
      sourceAriaHidden: next.source.getAttribute('aria-hidden'),
      sourceMounted: next.source.getAttribute(MOUNTED_ATTRIBUTE),
      nativeAriaHidden: next.nativeInput.getAttribute('aria-hidden'),
      nativeTabIndex: next.nativeInput.getAttribute('tabindex'),
      nativeMarker: next.nativeInput.getAttribute(NATIVE_ATTRIBUTE),
      nativeHadClass: next.nativeInput.classList.contains(NATIVE_CLASS),
      onProxyInput: () => {},
      onProxyChange: () => {},
      onProxyKeydown: () => {},
      onNativeInput: () => {}
    };

    binding.onProxyInput = () => this.forwardProxyValue(binding, 'input');
    binding.onProxyChange = () => this.forwardProxyValue(binding, 'change');
    binding.onProxyKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' || binding.proxyInput.disabled) return;
      const quiz = binding.nativeInput.closest('.lia-quiz');
      const button = quiz
        ? quiz.querySelector<HTMLElement>('.lia-quiz__check:not([disabled])')
        : null;
      if (button && typeof (button as any).click === 'function') {
        event.preventDefault();
        (button as any).click();
      }
    };
    binding.onNativeInput = () => this.syncBinding(binding);

    this.bindings.set(next.uid, binding);
    this.retainContainer(next.container);
    next.container.appendChild(proxyInput);
    next.source.setAttribute(MOUNTED_ATTRIBUTE, 'true');
    next.source.setAttribute('aria-hidden', 'true');
    next.nativeInput.classList.add(NATIVE_CLASS);
    next.nativeInput.setAttribute(NATIVE_ATTRIBUTE, next.uid);
    next.nativeInput.setAttribute('aria-hidden', 'true');
    next.nativeInput.setAttribute('tabindex', '-1');

    proxyInput.addEventListener('input', binding.onProxyInput);
    proxyInput.addEventListener('change', binding.onProxyChange);
    proxyInput.addEventListener('keydown', binding.onProxyKeydown);
    next.nativeInput.addEventListener('input', binding.onNativeInput);
    next.nativeInput.addEventListener('change', binding.onNativeInput);

    const MutationObserverCtor = (this.win as any).MutationObserver as typeof MutationObserver | undefined;
    if (MutationObserverCtor) {
      binding.inputObserver = new MutationObserverCtor(() => this.syncBinding(binding));
      binding.inputObserver.observe(next.nativeInput, {
        attributes: true,
        attributeFilter: ['class', 'disabled', 'value', 'aria-invalid']
      });

      if (next.formula.shadowRoot) {
        binding.shadowObserver = new MutationObserverCtor(() => this.scheduleScan());
        binding.shadowObserver.observe(next.formula.shadowRoot, {
          childList: true,
          subtree: true
        });
      }
    }

    const ResizeObserverCtor = (this.win as any).ResizeObserver as typeof ResizeObserver | undefined;
    if (ResizeObserverCtor) {
      binding.resizeObserver = new ResizeObserverCtor(() => this.layoutBinding(binding));
      try {
        binding.resizeObserver.observe(next.formula);
        binding.resizeObserver.observe(next.slot);
        binding.resizeObserver.observe(next.container);
      } catch (error) {}
    }

    this.syncBinding(binding);
    this.layoutBinding(binding);
    this.scheduleFollowUp(40, () => this.layoutBinding(binding));
    this.scheduleFollowUp(160, () => this.layoutBinding(binding));
  }

  private forwardProxyValue(binding: MathQuizBinding, type: 'input' | 'change'): void {
    if (!binding.nativeInput.isConnected || binding.nativeInput.disabled) {
      this.syncBinding(binding);
      return;
    }

    binding.nativeInput.value = binding.proxyInput.value;
    const EventCtor = (this.win as any).Event as typeof Event;
    binding.nativeInput.dispatchEvent(new EventCtor(type, {
      bubbles: true,
      cancelable: false
    }));
    this.scheduleFollowUp(0, () => this.syncBinding(binding));
  }

  private syncBinding(binding: MathQuizBinding): void {
    if (!binding.nativeInput.isConnected || !binding.proxyInput.isConnected) {
      this.scheduleScan();
      return;
    }

    if (binding.proxyInput.value !== binding.nativeInput.value) {
      binding.proxyInput.value = binding.nativeInput.value;
    }
    binding.proxyInput.disabled = binding.nativeInput.disabled;
    copyStateClasses(binding.nativeInput, binding.proxyInput);
    if (!binding.nativeInput.classList.contains(NATIVE_CLASS)) {
      binding.nativeInput.classList.add(NATIVE_CLASS);
    }
    if (binding.nativeInput.getAttribute(NATIVE_ATTRIBUTE) !== binding.uid) {
      binding.nativeInput.setAttribute(NATIVE_ATTRIBUTE, binding.uid);
    }

    const invalid = binding.nativeInput.getAttribute('aria-invalid');
    if (invalid === null) binding.proxyInput.removeAttribute('aria-invalid');
    else binding.proxyInput.setAttribute('aria-invalid', invalid);
  }

  private layoutBinding(binding: MathQuizBinding): void {
    if (
      !binding.slot.isConnected ||
      !binding.container.isConnected ||
      !binding.proxyInput.isConnected
    ) {
      this.scheduleScan();
      return;
    }

    const slotRect = binding.slot.getBoundingClientRect();
    const containerRect = binding.container.getBoundingClientRect();
    if (slotRect.width <= 0 || slotRect.height <= 0 || containerRect.width <= 0) {
      binding.proxyInput.style.visibility = 'hidden';
      return;
    }

    let fontSize = 16;
    try {
      const parsed = parseFloat(this.win.getComputedStyle(binding.slot).fontSize);
      if (Number.isFinite(parsed) && parsed > 0) fontSize = parsed;
    } catch (error) {}

    const width = Math.max(slotRect.width, fontSize * 1.8);
    binding.proxyInput.style.width = `${width}px`;
    binding.proxyInput.style.removeProperty('height');
    binding.proxyInput.style.removeProperty('font-size');

    const naturalHeight = binding.proxyInput.getBoundingClientRect().height;
    const height = naturalHeight > 0 ? naturalHeight : Math.max(32, fontSize * 1.8);
    const left =
      slotRect.left -
      containerRect.left -
      binding.container.clientLeft +
      binding.container.scrollLeft;
    const top =
      slotRect.top -
      containerRect.top -
      binding.container.clientTop +
      binding.container.scrollTop +
      (slotRect.height - height) / 2;

    binding.proxyInput.style.left = `${left}px`;
    binding.proxyInput.style.top = `${top}px`;
    binding.proxyInput.style.visibility = 'visible';
  }

  private layoutAll(): void {
    for (const binding of Array.from(this.bindings.values())) {
      this.layoutBinding(binding);
    }
  }

  private syncAll(): void {
    for (const binding of Array.from(this.bindings.values())) {
      this.syncBinding(binding);
    }
  }

  private onDocumentClick = (event: Event): void => {
    if (!closestElement(event.target, '.lia-quiz__check, .lia-quiz__resolve')) return;
    this.scheduleFollowUp(0, () => {
      this.scheduleScan();
      this.syncAll();
    });
    this.scheduleFollowUp(80, () => {
      this.scheduleScan();
      this.syncAll();
    });
  };

  private onWindowResize = (): void => {
    this.layoutAll();
  };

  private disposeBinding(binding: MathQuizBinding): void {
    binding.proxyInput.removeEventListener('input', binding.onProxyInput);
    binding.proxyInput.removeEventListener('change', binding.onProxyChange);
    binding.proxyInput.removeEventListener('keydown', binding.onProxyKeydown);
    binding.nativeInput.removeEventListener('input', binding.onNativeInput);
    binding.nativeInput.removeEventListener('change', binding.onNativeInput);
    if (binding.inputObserver) binding.inputObserver.disconnect();
    if (binding.shadowObserver) binding.shadowObserver.disconnect();
    if (binding.resizeObserver) binding.resizeObserver.disconnect();
    if (binding.proxyInput.parentNode) binding.proxyInput.parentNode.removeChild(binding.proxyInput);

    if (binding.source.isConnected) {
      if (binding.sourceMounted === null) binding.source.removeAttribute(MOUNTED_ATTRIBUTE);
      else binding.source.setAttribute(MOUNTED_ATTRIBUTE, binding.sourceMounted);

      if (binding.sourceAriaHidden === null) binding.source.removeAttribute('aria-hidden');
      else binding.source.setAttribute('aria-hidden', binding.sourceAriaHidden);
    }
    if (binding.nativeInput.isConnected) {
      if (!binding.nativeHadClass) binding.nativeInput.classList.remove(NATIVE_CLASS);
      if (binding.nativeMarker === null) binding.nativeInput.removeAttribute(NATIVE_ATTRIBUTE);
      else binding.nativeInput.setAttribute(NATIVE_ATTRIBUTE, binding.nativeMarker);
      if (binding.nativeAriaHidden === null) binding.nativeInput.removeAttribute('aria-hidden');
      else binding.nativeInput.setAttribute('aria-hidden', binding.nativeAriaHidden);
      if (binding.nativeTabIndex === null) binding.nativeInput.removeAttribute('tabindex');
      else binding.nativeInput.setAttribute('tabindex', binding.nativeTabIndex);
    }
    this.releaseContainer(binding.container);
  }

  destroy(): void {
    if (!this.installed) return;
    this.installed = false;
    if (this.observer) this.observer.disconnect();
    this.observer = null;
    this.doc.removeEventListener('click', this.onDocumentClick, true);
    this.win.removeEventListener('resize', this.onWindowResize);

    if (this.frameId !== null && typeof this.win.cancelAnimationFrame === 'function') {
      this.win.cancelAnimationFrame(this.frameId);
    }
    this.frameId = null;
    this.scanScheduled = false;

    for (const timer of this.timers) this.win.clearTimeout(timer);
    this.timers = [];

    for (const binding of Array.from(this.bindings.values())) {
      this.disposeBinding(binding);
    }
    this.bindings.clear();
  }
}
