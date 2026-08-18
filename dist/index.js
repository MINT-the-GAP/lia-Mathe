!function(t,e,i,n,r){var s="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},l="function"==typeof s[n]&&s[n],a=l.i||{},o=l.cache||{},u="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(e,i){if(!o[e]){if(!t[e]){if(r[e])return r[e];var a="function"==typeof s[n]&&s[n];if(!i&&a)return a(e,!0);if(l)return l(e,!0);if(u&&"string"==typeof e)return u(e);var d=Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}p.resolve=function(i){var n=t[e][1][i];return null!=n?n:i},p.cache={};var h=o[e]=new c.Module(e);t[e][0].call(h.exports,p,h,h.exports,s)}return o[e].exports;function p(t){var e=p.resolve(t);if(!1===e)return{};if(Array.isArray(e)){var i={__esModule:!0};return e.forEach(function(t){var e=t[0],n=t[1],r=t[2]||t[0],s=c(n);"*"===e?Object.keys(s).forEach(function(t){"default"===t||"__esModule"===t||Object.prototype.hasOwnProperty.call(i,t)||Object.defineProperty(i,t,{enumerable:!0,get:function(){return s[t]}})}):"*"===r?Object.defineProperty(i,e,{enumerable:!0,value:s}):Object.defineProperty(i,e,{enumerable:!0,get:function(){return"default"===r?s.__esModule?s.default:s:s[r]}})}),i}return c(e)}}c.isParcelRequire=!0,c.Module=function(t){this.id=t,this.bundle=c,this.require=u,this.exports={}},c.modules=t,c.cache=o,c.parent=l,c.distDir=void 0,c.publicUrl=void 0,c.devServer=void 0,c.i=a,c.register=function(e,i){t[e]=[function(t,e){e.exports=i},{}]},Object.defineProperty(c,"root",{get:function(){return s[n]}}),s[n]=c;for(var d=0;d<e.length;d++)c(e[d]);if(i){var h=c(i);"object"==typeof exports&&"u">typeof module?module.exports=h:"function"==typeof define&&define.amd&&define(function(){return h})}}({"8RSWf":[function(t,e,i,n){var r=t("./constants"),s=t("./mathQuiz"),l=t("./tally"),a=t("./style"),o=t("./store");function u(){let t=window;for(;;)try{let e=t.parent;if(!e||e===t)break;e.document,t=e}catch(t){break}return t}function c(){let t=u();try{if(t&&t.document)return t.document}catch(t){}return document}let d=u(),h=window,p=c(),f=document,m="__LIA_TALLY_RENDERERS__",g=d[m];function b(t){if(g.byDocument.has(t))return;let e=new(0,l.TallyRenderer)(t);g.byDocument.set(t,e),g.all.add(e),e.install()}g&&g.byDocument&&g.all||(g={byDocument:new WeakMap,all:new Set},d[m]=g),b(p),f!==p&&b(f);let v=d[r.MATH_QUIZ_KEY];v||(v=new(0,s.MathQuizBridge)(c()),d[r.MATH_QUIZ_KEY]=v),v.install(),(0,a.injectStyleOnce)(p),f!==p&&(0,a.injectStyleOnce)(f),(0,o.installDebugDomObserver)(d,r.DEBUG_OBSERVER_KEY);let y=d[r.STORE_KEY];function q(t=f){let e=y.byDocument.get(t);return e||(e=new(0,o.FQStore)(t),y.byDocument.set(t,e),y.all.add(e)),(0,a.injectStyleOnce)(t),e}y&&y.byDocument&&"function"==typeof y.byDocument.get&&y.all&&"function"==typeof y.all.add||(y={byDocument:new WeakMap,all:new Set},d[r.STORE_KEY]=y),q();let w={mountCircle:(t,e,i)=>q(i?.ownerDocument||f).mountCircle(t,e),mountRect:(t,e,i)=>q(i?.ownerDocument||f).mountRect(t,e),check:(t,e)=>q(e?.ownerDocument||f).check(t),onReveal:(t,e)=>q(e?.ownerDocument||f).onReveal(t),getAllWidgets:t=>q(t?.ownerDocument||f).getAllWidgets(),destroy:()=>{y.all.forEach(t=>t.destroy());let t=d[r.DEBUG_OBSERVER_KEY];if(t&&"function"==typeof t.disconnect){try{t.disconnect()}catch(t){}d[r.DEBUG_OBSERVER_KEY]=null}}};d.__LIA_FRACTION_QUIZ__=w,h.__LIA_FRACTION_QUIZ__=w;let I={refresh:()=>v.refresh(),destroy:()=>v.destroy()};d.__LIA_MATH_QUIZ__=I,h.__LIA_MATH_QUIZ__=I},{"./constants":"7NbOs","./mathQuiz":"i1zoi","./style":"dmo3N","./store":"cswaT","./tally":"4HdXj"}],"7NbOs":[function(t,e,i,n){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(i),r.export(i,"MATH_QUIZ_KEY",()=>s),r.export(i,"STORE_KEY",()=>l),r.export(i,"STYLE_ID",()=>a),r.export(i,"DEBUG_OBSERVER_KEY",()=>o),r.export(i,"SVG_SIZE",()=>u),r.export(i,"SVG_PADDING",()=>c),r.export(i,"MAX_CIRCLE_PARTS",()=>d),r.export(i,"MAX_RECT_DIM",()=>h),r.export(i,"MOUNT_TIMEOUT_MS",()=>p),r.export(i,"DEBUG_FQ",()=>f);let s="__LIA_MATH_QUIZ_V1__",l="__LIA_FRACTION_QUIZ_V5__",a="__LIA_FRACTION_QUIZ_STYLE_V8__",o="__LIA_FQ_DEBUG_DOM_OBSERVER_V1__",u=200,c=6,d=32,h=20,p=5e3,f=!1},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],k3151:[function(t,e,i,n){i.interopDefault=function(t){return t&&t.__esModule?t:{default:t}},i.defineInteropFlag=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.exportAll=function(t,e){return Object.keys(t).forEach(function(i){"default"===i||"__esModule"===i||Object.prototype.hasOwnProperty.call(e,i)||Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[i]}})}),e},i.export=function(t,e,i){Object.defineProperty(t,e,{enumerable:!0,get:i})}},{}],i1zoi:[function(t,e,i,n){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(i),r.export(i,"MathQuizBridge",()=>c);let s="lia-math-quiz-proxy",l="lia-math-quiz-native",a="data-lia-math-quiz-native",o="data-lia-math-quiz-mounted";function u(t,e){let i=new Set(["lia-input","lia-quiz__input",s,l]);e.className=["lia-input","lia-quiz__input",s].concat(Array.from(t.classList).filter(t=>!i.has(t))).join(" ")}class c{constructor(t){this.bindings=new Map,this.containers=new Map,this.observer=null,this.installed=!1,this.scanScheduled=!1,this.frameId=null,this.timers=[],this.onDocumentClick=t=>{var e;let i;e=t.target,((i=e&&e.closest?e:null)?i.closest(".lia-quiz__check, .lia-quiz__resolve"):null)&&(this.scheduleFollowUp(0,()=>{this.scheduleScan(),this.syncAll()}),this.scheduleFollowUp(80,()=>{this.scheduleScan(),this.syncAll()}))},this.onWindowResize=()=>{this.layoutAll()},this.doc=t,this.win=t.defaultView||window}install(){if(this.installed)return;this.installed=!0;let t=this.win.MutationObserver,e=this.doc.body||this.doc.documentElement;t&&e&&(this.observer=new t(()=>this.scheduleScan()),this.observer.observe(e,{childList:!0,subtree:!0})),this.doc.addEventListener("click",this.onDocumentClick,!0),this.win.addEventListener("resize",this.onWindowResize),this.scheduleScan(),this.scheduleFollowUp(50),this.scheduleFollowUp(250);let i=this.doc.fonts;i&&i.ready&&"function"==typeof i.ready.then&&i.ready.then(()=>{this.installed&&this.layoutAll()})}refresh(){this.scheduleScan()}scheduleScan(){if(!this.installed||this.scanScheduled)return;this.scanScheduled=!0;let t=()=>{this.scanScheduled=!1,this.frameId=null,this.installed&&this.scan()};"function"==typeof this.win.requestAnimationFrame?this.frameId=this.win.requestAnimationFrame(t):this.scheduleFollowUp(0,t)}scheduleFollowUp(t,e){let i=this.win.setTimeout(()=>{this.timers=this.timers.filter(t=>t!==i),this.installed&&(e?e():(this.scan(),this.layoutAll()))},t);this.timers.push(i)}slotsOf(t){let e=t.shadowRoot;return e?Array.from(e.querySelectorAll(".lia-math-quiz-slot")).map(e=>({formula:t,slot:e})):[]}inputAfter(t,e,i,n){let r=this.win.Node&&this.win.Node.DOCUMENT_POSITION_FOLLOWING||4,s=t.closest(".lia-slide__content");for(let l of i)if(!n.has(l)&&l.closest(".lia-quiz")&&s===l.closest(".lia-slide__content")&&t.compareDocumentPosition(l)&r&&(!e||l.compareDocumentPosition(e)&r))return l;return null}desiredBindings(){let t=new Map,e=new Set,i=[],n=Array.from(this.doc.querySelectorAll("lia-formula, .lia-math-quiz-source[data-lia-math-quiz]")).filter(t=>!t.closest(".lia-quiz")),r=Array.from(this.doc.querySelectorAll(`input.lia-quiz__input:not(.${s})`));for(let s=0;s<n.length;s++){let l=n[s];if(l.matches("lia-formula")){i=this.slotsOf(l);continue}let a=l.getAttribute("data-lia-math-quiz")||"",o=this.inputAfter(l,n[s+1]||null,r,e),u=i[0],c=l.closest(".lia-slide__content"),d=u?u.formula.closest(".lia-slide__content"):null;u&&c!==d?(i=[],u=void 0):u=i.shift(),a&&o&&u&&u.formula.parentElement&&(e.add(o),t.set(a,{uid:a,source:l,nativeInput:o,formula:u.formula,slot:u.slot,container:u.formula.parentElement}))}return t}scan(){let t=this.desiredBindings();for(let[e,i]of Array.from(this.bindings.entries())){let n=t.get(e);n&&n.source===i.source&&n.nativeInput===i.nativeInput&&n.formula===i.formula&&n.slot===i.slot&&n.container===i.container&&i.source.isConnected&&i.proxyInput.isConnected||(this.disposeBinding(i),this.bindings.delete(e))}for(let[e,i]of Array.from(t.entries())){let t=this.bindings.get(e);if(t){this.syncBinding(t);continue}this.createBinding(i)}this.layoutAll()}retainContainer(t){let e=this.containers.get(t);if(e)return void e.count++;let i="";try{i=this.win.getComputedStyle(t).position}catch(t){}let n=!i||"static"===i,r=t.style.position;n&&(t.style.position="relative"),this.containers.set(t,{count:1,changedPosition:n,previousPosition:r})}releaseContainer(t){let e=this.containers.get(t);!e||(e.count--,e.count>0||(e.changedPosition&&"relative"===t.style.position&&(t.style.position=e.previousPosition),this.containers.delete(t)))}createBinding(t){let e=this.doc.createElement("input");e.type="text",e.placeholder=t.nativeInput.placeholder||"?",e.autocomplete="off",e.spellcheck=!1,e.style.visibility="hidden",e.setAttribute("data-lia-math-quiz-proxy",t.uid),e.setAttribute("aria-label",t.nativeInput.getAttribute("aria-label")||"quiz answer"),u(t.nativeInput,e);let i={...t,proxyInput:e,inputObserver:null,shadowObserver:null,resizeObserver:null,sourceAriaHidden:t.source.getAttribute("aria-hidden"),sourceMounted:t.source.getAttribute(o),nativeAriaHidden:t.nativeInput.getAttribute("aria-hidden"),nativeTabIndex:t.nativeInput.getAttribute("tabindex"),nativeMarker:t.nativeInput.getAttribute(a),nativeHadClass:t.nativeInput.classList.contains(l),onProxyInput:()=>{},onProxyChange:()=>{},onProxyKeydown:()=>{},onNativeInput:()=>{}};i.onProxyInput=()=>this.forwardProxyValue(i,"input"),i.onProxyChange=()=>this.forwardProxyValue(i,"change"),i.onProxyKeydown=t=>{if("Enter"!==t.key||i.proxyInput.disabled)return;let e=i.nativeInput.closest(".lia-quiz"),n=e?e.querySelector(".lia-quiz__check:not([disabled])"):null;n&&"function"==typeof n.click&&(t.preventDefault(),n.click())},i.onNativeInput=()=>this.syncBinding(i),this.bindings.set(t.uid,i),this.retainContainer(t.container),t.container.appendChild(e),t.source.setAttribute(o,"true"),t.source.setAttribute("aria-hidden","true"),t.nativeInput.classList.add(l),t.nativeInput.setAttribute(a,t.uid),t.nativeInput.setAttribute("aria-hidden","true"),t.nativeInput.setAttribute("tabindex","-1"),e.addEventListener("input",i.onProxyInput),e.addEventListener("change",i.onProxyChange),e.addEventListener("keydown",i.onProxyKeydown),t.nativeInput.addEventListener("input",i.onNativeInput),t.nativeInput.addEventListener("change",i.onNativeInput);let n=this.win.MutationObserver;n&&(i.inputObserver=new n(()=>this.syncBinding(i)),i.inputObserver.observe(t.nativeInput,{attributes:!0,attributeFilter:["class","disabled","value","aria-invalid"]}),t.formula.shadowRoot&&(i.shadowObserver=new n(()=>this.scheduleScan()),i.shadowObserver.observe(t.formula.shadowRoot,{childList:!0,subtree:!0})));let r=this.win.ResizeObserver;if(r){i.resizeObserver=new r(()=>this.layoutBinding(i));try{i.resizeObserver.observe(t.formula),i.resizeObserver.observe(t.slot),i.resizeObserver.observe(t.container)}catch(t){}}this.syncBinding(i),this.layoutBinding(i),this.scheduleFollowUp(40,()=>this.layoutBinding(i)),this.scheduleFollowUp(160,()=>this.layoutBinding(i))}forwardProxyValue(t,e){if(!t.nativeInput.isConnected||t.nativeInput.disabled)return void this.syncBinding(t);t.nativeInput.value=t.proxyInput.value;let i=this.win.Event;t.nativeInput.dispatchEvent(new i(e,{bubbles:!0,cancelable:!1})),this.scheduleFollowUp(0,()=>this.syncBinding(t))}syncBinding(t){if(!t.nativeInput.isConnected||!t.proxyInput.isConnected)return void this.scheduleScan();t.proxyInput.value!==t.nativeInput.value&&(t.proxyInput.value=t.nativeInput.value),t.proxyInput.disabled=t.nativeInput.disabled,u(t.nativeInput,t.proxyInput),t.nativeInput.classList.contains(l)||t.nativeInput.classList.add(l),t.nativeInput.getAttribute(a)!==t.uid&&t.nativeInput.setAttribute(a,t.uid);let e=t.nativeInput.getAttribute("aria-invalid");null===e?t.proxyInput.removeAttribute("aria-invalid"):t.proxyInput.setAttribute("aria-invalid",e)}layoutBinding(t){if(!t.slot.isConnected||!t.container.isConnected||!t.proxyInput.isConnected)return void this.scheduleScan();let e=t.slot.getBoundingClientRect(),i=t.container.getBoundingClientRect();if(e.width<=0||e.height<=0||i.width<=0){t.proxyInput.style.visibility="hidden";return}let n=16;try{let e=parseFloat(this.win.getComputedStyle(t.slot).fontSize);Number.isFinite(e)&&e>0&&(n=e)}catch(t){}let r=Math.max(e.width,1.8*n);t.proxyInput.style.width=`${r}px`,t.proxyInput.style.removeProperty("height"),t.proxyInput.style.removeProperty("font-size");let s=t.proxyInput.getBoundingClientRect().height,l=s>0?s:Math.max(32,1.8*n),a=e.left-i.left-t.container.clientLeft+t.container.scrollLeft,o=e.top-i.top-t.container.clientTop+t.container.scrollTop+(e.height-l)/2;t.proxyInput.style.left=`${a}px`,t.proxyInput.style.top=`${o}px`,t.proxyInput.style.visibility="visible"}layoutAll(){for(let t of Array.from(this.bindings.values()))this.layoutBinding(t)}syncAll(){for(let t of Array.from(this.bindings.values()))this.syncBinding(t)}disposeBinding(t){t.proxyInput.removeEventListener("input",t.onProxyInput),t.proxyInput.removeEventListener("change",t.onProxyChange),t.proxyInput.removeEventListener("keydown",t.onProxyKeydown),t.nativeInput.removeEventListener("input",t.onNativeInput),t.nativeInput.removeEventListener("change",t.onNativeInput),t.inputObserver&&t.inputObserver.disconnect(),t.shadowObserver&&t.shadowObserver.disconnect(),t.resizeObserver&&t.resizeObserver.disconnect(),t.proxyInput.parentNode&&t.proxyInput.parentNode.removeChild(t.proxyInput),t.source.isConnected&&(null===t.sourceMounted?t.source.removeAttribute(o):t.source.setAttribute(o,t.sourceMounted),null===t.sourceAriaHidden?t.source.removeAttribute("aria-hidden"):t.source.setAttribute("aria-hidden",t.sourceAriaHidden)),t.nativeInput.isConnected&&(t.nativeHadClass||t.nativeInput.classList.remove(l),null===t.nativeMarker?t.nativeInput.removeAttribute(a):t.nativeInput.setAttribute(a,t.nativeMarker),null===t.nativeAriaHidden?t.nativeInput.removeAttribute("aria-hidden"):t.nativeInput.setAttribute("aria-hidden",t.nativeAriaHidden),null===t.nativeTabIndex?t.nativeInput.removeAttribute("tabindex"):t.nativeInput.setAttribute("tabindex",t.nativeTabIndex)),this.releaseContainer(t.container)}destroy(){if(this.installed){for(let t of(this.installed=!1,this.observer&&this.observer.disconnect(),this.observer=null,this.doc.removeEventListener("click",this.onDocumentClick,!0),this.win.removeEventListener("resize",this.onWindowResize),null!==this.frameId&&"function"==typeof this.win.cancelAnimationFrame&&this.win.cancelAnimationFrame(this.frameId),this.frameId=null,this.scanScheduled=!1,this.timers))this.win.clearTimeout(t);for(let t of(this.timers=[],Array.from(this.bindings.values())))this.disposeBinding(t);this.bindings.clear()}}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],dmo3N:[function(t,e,i,n){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(i),r.export(i,"injectStyleOnce",()=>l);var s=t("./constants");function l(t){if(!t||!t.head||t.getElementById(s.STYLE_ID))return;let e=t.createElement("style");e.id=s.STYLE_ID,e.textContent=`
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

  --fq-svg-size: 200px;
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

.lia-tally {
  display: inline-block;
  max-width: 100%;
  line-height: 1;
  vertical-align: -0.12em;
  white-space: nowrap;
}

.lia-tally > svg {
  display: block;
  width: auto;
  height: 1em;
  max-width: 100%;
  overflow: visible;
  color: inherit;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: square;
  vector-effect: non-scaling-stroke;
}

.fq-native-quiz-source {
  display: none !important;
}

.lia-quiz.fq-native-quiz > .lia-quiz__answers > input.lia-quiz__input,
.lia-quiz.fq-native-quiz > .lia-quiz__answers > .icon {
  display: none !important;
}

.fq-mount {
  display: block;
  width: var(--fq-w);
  max-width: 100%;
}

.fq-mount svg {
  display: block;
  width: var(--fq-svg-size);
  height: auto;
  aspect-ratio: 1;
  max-width: 100%;
  margin-inline: auto;
  flex: none;
}

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
  `.trim(),t.head.appendChild(e)}},{"./constants":"7NbOs","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],cswaT:[function(t,e,i,n){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(i),r.export(i,"installDebugDomObserver",()=>m),r.export(i,"FQStore",()=>g);var s=t("./constants"),l=t("./fraction"),a=t("./renderer");let o="data-fq-quiz-native",u="fq-native-quiz",c="__fqClickInstalled";function d(t,...e){if(s.DEBUG_FQ)try{console.log("[FQDBG]",t,...e)}catch(t){}}function h(t,e,i){let n="de"===function(t){let e=[];try{let t=window,i=t.LIA||t.lia;i&&("string"==typeof i.language&&e.push(i.language),i.settings&&"string"==typeof i.settings.language&&e.push(i.settings.language),"string"==typeof i.lang&&e.push(i.lang))}catch(t){}try{t.documentElement&&e.push(t.documentElement.lang||"")}catch(t){}try{if(navigator.languages)for(let t=0;t<navigator.languages.length;t++)e.push(navigator.languages[t]||"");navigator.language&&e.push(navigator.language)}catch(t){}for(let t of e){let e=t.trim().toLowerCase().split("-")[0];if(e)return e}return"de"}(t)?{subdivisions:"Unterteilungen",rows:"Zeilen",cols:"Spalten"}:{subdivisions:"Subdivisions",rows:"Rows",cols:"Columns"};if("circle"===i){let i=t.getElementById("fq-circle-range-"+e);i&&i.setAttribute("data-label",n.subdivisions)}if("rect"===i){let i=t.getElementById("fq-rect-rows-wrap-"+e),r=t.getElementById("fq-rect-cols-wrap-"+e);i&&i.setAttribute("data-label",n.rows),r&&r.setAttribute("data-label",n.cols)}}function p(t){if(!t)return"(null)";if(1!==t.nodeType)return"("+t.nodeName+")";let e=t.id?"#"+t.id:"",i=t.className&&"string"==typeof t.className?"."+t.className.trim().replace(/\s+/g,"."):"";return t.tagName.toLowerCase()+e+i}function f(t){if(!t||1!==t.nodeType)return!1;if(t.id&&/^fq-/.test(t.id)||t.classList&&(t.classList.contains("fq-widget")||t.classList.contains("fq-mount")||t.classList.contains("fq-range")))return!0;try{return!!t.querySelector('[id^="fq-"], .fq-widget, .fq-mount, .fq-range')}catch(t){return!1}}function m(t,e){if(!s.DEBUG_FQ||t[e]||"u"<typeof MutationObserver)return;let i=document,n=i.body||i.documentElement;if(!n)return;let r=new MutationObserver(t=>{for(let e of t){if("childList"!==e.type)continue;let t=[],i=[];e.addedNodes.forEach(e=>{f(e)&&t.push(p(e))}),e.removedNodes.forEach(t=>{f(t)&&i.push(p(t))}),(t.length||i.length)&&d("dom-mutation",{target:p(e.target),added:t,removed:i})}});r.observe(n,{childList:!0,subtree:!0}),t[e]=r,d("debug-dom-observer-installed")}class g{constructor(t=document){this.doc=t,this.widgets=Object.create(null),this.domObserver=null,this.mountAttempts=Object.create(null),this.destroyed=!1,this.version=5}getWidget(t,e){return t=String(null==t?"":t),this.widgets[t]||(this.widgets[t]={meta:{uid:t,kind:e||"",target:{num:0,den:1,value:0,raw:"0"},locked:!1,solved:!1,revealed:!1,ready:!1},nodes:{uid:t,kind:"",wrap:null,host:null,mount:null,circleInput:null,rowsInput:null,colsInput:null,quizSource:null,quizInput:null,_quizObserver:null,_quizScope:null,_quizClickHandler:null,_quizBridgeInstalled:!1},state:[]}),e&&(this.widgets[t].meta.kind=e),this.widgets[t]}meta(t){return this.getWidget(t).meta}nodes(t){return this.getWidget(t).nodes}state(t){return this.getWidget(t).state}getDims(t){let e=this.getWidget(t);return e.dims||{rows:e.meta.rows||1,cols:e.meta.cols||1}}findQuizBinding(t){let e=Array.from(this.doc.querySelectorAll(".fq-native-quiz-source[data-fq-quiz]")),i=e.findIndex(e=>e.getAttribute("data-fq-quiz")===t);if(i<0)return null;let n=e[i],r=n.closest(".lia-quiz"),s=r?r.querySelector("input.lia-quiz__input"):null;if(r&&s)return{source:n,input:s,scope:r};let l=this.doc.defaultView||window,a=l.Node&&l.Node.DOCUMENT_POSITION_FOLLOWING||4,o=e[i+1]||null,u=n.closest(".lia-slide__content");for(let t of Array.from(this.doc.querySelectorAll("input.lia-quiz__input:not(.lia-math-quiz-proxy)"))){let e=t.closest(".lia-quiz");if(e&&(!u||t.closest(".lia-slide__content")===u)&&n.compareDocumentPosition(t)&a&&(!o||t.compareDocumentPosition(o)&a))return{source:n,input:t,scope:e}}return null}refreshQuizBinding(t){let e=this.nodes(t),i=this.findQuizBinding(t);return i?(e.quizInput&&e.quizInput!==i.input&&e.quizInput.isConnected&&e.quizInput.removeAttribute(o),e._quizScope&&e._quizScope!==i.scope&&e._quizScope.isConnected&&(e._quizScope.classList.remove(u),e._quizScope.removeAttribute("data-fq-quiz")),e.quizSource=i.source,e.quizInput=i.input,i.input.setAttribute(o,t),i.scope.classList.add(u),i.scope.setAttribute("data-fq-quiz",t),this.ensureQuizBridge(t,i.scope),!0):(e.quizSource&&!e.quizSource.isConnected&&(e.quizSource=null),e.quizInput&&!e.quizInput.isConnected&&(e.quizInput=null),!1)}syncQuizInput(t){let e=this.nodes(t),i=e.quizInput,n=e.quizSource;if(!i||!n||!i.isConnected||i.disabled)return;let r=n.getAttribute("data-fq-answer")||`fqok${t}`,s=this.isCorrect(t)?r:`fqno${t}`;if(i.value===s)return;i.value=s;let l=i.ownerDocument.defaultView||window;i.dispatchEvent(new l.Event("input",{bubbles:!0})),i.dispatchEvent(new l.Event("change",{bubbles:!0}))}bindRangeInput(t,e,i,n){t[e]!==i&&(t[e]=i,t.addEventListener("input",n,!0),t.addEventListener("change",n,!0))}refreshNodes(t){t=String(null==t?"":t);let e=this.getWidget(t).nodes,i=e.wrap,n=e.host,r=e.mount,s=e.circleInput,l=e.rowsInput,a=e.colsInput,o=this.doc.getElementById("fq-circle-wrap-"+t),u=this.doc.getElementById("fq-rect-wrap-"+t);if(o){e.kind="circle",e.wrap=o,e.host=this.doc.getElementById("fq-circle-host-"+t),e.mount=this.doc.getElementById("fq-circle-mount-"+t);let i=this.doc.getElementById("fq-circle-range-"+t);e.circleInput=i?i.querySelector('input[type="range"]'):null,e.rowsInput=null,e.colsInput=null}else if(u){e.kind="rect",e.wrap=u,e.host=this.doc.getElementById("fq-rect-host-"+t),e.mount=this.doc.getElementById("fq-rect-mount-"+t);let i=this.doc.getElementById("fq-rect-rows-wrap-"+t),n=this.doc.getElementById("fq-rect-cols-wrap-"+t);e.rowsInput=i?i.querySelector('input[type="range"]'):null,e.colsInput=n?n.querySelector('input[type="range"]'):null,e.circleInput=null}else e.wrap=null,e.host=null,e.mount=null,e.circleInput=null,e.rowsInput=null,e.colsInput=null;return i&&i!==e.wrap&&d("wrap-replaced",t,e.kind,p(e.wrap)),!i&&e.wrap&&d("wrap-found",t,e.kind,p(e.wrap)),n&&n!==e.host&&d("host-replaced",t,e.kind,p(e.host)),r&&r!==e.mount&&d("mount-replaced",t,e.kind,p(e.mount)),s&&s!==e.circleInput&&d("circle-input-replaced",t),l&&l!==e.rowsInput&&d("rows-input-replaced",t),a&&a!==e.colsInput&&d("cols-input-replaced",t),e.circleInput&&this.bindCircleInput(t,e.circleInput),(e.rowsInput||e.colsInput)&&this.bindRectInputs(t,e.rowsInput,e.colsInput),h(this.doc,t,e.kind),e.wrap&&(this.installClickDelegation(t,e.wrap),this.installDomObserver()),this.refreshQuizBinding(t),e}installClickDelegation(t,e){e[c]||(e[c]=!0,e.addEventListener("click",e=>{if(this.getWidget(t).meta.locked)return;let i=e.target&&e.target.closest?e.target.closest("[data-fq-part]"):null;if(!i)return;let n=parseInt(i.getAttribute("data-fq-part")||"",10);Number.isFinite(n)&&(this.toggle(t,n),this.render(t))},!0))}installDomObserver(){if(this.domObserver||"u"<typeof MutationObserver)return;let t=new MutationObserver(()=>{for(let t in this.widgets)this.refreshNodes(t),this.syncDomState(t),this.hasHealthyRender(t)||this.render(t)});try{t.observe(this.doc,{childList:!0,subtree:!0}),this.domObserver=t}catch(t){}}hasHealthyRender(t){let e=this.nodes(t).mount;if(!e||!e.isConnected)return!1;let i=this.getWidget(t),n=e.querySelectorAll(":scope > svg.fq-svg");if(1!==n.length)return!1;let r=n[0],s=r.getAttribute("data-fq-kind"),l=parseInt(r.getAttribute("data-fq-parts")||"",10);if(s!==i.meta.kind||l!==i.state.length||r.querySelectorAll("[data-fq-part]").length!==i.state.length)return!1;if("circle"===s){let t=1===i.state.length?3:2,e=1===i.state.length?0:i.state.length;return r.querySelectorAll("circle").length===t&&r.querySelectorAll("line").length===e}let a=this.getDims(t);return parseInt(r.getAttribute("data-fq-rows")||"",10)===a.rows&&parseInt(r.getAttribute("data-fq-cols")||"",10)===a.cols&&r.querySelectorAll("rect").length===i.state.length+1&&r.querySelectorAll("line").length===a.rows+a.cols+2}parseTarget(t){return(0,l.parseFraction)(t)}setTarget(t,e,i){let n=this.getWidget(t,i).meta;return n.target=(0,l.parseFraction)(e),d("setTarget",t,{kind:n.kind,target:n.target}),n.target}ensureCircle(t,e,i){let n=this.getWidget(t,"circle"),r=(0,l.clampInt)(e,1,s.MAX_CIRCLE_PARTS,1),a=n.state.length>0?n.state:[];return n.state=(0,l.boolArray)(r,i?.preserve?a:null),n.meta.parts=r,n.meta.kind="circle",delete n.dims,n.state}ensureRect(t,e,i,n){let r=this.getWidget(t,"rect"),a=(0,l.clampInt)(e,1,s.MAX_RECT_DIM,1),o=(0,l.clampInt)(i,1,s.MAX_RECT_DIM,1),u=r.state.length>0?r.state:[];return r.dims={rows:a,cols:o},r.state=(0,l.boolArray)(a*o,n?.preserve?u:null),r.meta.rows=a,r.meta.cols=o,r.meta.kind="rect",r.state}setCircleParts(t,e,i){return this.getWidget(t,"circle").meta.locked&&!i?.force?this.state(t).length>0?this.state(t):this.ensureCircle(t,1):this.ensureCircle(t,e,i)}setRectDims(t,e,i,n){return this.getWidget(t,"rect").meta.locked&&!n?.force?this.state(t).length>0?this.state(t):this.ensureRect(t,1,1):this.ensureRect(t,e,i,n)}buildCircleSolution(t){let e=(0,l.parseFraction)(t),i=Math.max(1,0|e.den),n=Array(i).fill(!1);for(let t=0;t<Math.min(i,0|e.num);t++)n[t]=!0;return{type:"circle",target:e,parts:i,active:n}}buildRectSolution(t){let e=(0,l.parseFraction)(t),{rows:i,cols:n}=(0,l.bestFactorPair)(e.den),r=i*n,s=Array(r).fill(!1);for(let t=0;t<Math.min(r,0|e.num);t++)s[t]=!0;return{type:"rect",target:e,rows:i,cols:n,active:s}}getSolution(t){let e=this.meta(t);return"circle"===e.kind?this.buildCircleSolution(e.target):"rect"===e.kind?this.buildRectSolution(e.target):null}isLocked(t){return!!this.meta(t).locked}toggle(t,e){let i=this.getWidget(t),{meta:n,state:r}=i;if(n.locked||!n.ready)return!1;0===r.length&&("circle"===n.kind?this.ensureCircle(t,n.parts||1):"rect"===n.kind&&this.ensureRect(t,i.dims?.rows||1,i.dims?.cols||1));let s=0|e;return!(s<0)&&!(s>=i.state.length)&&(i.state[s]=!i.state[s],i.state[s])}countSelected(t){let e=this.state(t);if(!e.length)return 0;let i=0;for(let t=0;t<e.length;t++)e[t]&&i++;return i}countTotal(t){return this.state(t).length||1}isCorrect(t){let e=this.meta(t);if(!e.ready)return!1;let i=e.target||{num:0,den:1};return this.countSelected(t)*i.den==i.num*this.countTotal(t)}lock(t){return this.meta(t).locked=!0,this.syncDomState(t),!0}markSolved(t){let e=this.meta(t);return!!e.ready&&(e.solved=!0,e.revealed=!1,e.locked=!0,this.syncDomState(t),this.render(t),!0)}applySolution(t){let e=this.getWidget(t),i=this.getSolution(t);return i?(d("applySolution:start",t,{kind:e.meta.kind,solution:i}),"circle"===i.type?(this.setCircleParts(t,i.parts,{force:!0,preserve:!1}),e.state=(0,l.boolArray)(i.parts,i.active),e.meta.parts=i.parts):(this.setRectDims(t,i.rows,i.cols,{force:!0,preserve:!1}),e.state=(0,l.boolArray)(i.rows*i.cols,i.active),e.dims={rows:i.rows,cols:i.cols},e.meta.rows=i.rows,e.meta.cols=i.cols),this.syncInputs(t,!0),this.render(t),d("applySolution:end",t,{kind:e.meta.kind}),i):null}markRevealed(t){let e=this.meta(t);return!!e.ready&&(!!e.revealed&&!!e.locked||(e.revealed=!0,e.solved=!1,e.locked=!0,this.applySolution(t),this.syncDomState(t),!0))}register(t,e){let i=e||{},n=i.kind||"",r=this.getWidget(t,n),{meta:a,nodes:o}=r;if(d("register:start",t,{kind:n}),n&&(o.kind=n),i.wrap&&(o.wrap=i.wrap),i.host&&(o.host=i.host),i.mount&&(o.mount=i.mount),i.circleInput&&(o.circleInput=i.circleInput),i.rowsInput&&(o.rowsInput=i.rowsInput),i.colsInput&&(o.colsInput=i.colsInput),void 0!==i.target&&this.setTarget(t,i.target,n||a.kind),"circle"===n)r.state.length>0?(a.parts=r.state.length,a.kind="circle"):this.ensureCircle(t,null!=i.initialParts?i.initialParts:1,{preserve:!1});else if("rect"===n){let e=r.dims;e&&r.state.length===(0,l.clampInt)(e.rows,1,s.MAX_RECT_DIM,1)*(0,l.clampInt)(e.cols,1,s.MAX_RECT_DIM,1)?(a.rows=(0,l.clampInt)(e.rows,1,s.MAX_RECT_DIM,1),a.cols=(0,l.clampInt)(e.cols,1,s.MAX_RECT_DIM,1),a.kind="rect"):this.ensureRect(t,null!=i.initialRows?i.initialRows:1,null!=i.initialCols?i.initialCols:1,{preserve:!1})}return o.circleInput&&this.bindCircleInput(t,o.circleInput),(o.rowsInput||o.colsInput)&&this.bindRectInputs(t,o.rowsInput,o.colsInput),h(this.doc,t,n||o.kind),a.ready=!0,o.wrap&&(this.installClickDelegation(t,o.wrap),this.installDomObserver()),this.refreshQuizBinding(t),this.syncInputs(t,!0),this.syncDomState(t),this.render(t),d("register:end",t,{kind:a.kind}),o}bindCircleInput(t,e){this.bindRangeInput(e,"__fqCircleBoundUid",t,()=>{this.isLocked(t)?this.syncInputs(t,!0):(this.setCircleParts(t,(0,l.clampInt)(e.value,1,s.MAX_CIRCLE_PARTS,1),{preserve:!1}),this.render(t))})}bindRectInputs(t,e,i){e&&this.bindRangeInput(e,"__fqRectRowsBoundUid",t,()=>{if(this.isLocked(t))return void this.syncInputs(t,!0);let n=(0,l.clampInt)(e.value,1,s.MAX_RECT_DIM,1),r=i?(0,l.clampInt)(i.value,1,s.MAX_RECT_DIM,1):this.getDims(t).cols;this.setRectDims(t,n,r,{preserve:!1}),this.render(t)}),i&&this.bindRangeInput(i,"__fqRectColsBoundUid",t,()=>{if(this.isLocked(t))return void this.syncInputs(t,!0);let n=(0,l.clampInt)(i.value,1,s.MAX_RECT_DIM,1),r=e?(0,l.clampInt)(e.value,1,s.MAX_RECT_DIM,1):this.getDims(t).rows;this.setRectDims(t,r,n,{preserve:!1}),this.render(t)})}syncInputs(t,e){let i=this.nodes(t),n=this.getWidget(t),{meta:r}=n;if("circle"===r.kind&&i.circleInput){let t=n.state.length||r.parts||1;(e||String(i.circleInput.value)!==String(t))&&(i.circleInput.value=String(t)),i.circleInput.disabled=!!r.locked}if("rect"===r.kind){let n=this.getDims(t);i.rowsInput&&((e||String(i.rowsInput.value)!==String(n.rows))&&(i.rowsInput.value=String(n.rows)),i.rowsInput.disabled=!!r.locked),i.colsInput&&((e||String(i.colsInput.value)!==String(n.cols))&&(i.colsInput.value=String(n.cols)),i.colsInput.disabled=!!r.locked)}}syncDomState(t){let e=this.nodes(t),i=this.meta(t);for(let t of[e.wrap,e.host,e.mount])t&&t.setAttribute&&(t.setAttribute("data-fq-locked",i.locked?"1":"0"),t.setAttribute("data-fq-solved",i.solved?"1":"0"),t.setAttribute("data-fq-revealed",i.revealed?"1":"0"));this.syncInputs(t,!1),this.syncQuizInput(t)}render(t){let e=this.nodes(t),i=this.meta(t);return!!e.mount&&("circle"===i.kind?this.renderCircle(t,e.mount):"rect"===i.kind&&this.renderRect(t,e.mount))}renderCircle(t,e){let i=this.getWidget(t,"circle"),n=i.state.length>0?i.state:this.ensureCircle(t,i.meta.parts||1);return(0,a.renderCircleSVG)(e,n),this.syncDomState(t),!0}renderRect(t,e){let i=this.getWidget(t,"rect"),n=this.getDims(t),r=i.state.length>0?i.state:this.ensureRect(t,n.rows,n.cols),s=Math.max(1,Math.floor(Number(n.rows)||1)),l=Math.max(1,Math.floor(Number(n.cols)||1));return(0,a.renderRectSVG)(e,r,s,l),this.syncDomState(t),!0}labelOf(t){if(!t)return"";let e=[];try{e.push(t.textContent||"")}catch(t){}try{t.className&&e.push(String(t.className))}catch(t){}for(let i of["title","aria-label","data-action","data-title","name","value"])try{let n=t.getAttribute&&t.getAttribute(i);n&&e.push(n)}catch(t){}return e.join(" ").replace(/\s+/g," ").trim().toLowerCase()}isRevealButton(t){return/(aufl|aufl[oö]sen|l[oö]sung|show solution|solution|resolve)/i.test(this.labelOf(t))}isCheckButton(t){return!!t&&(!!t.classList.contains("lia-quiz__check")||/(pruefen|check)/i.test(this.labelOf(t)))}looksRevealed(t){if(!t)return!1;if(t.classList.contains("resolved"))return!0;let e=t.querySelector(".lia-quiz__feedback"),i=(e&&e.textContent||"").toLowerCase();return/(aufgel|aufl[oö]s|l[oö]sung|show solution|resolved|solution)/i.test(i)}syncQuizState(t,e){let i=this.meta(t);if(i.ready){if(this.looksRevealed(e)){i.revealed&&i.locked||this.markRevealed(t);return}e.classList.contains("solved")&&(this.isCorrect(t)||this.applySolution(t),i.solved&&i.locked||this.markSolved(t))}}ensureQuizBridge(t,e){let i=this.nodes(t),n=this.meta(t);if(!e)return;if(i._quizBridgeInstalled&&i._quizScope===e&&e.isConnected){this.syncQuizState(t,e),this.syncQuizInput(t);return}if(i._quizObserver){try{i._quizObserver.disconnect()}catch(t){}i._quizObserver=null}if(i._quizScope&&i._quizClickHandler)try{i._quizScope.removeEventListener("click",i._quizClickHandler,!0)}catch(t){}let r=i=>{let r=i.target&&i.target.closest?i.target.closest("button, input[type='button'], input[type='submit']"):null;if(r&&n.ready){if(this.isCheckButton(r)){this.syncQuizInput(t),setTimeout(()=>{this.syncQuizState(t,e)},0);return}this.isRevealButton(r)&&(d("quiz-reveal-click",t,{label:this.labelOf(r)}),setTimeout(()=>{this.markRevealed(t)},0))}};e.addEventListener("click",r,!0);let s=null;if("u">typeof MutationObserver){s=new MutationObserver(()=>{this.syncQuizState(t,e)});try{s.observe(e,{attributes:!0,attributeFilter:["class"],subtree:!1})}catch(t){s=null}}i._quizBridgeInstalled=!0,i._quizScope=e,i._quizClickHandler=r,i._quizObserver=s,this.syncQuizState(t,e),this.syncQuizInput(t)}onCheck(t,e){return e&&this.markSolved(t),!!e}onReveal(t){return this.markRevealed(t)}check(t){return t=String(null==t?"":t),!!this.isCorrect(t)&&(this.isLocked(t)||this.onCheck(t,!0),!0)}mount(t,e,i){t=String(null==t?"":t),this.destroyed=!1,this.mountAttempts[t]&&this.mountAttempts[t]();let n=`fq-${e}-`,r=!1,l=()=>{if(r)return this.refreshQuizBinding(t),!!this.nodes(t).quizInput;let s=this.doc.getElementById(n+"wrap-"+t),l=this.doc.getElementById(n+"host-"+t),a=this.doc.getElementById(n+"mount-"+t);if("circle"===e){let o=this.doc.getElementById(n+"range-"+t),u=o?o.querySelector('input[type="range"]'):null;if(s&&l&&a&&u)return this.register(t,{kind:e,wrap:s,host:l,mount:a,circleInput:u,target:i,initialParts:u.value||1}),r=!0,!!this.nodes(t).quizInput}else{let o=this.doc.getElementById(n+"rows-wrap-"+t),u=this.doc.getElementById(n+"cols-wrap-"+t),c=o?o.querySelector('input[type="range"]'):null,d=u?u.querySelector('input[type="range"]'):null;if(s&&l&&a&&c&&d)return this.register(t,{kind:e,wrap:s,host:l,mount:a,rowsInput:c,colsInput:d,target:i,initialRows:c.value||1,initialCols:d.value||1}),r=!0,!!this.nodes(t).quizInput}return!1};if(l())return;let a=null,o=null,u=()=>{if(a){try{a.disconnect()}catch(t){}a=null}null!==o&&(clearTimeout(o),o=null),this.mountAttempts[t]===u&&delete this.mountAttempts[t]};if(this.mountAttempts[t]=u,"u">typeof MutationObserver){a=new MutationObserver(()=>{if(this.destroyed)return u();l()&&(d("mount-observer-success",t,e),u())});let i=this.doc.body||this.doc.documentElement;if(i)try{a.observe(i,{childList:!0,subtree:!0})}catch(t){a=null}}o=setTimeout(()=>{if(this.destroyed)return u();l()?d("mount-fallback-success",t,e):d("mount-timeout",t,e,"elements not found"),u()},s.MOUNT_TIMEOUT_MS)}mountCircle(t,e){this.mount(t,"circle",e)}mountRect(t,e){this.mount(t,"rect",e)}getAllWidgets(){let t=Object.create(null);for(let e in this.widgets){let i=this.widgets[e];t[e]={state:i.state.slice(),meta:{uid:i.meta.uid,kind:i.meta.kind,solved:i.meta.solved,revealed:i.meta.revealed,locked:i.meta.locked,ready:i.meta.ready}}}return t}destroy(){for(let t in this.destroyed=!0,this.mountAttempts)this.mountAttempts[t]();if(this.domObserver){try{this.domObserver.disconnect()}catch(t){}this.domObserver=null}for(let t in this.widgets){let e=this.widgets[t].nodes;if(e._quizObserver){try{e._quizObserver.disconnect()}catch(t){}e._quizObserver=null}if(e._quizScope&&e._quizClickHandler)try{e._quizScope.removeEventListener("click",e._quizClickHandler,!0)}catch(t){}e.quizInput&&e.quizInput.removeAttribute(o),e._quizScope&&(e._quizScope.classList.remove(u),e._quizScope.removeAttribute("data-fq-quiz")),e._quizBridgeInstalled=!1}}}},{"./constants":"7NbOs","./fraction":"ef3jW","./renderer":"lGVry","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],ef3jW:[function(t,e,i,n){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");function s(t,e,i,n){let r=parseInt(String(t),10);return Number.isFinite(r)||(r=n),Number.isFinite(r)||(r=e),r<e&&(r=e),r>i&&(r=i),0|r}function l(t,e){for(t=Math.abs(0|t),e=Math.abs(0|e);e;){let i=t%e;t=e,e=i}return t||1}function a(t){let e=String(null==t?"":t).trim().replace(",",".");if(!e)return{num:0,den:1};if(/e/i.test(e)){let t=Number(e);return Number.isFinite(t)?a(t.toFixed(12).replace(/0+$/,"").replace(/\.$/,"")):{num:0,den:1}}if(!/^[-+]?\d*(?:\.\d+)?$/.test(e))return{num:0,den:1};let i=e.startsWith("-")?-1:1,n=e.replace(/^[-+]/,"").split("."),r=n[0]||"0",s=n[1]||"";if(!s)return{num:i*parseInt(r,10),den:1};let l=Math.pow(10,s.length);return{num:i*(parseInt(r,10)*l+parseInt(s,10)),den:l}}function o(t){let e=0,i=1;if(t&&"object"==typeof t&&Number.isFinite(t.num)&&Number.isFinite(t.den))e=t.num,i=t.den;else if("number"==typeof t){let n=a(String(t));e=n.num,i=n.den}else{let n=String(null==t?"":t).trim().replace(/^\((.*)\)$/,"$1").trim();if(n.includes("/")){let t=n.match(/^\s*([-+]?\d+)\s*\/\s*([-+]?\d+)\s*$/);if(t)e=parseInt(t[1],10),i=parseInt(t[2],10);else{let t=a(n);e=t.num,i=t.den}}else{let t=a(n);e=t.num,i=t.den}}Number.isFinite(e)||(e=0),Number.isFinite(i)&&0!==i||(i=1),i<0&&(e=-e,i=-i);let n=l(e,i);return(e/=n)<0&&(e=0),e>(i/=n)&&(e=i),{num:e,den:i,value:i?e/i:0,raw:t}}function u(t){let e=1,i=t=Math.max(1,0|t),n=Math.abs(i-e);for(let r=1;r*r<=t;r++){if(t%r!=0)continue;let s=t/r,l=Math.abs(s-r);l<n&&(e=r,i=s,n=l)}return{cols:Math.min(e,i),rows:Math.max(e,i)}}function c(t,e){let i=Math.max(1,0|t),n=Array(i).fill(!1);if(Array.isArray(e))for(let t=0;t<Math.min(i,e.length);t++)n[t]=!!e[t];return n}r.defineInteropFlag(i),r.export(i,"clampInt",()=>s),r.export(i,"gcd",()=>l),r.export(i,"parseFraction",()=>o),r.export(i,"bestFactorPair",()=>u),r.export(i,"boolArray",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],lGVry:[function(t,e,i,n){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(i),r.export(i,"renderCircleSVG",()=>u),r.export(i,"renderRectSVG",()=>c);var s=t("./constants");let l="http://www.w3.org/2000/svg";function a(t,e){return t.ownerDocument.createElementNS(l,e)}function o(t,e){for(let i in e)t.setAttribute(i,e[i])}function u(t,e){let i=s.SVG_SIZE,n=s.SVG_SIZE,r=s.SVG_PADDING,u=i/2,c=n/2,d=Math.min(i,n)/2-r,h=Math.max(1,0|e.length),p=360/h,f=a(t,"svg");o(f,{class:"fq-svg",viewBox:`0 0 ${i} ${n}`,xmlns:l,width:String(i),height:String(n),"aria-hidden":"true","data-fq-kind":"circle","data-fq-parts":String(h)});let m=a(t,"circle");if(o(m,{cx:String(u),cy:String(c),r:String(d),stroke:"#000000","stroke-width":"2",fill:"#ffffff"}),f.appendChild(m),1===h){let i=a(t,"circle");o(i,{"data-fq-part":"0",class:"fq-clickable",cx:String(u),cy:String(c),r:String(d),fill:e[0]?"var(--fq-mark)":"transparent"}),f.appendChild(i)}else for(let i=0;i<h;i++){let n=(-90+p*i)*Math.PI/180,r=(-90+p*(i+1))*Math.PI/180,s=u+d*Math.cos(n),l=c+d*Math.sin(n),h=u+d*Math.cos(r),m=c+d*Math.sin(r),g=+(p>180),b=a(t,"path");o(b,{"data-fq-part":String(i),class:"fq-clickable",d:`M ${u},${c} L ${s},${l} A ${d},${d} 0 ${g},1 ${h},${m} Z`,fill:e[i]?"var(--fq-mark)":"transparent"}),f.appendChild(b);let v=a(t,"line");o(v,{x1:String(u),y1:String(c),x2:String(s),y2:String(l),stroke:"#000000","stroke-width":"2"}),f.appendChild(v)}let g=a(t,"circle");o(g,{cx:String(u),cy:String(c),r:String(d),stroke:"#000000","stroke-width":"2",fill:"none"}),f.appendChild(g),t.textContent="",t.appendChild(f)}function c(t,e,i,n){let r=s.SVG_SIZE,u=s.SVG_SIZE,c=s.SVG_PADDING,d=(r-2*c)/n,h=(u-2*c)/i,p=a(t,"svg");o(p,{class:"fq-svg",viewBox:`0 0 ${r} ${u}`,xmlns:l,width:String(r),height:String(u),"aria-hidden":"true","data-fq-kind":"rect","data-fq-parts":String(e.length),"data-fq-rows":String(i),"data-fq-cols":String(n)});let f=a(t,"rect");o(f,{x:"0",y:"0",width:String(r),height:String(u),fill:"#ffffff",stroke:"#000000","stroke-width":"2"}),p.appendChild(f);for(let r=0;r<i;r++)for(let i=0;i<n;i++){let s=r*n+i,l=a(t,"rect");o(l,{"data-fq-part":String(s),class:"fq-clickable",x:String(c+i*d),y:String(c+r*h),width:String(d),height:String(h),fill:e[s]?"var(--fq-mark)":"transparent"}),p.appendChild(l)}for(let e=0;e<=i;e++){let i=c+e*h,n=a(t,"line");o(n,{x1:String(c),y1:String(i),x2:String(r-c),y2:String(i),stroke:"#000000","stroke-width":"2"}),p.appendChild(n)}for(let e=0;e<=n;e++){let i=c+e*d,n=a(t,"line");o(n,{x1:String(i),y1:String(c),x2:String(i),y2:String(u-c),stroke:"#000000","stroke-width":"2"}),p.appendChild(n)}t.textContent="",t.appendChild(p)}},{"./constants":"7NbOs","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"4HdXj":[function(t,e,i,n){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(i),r.export(i,"renderTally",()=>o),r.export(i,"TallyRenderer",()=>u);let s="data-lia-tally-rendered";function l(t,e){return t.createElementNS("http://www.w3.org/2000/svg",e)}function a(t){if(null==t||!/^\d+$/.test(t.trim()))return null;let e=Number(t);return Number.isSafeInteger(e)?e:null}function o(t){let e=t.getAttribute("data-lia-tally-count"),i=a(e);if(t.textContent="",null==i)return t.setAttribute(s,`invalid:${null==e?"":e}`),t.setAttribute("role","img"),t.setAttribute("aria-label","Ungültige Strichliste"),!1;let n=function(t){if(0===t)return 1;let e=Math.floor(t/5),i=t%5;return(e-(0===i))*25+(0===i?20:(i-1)*5+4)}(i),r=l(t.ownerDocument,"svg");r.setAttribute("viewBox",`0 0 ${n} 20`),r.setAttribute("width",String(n)),r.setAttribute("height",String(20)),r.setAttribute("aria-hidden","true"),r.setAttribute("focusable","false"),r.setAttribute("data-lia-tally-marks",String(i));let o=Math.floor(i/5),u=i%5;for(let e=0;e<o;e++){let i=25*e;for(let e=0;e<4;e++){let n=i+2+5*e,s=l(t.ownerDocument,"line");s.setAttribute("x1",String(n)),s.setAttribute("y1","2"),s.setAttribute("x2",String(n)),s.setAttribute("y2","18"),s.setAttribute("data-lia-tally-mark","1"),r.appendChild(s)}let n=l(t.ownerDocument,"line");n.setAttribute("x1",String(i)),n.setAttribute("y1","16"),n.setAttribute("x2",String(i+19)),n.setAttribute("y2","4"),n.setAttribute("data-lia-tally-mark","1"),r.appendChild(n)}let c=25*o;for(let e=0;e<u;e++){let i=c+2+5*e,n=l(t.ownerDocument,"line");n.setAttribute("x1",String(i)),n.setAttribute("y1","2"),n.setAttribute("x2",String(i)),n.setAttribute("y2","18"),n.setAttribute("data-lia-tally-mark","1"),r.appendChild(n)}return t.setAttribute("role","img"),t.setAttribute("aria-label",`Strichliste: ${i}`),t.setAttribute(s,String(i)),t.appendChild(r),!0}class u{constructor(t){this.doc=t,this.observer=null,this.scheduled=!1}install(){if(this.observer)return;let t=this.doc.defaultView,e=this.doc.body||this.doc.documentElement,i=t&&t.MutationObserver;i&&e&&(this.observer=new i(()=>this.scheduleScan()),this.observer.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-lia-tally-count"]})),this.scan()}refresh(){this.scan()}destroy(){this.observer&&this.observer.disconnect(),this.observer=null,this.scheduled=!1}scheduleScan(){if(this.scheduled)return;this.scheduled=!0;let t=this.doc.defaultView,e=()=>{this.scheduled=!1,this.scan()};t&&"function"==typeof t.requestAnimationFrame?t.requestAnimationFrame(e):Promise.resolve().then(e)}scan(){for(let t of Array.from(this.doc.querySelectorAll(".lia-tally[data-lia-tally-count]"))){let e=t.getAttribute("data-lia-tally-count"),i=a(e),n=null==i?`invalid:${null==e?"":e}`:String(i),r=t.querySelector(":scope > svg[data-lia-tally-marks]"),l=null==i?!r:r&&r.getAttribute("data-lia-tally-marks")===String(i);t.getAttribute(s)===n&&l||o(t)}}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}]},["8RSWf"],"8RSWf","parcelRequire9430",{});
//# sourceMappingURL=index.js.map
