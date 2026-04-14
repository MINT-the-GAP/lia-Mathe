// Pure SVG builders for circle and rect fraction widgets.

import { SVG_SIZE, SVG_PADDING } from "./constants";

const SVG_NS = "http://www.w3.org/2000/svg";

function svgEl<T extends SVGElement>(tag: string): T {
  return document.createElementNS(SVG_NS, tag) as T;
}

function attrs(el: SVGElement, map: Record<string, string>): void {
  for (const k in map) el.setAttribute(k, map[k]);
}

export function renderCircleSVG(mount: Element, arr: boolean[]): void {
  const W = SVG_SIZE;
  const H = SVG_SIZE;
  const padding = SVG_PADDING;
  const cx = W / 2;
  const cy = H / 2;
  const r = Math.min(W, H) / 2 - padding;
  const n = Math.max(1, arr.length | 0);
  const step = 360 / n;
  const startOffset = -90;

  const svg = svgEl<SVGSVGElement>("svg");
  attrs(svg, { class: "fq-svg", viewBox: `0 0 ${W} ${H}`, xmlns: SVG_NS, width: String(W), height: String(H), "aria-hidden": "true" });

  // Background circle
  const bg = svgEl<SVGCircleElement>("circle");
  attrs(bg, { cx: String(cx), cy: String(cy), r: String(r), stroke: "#000000", "stroke-width": "2", fill: "#ffffff" });
  svg.appendChild(bg);

  if (n === 1) {
    const c = svgEl<SVGCircleElement>("circle");
    attrs(c, { "data-fq-part": "0", class: "fq-clickable", cx: String(cx), cy: String(cy), r: String(r), fill: arr[0] ? "var(--fq-mark)" : "transparent" });
    svg.appendChild(c);
  } else {
    for (let i = 0; i < n; i++) {
      const a0 = (startOffset + step * i) * Math.PI / 180;
      const a1 = (startOffset + step * (i + 1)) * Math.PI / 180;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const largeArc = step > 180 ? 1 : 0;

      const path = svgEl<SVGPathElement>("path");
      attrs(path, {
        "data-fq-part": String(i),
        class: "fq-clickable",
        d: `M ${cx},${cy} L ${x0},${y0} A ${r},${r} 0 ${largeArc},1 ${x1},${y1} Z`,
        fill: arr[i] ? "var(--fq-mark)" : "transparent"
      });
      svg.appendChild(path);

      const line = svgEl<SVGLineElement>("line");
      attrs(line, { x1: String(cx), y1: String(cy), x2: String(x0), y2: String(y0), stroke: "#000000", "stroke-width": "2" });
      svg.appendChild(line);
    }
  }

  // Outline circle
  const outline = svgEl<SVGCircleElement>("circle");
  attrs(outline, { cx: String(cx), cy: String(cy), r: String(r), stroke: "#000000", "stroke-width": "2", fill: "none" });
  svg.appendChild(outline);

  mount.textContent = "";
  mount.appendChild(svg);
}

export function renderRectSVG(mount: Element, arr: boolean[], rows: number, cols: number): void {
  const W = SVG_SIZE;
  const H = SVG_SIZE;
  const padding = SVG_PADDING;
  const usableW = W - 2 * padding;
  const usableH = H - 2 * padding;
  const rw = usableW / cols;
  const rh = usableH / rows;

  const svg = svgEl<SVGSVGElement>("svg");
  attrs(svg, { class: "fq-svg", viewBox: `0 0 ${W} ${H}`, xmlns: SVG_NS, width: String(W), height: String(H), "aria-hidden": "true" });

  // Background rect
  const bg = svgEl<SVGRectElement>("rect");
  attrs(bg, { x: "0", y: "0", width: String(W), height: String(H), fill: "#ffffff", stroke: "#000000", "stroke-width": "2" });
  svg.appendChild(bg);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const i = row * cols + col;
      const cell = svgEl<SVGRectElement>("rect");
      attrs(cell, {
        "data-fq-part": String(i),
        class: "fq-clickable",
        x: String(padding + col * rw),
        y: String(padding + row * rh),
        width: String(rw),
        height: String(rh),
        fill: arr[i] ? "var(--fq-mark)" : "transparent"
      });
      svg.appendChild(cell);
    }
  }

  for (let row = 0; row <= rows; row++) {
    const y = padding + row * rh;
    const line = svgEl<SVGLineElement>("line");
    attrs(line, { x1: String(padding), y1: String(y), x2: String(W - padding), y2: String(y), stroke: "#000000", "stroke-width": "2" });
    svg.appendChild(line);
  }
  for (let col = 0; col <= cols; col++) {
    const x = padding + col * rw;
    const line = svgEl<SVGLineElement>("line");
    attrs(line, { x1: String(x), y1: String(padding), x2: String(x), y2: String(H - padding), stroke: "#000000", "stroke-width": "2" });
    svg.appendChild(line);
  }

  mount.textContent = "";
  mount.appendChild(svg);
}
