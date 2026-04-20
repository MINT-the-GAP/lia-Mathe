import { STYLE_ID } from "./constants";

export function injectStyleOnce(doc: Document): void {
  if (!doc || !doc.head) return;
  if (doc.getElementById(STYLE_ID)) return;

  const css = `
:root {
  --fq-track: rgba(0,0,0,.28);
  --fq-thumb: #1a1a1a;
  --fq-thumb-hover: #000;
  --fq-ring: rgba(255,255,255,.95);
  --fq-mark: orange;
  --fq-stroke: #1a1a1a;
  --fq-fill: #999;
  --fq-disabled: .45;
  --fq-accent: #6366f1;

  --fq-w: 220px;
  --fq-h: 36px;
  --fq-track-h: 3px;
  --fq-thumb-sz: 14px;
  --fq-label-size: 18px;
  --fq-label-top: -7px;
  --fq-transition: 160ms cubic-bezier(.4,0,.2,1);
}
@media (prefers-color-scheme: dark) {
  :root {
    --fq-track: rgba(255,255,255,.30);
    --fq-thumb: rgba(255,255,255,.9);
    --fq-thumb-hover: #fff;
    --fq-ring: rgba(20,20,20,.8);
    --fq-stroke: #e5e5e5;
    --fq-fill: #999;
  }
}

.fq-widget { display: inline-block; }

.fq-mount {
  display: flex;
  justify-content: center;
}

.fq-mount svg { display: block; }

.fq-clickable {
  cursor: pointer;
  transition: opacity var(--fq-transition);
}
.fq-clickable:hover { opacity: .75; }
.fq-clickable:active { opacity: .55; transform: scale(.97); }

.fq-widget[data-fq-locked="1"] .fq-clickable,
.fq-widget[data-fq-locked="1"] [data-fq-part] {
  cursor: default !important;
  pointer-events: none;
}

.fq-widget[data-fq-locked="1"] .fq-range,
.fq-widget[data-fq-locked="1"] .fq-range input[type="range"] {
  pointer-events: none !important;
}

.fq-widget[data-fq-locked="1"] .fq-range {
  opacity: var(--fq-disabled);
  filter: grayscale(.4);
  transition: opacity var(--fq-transition), filter var(--fq-transition);
}

.fq-range {
  width: var(--fq-w);
  max-width: var(--fq-w);
  height: var(--fq-h);
  position: relative;
  margin: 20px 0 14px 0;   
  overflow: visible;       
  user-select: none;
}

.fq-range::before {
  content: attr(data-label);
  position: absolute;
  left: 0; right: 0;
  top: var(--fq-label-top);
  text-align: center;
  font-size: var(--fq-label-size);
  font-weight: 700;
  letter-spacing: .02em;
  line-height: 1;
  opacity: 1;
  pointer-events: none;
  z-index: 2;
  color:  #999;
  text-transform: capitalize;
}

.fq-range .lia-input {
  width: var(--fq-w) !important;
  max-width: var(--fq-w) !important;
  height: var(--fq-h) !important;
  margin: 0 !important; padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  font-size: 0 !important;
  line-height: 0 !important;
  min-height: 0 !important;
}

.fq-range button,
.fq-range output,
.fq-range input[type="number"],
.fq-range .lia-input-value,
.fq-range .lia-value,
.fq-range .lia-input-output,
.fq-range .lia-input-label,
.fq-range .lia-input-reset,
.fq-range .lia-input-prefix,
.fq-range .lia-input-suffix { display: none !important; }

.fq-range input[type="range"] {
  width: var(--fq-w) !important;
  max-width: var(--fq-w) !important;
  height: var(--fq-h) !important;
  margin: 0 !important; padding: 0 !important;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  position: relative;
  z-index: 1;
  cursor: pointer;
}

.fq-range input[type="range"]:focus { outline: none; }

.fq-range input[type="range"]:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px var(--fq-accent);
}

.fq-range input[type="range"]::-webkit-slider-runnable-track {
  height: var(--fq-track-h);
  border-radius: 999px;
  background: rgba(0,0,0,.1);
  transition: background var(--fq-transition);
}

.fq-range input[type="range"]:hover::-webkit-slider-runnable-track {
  background: rgba(0,0,0,.2);
}

.fq-range input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--fq-thumb-sz);
  height: var(--fq-thumb-sz);
  border-radius: 50%;
  background: var(--fq-thumb);
  border: 2.5px solid var(--fq-ring);
  margin-top: calc((var(--fq-track-h) - var(--fq-thumb-sz)) / 2);
  transition: transform var(--fq-transition), background var(--fq-transition), box-shadow var(--fq-transition);
  box-shadow: 0 1px 3px rgba(0,0,0,.18);
}

.fq-range input[type="range"]:hover::-webkit-slider-thumb {
  transform: scale(1.18);
  background: var(--fq-thumb-hover);
  box-shadow: 0 2px 6px rgba(0,0,0,.22);
}

.fq-range input[type="range"]:active::-webkit-slider-thumb {
  transform: scale(1.08);
  box-shadow: 0 0 0 4px rgba(99,102,241,.2);
}

.fq-range input[type="range"]::-moz-range-track {
  height: var(--fq-track-h);
  border-radius: 999px;
  background: var(--fq-track);  
  border: 1.5px solid #aaa;
}

.fq-range input[type="range"]::-moz-range-thumb {
  width: var(--fq-thumb-sz);
  height: var(--fq-thumb-sz);
  border-radius: 50%;
  background: var(--fq-thumb);
  border: 2.5px solid var(--fq-ring);
  box-shadow: 0 1px 3px rgba(0,0,0,.18);
  transition: transform var(--fq-transition);
}

.fq-range input[type="range"]:hover::-moz-range-thumb { transform: scale(1.18); }
.fq-range input[type="range"]:active::-moz-range-thumb { transform: scale(1.08); }
  `.trim();

  const style = doc.createElement("style");
  style.id = STYLE_ID;
  style.textContent = css;
  doc.head.appendChild(style);
}