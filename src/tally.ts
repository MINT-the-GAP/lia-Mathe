const TALLY_SELECTOR = '.lia-tally[data-lia-tally-count]';
const RENDERED_ATTRIBUTE = 'data-lia-tally-rendered';
const SVG_NS = 'http://www.w3.org/2000/svg';
const GROUP_STEP = 25;
const MARK_STEP = 5;
const MARK_HEIGHT = 20;

function svgElement<T extends SVGElement>(doc: Document, tag: string): T {
  return doc.createElementNS(SVG_NS, tag) as T;
}

function parseCount(raw: string | null): number | null {
  if (raw == null || !/^\d+$/.test(raw.trim())) return null;
  const count = Number(raw);
  return Number.isSafeInteger(count) ? count : null;
}

function tallyWidth(count: number): number {
  if (count === 0) return 1;
  const fullGroups = Math.floor(count / 5);
  const remainder = count % 5;
  const lastGroupWidth = remainder === 0 ? 20 : (remainder - 1) * MARK_STEP + 4;
  return (fullGroups - (remainder === 0 ? 1 : 0)) * GROUP_STEP + lastGroupWidth;
}

export function renderTally(host: HTMLElement): boolean {
  const raw = host.getAttribute('data-lia-tally-count');
  const count = parseCount(raw);
  host.textContent = '';

  if (count == null) {
    host.setAttribute(RENDERED_ATTRIBUTE, `invalid:${raw == null ? '' : raw}`);
    host.setAttribute('role', 'img');
    host.setAttribute('aria-label', 'Ungültige Strichliste');
    return false;
  }

  const width = tallyWidth(count);
  const svg = svgElement<SVGSVGElement>(host.ownerDocument, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${MARK_HEIGHT}`);
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(MARK_HEIGHT));
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('data-lia-tally-marks', String(count));

  const fullGroups = Math.floor(count / 5);
  const remainder = count % 5;
  for (let group = 0; group < fullGroups; group++) {
    const offset = group * GROUP_STEP;
    for (let mark = 0; mark < 4; mark++) {
      const x = offset + 2 + mark * MARK_STEP;
      const line = svgElement<SVGLineElement>(host.ownerDocument, 'line');
      line.setAttribute('x1', String(x));
      line.setAttribute('y1', '2');
      line.setAttribute('x2', String(x));
      line.setAttribute('y2', '18');
      line.setAttribute('data-lia-tally-mark', '1');
      svg.appendChild(line);
    }
    const slash = svgElement<SVGLineElement>(host.ownerDocument, 'line');
    slash.setAttribute('x1', String(offset));
    slash.setAttribute('y1', '16');
    slash.setAttribute('x2', String(offset + 19));
    slash.setAttribute('y2', '4');
    slash.setAttribute('data-lia-tally-mark', '1');
    svg.appendChild(slash);
  }

  const remainderOffset = fullGroups * GROUP_STEP;
  for (let mark = 0; mark < remainder; mark++) {
    const x = remainderOffset + 2 + mark * MARK_STEP;
    const line = svgElement<SVGLineElement>(host.ownerDocument, 'line');
    line.setAttribute('x1', String(x));
    line.setAttribute('y1', '2');
    line.setAttribute('x2', String(x));
    line.setAttribute('y2', '18');
    line.setAttribute('data-lia-tally-mark', '1');
    svg.appendChild(line);
  }

  host.setAttribute('role', 'img');
  host.setAttribute('aria-label', `Strichliste: ${count}`);
  host.setAttribute(RENDERED_ATTRIBUTE, String(count));
  host.appendChild(svg);
  return true;
}

export class TallyRenderer {
  private observer: MutationObserver | null = null;
  private scheduled = false;

  constructor(private readonly doc: Document) {}

  install(): void {
    if (this.observer) return;
    const view = this.doc.defaultView;
    const target = this.doc.body || this.doc.documentElement;
    const MutationObserverCtor = view && view.MutationObserver;
    if (MutationObserverCtor && target) {
      this.observer = new MutationObserverCtor(() => this.scheduleScan());
      this.observer.observe(target, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-lia-tally-count'],
      });
    }
    this.scan();
  }

  refresh(): void {
    this.scan();
  }

  destroy(): void {
    if (this.observer) this.observer.disconnect();
    this.observer = null;
    this.scheduled = false;
  }

  private scheduleScan(): void {
    if (this.scheduled) return;
    this.scheduled = true;
    const view = this.doc.defaultView;
    const run = () => {
      this.scheduled = false;
      this.scan();
    };
    if (view && typeof view.requestAnimationFrame === 'function') view.requestAnimationFrame(run);
    else Promise.resolve().then(run);
  }

  private scan(): void {
    const hosts = Array.from(this.doc.querySelectorAll<HTMLElement>(TALLY_SELECTOR));
    for (const host of hosts) {
      const raw = host.getAttribute('data-lia-tally-count');
      const count = parseCount(raw);
      const renderKey = count == null ? `invalid:${raw == null ? '' : raw}` : String(count);
      const svg = host.querySelector(':scope > svg[data-lia-tally-marks]');
      const healthy = count == null
        ? !svg
        : svg && svg.getAttribute('data-lia-tally-marks') === String(count);
      if (host.getAttribute(RENDERED_ATTRIBUTE) !== renderKey || !healthy) renderTally(host);
    }
  }
}