// Pure SVG string builders for circle and rect fraction widgets.

import { SVG_SIZE, SVG_PADDING } from "./constants";

export function renderCircleSVG(arr: boolean[]): string {
  const W = SVG_SIZE;
  const H = SVG_SIZE;
  const padding = SVG_PADDING;
  const cx = W / 2;
  const cy = H / 2;
  const r = Math.min(W, H) / 2 - padding;
  const n = Math.max(1, arr.length | 0);
  const step = 360 / n;
  const startOffset = -90;

  let slices = "";
  let lines = "";

  if (n === 1) {
    slices = `<circle data-fq-part="0" class="fq-clickable" cx="${cx}" cy="${cy}" r="${r}" fill="${arr[0] ? "var(--fq-mark)" : "transparent"}"></circle>`;
  } else {
    for (let i = 0; i < n; i++) {
      const a0 = (startOffset + step * i) * Math.PI / 180;
      const a1 = (startOffset + step * (i + 1)) * Math.PI / 180;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const largeArc = step > 180 ? 1 : 0;

      slices += `<path data-fq-part="${i}" class="fq-clickable" d="M ${cx},${cy} L ${x0},${y0} A ${r},${r} 0 ${largeArc},1 ${x1},${y1} Z" fill="${arr[i] ? "var(--fq-mark)" : "transparent"}"></path>`;
      lines += `<line x1="${cx}" y1="${cy}" x2="${x0}" y2="${y0}" stroke="#000000" stroke-width="2"></line>`;
    }
  }

  return `<svg class="fq-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" aria-hidden="true"><circle cx="${cx}" cy="${cy}" r="${r}" stroke="#000000" stroke-width="2" fill="#ffffff"></circle>${slices}${lines}<circle cx="${cx}" cy="${cy}" r="${r}" stroke="#000000" stroke-width="2" fill="none"></circle></svg>`;
}

export function renderRectSVG(arr: boolean[], rows: number, cols: number): string {
  const W = SVG_SIZE;
  const H = SVG_SIZE;
  const padding = SVG_PADDING;
  const usableW = W - 2 * padding;
  const usableH = H - 2 * padding;
  const rw = usableW / cols;
  const rh = usableH / rows;

  let cells = "";
  let lines = "";

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const i = row * cols + col;
      const x = padding + col * rw;
      const y = padding + row * rh;
      cells += `<rect data-fq-part="${i}" class="fq-clickable" x="${x}" y="${y}" width="${rw}" height="${rh}" fill="${arr[i] ? "var(--fq-mark)" : "transparent"}"></rect>`;
    }
  }

  for (let row = 0; row <= rows; row++) {
    const y = padding + row * rh;
    lines += `<line x1="${padding}" y1="${y}" x2="${W - padding}" y2="${y}" stroke="#000000" stroke-width="2"></line>`;
  }
  for (let col = 0; col <= cols; col++) {
    const x = padding + col * rw;
    lines += `<line x1="${x}" y1="${padding}" x2="${x}" y2="${H - padding}" stroke="#000000" stroke-width="2"></line>`;
  }

  return `<svg class="fq-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" aria-hidden="true"><rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff" stroke="#000000" stroke-width="2"></rect>${cells}${lines}</svg>`;
}
