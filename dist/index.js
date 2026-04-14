!function(e,t,r,n,i){var l="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},s="function"==typeof l[n]&&l[n],a=s.i||{},o=s.cache||{},c="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(t,r){if(!o[t]){if(!e[t]){if(i[t])return i[t];var a="function"==typeof l[n]&&l[n];if(!r&&a)return a(t,!0);if(s)return s(t,!0);if(c&&"string"==typeof t)return c(t);var d=Error("Cannot find module '"+t+"'");throw d.code="MODULE_NOT_FOUND",d}f.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},f.cache={};var p=o[t]=new u.Module(t);e[t][0].call(p.exports,f,p,p.exports,l)}return o[t].exports;function f(e){var t=f.resolve(e);if(!1===t)return{};if(Array.isArray(t)){var r={__esModule:!0};return t.forEach(function(e){var t=e[0],n=e[1],i=e[2]||e[0],l=u(n);"*"===t?Object.keys(l).forEach(function(e){"default"===e||"__esModule"===e||Object.prototype.hasOwnProperty.call(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:function(){return l[e]}})}):"*"===i?Object.defineProperty(r,t,{enumerable:!0,value:l}):Object.defineProperty(r,t,{enumerable:!0,get:function(){return"default"===i?l.__esModule?l.default:l:l[i]}})}),r}return u(t)}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.require=c,this.exports={}},u.modules=e,u.cache=o,u.parent=s,u.distDir=void 0,u.publicUrl=void 0,u.devServer=void 0,u.i=a,u.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(u,"root",{get:function(){return l[n]}}),l[n]=u;for(var d=0;d<t.length;d++)u(t[d]);if(r){var p=u(r);"object"==typeof exports&&"u">typeof module?module.exports=p:"function"==typeof define&&define.amd&&define(function(){return p})}}({"8RSWf":[function(e,t,r,n){var i=e("./constants"),l=e("./style"),s=e("./store");function a(){let e=window;try{for(;e.parent&&e.parent!==e;)e=e.parent}catch(e){}return e}let o=a();(0,l.injectStyleOnce)(function(){let e=a();try{if(e&&e.document)return e.document}catch(e){}return document}()),(0,s.installDebugDomObserver)(o,i.DEBUG_OBSERVER_KEY),o[i.STORE_KEY]||(o[i.STORE_KEY]=new(0,s.FQStore)),o.__LIA_FRACTION_QUIZ__=o[i.STORE_KEY],window.__LIA_FRACTION_QUIZ__=o[i.STORE_KEY]},{"./constants":"7NbOs","./style":"dmo3N","./store":"cswaT"}],"7NbOs":[function(e,t,r,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(r),i.export(r,"STORE_KEY",()=>l),i.export(r,"STYLE_ID",()=>s),i.export(r,"DEBUG_OBSERVER_KEY",()=>a),i.export(r,"SVG_SIZE",()=>o),i.export(r,"SVG_PADDING",()=>c),i.export(r,"MAX_CIRCLE_PARTS",()=>u),i.export(r,"MAX_RECT_DIM",()=>d),i.export(r,"DEBUG_FQ",()=>p);let l="__LIA_FRACTION_QUIZ_V3__",s="__LIA_FRACTION_QUIZ_STYLE_V3__",a="__LIA_FQ_DEBUG_DOM_OBSERVER_V1__",o=200,c=6,u=32,d=20,p=!1},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],k3151:[function(e,t,r,n){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}],dmo3N:[function(e,t,r,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(r),i.export(r,"injectStyleOnce",()=>s);var l=e("./constants");function s(e){if(!e||!e.head||e.getElementById(l.STYLE_ID))return;let t=e.createElement("style");t.id=l.STYLE_ID,t.textContent=`
:root{
  --fq-track: rgba(0,0,0,.20);
  --fq-thumb: rgba(0,0,0,.88);
  --fq-ring: rgba(255,255,255,.90);
  --fq-mark: orange;
  --fq-stroke: #000000;
  --fq-fill: #ffffff;
  --fq-disabled: .58;

  --fq-w: 200px;
  --fq-h: 30px;
  --fq-track-h: 4px;
  --fq-thumb-sz: 12px;
  --fq-label-size: 18px;
  --fq-label-top: -7px;
}
@media (prefers-color-scheme: dark){
  :root{
    --fq-track: rgba(255,255,255,.22);
    --fq-thumb: rgba(255,255,255,.92);
    --fq-ring: rgba(0,0,0,.75);
    --fq-stroke: #000000;
    --fq-fill: #ffffff;
  }
}

.fq-widget{
  display:inline-block;
}

.fq-mount svg{
  display:block;
}

.fq-clickable{
  cursor:pointer;
}

.fq-widget[data-fq-locked="1"] .fq-clickable,
.fq-widget[data-fq-locked="1"] [data-fq-part]{
  cursor:default !important;
}

.fq-widget[data-fq-locked="1"] .fq-range,
.fq-widget[data-fq-locked="1"] .fq-range input[type="range"]{
  pointer-events:none !important;
}

.fq-widget[data-fq-locked="1"] .fq-range{
  opacity:var(--fq-disabled);
}

.fq-range{
  width:var(--fq-w);
  max-width:var(--fq-w);
  height:var(--fq-h);
  position:relative;
  margin:6px 0 12px 0;
  user-select:none;
}

.fq-range::before{
  content:attr(data-label);
  position:absolute;
  left:0;
  right:0;
  top:var(--fq-label-top);
  text-align:center;
  font-size:var(--fq-label-size);
  font-weight: 700;
  line-height:1;
  opacity:.85;
  pointer-events:none;
  z-index:2;
}

.fq-range .lia-input{
  width:var(--fq-w) !important;
  max-width:var(--fq-w) !important;
  height:var(--fq-h) !important;
  margin:0 !important;
  padding:0 !important;
  display:flex !important;
  align-items:center !important;
  font-size:0 !important;
  line-height:0 !important;
  min-height:0 !important;
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
.fq-range .lia-input-suffix{
  display:none !important;
}

.fq-range input[type="range"]{
  width:var(--fq-w) !important;
  max-width:var(--fq-w) !important;
  height:var(--fq-h) !important;
  margin:0 !important;
  padding:0 !important;
  background:transparent;
  -webkit-appearance:none;
  appearance:none;
  -webkit-tap-highlight-color:transparent;
  touch-action:none;
  position:relative;
  z-index:1;
}

.fq-range input[type="range"]::-webkit-slider-runnable-track{
  height:var(--fq-track-h);
  border-radius:999px;
  background:var(--fq-track);
}

.fq-range input[type="range"]::-webkit-slider-thumb{
  -webkit-appearance:none;
  appearance:none;
  width:var(--fq-thumb-sz);
  height:var(--fq-thumb-sz);
  border-radius:50%;
  background:var(--fq-thumb);
  border:2px solid var(--fq-ring);
  margin-top:calc((var(--fq-track-h) - var(--fq-thumb-sz)) / 2);
}

.fq-range input[type="range"]::-moz-range-track{
  height:var(--fq-track-h);
  border-radius:999px;
  background:var(--fq-track);
}

.fq-range input[type="range"]::-moz-range-thumb{
  width:var(--fq-thumb-sz);
  height:var(--fq-thumb-sz);
  border-radius:50%;
  background:var(--fq-thumb);
  border:2px solid var(--fq-ring);
}
  `.trim(),e.head.appendChild(t)}},{"./constants":"7NbOs","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],cswaT:[function(e,t,r,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(r),i.export(r,"installDebugDomObserver",()=>d),i.export(r,"FQStore",()=>p);var l=e("./constants"),s=e("./fraction"),a=e("./renderer");function o(e,...t){if(l.DEBUG_FQ)try{console.log("[FQDBG]",e,...t)}catch(e){}}function c(e){if(!e)return"(null)";if(1!==e.nodeType)return"("+e.nodeName+")";let t=e.id?"#"+e.id:"",r=e.className&&"string"==typeof e.className?"."+e.className.trim().replace(/\s+/g,"."):"";return e.tagName.toLowerCase()+t+r}function u(e){if(!e||1!==e.nodeType)return!1;if(e.id&&/^fq-/.test(e.id)||e.classList&&(e.classList.contains("fq-widget")||e.classList.contains("fq-mount")||e.classList.contains("fq-range")))return!0;try{return!!e.querySelector('[id^="fq-"], .fq-widget, .fq-mount, .fq-range')}catch(e){return!1}}function d(e,t){if(!l.DEBUG_FQ||e[t]||"u"<typeof MutationObserver)return;let r=document,n=r.body||r.documentElement;if(!n)return;let i=new MutationObserver(e=>{for(let t of e){if("childList"!==t.type)continue;let e=[],r=[];t.addedNodes.forEach(t=>{u(t)&&e.push(c(t))}),t.removedNodes.forEach(e=>{u(e)&&r.push(c(e))}),(e.length||r.length)&&o("dom-mutation",{target:c(t.target),added:e,removed:r})}});i.observe(n,{childList:!0,subtree:!0}),e[t]=i,o("debug-dom-observer-installed")}class p{getMeta(e,t){return e=String(null==e?"":e),this.meta[e]||(this.meta[e]={uid:e,kind:t||"",target:{num:0,den:1,value:0,raw:"0"},locked:!1,solved:!1,revealed:!1,ready:!1}),t&&(this.meta[e].kind=t),this.meta[e]}getNodes(e){return e=String(null==e?"":e),this.nodes[e]||(this.nodes[e]={uid:e,kind:"",wrap:null,host:null,mount:null,circleInput:null,rowsInput:null,colsInput:null,observer:null,_quizScope:null,_quizClickHandler:null,_quizBridgeInstalled:!1}),this.nodes[e]}refreshNodes(e){e=String(null==e?"":e);let t=this.getNodes(e),r=t.wrap,n=t.host,i=t.mount,l=t.circleInput,s=t.rowsInput,a=t.colsInput,u=document.getElementById("fq-circle-wrap-"+e),d=document.getElementById("fq-rect-wrap-"+e);if(u){t.kind="circle",t.wrap=u,t.host=document.getElementById("fq-circle-host-"+e),t.mount=document.getElementById("fq-circle-mount-"+e);let r=document.getElementById("fq-circle-range-"+e);t.circleInput=r?r.querySelector('input[type="range"]'):null,t.rowsInput=null,t.colsInput=null}else if(d){t.kind="rect",t.wrap=d,t.host=document.getElementById("fq-rect-host-"+e),t.mount=document.getElementById("fq-rect-mount-"+e);let r=document.getElementById("fq-rect-rows-wrap-"+e),n=document.getElementById("fq-rect-cols-wrap-"+e);t.rowsInput=r?r.querySelector('input[type="range"]'):null,t.colsInput=n?n.querySelector('input[type="range"]'):null,t.circleInput=null}else t.wrap=null,t.host=null,t.mount=null,t.circleInput=null,t.rowsInput=null,t.colsInput=null;return r&&r!==t.wrap&&o("wrap-replaced",e,t.kind,c(t.wrap)),!r&&t.wrap&&o("wrap-found",e,t.kind,c(t.wrap)),n&&n!==t.host&&o("host-replaced",e,t.kind,c(t.host)),i&&i!==t.mount&&o("mount-replaced",e,t.kind,c(t.mount)),l&&l!==t.circleInput&&o("circle-input-replaced",e),s&&s!==t.rowsInput&&o("rows-input-replaced",e),a&&a!==t.colsInput&&o("cols-input-replaced",e),t.circleInput&&this.bindCircleInput(e,t.circleInput),(t.rowsInput||t.colsInput)&&this.bindRectInputs(e,t.rowsInput,t.colsInput),t.wrap&&this.ensureQuizBridge(e,t.wrap),t}parseTarget(e){return(0,s.parseFraction)(e)}setTarget(e,t,r){let n=this.getMeta(e,r);return n.target=(0,s.parseFraction)(t),o("setTarget",e,{kind:n.kind,target:n.target}),n.target}ensureCircle(e,t,r){let n=this.getMeta(e,"circle"),i=(0,s.clampInt)(t,1,l.MAX_CIRCLE_PARTS,1),a=Array.isArray(this.circle[e])?this.circle[e]:[];return this.circle[e]=(0,s.boolArray)(i,(r||{}).preserve?a:null),n.parts=i,n.kind="circle",this.circle[e]}ensureRect(e,t,r,n){let i=this.getMeta(e,"rect"),a=(0,s.clampInt)(t,1,l.MAX_RECT_DIM,1),o=(0,s.clampInt)(r,1,l.MAX_RECT_DIM,1),c=Array.isArray(this.rect[e])?this.rect[e]:[];return this.rectDims[e]={rows:a,cols:o},this.rect[e]=(0,s.boolArray)(a*o,(n||{}).preserve?c:null),i.rows=a,i.cols=o,i.kind="rect",this.rect[e]}setCircleParts(e,t,r){return this.getMeta(e,"circle").locked&&!(r&&r.force)?this.circle[e]||this.ensureCircle(e,1):this.ensureCircle(e,t,r)}setRectDims(e,t,r,n){return this.getMeta(e,"rect").locked&&!(n&&n.force)?this.rect[e]||this.ensureRect(e,1,1):this.ensureRect(e,t,r,n)}buildCircleSolution(e){let t=(0,s.parseFraction)(e),r=Math.max(1,0|t.den),n=Array(r).fill(!1);for(let e=0;e<Math.min(r,0|t.num);e++)n[e]=!0;return{type:"circle",target:t,parts:r,active:n}}buildRectSolution(e){let t=(0,s.parseFraction)(e),{rows:r,cols:n}=(0,s.bestFactorPair)(t.den),i=r*n,l=Array(i).fill(!1);for(let e=0;e<Math.min(i,0|t.num);e++)l[e]=!0;return{type:"rect",target:t,rows:r,cols:n,active:l}}getSolution(e){let t=this.getMeta(e);return"circle"===t.kind?this.buildCircleSolution(t.target):"rect"===t.kind?this.buildRectSolution(t.target):null}isLocked(e){return!!this.getMeta(e).locked}toggleCircle(e,t){let r=this.getMeta(e,"circle");if(r.locked||!r.ready)return!1;let n=Array.isArray(this.circle[e])?this.circle[e]:this.ensureCircle(e,r.parts||1),i=0|t;return!(i<0)&&!(i>=n.length)&&(n[i]=!n[i],n[i])}toggleRect(e,t){let r=this.getMeta(e,"rect");if(r.locked||!r.ready)return!1;let n=this.rectDims[e]||{rows:r.rows||1,cols:r.cols||1},i=Array.isArray(this.rect[e])?this.rect[e]:this.ensureRect(e,n.rows,n.cols),l=0|t;return!(l<0)&&!(l>=i.length)&&(i[l]=!i[l],i[l])}countSelected(e){let t="rect"===this.getMeta(e).kind?this.rect[e]:this.circle[e];if(!Array.isArray(t)||!t.length)return 0;let r=0;for(let e=0;e<t.length;e++)t[e]&&r++;return r}countTotal(e){let t="rect"===this.getMeta(e).kind?this.rect[e]:this.circle[e];return Array.isArray(t)&&t.length?t.length:1}isCorrect(e){let t=this.getMeta(e);if(!t.ready)return!1;let r=t.target||{num:0,den:1},n=this.countTotal(e);return this.countSelected(e)*r.den==r.num*n}lock(e){return this.getMeta(e).locked=!0,this.syncDomState(e),!0}markSolved(e){let t=this.getMeta(e);return!!t.ready&&(t.solved=!0,t.revealed=!1,t.locked=!0,this.syncDomState(e),this.render(e),!0)}applySolution(e){let t=this.getMeta(e),r=this.getSolution(e);return r?(o("applySolution:start",e,{kind:t.kind,solution:r}),"circle"===r.type?(this.setCircleParts(e,r.parts,{force:!0,preserve:!1}),this.circle[e]=(0,s.boolArray)(r.parts,r.active),t.parts=r.parts):(this.setRectDims(e,r.rows,r.cols,{force:!0,preserve:!1}),this.rect[e]=(0,s.boolArray)(r.rows*r.cols,r.active),this.rectDims[e]={rows:r.rows,cols:r.cols},t.rows=r.rows,t.cols=r.cols),this.syncInputs(e,!0),this.render(e),o("applySolution:end",e,{kind:t.kind}),r):null}markRevealed(e){let t=this.getMeta(e);return!!t.ready&&(!!t.revealed&&!!t.locked||(t.revealed=!0,t.solved=!1,t.locked=!0,this.applySolution(e),this.syncDomState(e),!0))}register(e,t){let r=t||{},n=r.kind||"",i=this.getMeta(e,n),a=this.getNodes(e);if(o("register:start",e,{kind:n}),n&&(a.kind=n),r.wrap&&(a.wrap=r.wrap),r.host&&(a.host=r.host),r.mount&&(a.mount=r.mount),r.circleInput&&(a.circleInput=r.circleInput),r.rowsInput&&(a.rowsInput=r.rowsInput),r.colsInput&&(a.colsInput=r.colsInput),void 0!==r.target&&this.setTarget(e,r.target,n||i.kind),"circle"===n)Array.isArray(this.circle[e])&&this.circle[e].length>0?(i.parts=this.circle[e].length,i.kind="circle"):this.ensureCircle(e,null!=r.initialParts?r.initialParts:1,{preserve:!1});else if("rect"===n){let t=this.rectDims[e];t&&Array.isArray(this.rect[e])&&this.rect[e].length===(0,s.clampInt)(t.rows,1,l.MAX_RECT_DIM,1)*(0,s.clampInt)(t.cols,1,l.MAX_RECT_DIM,1)?(i.rows=(0,s.clampInt)(t.rows,1,l.MAX_RECT_DIM,1),i.cols=(0,s.clampInt)(t.cols,1,l.MAX_RECT_DIM,1),i.kind="rect"):this.ensureRect(e,null!=r.initialRows?r.initialRows:1,null!=r.initialCols?r.initialCols:1,{preserve:!1})}return a.circleInput&&this.bindCircleInput(e,a.circleInput),(a.rowsInput||a.colsInput)&&this.bindRectInputs(e,a.rowsInput,a.colsInput),i.ready=!0,this.syncInputs(e,!0),this.syncDomState(e),this.render(e),o("register:end",e,{kind:i.kind}),a}attachCircle(e,t){return this.register(e,Object.assign({},t,{kind:"circle"}))}attachRect(e,t){return this.register(e,Object.assign({},t,{kind:"rect"}))}bindCircleInput(e,t){if(t.__fqCircleBoundUid===e)return;t.__fqCircleBoundUid=e;let r=()=>{if(this.isLocked(e))return void this.syncInputs(e,!0);let r=(0,s.clampInt)(t.value,1,l.MAX_CIRCLE_PARTS,1);this.setCircleParts(e,r,{preserve:!1}),this.render(e)};t.addEventListener("input",r,!0),t.addEventListener("change",r,!0)}bindRectInputs(e,t,r){if(t&&t.__fqRectRowsBoundUid!==e){t.__fqRectRowsBoundUid=e;let n=()=>{if(this.isLocked(e))return void this.syncInputs(e,!0);let n=(0,s.clampInt)(t.value,1,l.MAX_RECT_DIM,1),i=r?(0,s.clampInt)(r.value,1,l.MAX_RECT_DIM,1):this.rectDims[e]&&this.rectDims[e].cols||1;this.setRectDims(e,n,i,{preserve:!1}),this.render(e)};t.addEventListener("input",n,!0),t.addEventListener("change",n,!0)}if(r&&r.__fqRectColsBoundUid!==e){r.__fqRectColsBoundUid=e;let n=()=>{if(this.isLocked(e))return void this.syncInputs(e,!0);let n=(0,s.clampInt)(r.value,1,l.MAX_RECT_DIM,1),i=t?(0,s.clampInt)(t.value,1,l.MAX_RECT_DIM,1):this.rectDims[e]&&this.rectDims[e].rows||1;this.setRectDims(e,i,n,{preserve:!1}),this.render(e)};r.addEventListener("input",n,!0),r.addEventListener("change",n,!0)}}syncInputs(e,t){let r=this.refreshNodes(e),n=this.getMeta(e);if("circle"===n.kind&&r.circleInput){let i=this.circle[e]&&this.circle[e].length||n.parts||1;(t||String(r.circleInput.value)!==String(i))&&(r.circleInput.value=String(i)),r.circleInput.disabled=!!n.locked}if("rect"===n.kind){let i=this.rectDims[e]||{rows:n.rows||1,cols:n.cols||1};r.rowsInput&&((t||String(r.rowsInput.value)!==String(i.rows))&&(r.rowsInput.value=String(i.rows)),r.rowsInput.disabled=!!n.locked),r.colsInput&&((t||String(r.colsInput.value)!==String(i.cols))&&(r.colsInput.value=String(i.cols)),r.colsInput.disabled=!!n.locked)}}syncDomState(e){let t=this.refreshNodes(e),r=this.getMeta(e);for(let e of[t.wrap,t.host,t.mount])e&&e.setAttribute&&(e.setAttribute("data-fq-locked",r.locked?"1":"0"),e.setAttribute("data-fq-solved",r.solved?"1":"0"),e.setAttribute("data-fq-revealed",r.revealed?"1":"0"));this.syncInputs(e,!1)}render(e){let t=this.refreshNodes(e),r=this.getMeta(e);return!!t.mount&&("circle"===r.kind?this.renderCircle(e,t.mount):"rect"===r.kind&&this.renderRect(e,t.mount))}renderCircle(e,t){let r=this.getMeta(e,"circle"),n=Array.isArray(this.circle[e])?this.circle[e]:this.ensureCircle(e,r.parts||1),i=!!r.locked;return t.innerHTML=(0,a.renderCircleSVG)(n),t.onclick=t=>{let r=t.target&&t.target.closest?t.target.closest("[data-fq-part]"):null;if(!r||i)return;let n=parseInt(r.getAttribute("data-fq-part")||"",10);Number.isFinite(n)&&(this.toggleCircle(e,n),this.render(e))},this.syncDomState(e),!0}renderRect(e,t){let r=this.getMeta(e,"rect"),n=this.rectDims[e]||{rows:r.rows||1,cols:r.cols||1},i=Array.isArray(this.rect[e])?this.rect[e]:this.ensureRect(e,n.rows,n.cols),o=(0,s.clampInt)(n.rows,1,l.MAX_RECT_DIM,1),c=(0,s.clampInt)(n.cols,1,l.MAX_RECT_DIM,1),u=!!r.locked;return t.innerHTML=(0,a.renderRectSVG)(i,o,c),t.onclick=t=>{let r=t.target&&t.target.closest?t.target.closest("[data-fq-part]"):null;if(!r||u)return;let n=parseInt(r.getAttribute("data-fq-part")||"",10);Number.isFinite(n)&&(this.toggleRect(e,n),this.render(e))},this.syncDomState(e),!0}labelOf(e){if(!e)return"";let t=[];try{t.push(e.textContent||"")}catch(e){}try{e.className&&t.push(String(e.className))}catch(e){}for(let r of["title","aria-label","data-action","data-title","name","value"])try{let n=e.getAttribute&&e.getAttribute(r);n&&t.push(n)}catch(e){}return t.join(" ").replace(/\s+/g," ").trim().toLowerCase()}isRevealButton(e){let t=this.labelOf(e);return/(aufl|aufl[oö]sen|l[oö]sung|show solution|solution|resolve)/i.test(t)}looksRevealed(e){if(!e||!e.querySelector)return!1;try{if(e.querySelector('[data-state="resolved"], [data-revealed="true"], [data-state="revealed"]'))return!0}catch(e){}let t=e.querySelector(".lia-quiz__feedback, [class*='feedback']"),r=(t&&t.textContent||"").toLowerCase();return/(aufgel|aufl[oö]s|l[oö]sung|show solution|resolved|solution)/i.test(r)}ensureQuizBridge(e,t){let r=this.getNodes(e),n=this.getMeta(e);if(!t||r._quizBridgeInstalled&&r._quizScope===t&&t.isConnected)return;if(r.observer){try{r.observer.disconnect()}catch(e){}r.observer=null}if(r._quizScope&&r._quizClickHandler)try{r._quizScope.removeEventListener("click",r._quizClickHandler,!0)}catch(e){}let i=t=>{let r=t.target&&t.target.closest?t.target.closest("button, input[type='button'], input[type='submit']"):null;r&&this.isRevealButton(r)&&n.ready&&(o("quiz-reveal-click",e,{label:this.labelOf(r)}),setTimeout(()=>{this.markRevealed(e)},0))};t.addEventListener("click",i,!0);let l=null;if("u">typeof MutationObserver){l=new MutationObserver(()=>{n.ready&&!n.revealed&&this.looksRevealed(t)&&(o("quiz-observer-detected-revealed",e),this.markRevealed(e))});try{l.observe(t,{subtree:!0,childList:!0,attributes:!0,characterData:!0})}catch(e){l=null}}r._quizBridgeInstalled=!0,r._quizScope=t,r._quizClickHandler=i,r.observer=l}onCheck(e,t){return t&&this.markSolved(e),!!t}onReveal(e){return this.markRevealed(e)}check(e){return e=String(null==e?"":e),!!this.isCorrect(e)&&(this.isLocked(e)||this.onCheck(e,!0),!0)}mountCircle(e,t){e=String(null==e?"":e);let r=0,n=()=>{let i=document.getElementById("fq-circle-wrap-"+e),l=document.getElementById("fq-circle-host-"+e),s=document.getElementById("fq-circle-mount-"+e),a=document.getElementById("fq-circle-range-"+e),o=a?a.querySelector('input[type="range"]'):null;if(i&&l&&s&&a&&o){this.attachCircle(e,{wrap:i,host:l,mount:s,circleInput:o,target:t,initialParts:o.value||1}),this.ensureQuizBridge(e,i);return}++r<240&&requestAnimationFrame(n)};n()}mountRect(e,t){e=String(null==e?"":e);let r=0,n=()=>{let i=document.getElementById("fq-rect-wrap-"+e),l=document.getElementById("fq-rect-host-"+e),s=document.getElementById("fq-rect-mount-"+e),a=document.getElementById("fq-rect-rows-wrap-"+e),o=document.getElementById("fq-rect-cols-wrap-"+e),c=a?a.querySelector('input[type="range"]'):null,u=o?o.querySelector('input[type="range"]'):null;if(i&&l&&s&&a&&o&&c&&u){this.attachRect(e,{wrap:i,host:l,mount:s,rowsInput:c,colsInput:u,target:t,initialRows:c.value||1,initialCols:u.value||1}),this.ensureQuizBridge(e,i);return}++r<240&&requestAnimationFrame(n)};n()}constructor(){this.circle=Object.create(null),this.rect=Object.create(null),this.rectDims=Object.create(null),this.meta=Object.create(null),this.nodes=Object.create(null),this.version=3}}},{"./constants":"7NbOs","./fraction":"ef3jW","./renderer":"lGVry","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],ef3jW:[function(e,t,r,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");function l(e,t,r,n){let i=parseInt(String(e),10);return Number.isFinite(i)||(i=n),Number.isFinite(i)||(i=t),i<t&&(i=t),i>r&&(i=r),0|i}function s(e,t){for(e=Math.abs(0|e),t=Math.abs(0|t);t;){let r=e%t;e=t,t=r}return e||1}function a(e){let t=String(null==e?"":e).trim().replace(",",".");if(!t)return{num:0,den:1};if(/e/i.test(t)){let e=Number(t);return Number.isFinite(e)?a(e.toFixed(12).replace(/0+$/,"").replace(/\.$/,"")):{num:0,den:1}}if(!/^[-+]?\d*(?:\.\d+)?$/.test(t))return{num:0,den:1};let r=t.startsWith("-")?-1:1,n=t.replace(/^[-+]/,"").split("."),i=n[0]||"0",l=n[1]||"";if(!l)return{num:r*parseInt(i,10),den:1};let s=Math.pow(10,l.length);return{num:r*(parseInt(i,10)*s+parseInt(l,10)),den:s}}function o(e){let t=0,r=1;if(e&&"object"==typeof e&&Number.isFinite(e.num)&&Number.isFinite(e.den))t=e.num,r=e.den;else if("number"==typeof e){let n=a(String(e));t=n.num,r=n.den}else{let n=String(null==e?"":e).trim().replace(/^\((.*)\)$/,"$1").trim();if(n.includes("/")){let e=n.match(/^\s*([-+]?\d+)\s*\/\s*([-+]?\d+)\s*$/);if(e)t=parseInt(e[1],10),r=parseInt(e[2],10);else{let e=a(n);t=e.num,r=e.den}}else{let e=a(n);t=e.num,r=e.den}}Number.isFinite(t)||(t=0),Number.isFinite(r)&&0!==r||(r=1),r<0&&(t=-t,r=-r);let n=s(t,r);return(t/=n)<0&&(t=0),t>(r/=n)&&(t=r),{num:t,den:r,value:r?t/r:0,raw:e}}function c(e){let t=1,r=e=Math.max(1,0|e),n=Math.abs(r-t);for(let i=1;i*i<=e;i++){if(e%i!=0)continue;let l=e/i,s=Math.abs(l-i);s<n&&(t=i,r=l,n=s)}return{cols:Math.min(t,r),rows:Math.max(t,r)}}function u(e,t){let r=Math.max(1,0|e),n=Array(r).fill(!1);if(Array.isArray(t))for(let e=0;e<Math.min(r,t.length);e++)n[e]=!!t[e];return n}i.defineInteropFlag(r),i.export(r,"clampInt",()=>l),i.export(r,"gcd",()=>s),i.export(r,"parseFraction",()=>o),i.export(r,"bestFactorPair",()=>c),i.export(r,"boolArray",()=>u)},{"@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],lGVry:[function(e,t,r,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(r),i.export(r,"renderCircleSVG",()=>s),i.export(r,"renderRectSVG",()=>a);var l=e("./constants");function s(e){let t=l.SVG_SIZE,r=l.SVG_SIZE,n=l.SVG_PADDING,i=t/2,s=r/2,a=Math.min(t,r)/2-n,o=Math.max(1,0|e.length),c=360/o,u="",d="";if(1===o)u=`<circle data-fq-part="0" class="fq-clickable" cx="${i}" cy="${s}" r="${a}" fill="${e[0]?"var(--fq-mark)":"transparent"}"></circle>`;else for(let t=0;t<o;t++){let r=(-90+c*t)*Math.PI/180,n=(-90+c*(t+1))*Math.PI/180,l=i+a*Math.cos(r),o=s+a*Math.sin(r),p=i+a*Math.cos(n),f=s+a*Math.sin(n),h=+(c>180);u+=`<path data-fq-part="${t}" class="fq-clickable" d="M ${i},${s} L ${l},${o} A ${a},${a} 0 ${h},1 ${p},${f} Z" fill="${e[t]?"var(--fq-mark)":"transparent"}"></path>`,d+=`<line x1="${i}" y1="${s}" x2="${l}" y2="${o}" stroke="#000000" stroke-width="2"></line>`}return`<svg class="fq-svg" viewBox="0 0 ${t} ${r}" xmlns="http://www.w3.org/2000/svg" width="${t}" height="${r}" aria-hidden="true"><circle cx="${i}" cy="${s}" r="${a}" stroke="#000000" stroke-width="2" fill="#ffffff"></circle>${u}${d}<circle cx="${i}" cy="${s}" r="${a}" stroke="#000000" stroke-width="2" fill="none"></circle></svg>`}function a(e,t,r){let n=l.SVG_SIZE,i=l.SVG_SIZE,s=l.SVG_PADDING,a=(n-2*s)/r,o=(i-2*s)/t,c="",u="";for(let n=0;n<t;n++)for(let t=0;t<r;t++){let i=n*r+t,l=s+t*a,u=s+n*o;c+=`<rect data-fq-part="${i}" class="fq-clickable" x="${l}" y="${u}" width="${a}" height="${o}" fill="${e[i]?"var(--fq-mark)":"transparent"}"></rect>`}for(let e=0;e<=t;e++){let t=s+e*o;u+=`<line x1="${s}" y1="${t}" x2="${n-s}" y2="${t}" stroke="#000000" stroke-width="2"></line>`}for(let e=0;e<=r;e++){let t=s+e*a;u+=`<line x1="${t}" y1="${s}" x2="${t}" y2="${i-s}" stroke="#000000" stroke-width="2"></line>`}return`<svg class="fq-svg" viewBox="0 0 ${n} ${i}" xmlns="http://www.w3.org/2000/svg" width="${n}" height="${i}" aria-hidden="true"><rect x="0" y="0" width="${n}" height="${i}" fill="#ffffff" stroke="#000000" stroke-width="2"></rect>${c}${u}</svg>`}},{"./constants":"7NbOs","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}]},["8RSWf"],"8RSWf","parcelRequire9430",{});
//# sourceMappingURL=index.js.map
