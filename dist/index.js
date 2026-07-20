!function(e,t,n,r,i){var s="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},a="function"==typeof s[r]&&s[r],l=a.i||{},o=a.cache||{},u="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(t,n){if(!o[t]){if(!e[t]){if(i[t])return i[t];var l="function"==typeof s[r]&&s[r];if(!n&&l)return l(t,!0);if(a)return a(t,!0);if(u&&"string"==typeof t)return u(t);var d=Error("Cannot find module '"+t+"'");throw d.code="MODULE_NOT_FOUND",d}h.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},h.cache={};var p=o[t]=new c.Module(t);e[t][0].call(p.exports,h,p,p.exports,s)}return o[t].exports;function h(e){var t=h.resolve(e);if(!1===t)return{};if(Array.isArray(t)){var n={__esModule:!0};return t.forEach(function(e){var t=e[0],r=e[1],i=e[2]||e[0],s=c(r);"*"===t?Object.keys(s).forEach(function(e){"default"===e||"__esModule"===e||Object.prototype.hasOwnProperty.call(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:function(){return s[e]}})}):"*"===i?Object.defineProperty(n,t,{enumerable:!0,value:s}):Object.defineProperty(n,t,{enumerable:!0,get:function(){return"default"===i?s.__esModule?s.default:s:s[i]}})}),n}return c(t)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.require=u,this.exports={}},c.modules=e,c.cache=o,c.parent=a,c.distDir=void 0,c.publicUrl=void 0,c.devServer=void 0,c.i=l,c.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(c,"root",{get:function(){return s[r]}}),s[r]=c;for(var d=0;d<t.length;d++)c(t[d]);if(n){var p=c(n);"object"==typeof exports&&"u">typeof module?module.exports=p:"function"==typeof define&&define.amd&&define(function(){return p})}}({"8RSWf":[function(e,t,n,r){var i=e("./constants"),s=e("./mathQuiz"),a=e("./style"),l=e("./store");function o(){let e=window;for(;;)try{let t=e.parent;if(!t||t===e)break;t.document,e=t}catch(e){break}return e}function u(){let e=o();try{if(e&&e.document)return e.document}catch(e){}return document}let c=o(),d=c[i.MATH_QUIZ_KEY];d||(d=new(0,s.MathQuizBridge)(u()),c[i.MATH_QUIZ_KEY]=d),d.install(),(0,a.injectStyleOnce)(u()),(0,l.installDebugDomObserver)(c,i.DEBUG_OBSERVER_KEY),c[i.STORE_KEY]||(c[i.STORE_KEY]=new(0,l.FQStore));let p=c[i.STORE_KEY];c.__LIA_FRACTION_QUIZ__={mountCircle:(e,t)=>p.mountCircle(e,t),mountRect:(e,t)=>p.mountRect(e,t),check:e=>p.check(e),onReveal:e=>p.onReveal(e),getAllWidgets:()=>p.getAllWidgets(),destroy:()=>{p.destroy();let e=c[i.DEBUG_OBSERVER_KEY];if(e&&"function"==typeof e.disconnect){try{e.disconnect()}catch(e){}c[i.DEBUG_OBSERVER_KEY]=null}}},c.__LIA_MATH_QUIZ__={refresh:()=>d.refresh(),destroy:()=>d.destroy()}},{"./constants":"7NbOs","./mathQuiz":"i1zoi","./style":"dmo3N","./store":"cswaT"}],"7NbOs":[function(e,t,n,r){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"MATH_QUIZ_KEY",()=>s),i.export(n,"STORE_KEY",()=>a),i.export(n,"STYLE_ID",()=>l),i.export(n,"DEBUG_OBSERVER_KEY",()=>o),i.export(n,"SVG_SIZE",()=>u),i.export(n,"SVG_PADDING",()=>c),i.export(n,"MAX_CIRCLE_PARTS",()=>d),i.export(n,"MAX_RECT_DIM",()=>p),i.export(n,"DEBUG_FQ",()=>h);let s="__LIA_MATH_QUIZ_V1__",a="__LIA_FRACTION_QUIZ_V3__",l="__LIA_FRACTION_QUIZ_STYLE_V6__",o="__LIA_FQ_DEBUG_DOM_OBSERVER_V1__",u=200,c=6,d=32,p=20,h=!1},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],k3151:[function(e,t,n,r){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}],i1zoi:[function(e,t,n,r){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"MathQuizBridge",()=>c);let s="lia-math-quiz-proxy",a="lia-math-quiz-native",l="data-lia-math-quiz-native",o="data-lia-math-quiz-mounted";function u(e,t){let n=new Set(["lia-input","lia-quiz__input",s,a]);t.className=["lia-input","lia-quiz__input",s].concat(Array.from(e.classList).filter(e=>!n.has(e))).join(" ")}class c{constructor(e){this.bindings=new Map,this.containers=new Map,this.observer=null,this.installed=!1,this.scanScheduled=!1,this.frameId=null,this.timers=[],this.onDocumentClick=e=>{var t;let n;t=e.target,((n=t&&t.closest?t:null)?n.closest(".lia-quiz__check, .lia-quiz__resolve"):null)&&(this.scheduleFollowUp(0,()=>{this.scheduleScan(),this.syncAll()}),this.scheduleFollowUp(80,()=>{this.scheduleScan(),this.syncAll()}))},this.onWindowResize=()=>{this.layoutAll()},this.doc=e,this.win=e.defaultView||window}install(){if(this.installed)return;this.installed=!0;let e=this.win.MutationObserver,t=this.doc.body||this.doc.documentElement;e&&t&&(this.observer=new e(()=>this.scheduleScan()),this.observer.observe(t,{childList:!0,subtree:!0})),this.doc.addEventListener("click",this.onDocumentClick,!0),this.win.addEventListener("resize",this.onWindowResize),this.scheduleScan(),this.scheduleFollowUp(50),this.scheduleFollowUp(250);let n=this.doc.fonts;n&&n.ready&&"function"==typeof n.ready.then&&n.ready.then(()=>{this.installed&&this.layoutAll()})}refresh(){this.scheduleScan()}scheduleScan(){if(!this.installed||this.scanScheduled)return;this.scanScheduled=!0;let e=()=>{this.scanScheduled=!1,this.frameId=null,this.installed&&this.scan()};"function"==typeof this.win.requestAnimationFrame?this.frameId=this.win.requestAnimationFrame(e):this.scheduleFollowUp(0,e)}scheduleFollowUp(e,t){let n=this.win.setTimeout(()=>{this.timers=this.timers.filter(e=>e!==n),this.installed&&(t?t():(this.scan(),this.layoutAll()))},e);this.timers.push(n)}slotsOf(e){let t=e.shadowRoot;return t?Array.from(t.querySelectorAll(".lia-math-quiz-slot")).map(t=>({formula:e,slot:t})):[]}inputAfter(e,t,n,r){let i=this.win.Node&&this.win.Node.DOCUMENT_POSITION_FOLLOWING||4,s=e.closest(".lia-slide__content");for(let a of n)if(!r.has(a)&&a.closest(".lia-quiz")&&s===a.closest(".lia-slide__content")&&e.compareDocumentPosition(a)&i&&(!t||a.compareDocumentPosition(t)&i))return a;return null}desiredBindings(){let e=new Map,t=new Set,n=[],r=Array.from(this.doc.querySelectorAll("lia-formula, .lia-math-quiz-source[data-lia-math-quiz]")).filter(e=>!e.closest(".lia-quiz")),i=Array.from(this.doc.querySelectorAll(`input.lia-quiz__input:not(.${s})`));for(let s=0;s<r.length;s++){let a=r[s];if(a.matches("lia-formula")){n=this.slotsOf(a);continue}let l=a.getAttribute("data-lia-math-quiz")||"",o=this.inputAfter(a,r[s+1]||null,i,t),u=n[0],c=a.closest(".lia-slide__content"),d=u?u.formula.closest(".lia-slide__content"):null;u&&c!==d?(n=[],u=void 0):u=n.shift(),l&&o&&u&&u.formula.parentElement&&(t.add(o),e.set(l,{uid:l,source:a,nativeInput:o,formula:u.formula,slot:u.slot,container:u.formula.parentElement}))}return e}scan(){let e=this.desiredBindings();for(let[t,n]of Array.from(this.bindings.entries())){let r=e.get(t);r&&r.source===n.source&&r.nativeInput===n.nativeInput&&r.formula===n.formula&&r.slot===n.slot&&r.container===n.container&&n.source.isConnected&&n.proxyInput.isConnected||(this.disposeBinding(n),this.bindings.delete(t))}for(let[t,n]of Array.from(e.entries())){let e=this.bindings.get(t);if(e){this.syncBinding(e);continue}this.createBinding(n)}this.layoutAll()}retainContainer(e){let t=this.containers.get(e);if(t)return void t.count++;let n="";try{n=this.win.getComputedStyle(e).position}catch(e){}let r=!n||"static"===n,i=e.style.position;r&&(e.style.position="relative"),this.containers.set(e,{count:1,changedPosition:r,previousPosition:i})}releaseContainer(e){let t=this.containers.get(e);!t||(t.count--,t.count>0||(t.changedPosition&&"relative"===e.style.position&&(e.style.position=t.previousPosition),this.containers.delete(e)))}createBinding(e){let t=this.doc.createElement("input");t.type="text",t.placeholder=e.nativeInput.placeholder||"?",t.autocomplete="off",t.spellcheck=!1,t.style.visibility="hidden",t.setAttribute("data-lia-math-quiz-proxy",e.uid),t.setAttribute("aria-label",e.nativeInput.getAttribute("aria-label")||"quiz answer"),u(e.nativeInput,t);let n={...e,proxyInput:t,inputObserver:null,shadowObserver:null,resizeObserver:null,sourceAriaHidden:e.source.getAttribute("aria-hidden"),sourceMounted:e.source.getAttribute(o),nativeAriaHidden:e.nativeInput.getAttribute("aria-hidden"),nativeTabIndex:e.nativeInput.getAttribute("tabindex"),nativeMarker:e.nativeInput.getAttribute(l),nativeHadClass:e.nativeInput.classList.contains(a),onProxyInput:()=>{},onProxyChange:()=>{},onProxyKeydown:()=>{},onNativeInput:()=>{}};n.onProxyInput=()=>this.forwardProxyValue(n,"input"),n.onProxyChange=()=>this.forwardProxyValue(n,"change"),n.onProxyKeydown=e=>{if("Enter"!==e.key||n.proxyInput.disabled)return;let t=n.nativeInput.closest(".lia-quiz"),r=t?t.querySelector(".lia-quiz__check:not([disabled])"):null;r&&"function"==typeof r.click&&(e.preventDefault(),r.click())},n.onNativeInput=()=>this.syncBinding(n),this.bindings.set(e.uid,n),this.retainContainer(e.container),e.container.appendChild(t),e.source.setAttribute(o,"true"),e.source.setAttribute("aria-hidden","true"),e.nativeInput.classList.add(a),e.nativeInput.setAttribute(l,e.uid),e.nativeInput.setAttribute("aria-hidden","true"),e.nativeInput.setAttribute("tabindex","-1"),t.addEventListener("input",n.onProxyInput),t.addEventListener("change",n.onProxyChange),t.addEventListener("keydown",n.onProxyKeydown),e.nativeInput.addEventListener("input",n.onNativeInput),e.nativeInput.addEventListener("change",n.onNativeInput);let r=this.win.MutationObserver;r&&(n.inputObserver=new r(()=>this.syncBinding(n)),n.inputObserver.observe(e.nativeInput,{attributes:!0,attributeFilter:["class","disabled","value","aria-invalid"]}),e.formula.shadowRoot&&(n.shadowObserver=new r(()=>this.scheduleScan()),n.shadowObserver.observe(e.formula.shadowRoot,{childList:!0,subtree:!0})));let i=this.win.ResizeObserver;if(i){n.resizeObserver=new i(()=>this.layoutBinding(n));try{n.resizeObserver.observe(e.formula),n.resizeObserver.observe(e.slot),n.resizeObserver.observe(e.container)}catch(e){}}this.syncBinding(n),this.layoutBinding(n),this.scheduleFollowUp(40,()=>this.layoutBinding(n)),this.scheduleFollowUp(160,()=>this.layoutBinding(n))}forwardProxyValue(e,t){if(!e.nativeInput.isConnected||e.nativeInput.disabled)return void this.syncBinding(e);e.nativeInput.value=e.proxyInput.value;let n=this.win.Event;e.nativeInput.dispatchEvent(new n(t,{bubbles:!0,cancelable:!1})),this.scheduleFollowUp(0,()=>this.syncBinding(e))}syncBinding(e){if(!e.nativeInput.isConnected||!e.proxyInput.isConnected)return void this.scheduleScan();e.proxyInput.value!==e.nativeInput.value&&(e.proxyInput.value=e.nativeInput.value),e.proxyInput.disabled=e.nativeInput.disabled,u(e.nativeInput,e.proxyInput),e.nativeInput.classList.contains(a)||e.nativeInput.classList.add(a),e.nativeInput.getAttribute(l)!==e.uid&&e.nativeInput.setAttribute(l,e.uid);let t=e.nativeInput.getAttribute("aria-invalid");null===t?e.proxyInput.removeAttribute("aria-invalid"):e.proxyInput.setAttribute("aria-invalid",t)}layoutBinding(e){if(!e.slot.isConnected||!e.container.isConnected||!e.proxyInput.isConnected)return void this.scheduleScan();let t=e.slot.getBoundingClientRect(),n=e.container.getBoundingClientRect();if(t.width<=0||t.height<=0||n.width<=0){e.proxyInput.style.visibility="hidden";return}let r=16;try{let t=parseFloat(this.win.getComputedStyle(e.slot).fontSize);Number.isFinite(t)&&t>0&&(r=t)}catch(e){}let i=Math.max(t.width,1.8*r);e.proxyInput.style.width=`${i}px`,e.proxyInput.style.removeProperty("height"),e.proxyInput.style.removeProperty("font-size");let s=e.proxyInput.getBoundingClientRect().height,a=s>0?s:Math.max(32,1.8*r),l=t.left-n.left-e.container.clientLeft+e.container.scrollLeft,o=t.top-n.top-e.container.clientTop+e.container.scrollTop+(t.height-a)/2;e.proxyInput.style.left=`${l}px`,e.proxyInput.style.top=`${o}px`,e.proxyInput.style.visibility="visible"}layoutAll(){for(let e of Array.from(this.bindings.values()))this.layoutBinding(e)}syncAll(){for(let e of Array.from(this.bindings.values()))this.syncBinding(e)}disposeBinding(e){e.proxyInput.removeEventListener("input",e.onProxyInput),e.proxyInput.removeEventListener("change",e.onProxyChange),e.proxyInput.removeEventListener("keydown",e.onProxyKeydown),e.nativeInput.removeEventListener("input",e.onNativeInput),e.nativeInput.removeEventListener("change",e.onNativeInput),e.inputObserver&&e.inputObserver.disconnect(),e.shadowObserver&&e.shadowObserver.disconnect(),e.resizeObserver&&e.resizeObserver.disconnect(),e.proxyInput.parentNode&&e.proxyInput.parentNode.removeChild(e.proxyInput),e.source.isConnected&&(null===e.sourceMounted?e.source.removeAttribute(o):e.source.setAttribute(o,e.sourceMounted),null===e.sourceAriaHidden?e.source.removeAttribute("aria-hidden"):e.source.setAttribute("aria-hidden",e.sourceAriaHidden)),e.nativeInput.isConnected&&(e.nativeHadClass||e.nativeInput.classList.remove(a),null===e.nativeMarker?e.nativeInput.removeAttribute(l):e.nativeInput.setAttribute(l,e.nativeMarker),null===e.nativeAriaHidden?e.nativeInput.removeAttribute("aria-hidden"):e.nativeInput.setAttribute("aria-hidden",e.nativeAriaHidden),null===e.nativeTabIndex?e.nativeInput.removeAttribute("tabindex"):e.nativeInput.setAttribute("tabindex",e.nativeTabIndex)),this.releaseContainer(e.container)}destroy(){if(this.installed){for(let e of(this.installed=!1,this.observer&&this.observer.disconnect(),this.observer=null,this.doc.removeEventListener("click",this.onDocumentClick,!0),this.win.removeEventListener("resize",this.onWindowResize),null!==this.frameId&&"function"==typeof this.win.cancelAnimationFrame&&this.win.cancelAnimationFrame(this.frameId),this.frameId=null,this.scanScheduled=!1,this.timers))this.win.clearTimeout(e);for(let e of(this.timers=[],Array.from(this.bindings.values())))this.disposeBinding(e);this.bindings.clear()}}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],dmo3N:[function(e,t,n,r){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"injectStyleOnce",()=>a);var s=e("./constants");function a(e){if(!e||!e.head||e.getElementById(s.STYLE_ID))return;let t=e.createElement("style");t.id=s.STYLE_ID,t.textContent=`
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
.lia-math-quiz-source[data-lia-math-quiz-mounted=true] {
  display: none !important;
}

[data-lia-math-quiz-native] {
  display: none !important;
}

.lia-math-quiz-proxy {
  position: absolute !important;
  z-index: 3;
  box-sizing: border-box !important;
  min-width: 0 !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 0.2rem 0.5rem;
  text-align: center;
  font-weight: inherit;
  text-decoration: inherit;
  font-style: inherit;
  vertical-align: middle;
}
  `.trim(),e.head.appendChild(t)}},{"./constants":"7NbOs","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],cswaT:[function(e,t,n,r){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"installDebugDomObserver",()=>h),i.export(n,"FQStore",()=>f);var s=e("./constants"),a=e("./fraction"),l=e("./renderer");let o="__fqClickInstalled";function u(e,...t){if(s.DEBUG_FQ)try{console.log("[FQDBG]",e,...t)}catch(e){}}function c(e,t){let n="de"===function(){let e=[];try{let t=window,n=t.LIA||t.lia;n&&("string"==typeof n.language&&e.push(n.language),n.settings&&"string"==typeof n.settings.language&&e.push(n.settings.language),"string"==typeof n.lang&&e.push(n.lang))}catch(e){}try{document.documentElement&&e.push(document.documentElement.lang||"")}catch(e){}try{if(navigator.languages)for(let t=0;t<navigator.languages.length;t++)e.push(navigator.languages[t]||"");navigator.language&&e.push(navigator.language)}catch(e){}for(let t of e){let e=t.trim().toLowerCase().split("-")[0];if(e)return e}return"de"}()?{subdivisions:"Unterteilungen",rows:"Zeilen",cols:"Spalten"}:{subdivisions:"Subdivisions",rows:"Rows",cols:"Columns"};if("circle"===t){let t=document.getElementById("fq-circle-range-"+e);t&&t.setAttribute("data-label",n.subdivisions)}if("rect"===t){let t=document.getElementById("fq-rect-rows-wrap-"+e),r=document.getElementById("fq-rect-cols-wrap-"+e);t&&t.setAttribute("data-label",n.rows),r&&r.setAttribute("data-label",n.cols)}}function d(e){if(!e)return"(null)";if(1!==e.nodeType)return"("+e.nodeName+")";let t=e.id?"#"+e.id:"",n=e.className&&"string"==typeof e.className?"."+e.className.trim().replace(/\s+/g,"."):"";return e.tagName.toLowerCase()+t+n}function p(e){if(!e||1!==e.nodeType)return!1;if(e.id&&/^fq-/.test(e.id)||e.classList&&(e.classList.contains("fq-widget")||e.classList.contains("fq-mount")||e.classList.contains("fq-range")))return!0;try{return!!e.querySelector('[id^="fq-"], .fq-widget, .fq-mount, .fq-range')}catch(e){return!1}}function h(e,t){if(!s.DEBUG_FQ||e[t]||"u"<typeof MutationObserver)return;let n=document,r=n.body||n.documentElement;if(!r)return;let i=new MutationObserver(e=>{for(let t of e){if("childList"!==t.type)continue;let e=[],n=[];t.addedNodes.forEach(t=>{p(t)&&e.push(d(t))}),t.removedNodes.forEach(e=>{p(e)&&n.push(d(e))}),(e.length||n.length)&&u("dom-mutation",{target:d(t.target),added:e,removed:n})}});i.observe(r,{childList:!0,subtree:!0}),e[t]=i,u("debug-dom-observer-installed")}class f{getWidget(e,t){return e=String(null==e?"":e),this.widgets[e]||(this.widgets[e]={meta:{uid:e,kind:t||"",target:{num:0,den:1,value:0,raw:"0"},locked:!1,solved:!1,revealed:!1,ready:!1},nodes:{uid:e,kind:"",wrap:null,host:null,mount:null,circleInput:null,rowsInput:null,colsInput:null,observer:null,_quizScope:null,_quizClickHandler:null,_quizBridgeInstalled:!1},state:[]}),t&&(this.widgets[e].meta.kind=t),this.widgets[e]}meta(e){return this.getWidget(e).meta}nodes(e){return this.getWidget(e).nodes}state(e){return this.getWidget(e).state}getDims(e){let t=this.getWidget(e);return t.dims||{rows:t.meta.rows||1,cols:t.meta.cols||1}}bindRangeInput(e,t,n,r){e[t]!==n&&(e[t]=n,e.addEventListener("input",r,!0),e.addEventListener("change",r,!0))}refreshNodes(e){e=String(null==e?"":e);let t=this.getWidget(e).nodes,n=t.wrap,r=t.host,i=t.mount,s=t.circleInput,a=t.rowsInput,l=t.colsInput,o=document.getElementById("fq-circle-wrap-"+e),p=document.getElementById("fq-rect-wrap-"+e);if(o){t.kind="circle",t.wrap=o,t.host=document.getElementById("fq-circle-host-"+e),t.mount=document.getElementById("fq-circle-mount-"+e);let n=document.getElementById("fq-circle-range-"+e);t.circleInput=n?n.querySelector('input[type="range"]'):null,t.rowsInput=null,t.colsInput=null}else if(p){t.kind="rect",t.wrap=p,t.host=document.getElementById("fq-rect-host-"+e),t.mount=document.getElementById("fq-rect-mount-"+e);let n=document.getElementById("fq-rect-rows-wrap-"+e),r=document.getElementById("fq-rect-cols-wrap-"+e);t.rowsInput=n?n.querySelector('input[type="range"]'):null,t.colsInput=r?r.querySelector('input[type="range"]'):null,t.circleInput=null}else t.wrap=null,t.host=null,t.mount=null,t.circleInput=null,t.rowsInput=null,t.colsInput=null;return n&&n!==t.wrap&&u("wrap-replaced",e,t.kind,d(t.wrap)),!n&&t.wrap&&u("wrap-found",e,t.kind,d(t.wrap)),r&&r!==t.host&&u("host-replaced",e,t.kind,d(t.host)),i&&i!==t.mount&&u("mount-replaced",e,t.kind,d(t.mount)),s&&s!==t.circleInput&&u("circle-input-replaced",e),a&&a!==t.rowsInput&&u("rows-input-replaced",e),l&&l!==t.colsInput&&u("cols-input-replaced",e),t.circleInput&&this.bindCircleInput(e,t.circleInput),(t.rowsInput||t.colsInput)&&this.bindRectInputs(e,t.rowsInput,t.colsInput),c(e,t.kind),t.wrap&&(this.ensureQuizBridge(e,t.wrap),this.installClickDelegation(e,t.wrap)),t}installClickDelegation(e,t){t[o]||(t[o]=!0,t.addEventListener("click",t=>{if(this.getWidget(e).meta.locked)return;let n=t.target&&t.target.closest?t.target.closest("[data-fq-part]"):null;if(!n)return;let r=parseInt(n.getAttribute("data-fq-part")||"",10);Number.isFinite(r)&&(this.toggle(e,r),this.render(e))},!0))}installDomObserver(e,t){let n=this.nodes(e);if(n.observer||"u"<typeof MutationObserver)return;let r=new MutationObserver(()=>{this.refreshNodes(e),this.syncDomState(e),this.render(e)});try{r.observe(t.parentElement||t,{childList:!0,subtree:!1}),n.observer=r}catch(e){}}parseTarget(e){return(0,a.parseFraction)(e)}setTarget(e,t,n){let r=this.getWidget(e,n).meta;return r.target=(0,a.parseFraction)(t),u("setTarget",e,{kind:r.kind,target:r.target}),r.target}ensureCircle(e,t,n){let r=this.getWidget(e,"circle"),i=(0,a.clampInt)(t,1,s.MAX_CIRCLE_PARTS,1),l=r.state.length>0?r.state:[];return r.state=(0,a.boolArray)(i,n?.preserve?l:null),r.meta.parts=i,r.meta.kind="circle",delete r.dims,r.state}ensureRect(e,t,n,r){let i=this.getWidget(e,"rect"),l=(0,a.clampInt)(t,1,s.MAX_RECT_DIM,1),o=(0,a.clampInt)(n,1,s.MAX_RECT_DIM,1),u=i.state.length>0?i.state:[];return i.dims={rows:l,cols:o},i.state=(0,a.boolArray)(l*o,r?.preserve?u:null),i.meta.rows=l,i.meta.cols=o,i.meta.kind="rect",i.state}setCircleParts(e,t,n){return this.getWidget(e,"circle").meta.locked&&!n?.force?this.state(e).length>0?this.state(e):this.ensureCircle(e,1):this.ensureCircle(e,t,n)}setRectDims(e,t,n,r){return this.getWidget(e,"rect").meta.locked&&!r?.force?this.state(e).length>0?this.state(e):this.ensureRect(e,1,1):this.ensureRect(e,t,n,r)}buildCircleSolution(e){let t=(0,a.parseFraction)(e),n=Math.max(1,0|t.den),r=Array(n).fill(!1);for(let e=0;e<Math.min(n,0|t.num);e++)r[e]=!0;return{type:"circle",target:t,parts:n,active:r}}buildRectSolution(e){let t=(0,a.parseFraction)(e),{rows:n,cols:r}=(0,a.bestFactorPair)(t.den),i=n*r,s=Array(i).fill(!1);for(let e=0;e<Math.min(i,0|t.num);e++)s[e]=!0;return{type:"rect",target:t,rows:n,cols:r,active:s}}getSolution(e){let t=this.meta(e);return"circle"===t.kind?this.buildCircleSolution(t.target):"rect"===t.kind?this.buildRectSolution(t.target):null}isLocked(e){return!!this.meta(e).locked}toggle(e,t){let n=this.getWidget(e),{meta:r,state:i}=n;if(r.locked||!r.ready)return!1;0===i.length&&("circle"===r.kind?this.ensureCircle(e,r.parts||1):"rect"===r.kind&&this.ensureRect(e,n.dims?.rows||1,n.dims?.cols||1));let s=0|t;return!(s<0)&&!(s>=n.state.length)&&(n.state[s]=!n.state[s],n.state[s])}countSelected(e){let t=this.state(e);if(!t.length)return 0;let n=0;for(let e=0;e<t.length;e++)t[e]&&n++;return n}countTotal(e){return this.state(e).length||1}isCorrect(e){let t=this.meta(e);if(!t.ready)return!1;let n=t.target||{num:0,den:1};return this.countSelected(e)*n.den==n.num*this.countTotal(e)}lock(e){return this.meta(e).locked=!0,this.syncDomState(e),!0}markSolved(e){let t=this.meta(e);return!!t.ready&&(t.solved=!0,t.revealed=!1,t.locked=!0,this.syncDomState(e),this.render(e),!0)}applySolution(e){let t=this.getWidget(e),n=this.getSolution(e);return n?(u("applySolution:start",e,{kind:t.meta.kind,solution:n}),"circle"===n.type?(this.setCircleParts(e,n.parts,{force:!0,preserve:!1}),t.state=(0,a.boolArray)(n.parts,n.active),t.meta.parts=n.parts):(this.setRectDims(e,n.rows,n.cols,{force:!0,preserve:!1}),t.state=(0,a.boolArray)(n.rows*n.cols,n.active),t.dims={rows:n.rows,cols:n.cols},t.meta.rows=n.rows,t.meta.cols=n.cols),this.syncInputs(e,!0),this.render(e),u("applySolution:end",e,{kind:t.meta.kind}),n):null}markRevealed(e){let t=this.meta(e);return!!t.ready&&(!!t.revealed&&!!t.locked||(t.revealed=!0,t.solved=!1,t.locked=!0,this.applySolution(e),this.syncDomState(e),!0))}register(e,t){let n=t||{},r=n.kind||"",i=this.getWidget(e,r),{meta:l,nodes:o}=i;if(u("register:start",e,{kind:r}),r&&(o.kind=r),n.wrap&&(o.wrap=n.wrap),n.host&&(o.host=n.host),n.mount&&(o.mount=n.mount),n.circleInput&&(o.circleInput=n.circleInput),n.rowsInput&&(o.rowsInput=n.rowsInput),n.colsInput&&(o.colsInput=n.colsInput),void 0!==n.target&&this.setTarget(e,n.target,r||l.kind),"circle"===r)i.state.length>0?(l.parts=i.state.length,l.kind="circle"):this.ensureCircle(e,null!=n.initialParts?n.initialParts:1,{preserve:!1});else if("rect"===r){let t=i.dims;t&&i.state.length===(0,a.clampInt)(t.rows,1,s.MAX_RECT_DIM,1)*(0,a.clampInt)(t.cols,1,s.MAX_RECT_DIM,1)?(l.rows=(0,a.clampInt)(t.rows,1,s.MAX_RECT_DIM,1),l.cols=(0,a.clampInt)(t.cols,1,s.MAX_RECT_DIM,1),l.kind="rect"):this.ensureRect(e,null!=n.initialRows?n.initialRows:1,null!=n.initialCols?n.initialCols:1,{preserve:!1})}return o.circleInput&&this.bindCircleInput(e,o.circleInput),(o.rowsInput||o.colsInput)&&this.bindRectInputs(e,o.rowsInput,o.colsInput),c(e,r||o.kind),o.wrap&&(this.installClickDelegation(e,o.wrap),this.installDomObserver(e,o.wrap),this.ensureQuizBridge(e,o.wrap)),l.ready=!0,this.syncInputs(e,!0),this.syncDomState(e),this.render(e),u("register:end",e,{kind:l.kind}),o}bindCircleInput(e,t){this.bindRangeInput(t,"__fqCircleBoundUid",e,()=>{this.isLocked(e)?this.syncInputs(e,!0):(this.setCircleParts(e,(0,a.clampInt)(t.value,1,s.MAX_CIRCLE_PARTS,1),{preserve:!1}),this.render(e))})}bindRectInputs(e,t,n){t&&this.bindRangeInput(t,"__fqRectRowsBoundUid",e,()=>{if(this.isLocked(e))return void this.syncInputs(e,!0);let r=(0,a.clampInt)(t.value,1,s.MAX_RECT_DIM,1),i=n?(0,a.clampInt)(n.value,1,s.MAX_RECT_DIM,1):this.getDims(e).cols;this.setRectDims(e,r,i,{preserve:!1}),this.render(e)}),n&&this.bindRangeInput(n,"__fqRectColsBoundUid",e,()=>{if(this.isLocked(e))return void this.syncInputs(e,!0);let r=(0,a.clampInt)(n.value,1,s.MAX_RECT_DIM,1),i=t?(0,a.clampInt)(t.value,1,s.MAX_RECT_DIM,1):this.getDims(e).rows;this.setRectDims(e,i,r,{preserve:!1}),this.render(e)})}syncInputs(e,t){let n=this.nodes(e),r=this.getWidget(e),{meta:i}=r;if("circle"===i.kind&&n.circleInput){let e=r.state.length||i.parts||1;(t||String(n.circleInput.value)!==String(e))&&(n.circleInput.value=String(e)),n.circleInput.disabled=!!i.locked}if("rect"===i.kind){let r=this.getDims(e);n.rowsInput&&((t||String(n.rowsInput.value)!==String(r.rows))&&(n.rowsInput.value=String(r.rows)),n.rowsInput.disabled=!!i.locked),n.colsInput&&((t||String(n.colsInput.value)!==String(r.cols))&&(n.colsInput.value=String(r.cols)),n.colsInput.disabled=!!i.locked)}}syncDomState(e){let t=this.nodes(e),n=this.meta(e);for(let e of[t.wrap,t.host,t.mount])e&&e.setAttribute&&(e.setAttribute("data-fq-locked",n.locked?"1":"0"),e.setAttribute("data-fq-solved",n.solved?"1":"0"),e.setAttribute("data-fq-revealed",n.revealed?"1":"0"));this.syncInputs(e,!1)}render(e){let t=this.nodes(e),n=this.meta(e);return!!t.mount&&("circle"===n.kind?this.renderCircle(e,t.mount):"rect"===n.kind&&this.renderRect(e,t.mount))}renderCircle(e,t){let n=this.getWidget(e,"circle"),r=n.state.length>0?n.state:this.ensureCircle(e,n.meta.parts||1);return(0,l.renderCircleSVG)(t,r),this.syncDomState(e),!0}renderRect(e,t){let n=this.getWidget(e,"rect"),r=this.getDims(e),i=n.state.length>0?n.state:this.ensureRect(e,r.rows,r.cols),o=(0,a.clampInt)(r.rows,1,s.MAX_RECT_DIM,1),u=(0,a.clampInt)(r.cols,1,s.MAX_RECT_DIM,1);return(0,l.renderRectSVG)(t,i,o,u),this.syncDomState(e),!0}labelOf(e){if(!e)return"";let t=[];try{t.push(e.textContent||"")}catch(e){}try{e.className&&t.push(String(e.className))}catch(e){}for(let n of["title","aria-label","data-action","data-title","name","value"])try{let r=e.getAttribute&&e.getAttribute(n);r&&t.push(r)}catch(e){}return t.join(" ").replace(/\s+/g," ").trim().toLowerCase()}isRevealButton(e){return/(aufl|aufl[oö]sen|l[oö]sung|show solution|solution|resolve)/i.test(this.labelOf(e))}looksRevealed(e){if(!e)return!1;if(e.classList.contains("resolved"))return!0;let t=e.querySelector(".lia-quiz__feedback"),n=(t&&t.textContent||"").toLowerCase();return/(aufgel|aufl[oö]s|l[oö]sung|show solution|resolved|solution)/i.test(n)}ensureQuizBridge(e,t){let n=this.nodes(e),r=this.meta(e);if(!t||n._quizBridgeInstalled&&n._quizScope===t&&t.isConnected)return;if(n.observer){try{n.observer.disconnect()}catch(e){}n.observer=null}if(n._quizScope&&n._quizClickHandler)try{n._quizScope.removeEventListener("click",n._quizClickHandler,!0)}catch(e){}let i=t=>{let n=t.target&&t.target.closest?t.target.closest("button, input[type='button'], input[type='submit']"):null;n&&this.isRevealButton(n)&&r.ready&&(u("quiz-reveal-click",e,{label:this.labelOf(n)}),setTimeout(()=>{this.markRevealed(e)},0))};t.addEventListener("click",i,!0);let s=null;if("u">typeof MutationObserver){s=new MutationObserver(()=>{r.ready&&!r.revealed&&this.looksRevealed(t)&&(u("quiz-observer-detected-revealed",e),this.markRevealed(e))});try{s.observe(t,{attributes:!0,attributeFilter:["class"],subtree:!1})}catch(e){s=null}}n._quizBridgeInstalled=!0,n._quizScope=t,n._quizClickHandler=i,n.observer=s}onCheck(e,t){return t&&this.markSolved(e),!!t}onReveal(e){return this.markRevealed(e)}check(e){return e=String(null==e?"":e),!!this.isCorrect(e)&&(this.isLocked(e)||this.onCheck(e,!0),!0)}mount(e,t,n){e=String(null==e?"":e);let r=`fq-${t}-`,i=()=>{let i=document.getElementById(r+"wrap-"+e),s=document.getElementById(r+"host-"+e),a=document.getElementById(r+"mount-"+e);if("circle"===t){let l=document.getElementById(r+"range-"+e),o=l?l.querySelector('input[type="range"]'):null;if(i&&s&&a&&o)return this.register(e,{kind:t,wrap:i,host:s,mount:a,circleInput:o,target:n,initialParts:o.value||1}),this.ensureQuizBridge(e,i),!0}else{let l=document.getElementById(r+"rows-wrap-"+e),o=document.getElementById(r+"cols-wrap-"+e),u=l?l.querySelector('input[type="range"]'):null,c=o?o.querySelector('input[type="range"]'):null;if(i&&s&&a&&u&&c)return this.register(e,{kind:t,wrap:i,host:s,mount:a,rowsInput:u,colsInput:c,target:n,initialRows:u.value||1,initialCols:c.value||1}),this.ensureQuizBridge(e,i),!0}return!1};if(i())return;let s=null,a=null,l=()=>{if(s){try{s.disconnect()}catch(e){}s=null}null!==a&&(clearTimeout(a),a=null)};if("u">typeof MutationObserver){s=new MutationObserver(()=>{i()&&(u("mount-observer-success",e,t),l())});let n=document.body||document.documentElement;if(n)try{s.observe(n,{childList:!0,subtree:!0})}catch(e){s=null}}a=setTimeout(()=>{i()?u("mount-fallback-success",e,t):u("mount-timeout",e,t,"elements not found"),l()},50)}mountCircle(e,t){this.mount(e,"circle",t)}mountRect(e,t){this.mount(e,"rect",t)}getAllWidgets(){let e=Object.create(null);for(let t in this.widgets){let n=this.widgets[t];e[t]={state:n.state.slice(),meta:{uid:n.meta.uid,kind:n.meta.kind,solved:n.meta.solved,revealed:n.meta.revealed,locked:n.meta.locked,ready:n.meta.ready}}}return e}destroy(){for(let e in this.widgets){let t=this.widgets[e].nodes;if(t.observer){try{t.observer.disconnect()}catch(e){}t.observer=null}}}constructor(){this.widgets=Object.create(null),this.version=3}}},{"./constants":"7NbOs","./fraction":"ef3jW","./renderer":"lGVry","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],ef3jW:[function(e,t,n,r){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");function s(e,t,n,r){let i=parseInt(String(e),10);return Number.isFinite(i)||(i=r),Number.isFinite(i)||(i=t),i<t&&(i=t),i>n&&(i=n),0|i}function a(e,t){for(e=Math.abs(0|e),t=Math.abs(0|t);t;){let n=e%t;e=t,t=n}return e||1}function l(e){let t=String(null==e?"":e).trim().replace(",",".");if(!t)return{num:0,den:1};if(/e/i.test(t)){let e=Number(t);return Number.isFinite(e)?l(e.toFixed(12).replace(/0+$/,"").replace(/\.$/,"")):{num:0,den:1}}if(!/^[-+]?\d*(?:\.\d+)?$/.test(t))return{num:0,den:1};let n=t.startsWith("-")?-1:1,r=t.replace(/^[-+]/,"").split("."),i=r[0]||"0",s=r[1]||"";if(!s)return{num:n*parseInt(i,10),den:1};let a=Math.pow(10,s.length);return{num:n*(parseInt(i,10)*a+parseInt(s,10)),den:a}}function o(e){let t=0,n=1;if(e&&"object"==typeof e&&Number.isFinite(e.num)&&Number.isFinite(e.den))t=e.num,n=e.den;else if("number"==typeof e){let r=l(String(e));t=r.num,n=r.den}else{let r=String(null==e?"":e).trim().replace(/^\((.*)\)$/,"$1").trim();if(r.includes("/")){let e=r.match(/^\s*([-+]?\d+)\s*\/\s*([-+]?\d+)\s*$/);if(e)t=parseInt(e[1],10),n=parseInt(e[2],10);else{let e=l(r);t=e.num,n=e.den}}else{let e=l(r);t=e.num,n=e.den}}Number.isFinite(t)||(t=0),Number.isFinite(n)&&0!==n||(n=1),n<0&&(t=-t,n=-n);let r=a(t,n);return(t/=r)<0&&(t=0),t>(n/=r)&&(t=n),{num:t,den:n,value:n?t/n:0,raw:e}}function u(e){let t=1,n=e=Math.max(1,0|e),r=Math.abs(n-t);for(let i=1;i*i<=e;i++){if(e%i!=0)continue;let s=e/i,a=Math.abs(s-i);a<r&&(t=i,n=s,r=a)}return{cols:Math.min(t,n),rows:Math.max(t,n)}}function c(e,t){let n=Math.max(1,0|e),r=Array(n).fill(!1);if(Array.isArray(t))for(let e=0;e<Math.min(n,t.length);e++)r[e]=!!t[e];return r}i.defineInteropFlag(n),i.export(n,"clampInt",()=>s),i.export(n,"gcd",()=>a),i.export(n,"parseFraction",()=>o),i.export(n,"bestFactorPair",()=>u),i.export(n,"boolArray",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],lGVry:[function(e,t,n,r){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"renderCircleSVG",()=>u),i.export(n,"renderRectSVG",()=>c);var s=e("./constants");let a="http://www.w3.org/2000/svg";function l(e){return document.createElementNS(a,e)}function o(e,t){for(let n in t)e.setAttribute(n,t[n])}function u(e,t){let n=s.SVG_SIZE,r=s.SVG_SIZE,i=s.SVG_PADDING,u=n/2,c=r/2,d=Math.min(n,r)/2-i,p=Math.max(1,0|t.length),h=360/p,f=l("svg");o(f,{class:"fq-svg",viewBox:`0 0 ${n} ${r}`,xmlns:a,width:String(n),height:String(r),"aria-hidden":"true"});let g=l("circle");if(o(g,{cx:String(u),cy:String(c),r:String(d),stroke:"#000000","stroke-width":"2",fill:"#ffffff"}),f.appendChild(g),1===p){let e=l("circle");o(e,{"data-fq-part":"0",class:"fq-clickable",cx:String(u),cy:String(c),r:String(d),fill:t[0]?"var(--fq-mark)":"transparent"}),f.appendChild(e)}else for(let e=0;e<p;e++){let n=(-90+h*e)*Math.PI/180,r=(-90+h*(e+1))*Math.PI/180,i=u+d*Math.cos(n),s=c+d*Math.sin(n),a=u+d*Math.cos(r),p=c+d*Math.sin(r),g=+(h>180),m=l("path");o(m,{"data-fq-part":String(e),class:"fq-clickable",d:`M ${u},${c} L ${i},${s} A ${d},${d} 0 ${g},1 ${a},${p} Z`,fill:t[e]?"var(--fq-mark)":"transparent"}),f.appendChild(m);let v=l("line");o(v,{x1:String(u),y1:String(c),x2:String(i),y2:String(s),stroke:"#000000","stroke-width":"2"}),f.appendChild(v)}let m=l("circle");o(m,{cx:String(u),cy:String(c),r:String(d),stroke:"#000000","stroke-width":"2",fill:"none"}),f.appendChild(m),e.textContent="",e.appendChild(f)}function c(e,t,n,r){let i=s.SVG_SIZE,u=s.SVG_SIZE,c=s.SVG_PADDING,d=(i-2*c)/r,p=(u-2*c)/n,h=l("svg");o(h,{class:"fq-svg",viewBox:`0 0 ${i} ${u}`,xmlns:a,width:String(i),height:String(u),"aria-hidden":"true"});let f=l("rect");o(f,{x:"0",y:"0",width:String(i),height:String(u),fill:"#ffffff",stroke:"#000000","stroke-width":"2"}),h.appendChild(f);for(let e=0;e<n;e++)for(let n=0;n<r;n++){let i=e*r+n,s=l("rect");o(s,{"data-fq-part":String(i),class:"fq-clickable",x:String(c+n*d),y:String(c+e*p),width:String(d),height:String(p),fill:t[i]?"var(--fq-mark)":"transparent"}),h.appendChild(s)}for(let e=0;e<=n;e++){let t=c+e*p,n=l("line");o(n,{x1:String(c),y1:String(t),x2:String(i-c),y2:String(t),stroke:"#000000","stroke-width":"2"}),h.appendChild(n)}for(let e=0;e<=r;e++){let t=c+e*d,n=l("line");o(n,{x1:String(t),y1:String(c),x2:String(t),y2:String(u-c),stroke:"#000000","stroke-width":"2"}),h.appendChild(n)}e.textContent="",e.appendChild(h)}},{"./constants":"7NbOs","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}]},["8RSWf"],"8RSWf","parcelRequire9430",{});
//# sourceMappingURL=index.js.map
