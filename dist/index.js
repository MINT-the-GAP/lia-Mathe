!function(e,t,n,i,r){var s="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},a="function"==typeof s[i]&&s[i],l=a.i||{},o=a.cache||{},u="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(t,n){if(!o[t]){if(!e[t]){if(r[t])return r[t];var l="function"==typeof s[i]&&s[i];if(!n&&l)return l(t,!0);if(a)return a(t,!0);if(u&&"string"==typeof t)return u(t);var d=Error("Cannot find module '"+t+"'");throw d.code="MODULE_NOT_FOUND",d}h.resolve=function(n){var i=e[t][1][n];return null!=i?i:n},h.cache={};var p=o[t]=new c.Module(t);e[t][0].call(p.exports,h,p,p.exports,s)}return o[t].exports;function h(e){var t=h.resolve(e);if(!1===t)return{};if(Array.isArray(t)){var n={__esModule:!0};return t.forEach(function(e){var t=e[0],i=e[1],r=e[2]||e[0],s=c(i);"*"===t?Object.keys(s).forEach(function(e){"default"===e||"__esModule"===e||Object.prototype.hasOwnProperty.call(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:function(){return s[e]}})}):"*"===r?Object.defineProperty(n,t,{enumerable:!0,value:s}):Object.defineProperty(n,t,{enumerable:!0,get:function(){return"default"===r?s.__esModule?s.default:s:s[r]}})}),n}return c(t)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.require=u,this.exports={}},c.modules=e,c.cache=o,c.parent=a,c.distDir=void 0,c.publicUrl=void 0,c.devServer=void 0,c.i=l,c.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(c,"root",{get:function(){return s[i]}}),s[i]=c;for(var d=0;d<t.length;d++)c(t[d]);if(n){var p=c(n);"object"==typeof exports&&"u">typeof module?module.exports=p:"function"==typeof define&&define.amd&&define(function(){return p})}}({"8RSWf":[function(e,t,n,i){var r=e("./constants"),s=e("./mathQuiz"),a=e("./style"),l=e("./store");function o(){let e=window;for(;;)try{let t=e.parent;if(!t||t===e)break;t.document,e=t}catch(e){break}return e}function u(){let e=o();try{if(e&&e.document)return e.document}catch(e){}return document}let c=o(),d=c[r.MATH_QUIZ_KEY];d||(d=new(0,s.MathQuizBridge)(u()),c[r.MATH_QUIZ_KEY]=d),d.install(),(0,a.injectStyleOnce)(u()),(0,l.installDebugDomObserver)(c,r.DEBUG_OBSERVER_KEY),c[r.STORE_KEY]||(c[r.STORE_KEY]=new(0,l.FQStore));let p=c[r.STORE_KEY];c.__LIA_FRACTION_QUIZ__={mountCircle:(e,t)=>p.mountCircle(e,t),mountRect:(e,t)=>p.mountRect(e,t),check:e=>p.check(e),onReveal:e=>p.onReveal(e),getAllWidgets:()=>p.getAllWidgets(),destroy:()=>{p.destroy();let e=c[r.DEBUG_OBSERVER_KEY];if(e&&"function"==typeof e.disconnect){try{e.disconnect()}catch(e){}c[r.DEBUG_OBSERVER_KEY]=null}}},c.__LIA_MATH_QUIZ__={refresh:()=>d.refresh(),destroy:()=>d.destroy()}},{"./constants":"7NbOs","./mathQuiz":"i1zoi","./style":"dmo3N","./store":"cswaT"}],"7NbOs":[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"MATH_QUIZ_KEY",()=>s),r.export(n,"STORE_KEY",()=>a),r.export(n,"STYLE_ID",()=>l),r.export(n,"DEBUG_OBSERVER_KEY",()=>o),r.export(n,"SVG_SIZE",()=>u),r.export(n,"SVG_PADDING",()=>c),r.export(n,"MAX_CIRCLE_PARTS",()=>d),r.export(n,"MAX_RECT_DIM",()=>p),r.export(n,"DEBUG_FQ",()=>h);let s="__LIA_MATH_QUIZ_V1__",a="__LIA_FRACTION_QUIZ_V4__",l="__LIA_FRACTION_QUIZ_STYLE_V7__",o="__LIA_FQ_DEBUG_DOM_OBSERVER_V1__",u=200,c=6,d=32,p=20,h=!1},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],k3151:[function(e,t,n,i){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}],i1zoi:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"MathQuizBridge",()=>c);let s="lia-math-quiz-proxy",a="lia-math-quiz-native",l="data-lia-math-quiz-native",o="data-lia-math-quiz-mounted";function u(e,t){let n=new Set(["lia-input","lia-quiz__input",s,a]);t.className=["lia-input","lia-quiz__input",s].concat(Array.from(e.classList).filter(e=>!n.has(e))).join(" ")}class c{constructor(e){this.bindings=new Map,this.containers=new Map,this.observer=null,this.installed=!1,this.scanScheduled=!1,this.frameId=null,this.timers=[],this.onDocumentClick=e=>{var t;let n;t=e.target,((n=t&&t.closest?t:null)?n.closest(".lia-quiz__check, .lia-quiz__resolve"):null)&&(this.scheduleFollowUp(0,()=>{this.scheduleScan(),this.syncAll()}),this.scheduleFollowUp(80,()=>{this.scheduleScan(),this.syncAll()}))},this.onWindowResize=()=>{this.layoutAll()},this.doc=e,this.win=e.defaultView||window}install(){if(this.installed)return;this.installed=!0;let e=this.win.MutationObserver,t=this.doc.body||this.doc.documentElement;e&&t&&(this.observer=new e(()=>this.scheduleScan()),this.observer.observe(t,{childList:!0,subtree:!0})),this.doc.addEventListener("click",this.onDocumentClick,!0),this.win.addEventListener("resize",this.onWindowResize),this.scheduleScan(),this.scheduleFollowUp(50),this.scheduleFollowUp(250);let n=this.doc.fonts;n&&n.ready&&"function"==typeof n.ready.then&&n.ready.then(()=>{this.installed&&this.layoutAll()})}refresh(){this.scheduleScan()}scheduleScan(){if(!this.installed||this.scanScheduled)return;this.scanScheduled=!0;let e=()=>{this.scanScheduled=!1,this.frameId=null,this.installed&&this.scan()};"function"==typeof this.win.requestAnimationFrame?this.frameId=this.win.requestAnimationFrame(e):this.scheduleFollowUp(0,e)}scheduleFollowUp(e,t){let n=this.win.setTimeout(()=>{this.timers=this.timers.filter(e=>e!==n),this.installed&&(t?t():(this.scan(),this.layoutAll()))},e);this.timers.push(n)}slotsOf(e){let t=e.shadowRoot;return t?Array.from(t.querySelectorAll(".lia-math-quiz-slot")).map(t=>({formula:e,slot:t})):[]}inputAfter(e,t,n,i){let r=this.win.Node&&this.win.Node.DOCUMENT_POSITION_FOLLOWING||4,s=e.closest(".lia-slide__content");for(let a of n)if(!i.has(a)&&a.closest(".lia-quiz")&&s===a.closest(".lia-slide__content")&&e.compareDocumentPosition(a)&r&&(!t||a.compareDocumentPosition(t)&r))return a;return null}desiredBindings(){let e=new Map,t=new Set,n=[],i=Array.from(this.doc.querySelectorAll("lia-formula, .lia-math-quiz-source[data-lia-math-quiz]")).filter(e=>!e.closest(".lia-quiz")),r=Array.from(this.doc.querySelectorAll(`input.lia-quiz__input:not(.${s})`));for(let s=0;s<i.length;s++){let a=i[s];if(a.matches("lia-formula")){n=this.slotsOf(a);continue}let l=a.getAttribute("data-lia-math-quiz")||"",o=this.inputAfter(a,i[s+1]||null,r,t),u=n[0],c=a.closest(".lia-slide__content"),d=u?u.formula.closest(".lia-slide__content"):null;u&&c!==d?(n=[],u=void 0):u=n.shift(),l&&o&&u&&u.formula.parentElement&&(t.add(o),e.set(l,{uid:l,source:a,nativeInput:o,formula:u.formula,slot:u.slot,container:u.formula.parentElement}))}return e}scan(){let e=this.desiredBindings();for(let[t,n]of Array.from(this.bindings.entries())){let i=e.get(t);i&&i.source===n.source&&i.nativeInput===n.nativeInput&&i.formula===n.formula&&i.slot===n.slot&&i.container===n.container&&n.source.isConnected&&n.proxyInput.isConnected||(this.disposeBinding(n),this.bindings.delete(t))}for(let[t,n]of Array.from(e.entries())){let e=this.bindings.get(t);if(e){this.syncBinding(e);continue}this.createBinding(n)}this.layoutAll()}retainContainer(e){let t=this.containers.get(e);if(t)return void t.count++;let n="";try{n=this.win.getComputedStyle(e).position}catch(e){}let i=!n||"static"===n,r=e.style.position;i&&(e.style.position="relative"),this.containers.set(e,{count:1,changedPosition:i,previousPosition:r})}releaseContainer(e){let t=this.containers.get(e);!t||(t.count--,t.count>0||(t.changedPosition&&"relative"===e.style.position&&(e.style.position=t.previousPosition),this.containers.delete(e)))}createBinding(e){let t=this.doc.createElement("input");t.type="text",t.placeholder=e.nativeInput.placeholder||"?",t.autocomplete="off",t.spellcheck=!1,t.style.visibility="hidden",t.setAttribute("data-lia-math-quiz-proxy",e.uid),t.setAttribute("aria-label",e.nativeInput.getAttribute("aria-label")||"quiz answer"),u(e.nativeInput,t);let n={...e,proxyInput:t,inputObserver:null,shadowObserver:null,resizeObserver:null,sourceAriaHidden:e.source.getAttribute("aria-hidden"),sourceMounted:e.source.getAttribute(o),nativeAriaHidden:e.nativeInput.getAttribute("aria-hidden"),nativeTabIndex:e.nativeInput.getAttribute("tabindex"),nativeMarker:e.nativeInput.getAttribute(l),nativeHadClass:e.nativeInput.classList.contains(a),onProxyInput:()=>{},onProxyChange:()=>{},onProxyKeydown:()=>{},onNativeInput:()=>{}};n.onProxyInput=()=>this.forwardProxyValue(n,"input"),n.onProxyChange=()=>this.forwardProxyValue(n,"change"),n.onProxyKeydown=e=>{if("Enter"!==e.key||n.proxyInput.disabled)return;let t=n.nativeInput.closest(".lia-quiz"),i=t?t.querySelector(".lia-quiz__check:not([disabled])"):null;i&&"function"==typeof i.click&&(e.preventDefault(),i.click())},n.onNativeInput=()=>this.syncBinding(n),this.bindings.set(e.uid,n),this.retainContainer(e.container),e.container.appendChild(t),e.source.setAttribute(o,"true"),e.source.setAttribute("aria-hidden","true"),e.nativeInput.classList.add(a),e.nativeInput.setAttribute(l,e.uid),e.nativeInput.setAttribute("aria-hidden","true"),e.nativeInput.setAttribute("tabindex","-1"),t.addEventListener("input",n.onProxyInput),t.addEventListener("change",n.onProxyChange),t.addEventListener("keydown",n.onProxyKeydown),e.nativeInput.addEventListener("input",n.onNativeInput),e.nativeInput.addEventListener("change",n.onNativeInput);let i=this.win.MutationObserver;i&&(n.inputObserver=new i(()=>this.syncBinding(n)),n.inputObserver.observe(e.nativeInput,{attributes:!0,attributeFilter:["class","disabled","value","aria-invalid"]}),e.formula.shadowRoot&&(n.shadowObserver=new i(()=>this.scheduleScan()),n.shadowObserver.observe(e.formula.shadowRoot,{childList:!0,subtree:!0})));let r=this.win.ResizeObserver;if(r){n.resizeObserver=new r(()=>this.layoutBinding(n));try{n.resizeObserver.observe(e.formula),n.resizeObserver.observe(e.slot),n.resizeObserver.observe(e.container)}catch(e){}}this.syncBinding(n),this.layoutBinding(n),this.scheduleFollowUp(40,()=>this.layoutBinding(n)),this.scheduleFollowUp(160,()=>this.layoutBinding(n))}forwardProxyValue(e,t){if(!e.nativeInput.isConnected||e.nativeInput.disabled)return void this.syncBinding(e);e.nativeInput.value=e.proxyInput.value;let n=this.win.Event;e.nativeInput.dispatchEvent(new n(t,{bubbles:!0,cancelable:!1})),this.scheduleFollowUp(0,()=>this.syncBinding(e))}syncBinding(e){if(!e.nativeInput.isConnected||!e.proxyInput.isConnected)return void this.scheduleScan();e.proxyInput.value!==e.nativeInput.value&&(e.proxyInput.value=e.nativeInput.value),e.proxyInput.disabled=e.nativeInput.disabled,u(e.nativeInput,e.proxyInput),e.nativeInput.classList.contains(a)||e.nativeInput.classList.add(a),e.nativeInput.getAttribute(l)!==e.uid&&e.nativeInput.setAttribute(l,e.uid);let t=e.nativeInput.getAttribute("aria-invalid");null===t?e.proxyInput.removeAttribute("aria-invalid"):e.proxyInput.setAttribute("aria-invalid",t)}layoutBinding(e){if(!e.slot.isConnected||!e.container.isConnected||!e.proxyInput.isConnected)return void this.scheduleScan();let t=e.slot.getBoundingClientRect(),n=e.container.getBoundingClientRect();if(t.width<=0||t.height<=0||n.width<=0){e.proxyInput.style.visibility="hidden";return}let i=16;try{let t=parseFloat(this.win.getComputedStyle(e.slot).fontSize);Number.isFinite(t)&&t>0&&(i=t)}catch(e){}let r=Math.max(t.width,1.8*i);e.proxyInput.style.width=`${r}px`,e.proxyInput.style.removeProperty("height"),e.proxyInput.style.removeProperty("font-size");let s=e.proxyInput.getBoundingClientRect().height,a=s>0?s:Math.max(32,1.8*i),l=t.left-n.left-e.container.clientLeft+e.container.scrollLeft,o=t.top-n.top-e.container.clientTop+e.container.scrollTop+(t.height-a)/2;e.proxyInput.style.left=`${l}px`,e.proxyInput.style.top=`${o}px`,e.proxyInput.style.visibility="visible"}layoutAll(){for(let e of Array.from(this.bindings.values()))this.layoutBinding(e)}syncAll(){for(let e of Array.from(this.bindings.values()))this.syncBinding(e)}disposeBinding(e){e.proxyInput.removeEventListener("input",e.onProxyInput),e.proxyInput.removeEventListener("change",e.onProxyChange),e.proxyInput.removeEventListener("keydown",e.onProxyKeydown),e.nativeInput.removeEventListener("input",e.onNativeInput),e.nativeInput.removeEventListener("change",e.onNativeInput),e.inputObserver&&e.inputObserver.disconnect(),e.shadowObserver&&e.shadowObserver.disconnect(),e.resizeObserver&&e.resizeObserver.disconnect(),e.proxyInput.parentNode&&e.proxyInput.parentNode.removeChild(e.proxyInput),e.source.isConnected&&(null===e.sourceMounted?e.source.removeAttribute(o):e.source.setAttribute(o,e.sourceMounted),null===e.sourceAriaHidden?e.source.removeAttribute("aria-hidden"):e.source.setAttribute("aria-hidden",e.sourceAriaHidden)),e.nativeInput.isConnected&&(e.nativeHadClass||e.nativeInput.classList.remove(a),null===e.nativeMarker?e.nativeInput.removeAttribute(l):e.nativeInput.setAttribute(l,e.nativeMarker),null===e.nativeAriaHidden?e.nativeInput.removeAttribute("aria-hidden"):e.nativeInput.setAttribute("aria-hidden",e.nativeAriaHidden),null===e.nativeTabIndex?e.nativeInput.removeAttribute("tabindex"):e.nativeInput.setAttribute("tabindex",e.nativeTabIndex)),this.releaseContainer(e.container)}destroy(){if(this.installed){for(let e of(this.installed=!1,this.observer&&this.observer.disconnect(),this.observer=null,this.doc.removeEventListener("click",this.onDocumentClick,!0),this.win.removeEventListener("resize",this.onWindowResize),null!==this.frameId&&"function"==typeof this.win.cancelAnimationFrame&&this.win.cancelAnimationFrame(this.frameId),this.frameId=null,this.scanScheduled=!1,this.timers))this.win.clearTimeout(e);for(let e of(this.timers=[],Array.from(this.bindings.values())))this.disposeBinding(e);this.bindings.clear()}}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],dmo3N:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"injectStyleOnce",()=>a);var s=e("./constants");function a(e){if(!e||!e.head||e.getElementById(s.STYLE_ID))return;let t=e.createElement("style");t.id=s.STYLE_ID,t.textContent=`
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

.fq-native-quiz-source {
  display: none !important;
}

.lia-quiz.fq-native-quiz > .lia-quiz__answers > input.lia-quiz__input,
.lia-quiz.fq-native-quiz > .lia-quiz__answers > .icon {
  display: none !important;
}

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
  `.trim(),e.head.appendChild(t)}},{"./constants":"7NbOs","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],cswaT:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"installDebugDomObserver",()=>m),r.export(n,"FQStore",()=>g);var s=e("./constants"),a=e("./fraction"),l=e("./renderer");let o="data-fq-quiz-native",u="fq-native-quiz",c="__fqClickInstalled";function d(e,...t){if(s.DEBUG_FQ)try{console.log("[FQDBG]",e,...t)}catch(e){}}function p(e,t){let n="de"===function(){let e=[];try{let t=window,n=t.LIA||t.lia;n&&("string"==typeof n.language&&e.push(n.language),n.settings&&"string"==typeof n.settings.language&&e.push(n.settings.language),"string"==typeof n.lang&&e.push(n.lang))}catch(e){}try{document.documentElement&&e.push(document.documentElement.lang||"")}catch(e){}try{if(navigator.languages)for(let t=0;t<navigator.languages.length;t++)e.push(navigator.languages[t]||"");navigator.language&&e.push(navigator.language)}catch(e){}for(let t of e){let e=t.trim().toLowerCase().split("-")[0];if(e)return e}return"de"}()?{subdivisions:"Unterteilungen",rows:"Zeilen",cols:"Spalten"}:{subdivisions:"Subdivisions",rows:"Rows",cols:"Columns"};if("circle"===t){let t=document.getElementById("fq-circle-range-"+e);t&&t.setAttribute("data-label",n.subdivisions)}if("rect"===t){let t=document.getElementById("fq-rect-rows-wrap-"+e),i=document.getElementById("fq-rect-cols-wrap-"+e);t&&t.setAttribute("data-label",n.rows),i&&i.setAttribute("data-label",n.cols)}}function h(e){if(!e)return"(null)";if(1!==e.nodeType)return"("+e.nodeName+")";let t=e.id?"#"+e.id:"",n=e.className&&"string"==typeof e.className?"."+e.className.trim().replace(/\s+/g,"."):"";return e.tagName.toLowerCase()+t+n}function f(e){if(!e||1!==e.nodeType)return!1;if(e.id&&/^fq-/.test(e.id)||e.classList&&(e.classList.contains("fq-widget")||e.classList.contains("fq-mount")||e.classList.contains("fq-range")))return!0;try{return!!e.querySelector('[id^="fq-"], .fq-widget, .fq-mount, .fq-range')}catch(e){return!1}}function m(e,t){if(!s.DEBUG_FQ||e[t]||"u"<typeof MutationObserver)return;let n=document,i=n.body||n.documentElement;if(!i)return;let r=new MutationObserver(e=>{for(let t of e){if("childList"!==t.type)continue;let e=[],n=[];t.addedNodes.forEach(t=>{f(t)&&e.push(h(t))}),t.removedNodes.forEach(e=>{f(e)&&n.push(h(e))}),(e.length||n.length)&&d("dom-mutation",{target:h(t.target),added:e,removed:n})}});r.observe(i,{childList:!0,subtree:!0}),e[t]=r,d("debug-dom-observer-installed")}class g{getWidget(e,t){return e=String(null==e?"":e),this.widgets[e]||(this.widgets[e]={meta:{uid:e,kind:t||"",target:{num:0,den:1,value:0,raw:"0"},locked:!1,solved:!1,revealed:!1,ready:!1},nodes:{uid:e,kind:"",wrap:null,host:null,mount:null,circleInput:null,rowsInput:null,colsInput:null,quizSource:null,quizInput:null,observer:null,_quizObserver:null,_quizScope:null,_quizClickHandler:null,_quizBridgeInstalled:!1},state:[]}),t&&(this.widgets[e].meta.kind=t),this.widgets[e]}meta(e){return this.getWidget(e).meta}nodes(e){return this.getWidget(e).nodes}state(e){return this.getWidget(e).state}getDims(e){let t=this.getWidget(e);return t.dims||{rows:t.meta.rows||1,cols:t.meta.cols||1}}findQuizBinding(e){let t=Array.from(document.querySelectorAll(".fq-native-quiz-source[data-fq-quiz]")),n=t.findIndex(t=>t.getAttribute("data-fq-quiz")===e);if(n<0)return null;let i=t[n],r=i.closest(".lia-quiz"),s=r?r.querySelector("input.lia-quiz__input"):null;if(r&&s)return{source:i,input:s,scope:r};let a=document.defaultView||window,l=a.Node&&a.Node.DOCUMENT_POSITION_FOLLOWING||4,o=t[n+1]||null,u=i.closest(".lia-slide__content");for(let e of Array.from(document.querySelectorAll("input.lia-quiz__input:not(.lia-math-quiz-proxy)"))){let t=e.closest(".lia-quiz");if(t&&(!u||e.closest(".lia-slide__content")===u)&&i.compareDocumentPosition(e)&l&&(!o||e.compareDocumentPosition(o)&l))return{source:i,input:e,scope:t}}return null}refreshQuizBinding(e){let t=this.nodes(e),n=this.findQuizBinding(e);return n?(t.quizInput&&t.quizInput!==n.input&&t.quizInput.isConnected&&t.quizInput.removeAttribute(o),t._quizScope&&t._quizScope!==n.scope&&t._quizScope.isConnected&&(t._quizScope.classList.remove(u),t._quizScope.removeAttribute("data-fq-quiz")),t.quizSource=n.source,t.quizInput=n.input,n.input.setAttribute(o,e),n.scope.classList.add(u),n.scope.setAttribute("data-fq-quiz",e),this.ensureQuizBridge(e,n.scope),!0):(t.quizSource&&!t.quizSource.isConnected&&(t.quizSource=null),t.quizInput&&!t.quizInput.isConnected&&(t.quizInput=null),!1)}syncQuizInput(e){let t=this.nodes(e),n=t.quizInput,i=t.quizSource;if(!n||!i||!n.isConnected||n.disabled)return;let r=i.getAttribute("data-fq-answer")||`fqok${e}`,s=this.isCorrect(e)?r:`fqno${e}`;if(n.value===s)return;n.value=s;let a=n.ownerDocument.defaultView||window;n.dispatchEvent(new a.Event("input",{bubbles:!0})),n.dispatchEvent(new a.Event("change",{bubbles:!0}))}bindRangeInput(e,t,n,i){e[t]!==n&&(e[t]=n,e.addEventListener("input",i,!0),e.addEventListener("change",i,!0))}refreshNodes(e){e=String(null==e?"":e);let t=this.getWidget(e).nodes,n=t.wrap,i=t.host,r=t.mount,s=t.circleInput,a=t.rowsInput,l=t.colsInput,o=document.getElementById("fq-circle-wrap-"+e),u=document.getElementById("fq-rect-wrap-"+e);if(o){t.kind="circle",t.wrap=o,t.host=document.getElementById("fq-circle-host-"+e),t.mount=document.getElementById("fq-circle-mount-"+e);let n=document.getElementById("fq-circle-range-"+e);t.circleInput=n?n.querySelector('input[type="range"]'):null,t.rowsInput=null,t.colsInput=null}else if(u){t.kind="rect",t.wrap=u,t.host=document.getElementById("fq-rect-host-"+e),t.mount=document.getElementById("fq-rect-mount-"+e);let n=document.getElementById("fq-rect-rows-wrap-"+e),i=document.getElementById("fq-rect-cols-wrap-"+e);t.rowsInput=n?n.querySelector('input[type="range"]'):null,t.colsInput=i?i.querySelector('input[type="range"]'):null,t.circleInput=null}else t.wrap=null,t.host=null,t.mount=null,t.circleInput=null,t.rowsInput=null,t.colsInput=null;return n&&n!==t.wrap&&d("wrap-replaced",e,t.kind,h(t.wrap)),!n&&t.wrap&&d("wrap-found",e,t.kind,h(t.wrap)),i&&i!==t.host&&d("host-replaced",e,t.kind,h(t.host)),r&&r!==t.mount&&d("mount-replaced",e,t.kind,h(t.mount)),s&&s!==t.circleInput&&d("circle-input-replaced",e),a&&a!==t.rowsInput&&d("rows-input-replaced",e),l&&l!==t.colsInput&&d("cols-input-replaced",e),t.circleInput&&this.bindCircleInput(e,t.circleInput),(t.rowsInput||t.colsInput)&&this.bindRectInputs(e,t.rowsInput,t.colsInput),p(e,t.kind),t.wrap&&this.installClickDelegation(e,t.wrap),this.refreshQuizBinding(e),t}installClickDelegation(e,t){t[c]||(t[c]=!0,t.addEventListener("click",t=>{if(this.getWidget(e).meta.locked)return;let n=t.target&&t.target.closest?t.target.closest("[data-fq-part]"):null;if(!n)return;let i=parseInt(n.getAttribute("data-fq-part")||"",10);Number.isFinite(i)&&(this.toggle(e,i),this.render(e))},!0))}installDomObserver(e,t){let n=this.nodes(e);if(n.observer||"u"<typeof MutationObserver)return;let i=new MutationObserver(()=>{this.refreshNodes(e),this.syncDomState(e),this.render(e)});try{i.observe(t.parentElement||t,{childList:!0,subtree:!1}),n.observer=i}catch(e){}}parseTarget(e){return(0,a.parseFraction)(e)}setTarget(e,t,n){let i=this.getWidget(e,n).meta;return i.target=(0,a.parseFraction)(t),d("setTarget",e,{kind:i.kind,target:i.target}),i.target}ensureCircle(e,t,n){let i=this.getWidget(e,"circle"),r=(0,a.clampInt)(t,1,s.MAX_CIRCLE_PARTS,1),l=i.state.length>0?i.state:[];return i.state=(0,a.boolArray)(r,n?.preserve?l:null),i.meta.parts=r,i.meta.kind="circle",delete i.dims,i.state}ensureRect(e,t,n,i){let r=this.getWidget(e,"rect"),l=(0,a.clampInt)(t,1,s.MAX_RECT_DIM,1),o=(0,a.clampInt)(n,1,s.MAX_RECT_DIM,1),u=r.state.length>0?r.state:[];return r.dims={rows:l,cols:o},r.state=(0,a.boolArray)(l*o,i?.preserve?u:null),r.meta.rows=l,r.meta.cols=o,r.meta.kind="rect",r.state}setCircleParts(e,t,n){return this.getWidget(e,"circle").meta.locked&&!n?.force?this.state(e).length>0?this.state(e):this.ensureCircle(e,1):this.ensureCircle(e,t,n)}setRectDims(e,t,n,i){return this.getWidget(e,"rect").meta.locked&&!i?.force?this.state(e).length>0?this.state(e):this.ensureRect(e,1,1):this.ensureRect(e,t,n,i)}buildCircleSolution(e){let t=(0,a.parseFraction)(e),n=Math.max(1,0|t.den),i=Array(n).fill(!1);for(let e=0;e<Math.min(n,0|t.num);e++)i[e]=!0;return{type:"circle",target:t,parts:n,active:i}}buildRectSolution(e){let t=(0,a.parseFraction)(e),{rows:n,cols:i}=(0,a.bestFactorPair)(t.den),r=n*i,s=Array(r).fill(!1);for(let e=0;e<Math.min(r,0|t.num);e++)s[e]=!0;return{type:"rect",target:t,rows:n,cols:i,active:s}}getSolution(e){let t=this.meta(e);return"circle"===t.kind?this.buildCircleSolution(t.target):"rect"===t.kind?this.buildRectSolution(t.target):null}isLocked(e){return!!this.meta(e).locked}toggle(e,t){let n=this.getWidget(e),{meta:i,state:r}=n;if(i.locked||!i.ready)return!1;0===r.length&&("circle"===i.kind?this.ensureCircle(e,i.parts||1):"rect"===i.kind&&this.ensureRect(e,n.dims?.rows||1,n.dims?.cols||1));let s=0|t;return!(s<0)&&!(s>=n.state.length)&&(n.state[s]=!n.state[s],n.state[s])}countSelected(e){let t=this.state(e);if(!t.length)return 0;let n=0;for(let e=0;e<t.length;e++)t[e]&&n++;return n}countTotal(e){return this.state(e).length||1}isCorrect(e){let t=this.meta(e);if(!t.ready)return!1;let n=t.target||{num:0,den:1};return this.countSelected(e)*n.den==n.num*this.countTotal(e)}lock(e){return this.meta(e).locked=!0,this.syncDomState(e),!0}markSolved(e){let t=this.meta(e);return!!t.ready&&(t.solved=!0,t.revealed=!1,t.locked=!0,this.syncDomState(e),this.render(e),!0)}applySolution(e){let t=this.getWidget(e),n=this.getSolution(e);return n?(d("applySolution:start",e,{kind:t.meta.kind,solution:n}),"circle"===n.type?(this.setCircleParts(e,n.parts,{force:!0,preserve:!1}),t.state=(0,a.boolArray)(n.parts,n.active),t.meta.parts=n.parts):(this.setRectDims(e,n.rows,n.cols,{force:!0,preserve:!1}),t.state=(0,a.boolArray)(n.rows*n.cols,n.active),t.dims={rows:n.rows,cols:n.cols},t.meta.rows=n.rows,t.meta.cols=n.cols),this.syncInputs(e,!0),this.render(e),d("applySolution:end",e,{kind:t.meta.kind}),n):null}markRevealed(e){let t=this.meta(e);return!!t.ready&&(!!t.revealed&&!!t.locked||(t.revealed=!0,t.solved=!1,t.locked=!0,this.applySolution(e),this.syncDomState(e),!0))}register(e,t){let n=t||{},i=n.kind||"",r=this.getWidget(e,i),{meta:l,nodes:o}=r;if(d("register:start",e,{kind:i}),i&&(o.kind=i),n.wrap&&(o.wrap=n.wrap),n.host&&(o.host=n.host),n.mount&&(o.mount=n.mount),n.circleInput&&(o.circleInput=n.circleInput),n.rowsInput&&(o.rowsInput=n.rowsInput),n.colsInput&&(o.colsInput=n.colsInput),void 0!==n.target&&this.setTarget(e,n.target,i||l.kind),"circle"===i)r.state.length>0?(l.parts=r.state.length,l.kind="circle"):this.ensureCircle(e,null!=n.initialParts?n.initialParts:1,{preserve:!1});else if("rect"===i){let t=r.dims;t&&r.state.length===(0,a.clampInt)(t.rows,1,s.MAX_RECT_DIM,1)*(0,a.clampInt)(t.cols,1,s.MAX_RECT_DIM,1)?(l.rows=(0,a.clampInt)(t.rows,1,s.MAX_RECT_DIM,1),l.cols=(0,a.clampInt)(t.cols,1,s.MAX_RECT_DIM,1),l.kind="rect"):this.ensureRect(e,null!=n.initialRows?n.initialRows:1,null!=n.initialCols?n.initialCols:1,{preserve:!1})}return o.circleInput&&this.bindCircleInput(e,o.circleInput),(o.rowsInput||o.colsInput)&&this.bindRectInputs(e,o.rowsInput,o.colsInput),p(e,i||o.kind),l.ready=!0,o.wrap&&(this.installClickDelegation(e,o.wrap),this.installDomObserver(e,o.wrap)),this.refreshQuizBinding(e),this.syncInputs(e,!0),this.syncDomState(e),this.render(e),d("register:end",e,{kind:l.kind}),o}bindCircleInput(e,t){this.bindRangeInput(t,"__fqCircleBoundUid",e,()=>{this.isLocked(e)?this.syncInputs(e,!0):(this.setCircleParts(e,(0,a.clampInt)(t.value,1,s.MAX_CIRCLE_PARTS,1),{preserve:!1}),this.render(e))})}bindRectInputs(e,t,n){t&&this.bindRangeInput(t,"__fqRectRowsBoundUid",e,()=>{if(this.isLocked(e))return void this.syncInputs(e,!0);let i=(0,a.clampInt)(t.value,1,s.MAX_RECT_DIM,1),r=n?(0,a.clampInt)(n.value,1,s.MAX_RECT_DIM,1):this.getDims(e).cols;this.setRectDims(e,i,r,{preserve:!1}),this.render(e)}),n&&this.bindRangeInput(n,"__fqRectColsBoundUid",e,()=>{if(this.isLocked(e))return void this.syncInputs(e,!0);let i=(0,a.clampInt)(n.value,1,s.MAX_RECT_DIM,1),r=t?(0,a.clampInt)(t.value,1,s.MAX_RECT_DIM,1):this.getDims(e).rows;this.setRectDims(e,r,i,{preserve:!1}),this.render(e)})}syncInputs(e,t){let n=this.nodes(e),i=this.getWidget(e),{meta:r}=i;if("circle"===r.kind&&n.circleInput){let e=i.state.length||r.parts||1;(t||String(n.circleInput.value)!==String(e))&&(n.circleInput.value=String(e)),n.circleInput.disabled=!!r.locked}if("rect"===r.kind){let i=this.getDims(e);n.rowsInput&&((t||String(n.rowsInput.value)!==String(i.rows))&&(n.rowsInput.value=String(i.rows)),n.rowsInput.disabled=!!r.locked),n.colsInput&&((t||String(n.colsInput.value)!==String(i.cols))&&(n.colsInput.value=String(i.cols)),n.colsInput.disabled=!!r.locked)}}syncDomState(e){let t=this.nodes(e),n=this.meta(e);for(let e of[t.wrap,t.host,t.mount])e&&e.setAttribute&&(e.setAttribute("data-fq-locked",n.locked?"1":"0"),e.setAttribute("data-fq-solved",n.solved?"1":"0"),e.setAttribute("data-fq-revealed",n.revealed?"1":"0"));this.syncInputs(e,!1),this.syncQuizInput(e)}render(e){let t=this.nodes(e),n=this.meta(e);return!!t.mount&&("circle"===n.kind?this.renderCircle(e,t.mount):"rect"===n.kind&&this.renderRect(e,t.mount))}renderCircle(e,t){let n=this.getWidget(e,"circle"),i=n.state.length>0?n.state:this.ensureCircle(e,n.meta.parts||1);return(0,l.renderCircleSVG)(t,i),this.syncDomState(e),!0}renderRect(e,t){let n=this.getWidget(e,"rect"),i=this.getDims(e),r=n.state.length>0?n.state:this.ensureRect(e,i.rows,i.cols),o=(0,a.clampInt)(i.rows,1,s.MAX_RECT_DIM,1),u=(0,a.clampInt)(i.cols,1,s.MAX_RECT_DIM,1);return(0,l.renderRectSVG)(t,r,o,u),this.syncDomState(e),!0}labelOf(e){if(!e)return"";let t=[];try{t.push(e.textContent||"")}catch(e){}try{e.className&&t.push(String(e.className))}catch(e){}for(let n of["title","aria-label","data-action","data-title","name","value"])try{let i=e.getAttribute&&e.getAttribute(n);i&&t.push(i)}catch(e){}return t.join(" ").replace(/\s+/g," ").trim().toLowerCase()}isRevealButton(e){return/(aufl|aufl[oö]sen|l[oö]sung|show solution|solution|resolve)/i.test(this.labelOf(e))}isCheckButton(e){return!!e&&(!!e.classList.contains("lia-quiz__check")||/(pruefen|check)/i.test(this.labelOf(e)))}looksRevealed(e){if(!e)return!1;if(e.classList.contains("resolved"))return!0;let t=e.querySelector(".lia-quiz__feedback"),n=(t&&t.textContent||"").toLowerCase();return/(aufgel|aufl[oö]s|l[oö]sung|show solution|resolved|solution)/i.test(n)}syncQuizState(e,t){let n=this.meta(e);if(n.ready){if(this.looksRevealed(t)){n.revealed&&n.locked||this.markRevealed(e);return}t.classList.contains("solved")&&(this.isCorrect(e)||this.applySolution(e),n.solved&&n.locked||this.markSolved(e))}}ensureQuizBridge(e,t){let n=this.nodes(e),i=this.meta(e);if(!t)return;if(n._quizBridgeInstalled&&n._quizScope===t&&t.isConnected){this.syncQuizState(e,t),this.syncQuizInput(e);return}if(n._quizObserver){try{n._quizObserver.disconnect()}catch(e){}n._quizObserver=null}if(n._quizScope&&n._quizClickHandler)try{n._quizScope.removeEventListener("click",n._quizClickHandler,!0)}catch(e){}let r=n=>{let r=n.target&&n.target.closest?n.target.closest("button, input[type='button'], input[type='submit']"):null;if(r&&i.ready){if(this.isCheckButton(r)){this.syncQuizInput(e),setTimeout(()=>{this.syncQuizState(e,t)},0);return}this.isRevealButton(r)&&(d("quiz-reveal-click",e,{label:this.labelOf(r)}),setTimeout(()=>{this.markRevealed(e)},0))}};t.addEventListener("click",r,!0);let s=null;if("u">typeof MutationObserver){s=new MutationObserver(()=>{this.syncQuizState(e,t)});try{s.observe(t,{attributes:!0,attributeFilter:["class"],subtree:!1})}catch(e){s=null}}n._quizBridgeInstalled=!0,n._quizScope=t,n._quizClickHandler=r,n._quizObserver=s,this.syncQuizState(e,t),this.syncQuizInput(e)}onCheck(e,t){return t&&this.markSolved(e),!!t}onReveal(e){return this.markRevealed(e)}check(e){return e=String(null==e?"":e),!!this.isCorrect(e)&&(this.isLocked(e)||this.onCheck(e,!0),!0)}mount(e,t,n){e=String(null==e?"":e);let i=`fq-${t}-`,r=!1,s=()=>{if(r)return this.refreshQuizBinding(e),!!this.nodes(e).quizInput;let s=document.getElementById(i+"wrap-"+e),a=document.getElementById(i+"host-"+e),l=document.getElementById(i+"mount-"+e);if("circle"===t){let o=document.getElementById(i+"range-"+e),u=o?o.querySelector('input[type="range"]'):null;if(s&&a&&l&&u)return this.register(e,{kind:t,wrap:s,host:a,mount:l,circleInput:u,target:n,initialParts:u.value||1}),r=!0,!!this.nodes(e).quizInput}else{let o=document.getElementById(i+"rows-wrap-"+e),u=document.getElementById(i+"cols-wrap-"+e),c=o?o.querySelector('input[type="range"]'):null,d=u?u.querySelector('input[type="range"]'):null;if(s&&a&&l&&c&&d)return this.register(e,{kind:t,wrap:s,host:a,mount:l,rowsInput:c,colsInput:d,target:n,initialRows:c.value||1,initialCols:d.value||1}),r=!0,!!this.nodes(e).quizInput}return!1};if(s())return;let a=null,l=null,o=()=>{if(a){try{a.disconnect()}catch(e){}a=null}null!==l&&(clearTimeout(l),l=null)};if("u">typeof MutationObserver){a=new MutationObserver(()=>{s()&&(d("mount-observer-success",e,t),o())});let n=document.body||document.documentElement;if(n)try{a.observe(n,{childList:!0,subtree:!0})}catch(e){a=null}}l=setTimeout(()=>{s()?d("mount-fallback-success",e,t):d("mount-timeout",e,t,"elements not found"),o()},250)}mountCircle(e,t){this.mount(e,"circle",t)}mountRect(e,t){this.mount(e,"rect",t)}getAllWidgets(){let e=Object.create(null);for(let t in this.widgets){let n=this.widgets[t];e[t]={state:n.state.slice(),meta:{uid:n.meta.uid,kind:n.meta.kind,solved:n.meta.solved,revealed:n.meta.revealed,locked:n.meta.locked,ready:n.meta.ready}}}return e}destroy(){for(let e in this.widgets){let t=this.widgets[e].nodes;if(t.observer){try{t.observer.disconnect()}catch(e){}t.observer=null}if(t._quizObserver){try{t._quizObserver.disconnect()}catch(e){}t._quizObserver=null}if(t._quizScope&&t._quizClickHandler)try{t._quizScope.removeEventListener("click",t._quizClickHandler,!0)}catch(e){}t.quizInput&&t.quizInput.removeAttribute(o),t._quizScope&&(t._quizScope.classList.remove(u),t._quizScope.removeAttribute("data-fq-quiz")),t._quizBridgeInstalled=!1}}constructor(){this.widgets=Object.create(null),this.version=4}}},{"./constants":"7NbOs","./fraction":"ef3jW","./renderer":"lGVry","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],ef3jW:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function s(e,t,n,i){let r=parseInt(String(e),10);return Number.isFinite(r)||(r=i),Number.isFinite(r)||(r=t),r<t&&(r=t),r>n&&(r=n),0|r}function a(e,t){for(e=Math.abs(0|e),t=Math.abs(0|t);t;){let n=e%t;e=t,t=n}return e||1}function l(e){let t=String(null==e?"":e).trim().replace(",",".");if(!t)return{num:0,den:1};if(/e/i.test(t)){let e=Number(t);return Number.isFinite(e)?l(e.toFixed(12).replace(/0+$/,"").replace(/\.$/,"")):{num:0,den:1}}if(!/^[-+]?\d*(?:\.\d+)?$/.test(t))return{num:0,den:1};let n=t.startsWith("-")?-1:1,i=t.replace(/^[-+]/,"").split("."),r=i[0]||"0",s=i[1]||"";if(!s)return{num:n*parseInt(r,10),den:1};let a=Math.pow(10,s.length);return{num:n*(parseInt(r,10)*a+parseInt(s,10)),den:a}}function o(e){let t=0,n=1;if(e&&"object"==typeof e&&Number.isFinite(e.num)&&Number.isFinite(e.den))t=e.num,n=e.den;else if("number"==typeof e){let i=l(String(e));t=i.num,n=i.den}else{let i=String(null==e?"":e).trim().replace(/^\((.*)\)$/,"$1").trim();if(i.includes("/")){let e=i.match(/^\s*([-+]?\d+)\s*\/\s*([-+]?\d+)\s*$/);if(e)t=parseInt(e[1],10),n=parseInt(e[2],10);else{let e=l(i);t=e.num,n=e.den}}else{let e=l(i);t=e.num,n=e.den}}Number.isFinite(t)||(t=0),Number.isFinite(n)&&0!==n||(n=1),n<0&&(t=-t,n=-n);let i=a(t,n);return(t/=i)<0&&(t=0),t>(n/=i)&&(t=n),{num:t,den:n,value:n?t/n:0,raw:e}}function u(e){let t=1,n=e=Math.max(1,0|e),i=Math.abs(n-t);for(let r=1;r*r<=e;r++){if(e%r!=0)continue;let s=e/r,a=Math.abs(s-r);a<i&&(t=r,n=s,i=a)}return{cols:Math.min(t,n),rows:Math.max(t,n)}}function c(e,t){let n=Math.max(1,0|e),i=Array(n).fill(!1);if(Array.isArray(t))for(let e=0;e<Math.min(n,t.length);e++)i[e]=!!t[e];return i}r.defineInteropFlag(n),r.export(n,"clampInt",()=>s),r.export(n,"gcd",()=>a),r.export(n,"parseFraction",()=>o),r.export(n,"bestFactorPair",()=>u),r.export(n,"boolArray",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],lGVry:[function(e,t,n,i){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"renderCircleSVG",()=>u),r.export(n,"renderRectSVG",()=>c);var s=e("./constants");let a="http://www.w3.org/2000/svg";function l(e){return document.createElementNS(a,e)}function o(e,t){for(let n in t)e.setAttribute(n,t[n])}function u(e,t){let n=s.SVG_SIZE,i=s.SVG_SIZE,r=s.SVG_PADDING,u=n/2,c=i/2,d=Math.min(n,i)/2-r,p=Math.max(1,0|t.length),h=360/p,f=l("svg");o(f,{class:"fq-svg",viewBox:`0 0 ${n} ${i}`,xmlns:a,width:String(n),height:String(i),"aria-hidden":"true"});let m=l("circle");if(o(m,{cx:String(u),cy:String(c),r:String(d),stroke:"#000000","stroke-width":"2",fill:"#ffffff"}),f.appendChild(m),1===p){let e=l("circle");o(e,{"data-fq-part":"0",class:"fq-clickable",cx:String(u),cy:String(c),r:String(d),fill:t[0]?"var(--fq-mark)":"transparent"}),f.appendChild(e)}else for(let e=0;e<p;e++){let n=(-90+h*e)*Math.PI/180,i=(-90+h*(e+1))*Math.PI/180,r=u+d*Math.cos(n),s=c+d*Math.sin(n),a=u+d*Math.cos(i),p=c+d*Math.sin(i),m=+(h>180),g=l("path");o(g,{"data-fq-part":String(e),class:"fq-clickable",d:`M ${u},${c} L ${r},${s} A ${d},${d} 0 ${m},1 ${a},${p} Z`,fill:t[e]?"var(--fq-mark)":"transparent"}),f.appendChild(g);let v=l("line");o(v,{x1:String(u),y1:String(c),x2:String(r),y2:String(s),stroke:"#000000","stroke-width":"2"}),f.appendChild(v)}let g=l("circle");o(g,{cx:String(u),cy:String(c),r:String(d),stroke:"#000000","stroke-width":"2",fill:"none"}),f.appendChild(g),e.textContent="",e.appendChild(f)}function c(e,t,n,i){let r=s.SVG_SIZE,u=s.SVG_SIZE,c=s.SVG_PADDING,d=(r-2*c)/i,p=(u-2*c)/n,h=l("svg");o(h,{class:"fq-svg",viewBox:`0 0 ${r} ${u}`,xmlns:a,width:String(r),height:String(u),"aria-hidden":"true"});let f=l("rect");o(f,{x:"0",y:"0",width:String(r),height:String(u),fill:"#ffffff",stroke:"#000000","stroke-width":"2"}),h.appendChild(f);for(let e=0;e<n;e++)for(let n=0;n<i;n++){let r=e*i+n,s=l("rect");o(s,{"data-fq-part":String(r),class:"fq-clickable",x:String(c+n*d),y:String(c+e*p),width:String(d),height:String(p),fill:t[r]?"var(--fq-mark)":"transparent"}),h.appendChild(s)}for(let e=0;e<=n;e++){let t=c+e*p,n=l("line");o(n,{x1:String(c),y1:String(t),x2:String(r-c),y2:String(t),stroke:"#000000","stroke-width":"2"}),h.appendChild(n)}for(let e=0;e<=i;e++){let t=c+e*d,n=l("line");o(n,{x1:String(t),y1:String(c),x2:String(t),y2:String(u-c),stroke:"#000000","stroke-width":"2"}),h.appendChild(n)}e.textContent="",e.appendChild(h)}},{"./constants":"7NbOs","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}]},["8RSWf"],"8RSWf","parcelRequire9430",{});
//# sourceMappingURL=index.js.map
