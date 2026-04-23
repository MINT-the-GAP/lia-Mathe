!function(e,t,r,n,i){var a="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},s="function"==typeof a[n]&&a[n],l=s.i||{},o=s.cache||{},u="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(t,r){if(!o[t]){if(!e[t]){if(i[t])return i[t];var l="function"==typeof a[n]&&a[n];if(!r&&l)return l(t,!0);if(s)return s(t,!0);if(u&&"string"==typeof t)return u(t);var d=Error("Cannot find module '"+t+"'");throw d.code="MODULE_NOT_FOUND",d}f.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},f.cache={};var p=o[t]=new c.Module(t);e[t][0].call(p.exports,f,p,p.exports,a)}return o[t].exports;function f(e){var t=f.resolve(e);if(!1===t)return{};if(Array.isArray(t)){var r={__esModule:!0};return t.forEach(function(e){var t=e[0],n=e[1],i=e[2]||e[0],a=c(n);"*"===t?Object.keys(a).forEach(function(e){"default"===e||"__esModule"===e||Object.prototype.hasOwnProperty.call(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:function(){return a[e]}})}):"*"===i?Object.defineProperty(r,t,{enumerable:!0,value:a}):Object.defineProperty(r,t,{enumerable:!0,get:function(){return"default"===i?a.__esModule?a.default:a:a[i]}})}),r}return c(t)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.require=u,this.exports={}},c.modules=e,c.cache=o,c.parent=s,c.distDir=void 0,c.publicUrl=void 0,c.devServer=void 0,c.i=l,c.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(c,"root",{get:function(){return a[n]}}),a[n]=c;for(var d=0;d<t.length;d++)c(t[d]);if(r){var p=c(r);"object"==typeof exports&&"u">typeof module?module.exports=p:"function"==typeof define&&define.amd&&define(function(){return p})}}({"8RSWf":[function(e,t,r,n){var i=e("./constants"),a=e("./style"),s=e("./store");function l(){let e=window;try{for(;e.parent&&e.parent!==e;)e=e.parent}catch(e){}return e}let o=l();(0,a.injectStyleOnce)(function(){let e=l();try{if(e&&e.document)return e.document}catch(e){}return document}()),(0,s.installDebugDomObserver)(o,i.DEBUG_OBSERVER_KEY),o[i.STORE_KEY]||(o[i.STORE_KEY]=new(0,s.FQStore));let u=o[i.STORE_KEY];o.__LIA_FRACTION_QUIZ__={mountCircle:(e,t)=>u.mountCircle(e,t),mountRect:(e,t)=>u.mountRect(e,t),check:e=>u.check(e),onReveal:e=>u.onReveal(e),getAllWidgets:()=>u.getAllWidgets(),destroy:()=>{u.destroy();let e=o[i.DEBUG_OBSERVER_KEY];if(e&&"function"==typeof e.disconnect){try{e.disconnect()}catch(e){}o[i.DEBUG_OBSERVER_KEY]=null}}}},{"./constants":"7NbOs","./style":"dmo3N","./store":"cswaT"}],"7NbOs":[function(e,t,r,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(r),i.export(r,"STORE_KEY",()=>a),i.export(r,"STYLE_ID",()=>s),i.export(r,"DEBUG_OBSERVER_KEY",()=>l),i.export(r,"SVG_SIZE",()=>o),i.export(r,"SVG_PADDING",()=>u),i.export(r,"MAX_CIRCLE_PARTS",()=>c),i.export(r,"MAX_RECT_DIM",()=>d),i.export(r,"DEBUG_FQ",()=>p);let a="__LIA_FRACTION_QUIZ_V3__",s="__LIA_FRACTION_QUIZ_STYLE_V3__",l="__LIA_FQ_DEBUG_DOM_OBSERVER_V1__",o=200,u=6,c=32,d=20,p=!1},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],k3151:[function(e,t,r,n){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}],dmo3N:[function(e,t,r,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(r),i.export(r,"injectStyleOnce",()=>s);var a=e("./constants");function s(e){if(!e||!e.head||e.getElementById(a.STYLE_ID))return;let t=e.createElement("style");t.id=a.STYLE_ID,t.textContent=`
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
  `.trim(),e.head.appendChild(t)}},{"./constants":"7NbOs","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],cswaT:[function(e,t,r,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(r),i.export(r,"installDebugDomObserver",()=>f),i.export(r,"FQStore",()=>g);var a=e("./constants"),s=e("./fraction"),l=e("./renderer");let o="__fqClickInstalled";function u(e,...t){if(a.DEBUG_FQ)try{console.log("[FQDBG]",e,...t)}catch(e){}}function c(e,t){let r="de"===function(){let e=[];try{let t=window,r=t.LIA||t.lia;r&&("string"==typeof r.language&&e.push(r.language),r.settings&&"string"==typeof r.settings.language&&e.push(r.settings.language),"string"==typeof r.lang&&e.push(r.lang))}catch(e){}try{document.documentElement&&e.push(document.documentElement.lang||"")}catch(e){}try{if(navigator.languages)for(let t=0;t<navigator.languages.length;t++)e.push(navigator.languages[t]||"");navigator.language&&e.push(navigator.language)}catch(e){}for(let t of e){let e=t.trim().toLowerCase().split("-")[0];if(e)return e}return"de"}()?{subdivisions:"Unterteilungen",rows:"Zeilen",cols:"Spalten"}:{subdivisions:"Subdivisions",rows:"Rows",cols:"Columns"};if("circle"===t){let t=document.getElementById("fq-circle-range-"+e);t&&t.setAttribute("data-label",r.subdivisions)}if("rect"===t){let t=document.getElementById("fq-rect-rows-wrap-"+e),n=document.getElementById("fq-rect-cols-wrap-"+e);t&&t.setAttribute("data-label",r.rows),n&&n.setAttribute("data-label",r.cols)}}function d(e){if(!e)return"(null)";if(1!==e.nodeType)return"("+e.nodeName+")";let t=e.id?"#"+e.id:"",r=e.className&&"string"==typeof e.className?"."+e.className.trim().replace(/\s+/g,"."):"";return e.tagName.toLowerCase()+t+r}function p(e){if(!e||1!==e.nodeType)return!1;if(e.id&&/^fq-/.test(e.id)||e.classList&&(e.classList.contains("fq-widget")||e.classList.contains("fq-mount")||e.classList.contains("fq-range")))return!0;try{return!!e.querySelector('[id^="fq-"], .fq-widget, .fq-mount, .fq-range')}catch(e){return!1}}function f(e,t){if(!a.DEBUG_FQ||e[t]||"u"<typeof MutationObserver)return;let r=document,n=r.body||r.documentElement;if(!n)return;let i=new MutationObserver(e=>{for(let t of e){if("childList"!==t.type)continue;let e=[],r=[];t.addedNodes.forEach(t=>{p(t)&&e.push(d(t))}),t.removedNodes.forEach(e=>{p(e)&&r.push(d(e))}),(e.length||r.length)&&u("dom-mutation",{target:d(t.target),added:e,removed:r})}});i.observe(n,{childList:!0,subtree:!0}),e[t]=i,u("debug-dom-observer-installed")}class g{getWidget(e,t){return e=String(null==e?"":e),this.widgets[e]||(this.widgets[e]={meta:{uid:e,kind:t||"",target:{num:0,den:1,value:0,raw:"0"},locked:!1,solved:!1,revealed:!1,ready:!1},nodes:{uid:e,kind:"",wrap:null,host:null,mount:null,circleInput:null,rowsInput:null,colsInput:null,observer:null,_quizScope:null,_quizClickHandler:null,_quizBridgeInstalled:!1},state:[]}),t&&(this.widgets[e].meta.kind=t),this.widgets[e]}meta(e){return this.getWidget(e).meta}nodes(e){return this.getWidget(e).nodes}state(e){return this.getWidget(e).state}getDims(e){let t=this.getWidget(e);return t.dims||{rows:t.meta.rows||1,cols:t.meta.cols||1}}bindRangeInput(e,t,r,n){e[t]!==r&&(e[t]=r,e.addEventListener("input",n,!0),e.addEventListener("change",n,!0))}refreshNodes(e){e=String(null==e?"":e);let t=this.getWidget(e).nodes,r=t.wrap,n=t.host,i=t.mount,a=t.circleInput,s=t.rowsInput,l=t.colsInput,o=document.getElementById("fq-circle-wrap-"+e),p=document.getElementById("fq-rect-wrap-"+e);if(o){t.kind="circle",t.wrap=o,t.host=document.getElementById("fq-circle-host-"+e),t.mount=document.getElementById("fq-circle-mount-"+e);let r=document.getElementById("fq-circle-range-"+e);t.circleInput=r?r.querySelector('input[type="range"]'):null,t.rowsInput=null,t.colsInput=null}else if(p){t.kind="rect",t.wrap=p,t.host=document.getElementById("fq-rect-host-"+e),t.mount=document.getElementById("fq-rect-mount-"+e);let r=document.getElementById("fq-rect-rows-wrap-"+e),n=document.getElementById("fq-rect-cols-wrap-"+e);t.rowsInput=r?r.querySelector('input[type="range"]'):null,t.colsInput=n?n.querySelector('input[type="range"]'):null,t.circleInput=null}else t.wrap=null,t.host=null,t.mount=null,t.circleInput=null,t.rowsInput=null,t.colsInput=null;return r&&r!==t.wrap&&u("wrap-replaced",e,t.kind,d(t.wrap)),!r&&t.wrap&&u("wrap-found",e,t.kind,d(t.wrap)),n&&n!==t.host&&u("host-replaced",e,t.kind,d(t.host)),i&&i!==t.mount&&u("mount-replaced",e,t.kind,d(t.mount)),a&&a!==t.circleInput&&u("circle-input-replaced",e),s&&s!==t.rowsInput&&u("rows-input-replaced",e),l&&l!==t.colsInput&&u("cols-input-replaced",e),t.circleInput&&this.bindCircleInput(e,t.circleInput),(t.rowsInput||t.colsInput)&&this.bindRectInputs(e,t.rowsInput,t.colsInput),c(e,t.kind),t.wrap&&(this.ensureQuizBridge(e,t.wrap),this.installClickDelegation(e,t.wrap)),t}installClickDelegation(e,t){t[o]||(t[o]=!0,t.addEventListener("click",t=>{if(this.getWidget(e).meta.locked)return;let r=t.target&&t.target.closest?t.target.closest("[data-fq-part]"):null;if(!r)return;let n=parseInt(r.getAttribute("data-fq-part")||"",10);Number.isFinite(n)&&(this.toggle(e,n),this.render(e))},!0))}installDomObserver(e,t){let r=this.nodes(e);if(r.observer||"u"<typeof MutationObserver)return;let n=new MutationObserver(()=>{this.refreshNodes(e),this.syncDomState(e),this.render(e)});try{n.observe(t.parentElement||t,{childList:!0,subtree:!1}),r.observer=n}catch(e){}}parseTarget(e){return(0,s.parseFraction)(e)}setTarget(e,t,r){let n=this.getWidget(e,r).meta;return n.target=(0,s.parseFraction)(t),u("setTarget",e,{kind:n.kind,target:n.target}),n.target}ensureCircle(e,t,r){let n=this.getWidget(e,"circle"),i=(0,s.clampInt)(t,1,a.MAX_CIRCLE_PARTS,1),l=n.state.length>0?n.state:[];return n.state=(0,s.boolArray)(i,r?.preserve?l:null),n.meta.parts=i,n.meta.kind="circle",delete n.dims,n.state}ensureRect(e,t,r,n){let i=this.getWidget(e,"rect"),l=(0,s.clampInt)(t,1,a.MAX_RECT_DIM,1),o=(0,s.clampInt)(r,1,a.MAX_RECT_DIM,1),u=i.state.length>0?i.state:[];return i.dims={rows:l,cols:o},i.state=(0,s.boolArray)(l*o,n?.preserve?u:null),i.meta.rows=l,i.meta.cols=o,i.meta.kind="rect",i.state}setCircleParts(e,t,r){return this.getWidget(e,"circle").meta.locked&&!r?.force?this.state(e).length>0?this.state(e):this.ensureCircle(e,1):this.ensureCircle(e,t,r)}setRectDims(e,t,r,n){return this.getWidget(e,"rect").meta.locked&&!n?.force?this.state(e).length>0?this.state(e):this.ensureRect(e,1,1):this.ensureRect(e,t,r,n)}buildCircleSolution(e){let t=(0,s.parseFraction)(e),r=Math.max(1,0|t.den),n=Array(r).fill(!1);for(let e=0;e<Math.min(r,0|t.num);e++)n[e]=!0;return{type:"circle",target:t,parts:r,active:n}}buildRectSolution(e){let t=(0,s.parseFraction)(e),{rows:r,cols:n}=(0,s.bestFactorPair)(t.den),i=r*n,a=Array(i).fill(!1);for(let e=0;e<Math.min(i,0|t.num);e++)a[e]=!0;return{type:"rect",target:t,rows:r,cols:n,active:a}}getSolution(e){let t=this.meta(e);return"circle"===t.kind?this.buildCircleSolution(t.target):"rect"===t.kind?this.buildRectSolution(t.target):null}isLocked(e){return!!this.meta(e).locked}toggle(e,t){let r=this.getWidget(e),{meta:n,state:i}=r;if(n.locked||!n.ready)return!1;0===i.length&&("circle"===n.kind?this.ensureCircle(e,n.parts||1):"rect"===n.kind&&this.ensureRect(e,r.dims?.rows||1,r.dims?.cols||1));let a=0|t;return!(a<0)&&!(a>=r.state.length)&&(r.state[a]=!r.state[a],r.state[a])}countSelected(e){let t=this.state(e);if(!t.length)return 0;let r=0;for(let e=0;e<t.length;e++)t[e]&&r++;return r}countTotal(e){return this.state(e).length||1}isCorrect(e){let t=this.meta(e);if(!t.ready)return!1;let r=t.target||{num:0,den:1};return this.countSelected(e)*r.den==r.num*this.countTotal(e)}lock(e){return this.meta(e).locked=!0,this.syncDomState(e),!0}markSolved(e){let t=this.meta(e);return!!t.ready&&(t.solved=!0,t.revealed=!1,t.locked=!0,this.syncDomState(e),this.render(e),!0)}applySolution(e){let t=this.getWidget(e),r=this.getSolution(e);return r?(u("applySolution:start",e,{kind:t.meta.kind,solution:r}),"circle"===r.type?(this.setCircleParts(e,r.parts,{force:!0,preserve:!1}),t.state=(0,s.boolArray)(r.parts,r.active),t.meta.parts=r.parts):(this.setRectDims(e,r.rows,r.cols,{force:!0,preserve:!1}),t.state=(0,s.boolArray)(r.rows*r.cols,r.active),t.dims={rows:r.rows,cols:r.cols},t.meta.rows=r.rows,t.meta.cols=r.cols),this.syncInputs(e,!0),this.render(e),u("applySolution:end",e,{kind:t.meta.kind}),r):null}markRevealed(e){let t=this.meta(e);return!!t.ready&&(!!t.revealed&&!!t.locked||(t.revealed=!0,t.solved=!1,t.locked=!0,this.applySolution(e),this.syncDomState(e),!0))}register(e,t){let r=t||{},n=r.kind||"",i=this.getWidget(e,n),{meta:l,nodes:o}=i;if(u("register:start",e,{kind:n}),n&&(o.kind=n),r.wrap&&(o.wrap=r.wrap),r.host&&(o.host=r.host),r.mount&&(o.mount=r.mount),r.circleInput&&(o.circleInput=r.circleInput),r.rowsInput&&(o.rowsInput=r.rowsInput),r.colsInput&&(o.colsInput=r.colsInput),void 0!==r.target&&this.setTarget(e,r.target,n||l.kind),"circle"===n)i.state.length>0?(l.parts=i.state.length,l.kind="circle"):this.ensureCircle(e,null!=r.initialParts?r.initialParts:1,{preserve:!1});else if("rect"===n){let t=i.dims;t&&i.state.length===(0,s.clampInt)(t.rows,1,a.MAX_RECT_DIM,1)*(0,s.clampInt)(t.cols,1,a.MAX_RECT_DIM,1)?(l.rows=(0,s.clampInt)(t.rows,1,a.MAX_RECT_DIM,1),l.cols=(0,s.clampInt)(t.cols,1,a.MAX_RECT_DIM,1),l.kind="rect"):this.ensureRect(e,null!=r.initialRows?r.initialRows:1,null!=r.initialCols?r.initialCols:1,{preserve:!1})}return o.circleInput&&this.bindCircleInput(e,o.circleInput),(o.rowsInput||o.colsInput)&&this.bindRectInputs(e,o.rowsInput,o.colsInput),c(e,n||o.kind),o.wrap&&(this.installClickDelegation(e,o.wrap),this.installDomObserver(e,o.wrap),this.ensureQuizBridge(e,o.wrap)),l.ready=!0,this.syncInputs(e,!0),this.syncDomState(e),this.render(e),u("register:end",e,{kind:l.kind}),o}bindCircleInput(e,t){this.bindRangeInput(t,"__fqCircleBoundUid",e,()=>{this.isLocked(e)?this.syncInputs(e,!0):(this.setCircleParts(e,(0,s.clampInt)(t.value,1,a.MAX_CIRCLE_PARTS,1),{preserve:!1}),this.render(e))})}bindRectInputs(e,t,r){t&&this.bindRangeInput(t,"__fqRectRowsBoundUid",e,()=>{if(this.isLocked(e))return void this.syncInputs(e,!0);let n=(0,s.clampInt)(t.value,1,a.MAX_RECT_DIM,1),i=r?(0,s.clampInt)(r.value,1,a.MAX_RECT_DIM,1):this.getDims(e).cols;this.setRectDims(e,n,i,{preserve:!1}),this.render(e)}),r&&this.bindRangeInput(r,"__fqRectColsBoundUid",e,()=>{if(this.isLocked(e))return void this.syncInputs(e,!0);let n=(0,s.clampInt)(r.value,1,a.MAX_RECT_DIM,1),i=t?(0,s.clampInt)(t.value,1,a.MAX_RECT_DIM,1):this.getDims(e).rows;this.setRectDims(e,i,n,{preserve:!1}),this.render(e)})}syncInputs(e,t){let r=this.nodes(e),n=this.getWidget(e),{meta:i}=n;if("circle"===i.kind&&r.circleInput){let e=n.state.length||i.parts||1;(t||String(r.circleInput.value)!==String(e))&&(r.circleInput.value=String(e)),r.circleInput.disabled=!!i.locked}if("rect"===i.kind){let n=this.getDims(e);r.rowsInput&&((t||String(r.rowsInput.value)!==String(n.rows))&&(r.rowsInput.value=String(n.rows)),r.rowsInput.disabled=!!i.locked),r.colsInput&&((t||String(r.colsInput.value)!==String(n.cols))&&(r.colsInput.value=String(n.cols)),r.colsInput.disabled=!!i.locked)}}syncDomState(e){let t=this.nodes(e),r=this.meta(e);for(let e of[t.wrap,t.host,t.mount])e&&e.setAttribute&&(e.setAttribute("data-fq-locked",r.locked?"1":"0"),e.setAttribute("data-fq-solved",r.solved?"1":"0"),e.setAttribute("data-fq-revealed",r.revealed?"1":"0"));this.syncInputs(e,!1)}render(e){let t=this.nodes(e),r=this.meta(e);return!!t.mount&&("circle"===r.kind?this.renderCircle(e,t.mount):"rect"===r.kind&&this.renderRect(e,t.mount))}renderCircle(e,t){let r=this.getWidget(e,"circle"),n=r.state.length>0?r.state:this.ensureCircle(e,r.meta.parts||1);return(0,l.renderCircleSVG)(t,n),this.syncDomState(e),!0}renderRect(e,t){let r=this.getWidget(e,"rect"),n=this.getDims(e),i=r.state.length>0?r.state:this.ensureRect(e,n.rows,n.cols),o=(0,s.clampInt)(n.rows,1,a.MAX_RECT_DIM,1),u=(0,s.clampInt)(n.cols,1,a.MAX_RECT_DIM,1);return(0,l.renderRectSVG)(t,i,o,u),this.syncDomState(e),!0}labelOf(e){if(!e)return"";let t=[];try{t.push(e.textContent||"")}catch(e){}try{e.className&&t.push(String(e.className))}catch(e){}for(let r of["title","aria-label","data-action","data-title","name","value"])try{let n=e.getAttribute&&e.getAttribute(r);n&&t.push(n)}catch(e){}return t.join(" ").replace(/\s+/g," ").trim().toLowerCase()}isRevealButton(e){return/(aufl|aufl[oö]sen|l[oö]sung|show solution|solution|resolve)/i.test(this.labelOf(e))}looksRevealed(e){if(!e)return!1;if(e.classList.contains("resolved"))return!0;let t=e.querySelector(".lia-quiz__feedback"),r=(t&&t.textContent||"").toLowerCase();return/(aufgel|aufl[oö]s|l[oö]sung|show solution|resolved|solution)/i.test(r)}ensureQuizBridge(e,t){let r=this.nodes(e),n=this.meta(e);if(!t||r._quizBridgeInstalled&&r._quizScope===t&&t.isConnected)return;if(r.observer){try{r.observer.disconnect()}catch(e){}r.observer=null}if(r._quizScope&&r._quizClickHandler)try{r._quizScope.removeEventListener("click",r._quizClickHandler,!0)}catch(e){}let i=t=>{let r=t.target&&t.target.closest?t.target.closest("button, input[type='button'], input[type='submit']"):null;r&&this.isRevealButton(r)&&n.ready&&(u("quiz-reveal-click",e,{label:this.labelOf(r)}),setTimeout(()=>{this.markRevealed(e)},0))};t.addEventListener("click",i,!0);let a=null;if("u">typeof MutationObserver){a=new MutationObserver(()=>{n.ready&&!n.revealed&&this.looksRevealed(t)&&(u("quiz-observer-detected-revealed",e),this.markRevealed(e))});try{a.observe(t,{attributes:!0,attributeFilter:["class"],subtree:!1})}catch(e){a=null}}r._quizBridgeInstalled=!0,r._quizScope=t,r._quizClickHandler=i,r.observer=a}onCheck(e,t){return t&&this.markSolved(e),!!t}onReveal(e){return this.markRevealed(e)}check(e){return e=String(null==e?"":e),!!this.isCorrect(e)&&(this.isLocked(e)||this.onCheck(e,!0),!0)}mount(e,t,r){e=String(null==e?"":e);let n=`fq-${t}-`,i=()=>{let i=document.getElementById(n+"wrap-"+e),a=document.getElementById(n+"host-"+e),s=document.getElementById(n+"mount-"+e);if("circle"===t){let l=document.getElementById(n+"range-"+e),o=l?l.querySelector('input[type="range"]'):null;if(i&&a&&s&&o)return this.register(e,{kind:t,wrap:i,host:a,mount:s,circleInput:o,target:r,initialParts:o.value||1}),this.ensureQuizBridge(e,i),!0}else{let l=document.getElementById(n+"rows-wrap-"+e),o=document.getElementById(n+"cols-wrap-"+e),u=l?l.querySelector('input[type="range"]'):null,c=o?o.querySelector('input[type="range"]'):null;if(i&&a&&s&&u&&c)return this.register(e,{kind:t,wrap:i,host:a,mount:s,rowsInput:u,colsInput:c,target:r,initialRows:u.value||1,initialCols:c.value||1}),this.ensureQuizBridge(e,i),!0}return!1};if(i())return;let a=null,s=null,l=()=>{if(a){try{a.disconnect()}catch(e){}a=null}null!==s&&(clearTimeout(s),s=null)};if("u">typeof MutationObserver){a=new MutationObserver(()=>{i()&&(u("mount-observer-success",e,t),l())});let r=document.body||document.documentElement;if(r)try{a.observe(r,{childList:!0,subtree:!0})}catch(e){a=null}}s=setTimeout(()=>{i()?u("mount-fallback-success",e,t):u("mount-timeout",e,t,"elements not found"),l()},50)}mountCircle(e,t){this.mount(e,"circle",t)}mountRect(e,t){this.mount(e,"rect",t)}getAllWidgets(){let e=Object.create(null);for(let t in this.widgets){let r=this.widgets[t];e[t]={state:r.state.slice(),meta:{uid:r.meta.uid,kind:r.meta.kind,solved:r.meta.solved,revealed:r.meta.revealed,locked:r.meta.locked,ready:r.meta.ready}}}return e}destroy(){for(let e in this.widgets){let t=this.widgets[e].nodes;if(t.observer){try{t.observer.disconnect()}catch(e){}t.observer=null}}}constructor(){this.widgets=Object.create(null),this.version=3}}},{"./constants":"7NbOs","./fraction":"ef3jW","./renderer":"lGVry","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],ef3jW:[function(e,t,r,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");function a(e,t,r,n){let i=parseInt(String(e),10);return Number.isFinite(i)||(i=n),Number.isFinite(i)||(i=t),i<t&&(i=t),i>r&&(i=r),0|i}function s(e,t){for(e=Math.abs(0|e),t=Math.abs(0|t);t;){let r=e%t;e=t,t=r}return e||1}function l(e){let t=String(null==e?"":e).trim().replace(",",".");if(!t)return{num:0,den:1};if(/e/i.test(t)){let e=Number(t);return Number.isFinite(e)?l(e.toFixed(12).replace(/0+$/,"").replace(/\.$/,"")):{num:0,den:1}}if(!/^[-+]?\d*(?:\.\d+)?$/.test(t))return{num:0,den:1};let r=t.startsWith("-")?-1:1,n=t.replace(/^[-+]/,"").split("."),i=n[0]||"0",a=n[1]||"";if(!a)return{num:r*parseInt(i,10),den:1};let s=Math.pow(10,a.length);return{num:r*(parseInt(i,10)*s+parseInt(a,10)),den:s}}function o(e){let t=0,r=1;if(e&&"object"==typeof e&&Number.isFinite(e.num)&&Number.isFinite(e.den))t=e.num,r=e.den;else if("number"==typeof e){let n=l(String(e));t=n.num,r=n.den}else{let n=String(null==e?"":e).trim().replace(/^\((.*)\)$/,"$1").trim();if(n.includes("/")){let e=n.match(/^\s*([-+]?\d+)\s*\/\s*([-+]?\d+)\s*$/);if(e)t=parseInt(e[1],10),r=parseInt(e[2],10);else{let e=l(n);t=e.num,r=e.den}}else{let e=l(n);t=e.num,r=e.den}}Number.isFinite(t)||(t=0),Number.isFinite(r)&&0!==r||(r=1),r<0&&(t=-t,r=-r);let n=s(t,r);return(t/=n)<0&&(t=0),t>(r/=n)&&(t=r),{num:t,den:r,value:r?t/r:0,raw:e}}function u(e){let t=1,r=e=Math.max(1,0|e),n=Math.abs(r-t);for(let i=1;i*i<=e;i++){if(e%i!=0)continue;let a=e/i,s=Math.abs(a-i);s<n&&(t=i,r=a,n=s)}return{cols:Math.min(t,r),rows:Math.max(t,r)}}function c(e,t){let r=Math.max(1,0|e),n=Array(r).fill(!1);if(Array.isArray(t))for(let e=0;e<Math.min(r,t.length);e++)n[e]=!!t[e];return n}i.defineInteropFlag(r),i.export(r,"clampInt",()=>a),i.export(r,"gcd",()=>s),i.export(r,"parseFraction",()=>o),i.export(r,"bestFactorPair",()=>u),i.export(r,"boolArray",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],lGVry:[function(e,t,r,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(r),i.export(r,"renderCircleSVG",()=>u),i.export(r,"renderRectSVG",()=>c);var a=e("./constants");let s="http://www.w3.org/2000/svg";function l(e){return document.createElementNS(s,e)}function o(e,t){for(let r in t)e.setAttribute(r,t[r])}function u(e,t){let r=a.SVG_SIZE,n=a.SVG_SIZE,i=a.SVG_PADDING,u=r/2,c=n/2,d=Math.min(r,n)/2-i,p=Math.max(1,0|t.length),f=360/p,g=l("svg");o(g,{class:"fq-svg",viewBox:`0 0 ${r} ${n}`,xmlns:s,width:String(r),height:String(n),"aria-hidden":"true"});let h=l("circle");if(o(h,{cx:String(u),cy:String(c),r:String(d),stroke:"#000000","stroke-width":"2",fill:"#ffffff"}),g.appendChild(h),1===p){let e=l("circle");o(e,{"data-fq-part":"0",class:"fq-clickable",cx:String(u),cy:String(c),r:String(d),fill:t[0]?"var(--fq-mark)":"transparent"}),g.appendChild(e)}else for(let e=0;e<p;e++){let r=(-90+f*e)*Math.PI/180,n=(-90+f*(e+1))*Math.PI/180,i=u+d*Math.cos(r),a=c+d*Math.sin(r),s=u+d*Math.cos(n),p=c+d*Math.sin(n),h=+(f>180),m=l("path");o(m,{"data-fq-part":String(e),class:"fq-clickable",d:`M ${u},${c} L ${i},${a} A ${d},${d} 0 ${h},1 ${s},${p} Z`,fill:t[e]?"var(--fq-mark)":"transparent"}),g.appendChild(m);let b=l("line");o(b,{x1:String(u),y1:String(c),x2:String(i),y2:String(a),stroke:"#000000","stroke-width":"2"}),g.appendChild(b)}let m=l("circle");o(m,{cx:String(u),cy:String(c),r:String(d),stroke:"#000000","stroke-width":"2",fill:"none"}),g.appendChild(m),e.textContent="",e.appendChild(g)}function c(e,t,r,n){let i=a.SVG_SIZE,u=a.SVG_SIZE,c=a.SVG_PADDING,d=(i-2*c)/n,p=(u-2*c)/r,f=l("svg");o(f,{class:"fq-svg",viewBox:`0 0 ${i} ${u}`,xmlns:s,width:String(i),height:String(u),"aria-hidden":"true"});let g=l("rect");o(g,{x:"0",y:"0",width:String(i),height:String(u),fill:"#ffffff",stroke:"#000000","stroke-width":"2"}),f.appendChild(g);for(let e=0;e<r;e++)for(let r=0;r<n;r++){let i=e*n+r,a=l("rect");o(a,{"data-fq-part":String(i),class:"fq-clickable",x:String(c+r*d),y:String(c+e*p),width:String(d),height:String(p),fill:t[i]?"var(--fq-mark)":"transparent"}),f.appendChild(a)}for(let e=0;e<=r;e++){let t=c+e*p,r=l("line");o(r,{x1:String(c),y1:String(t),x2:String(i-c),y2:String(t),stroke:"#000000","stroke-width":"2"}),f.appendChild(r)}for(let e=0;e<=n;e++){let t=c+e*d,r=l("line");o(r,{x1:String(t),y1:String(c),x2:String(t),y2:String(u-c),stroke:"#000000","stroke-width":"2"}),f.appendChild(r)}e.textContent="",e.appendChild(f)}},{"./constants":"7NbOs","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}]},["8RSWf"],"8RSWf","parcelRequire9430",{});
//# sourceMappingURL=index.js.map
