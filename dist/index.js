!function(e,t,r,i,n){var l="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},s="function"==typeof l[i]&&l[i],c=s.i||{},a=s.cache||{},o="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(t,r){if(!a[t]){if(!e[t]){if(n[t])return n[t];var c="function"==typeof l[i]&&l[i];if(!r&&c)return c(t,!0);if(s)return s(t,!0);if(o&&"string"==typeof t)return o(t);var d=Error("Cannot find module '"+t+"'");throw d.code="MODULE_NOT_FOUND",d}f.resolve=function(r){var i=e[t][1][r];return null!=i?i:r},f.cache={};var h=a[t]=new u.Module(t);e[t][0].call(h.exports,f,h,h.exports,l)}return a[t].exports;function f(e){var t=f.resolve(e);if(!1===t)return{};if(Array.isArray(t)){var r={__esModule:!0};return t.forEach(function(e){var t=e[0],i=e[1],n=e[2]||e[0],l=u(i);"*"===t?Object.keys(l).forEach(function(e){"default"===e||"__esModule"===e||Object.prototype.hasOwnProperty.call(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:function(){return l[e]}})}):"*"===n?Object.defineProperty(r,t,{enumerable:!0,value:l}):Object.defineProperty(r,t,{enumerable:!0,get:function(){return"default"===n?l.__esModule?l.default:l:l[n]}})}),r}return u(t)}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.require=o,this.exports={}},u.modules=e,u.cache=a,u.parent=s,u.distDir=void 0,u.publicUrl=void 0,u.devServer=void 0,u.i=c,u.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(u,"root",{get:function(){return l[i]}}),l[i]=u;for(var d=0;d<t.length;d++)u(t[d]);if(r){var h=u(r);"object"==typeof exports&&"u">typeof module?module.exports=h:"function"==typeof define&&define.amd&&define(function(){return h})}}({"8RSWf":[function(e,t,r,i){!function(){let e=function(){let e=window;try{for(;e.parent&&e.parent!==e;)e=e.parent}catch(e){}return e}(),t="__LIA_FRACTION_QUIZ_V3__",r="__LIA_FRACTION_QUIZ_STYLE_V3__";function i(e){}function n(e,t,r,i){let n=parseInt(e,10);return Number.isFinite(n)||(n=i),Number.isFinite(n)||(n=t),n<t&&(n=t),n>r&&(n=r),0|n}function l(e){let t=String(null==e?"":e).trim().replace(",",".");if(!t)return{num:0,den:1};if(/e/i.test(t)){let e=Number(t);return Number.isFinite(e)?l(e.toFixed(12).replace(/0+$/,"").replace(/\.$/,"")):{num:0,den:1}}if(!/^[-+]?\d*(?:\.\d+)?$/.test(t))return{num:0,den:1};let r=t.startsWith("-")?-1:1,i=t.replace(/^[-+]/,"").split("."),n=i[0]||"0",s=i[1]||"";if(!s)return{num:r*parseInt(n,10),den:1};let c=Math.pow(10,s.length);return{num:r*(parseInt(n,10)*c+parseInt(s,10)),den:c}}function s(e){let t=0,r=1;if(e&&"object"==typeof e&&Number.isFinite(e.num)&&Number.isFinite(e.den))t=e.num,r=e.den;else if("number"==typeof e){let i=l(String(e));t=i.num,r=i.den}else{let i=String(null==e?"":e).trim().replace(/^\((.*)\)$/,"$1").trim();if(i.includes("/")){let e=i.match(/^\s*([-+]?\d+)\s*\/\s*([-+]?\d+)\s*$/);if(e)t=parseInt(e[1],10),r=parseInt(e[2],10);else{let e=l(i);t=e.num,r=e.den}}else{let e=l(i);t=e.num,r=e.den}}Number.isFinite(t)||(t=0),Number.isFinite(r)&&0!==r||(r=1),r<0&&(t=-t,r=-r);let i=function(e,t){for(e=Math.abs(0|e),t=Math.abs(0|t);t;){let r=e%t;e=t,t=r}return e||1}(t,r);return(t/=i)<0&&(t=0),t>(r/=i)&&(t=r),{num:t,den:r,value:r?t/r:0,raw:e}}function c(e,t){let r=Math.max(1,0|e),i=Array(r).fill(!1);if(Array.isArray(t))for(let e=0;e<Math.min(r,t.length);e++)i[e]=!!t[e];return i}function a(e){if(!e)return"(null)";if(1!==e.nodeType)return"("+e.nodeName+")";let t=e.id?"#"+e.id:"",r=e.className&&"string"==typeof e.className?"."+e.className.trim().replace(/\s+/g,"."):"";return e.tagName.toLowerCase()+t+r}!function(){let t=function(){try{if(e&&e.document)return e.document}catch(e){}return document}();if(!t||!t.head||t.getElementById(r))return;let i=t.createElement("style");i.id=r,i.textContent=`
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
    `.trim(),t.head.appendChild(i)}(),e[t]?i("fraction-store-reused"):(e[t]={version:3,circle:Object.create(null),rect:Object.create(null),rectDims:Object.create(null),meta:Object.create(null),nodes:Object.create(null),getMeta(e,t){return e=String(null==e?"":e),this.meta[e]||(this.meta[e]={uid:e,kind:t||"",target:{num:0,den:1,value:0,raw:"0"},locked:!1,solved:!1,revealed:!1,ready:!1},i("meta-created",e,{kind:t||""})),t&&(this.meta[e].kind=t),this.meta[e]},getNodes(e){return e=String(null==e?"":e),this.nodes[e]||(this.nodes[e]={uid:e,kind:"",wrap:null,host:null,mount:null,circleInput:null,rowsInput:null,colsInput:null,observer:null,_quizScope:null,_quizClickHandler:null,_quizBridgeInstalled:!1},i("nodes-created",e)),this.nodes[e]},refreshNodes(e){e=String(null==e?"":e);let t=this.getNodes(e),r=t.wrap,n=t.host,l=t.mount,s=t.circleInput,c=t.rowsInput,o=t.colsInput,u=document.getElementById("fq-circle-wrap-"+e),d=document.getElementById("fq-rect-wrap-"+e);if(u){t.kind="circle",t.wrap=u,t.host=document.getElementById("fq-circle-host-"+e),t.mount=document.getElementById("fq-circle-mount-"+e);let r=document.getElementById("fq-circle-range-"+e);t.circleInput=r?r.querySelector('input[type="range"]'):null,t.rowsInput=null,t.colsInput=null}else if(d){t.kind="rect",t.wrap=d,t.host=document.getElementById("fq-rect-host-"+e),t.mount=document.getElementById("fq-rect-mount-"+e);let r=document.getElementById("fq-rect-rows-wrap-"+e),i=document.getElementById("fq-rect-cols-wrap-"+e);t.rowsInput=r?r.querySelector('input[type="range"]'):null,t.colsInput=i?i.querySelector('input[type="range"]'):null,t.circleInput=null}else t.wrap=null,t.host=null,t.mount=null,t.circleInput=null,t.rowsInput=null,t.colsInput=null;return r&&r!==t.wrap&&i("wrap-replaced",e,t.kind,a(t.wrap)),!r&&t.wrap&&i("wrap-found",e,t.kind,a(t.wrap)),n&&n!==t.host&&i("host-replaced",e,t.kind,a(t.host)),l&&l!==t.mount&&i("mount-replaced",e,t.kind,a(t.mount)),s&&s!==t.circleInput&&i("circle-input-replaced",e),c&&c!==t.rowsInput&&i("rows-input-replaced",e),o&&o!==t.colsInput&&i("cols-input-replaced",e),t.circleInput&&this.bindCircleInput(e,t.circleInput),(t.rowsInput||t.colsInput)&&this.bindRectInputs(e,t.rowsInput,t.colsInput),t.wrap&&this.ensureQuizBridge(e,t.wrap),t},parseTarget:e=>s(e),setTarget(e,t,r){let n=this.getMeta(e,r);return n.target=s(t),i("setTarget",e,{kind:n.kind,target:n.target}),n.target},ensureCircle(e,t,r){let l=r||{},s=this.getMeta(e,"circle"),a=n(t,1,32,1),o=Array.isArray(this.circle[e])?this.circle[e]:[];return this.circle[e]=c(a,l.preserve?o:null),s.parts=a,s.kind="circle",i("ensureCircle",e,{parts:a,preserve:!!l.preserve,selected:this.countSelected(e)}),this.circle[e]},ensureRect(e,t,r,l){let s=l||{},a=this.getMeta(e,"rect"),o=n(t,1,20,1),u=n(r,1,20,1),d=o*u,h=Array.isArray(this.rect[e])?this.rect[e]:[];return this.rectDims[e]={rows:o,cols:u},this.rect[e]=c(d,s.preserve?h:null),a.rows=o,a.cols=u,a.kind="rect",i("ensureRect",e,{rows:o,cols:u,preserve:!!s.preserve,selected:this.countSelected(e)}),this.rect[e]},setCircleParts(e,t,r){return this.getMeta(e,"circle").locked&&!(r&&r.force)?(i("setCircleParts-blocked-locked",e,{parts:t}),this.circle[e]||this.ensureCircle(e,1)):this.ensureCircle(e,t,r)},setRectDims(e,t,r,n){return this.getMeta(e,"rect").locked&&!(n&&n.force)?(i("setRectDims-blocked-locked",e,{rows:t,cols:r}),this.rect[e]||this.ensureRect(e,1,1)):this.ensureRect(e,t,r,n)},buildCircleSolution(e){let t=s(e),r=Math.max(1,0|t.den),i=Array(r).fill(!1);for(let e=0;e<Math.min(r,0|t.num);e++)i[e]=!0;return{type:"circle",target:t,parts:r,active:i}},buildRectSolution(e){let t=s(e),r=function(e){let t=1,r=e=Math.max(1,0|e),i=Math.abs(r-t);for(let n=1;n*n<=e;n++){if(e%n!=0)continue;let l=e/n,s=Math.abs(l-n);s<i&&(t=n,r=l,i=s)}return{cols:Math.min(t,r),rows:Math.max(t,r)}}(t.den),i=r.rows,n=r.cols,l=i*n,c=Array(l).fill(!1);for(let e=0;e<Math.min(l,0|t.num);e++)c[e]=!0;return{type:"rect",target:t,rows:i,cols:n,active:c}},getSolution(e){let t=this.getMeta(e);return"circle"===t.kind?this.buildCircleSolution(t.target):"rect"===t.kind?this.buildRectSolution(t.target):null},isLocked(e){return!!this.getMeta(e).locked},toggleCircle(e,t){let r=this.getMeta(e,"circle");if(r.locked||!r.ready)return i("toggleCircle-blocked",e,{locked:!!r.locked,ready:!!r.ready,index:t}),!1;let n=Array.isArray(this.circle[e])?this.circle[e]:this.ensureCircle(e,r.parts||1),l=0|t;return!(l<0)&&!(l>=n.length)&&(n[l]=!n[l],i("toggleCircle",e,{index:l,value:n[l],total:n.length,selected:this.countSelected(e)}),n[l])},toggleRect(e,t){let r=this.getMeta(e,"rect");if(r.locked||!r.ready)return i("toggleRect-blocked",e,{locked:!!r.locked,ready:!!r.ready,index:t}),!1;let n=this.rectDims[e]||{rows:r.rows||1,cols:r.cols||1},l=Array.isArray(this.rect[e])?this.rect[e]:this.ensureRect(e,n.rows,n.cols),s=0|t;return!(s<0)&&!(s>=l.length)&&(l[s]=!l[s],i("toggleRect",e,{index:s,value:l[s],rows:n.rows,cols:n.cols,selected:this.countSelected(e)}),l[s])},countSelected(e){let t="rect"===this.getMeta(e).kind?this.rect[e]:this.circle[e];if(!Array.isArray(t)||!t.length)return 0;let r=0;for(let e=0;e<t.length;e++)t[e]&&r++;return r},countTotal(e){let t="rect"===this.getMeta(e).kind?this.rect[e]:this.circle[e];return Array.isArray(t)&&t.length?t.length:1},getRatio(e){let t=this.countTotal(e),r=this.countSelected(e);return t?r/t:0},isCorrect(e){let t=this.getMeta(e);if(!t.ready)return!1;let r=t.target||{num:0,den:1},i=this.countTotal(e);return this.countSelected(e)*r.den==r.num*i},lock(e){let t=this.getMeta(e);return t.locked=!0,i("lock",e,{kind:t.kind}),this.syncDomState(e),!0},markSolved(e){let t=this.getMeta(e);return!!t.ready&&(i("markSolved:before",e,{kind:t.kind,rectDims:this.rectDims[e]||null,circleLen:this.circle[e]?this.circle[e].length:null,selected:this.countSelected(e)}),t.solved=!0,t.revealed=!1,t.locked=!0,this.syncDomState(e),this.render(e),i("markSolved:after",e,{kind:t.kind,rectDims:this.rectDims[e]||null,circleLen:this.circle[e]?this.circle[e].length:null,selected:this.countSelected(e)}),!0)},applySolution(e){let t=this.getMeta(e),r=this.getSolution(e);return r?(i("applySolution:start",e,{kind:t.kind,solution:r}),"circle"===r.type?(this.setCircleParts(e,r.parts,{force:!0,preserve:!1}),this.circle[e]=c(r.parts,r.active),t.parts=r.parts):(this.setRectDims(e,r.rows,r.cols,{force:!0,preserve:!1}),this.rect[e]=c(r.rows*r.cols,r.active),this.rectDims[e]={rows:r.rows,cols:r.cols},t.rows=r.rows,t.cols=r.cols),this.syncInputs(e,!0),this.render(e),i("applySolution:end",e,{kind:t.kind,rectDims:this.rectDims[e]||null,circleLen:this.circle[e]?this.circle[e].length:null,selected:this.countSelected(e)}),r):null},markRevealed(e){let t=this.getMeta(e);return!!t.ready&&(t.revealed&&t.locked?i("markRevealed-skip-already-revealed",e):(i("markRevealed:before",e,{kind:t.kind,locked:t.locked,revealed:t.revealed,solved:t.solved,rectDims:this.rectDims[e]||null,circleLen:this.circle[e]?this.circle[e].length:null,selected:this.countSelected(e)}),t.revealed=!0,t.solved=!1,t.locked=!0,this.applySolution(e),this.syncDomState(e),i("markRevealed:after",e,{kind:t.kind,locked:t.locked,revealed:t.revealed,solved:t.solved,rectDims:this.rectDims[e]||null,circleLen:this.circle[e]?this.circle[e].length:null,selected:this.countSelected(e)})),!0)},register(e,t){let r=t||{},l=r.kind||"",s=this.getMeta(e,l),c=this.getNodes(e);if(i("register:start",e,{kind:l,initialParts:r.initialParts,initialRows:r.initialRows,initialCols:r.initialCols,hadCircleState:Array.isArray(this.circle[e])?this.circle[e].length:0,hadRectState:Array.isArray(this.rect[e])?this.rect[e].length:0,rectDims:this.rectDims[e]||null}),l&&(c.kind=l),r.wrap&&(c.wrap=r.wrap),r.host&&(c.host=r.host),r.mount&&(c.mount=r.mount),r.circleInput&&(c.circleInput=r.circleInput),r.rowsInput&&(c.rowsInput=r.rowsInput),r.colsInput&&(c.colsInput=r.colsInput),void 0!==r.target&&this.setTarget(e,r.target,l||s.kind),"circle"===l)Array.isArray(this.circle[e])&&this.circle[e].length>0?(s.parts=this.circle[e].length,s.kind="circle"):this.ensureCircle(e,null!=r.initialParts?r.initialParts:1,{preserve:!1});else if("rect"===l){let t=this.rectDims[e];t&&Array.isArray(this.rect[e])&&this.rect[e].length===n(t.rows,1,20,1)*n(t.cols,1,20,1)?(s.rows=n(t.rows,1,20,1),s.cols=n(t.cols,1,20,1),s.kind="rect"):this.ensureRect(e,null!=r.initialRows?r.initialRows:1,null!=r.initialCols?r.initialCols:1,{preserve:!1})}return c.circleInput&&this.bindCircleInput(e,c.circleInput),(c.rowsInput||c.colsInput)&&this.bindRectInputs(e,c.rowsInput,c.colsInput),s.ready=!0,this.syncInputs(e,!0),this.syncDomState(e),this.render(e),i("register:end",e,{kind:s.kind,rectDims:this.rectDims[e]||null,circleLen:this.circle[e]?this.circle[e].length:null,selected:this.countSelected(e)}),c},attachCircle(e,t){let r=Object.assign({},t||{},{kind:"circle"});return i("attachCircle",e),this.register(e,r)},attachRect(e,t){let r=Object.assign({},t||{},{kind:"rect"});return i("attachRect",e),this.register(e,r)},bindCircleInput(e,t){if(!t||t.__fqCircleBoundUid===e)return;t.__fqCircleBoundUid=e,i("bindCircleInput",e);let r=()=>{if(i("circle-input-event",e,{value:t.value,locked:this.isLocked(e)}),this.isLocked(e))return void this.syncInputs(e,!0);let r=n(t.value,1,32,1);this.setCircleParts(e,r,{preserve:!1}),this.render(e)};t.addEventListener("input",r,!0),t.addEventListener("change",r,!0)},bindRectInputs(e,t,r){if(t&&t.__fqRectRowsBoundUid!==e){t.__fqRectRowsBoundUid=e,i("bindRectRowsInput",e);let l=()=>{if(i("rect-rows-event",e,{rowsValue:t?t.value:null,colsValue:r?r.value:null,locked:this.isLocked(e)}),this.isLocked(e))return void this.syncInputs(e,!0);let l=n(t.value,1,20,1),s=r?n(r.value,1,20,1):this.rectDims[e]&&this.rectDims[e].cols||1;this.setRectDims(e,l,s,{preserve:!1}),this.render(e)};t.addEventListener("input",l,!0),t.addEventListener("change",l,!0)}if(r&&r.__fqRectColsBoundUid!==e){r.__fqRectColsBoundUid=e,i("bindRectColsInput",e);let l=()=>{if(i("rect-cols-event",e,{rowsValue:t?t.value:null,colsValue:r?r.value:null,locked:this.isLocked(e)}),this.isLocked(e))return void this.syncInputs(e,!0);let l=n(r.value,1,20,1),s=t?n(t.value,1,20,1):this.rectDims[e]&&this.rectDims[e].rows||1;this.setRectDims(e,s,l,{preserve:!1}),this.render(e)};r.addEventListener("input",l,!0),r.addEventListener("change",l,!0)}},syncInputs(e,t){let r=this.refreshNodes(e),n=this.getMeta(e),l=!!t;if(i("syncInputs:start",e,n.kind,{force:l,locked:!!n.locked}),"circle"===n.kind&&r.circleInput){let t=this.circle[e]&&this.circle[e].length||n.parts||1;i("syncInputs:circle",e,{domValue:r.circleInput.value,targetValue:String(t),force:l}),(l||String(r.circleInput.value)!==String(t))&&(r.circleInput.value=String(t)),r.circleInput.disabled=!!n.locked}if("rect"===n.kind){let t=this.rectDims[e]||{rows:n.rows||1,cols:n.cols||1};r.rowsInput&&(i("syncInputs:rectRows",e,{domValue:r.rowsInput.value,targetValue:String(t.rows),force:l}),(l||String(r.rowsInput.value)!==String(t.rows))&&(r.rowsInput.value=String(t.rows)),r.rowsInput.disabled=!!n.locked),r.colsInput&&(i("syncInputs:rectCols",e,{domValue:r.colsInput.value,targetValue:String(t.cols),force:l}),(l||String(r.colsInput.value)!==String(t.cols))&&(r.colsInput.value=String(t.cols)),r.colsInput.disabled=!!n.locked)}},syncDomState(e){let t=this.refreshNodes(e),r=this.getMeta(e),n=[t.wrap,t.host,t.mount];i("syncDomState",e,{kind:r.kind,locked:!!r.locked,solved:!!r.solved,revealed:!!r.revealed});for(let e=0;e<n.length;e++){let t=n[e];t&&t.setAttribute&&(t.setAttribute("data-fq-locked",r.locked?"1":"0"),t.setAttribute("data-fq-solved",r.solved?"1":"0"),t.setAttribute("data-fq-revealed",r.revealed?"1":"0"))}this.syncInputs(e,!1)},render(e){let t=this.refreshNodes(e),r=this.getMeta(e);return t.mount?(i("render",e,{kind:r.kind,rectDims:this.rectDims[e]||null,circleLen:this.circle[e]?this.circle[e].length:null,selected:this.countSelected(e)}),"circle"===r.kind)?this.renderCircle(e,t.mount):"rect"===r.kind&&this.renderRect(e,t.mount):(i("render-skip-no-mount",e,r.kind),!1)},renderCircle(e,t){let r=this.getMeta(e,"circle"),i=Array.isArray(this.circle[e])?this.circle[e]:this.ensureCircle(e,r.parts||1),n=Math.max(1,0|i.length),l=!!r.locked,s=360/n,c="",a="";if(1===n)c=`
            <circle
              data-fq-part="0"
              class="fq-clickable"
              cx="100" cy="100" r="94"
              fill="${i[0]?"var(--fq-mark)":"transparent"}"
            ></circle>
          `;else for(let e=0;e<n;e++){let t=(-90+s*e)*Math.PI/180,r=(-90+s*(e+1))*Math.PI/180,n=100+94*Math.cos(t),l=100+94*Math.sin(t),o=100+94*Math.cos(r),u=100+94*Math.sin(r),d=+(s>180);c+=`
              <path
                data-fq-part="${e}"
                class="fq-clickable"
                d="M 100,100 L ${n},${l} A 94,94 0 ${d},1 ${o},${u} Z"
                fill="${i[e]?"var(--fq-mark)":"transparent"}"
              ></path>
            `,a+=`
              <line
                x1="100" y1="100" x2="${n}" y2="${l}"
                stroke="#000000" stroke-width="2"
              ></line>
            `}return t.innerHTML=`
          <svg class="fq-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="200" height="200" aria-hidden="true">
            <circle cx="100" cy="100" r="94" stroke="#000000" stroke-width="2" fill="#ffffff"></circle>
            ${c}
            ${a}
            <circle cx="100" cy="100" r="94" stroke="#000000" stroke-width="2" fill="none"></circle>
          </svg>
        `,t.onclick=t=>{let r=t.target&&t.target.closest?t.target.closest("[data-fq-part]"):null;if(!r||l)return;let i=parseInt(r.getAttribute("data-fq-part"),10);Number.isFinite(i)&&(this.toggleCircle(e,i),this.render(e))},this.syncDomState(e),!0},renderRect(e,t){let r=this.getMeta(e,"rect"),i=this.rectDims[e]||{rows:r.rows||1,cols:r.cols||1},l=Array.isArray(this.rect[e])?this.rect[e]:this.ensureRect(e,i.rows,i.cols),s=n(i.rows,1,20,1),c=n(i.cols,1,20,1),a=!!r.locked,o=188/c,u=188/s,d="",h="";for(let e=0;e<s;e++)for(let t=0;t<c;t++){let r=e*c+t,i=6+t*o,n=6+e*u;d+=`
              <rect
                data-fq-part="${r}"
                class="fq-clickable"
                x="${i}" y="${n}" width="${o}" height="${u}"
                fill="${l[r]?"var(--fq-mark)":"transparent"}"
              ></rect>
            `}for(let e=0;e<=s;e++){let t=6+e*u;h+=`<line x1="6" y1="${t}" x2="194" y2="${t}" stroke="#000000" stroke-width="2"></line>`}for(let e=0;e<=c;e++){let t=6+e*o;h+=`<line x1="${t}" y1="6" x2="${t}" y2="194" stroke="#000000" stroke-width="2"></line>`}return t.innerHTML=`
          <svg class="fq-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="200" height="200" aria-hidden="true">
            <rect x="0" y="0" width="200" height="200" fill="#ffffff" stroke="#000000" stroke-width="2"></rect>
            ${d}
            ${h}
          </svg>
        `,t.onclick=t=>{let r=t.target&&t.target.closest?t.target.closest("[data-fq-part]"):null;if(!r||a)return;let i=parseInt(r.getAttribute("data-fq-part"),10);Number.isFinite(i)&&(this.toggleRect(e,i),this.render(e))},this.syncDomState(e),!0},_fqLabelOf(e){if(!e)return"";let t=[];try{t.push(e.textContent||"")}catch(e){}try{e.className&&t.push(String(e.className))}catch(e){}let r=["title","aria-label","data-action","data-title","name","value"];for(let i=0;i<r.length;i++)try{let n=e.getAttribute&&e.getAttribute(r[i]);n&&t.push(n)}catch(e){}return t.join(" ").replace(/\s+/g," ").trim().toLowerCase()},_fqIsRevealButton(e){let t=this._fqLabelOf(e);return/(aufl|aufl[oö]sen|l[oö]sung|show solution|solution|resolve)/i.test(t)},_fqLooksRevealed(e){if(!e||!e.querySelector)return!1;try{if(e.querySelector('[data-state="resolved"], [data-revealed="true"], [data-state="revealed"]'))return!0}catch(e){}let t=e.querySelector(".lia-quiz__feedback, [class*='feedback']"),r=(t&&t.textContent||"").toLowerCase();return!!/(aufgel|aufl[oö]s|l[oö]sung|show solution|resolved|solution)/i.test(r)},ensureQuizBridge(e,t){let r=this.getNodes(e),n=this.getMeta(e);if(!t||r._quizBridgeInstalled&&r._quizScope===t&&t.isConnected)return;if(r.observer){try{r.observer.disconnect()}catch(e){}r.observer=null}if(r._quizScope&&r._quizClickHandler)try{r._quizScope.removeEventListener("click",r._quizClickHandler,!0)}catch(e){}let l=t=>{let r=t.target&&t.target.closest?t.target.closest("button, input[type='button'], input[type='submit']"):null;r&&this._fqIsRevealButton(r)&&n.ready&&(i("quiz-reveal-click",e,{label:this._fqLabelOf(r)}),setTimeout(()=>{this.markRevealed(e)},0))};t.addEventListener("click",l,!0);let s=null;if("u">typeof MutationObserver){s=new MutationObserver(()=>{n.ready&&!n.revealed&&this._fqLooksRevealed(t)&&(i("quiz-observer-detected-revealed",e),this.markRevealed(e))});try{s.observe(t,{subtree:!0,childList:!0,attributes:!0,characterData:!0})}catch(e){s=null}}r._quizBridgeInstalled=!0,r._quizScope=t,r._quizClickHandler=l,r.observer=s,i("ensureQuizBridge",e,{scope:a(t)})},onCheck(e,t){return i("onCheck",e,{passed:!!t}),t&&this.markSolved(e),!!t},onReveal(e){return i("onReveal",e),this.markRevealed(e)},check(e){return e=String(null==e?"":e),!!this.isCorrect(e)&&(this.isLocked(e)||this.onCheck(e,!0),!0)},mountCircle(e,t){e=String(null==e?"":e);let r=0,i=()=>{let n=document.getElementById("fq-circle-wrap-"+e),l=document.getElementById("fq-circle-host-"+e),s=document.getElementById("fq-circle-mount-"+e),c=document.getElementById("fq-circle-range-"+e),a=c?c.querySelector('input[type="range"]'):null;if(n&&l&&s&&c&&a){this.attachCircle(e,{wrap:n,host:l,mount:s,circleInput:a,target:t,initialParts:a.value||1}),this.ensureQuizBridge(e,n);return}++r<240&&requestAnimationFrame(i)};i()},mountRect(e,t){e=String(null==e?"":e);let r=0,i=()=>{let n=document.getElementById("fq-rect-wrap-"+e),l=document.getElementById("fq-rect-host-"+e),s=document.getElementById("fq-rect-mount-"+e),c=document.getElementById("fq-rect-rows-wrap-"+e),a=document.getElementById("fq-rect-cols-wrap-"+e),o=c?c.querySelector('input[type="range"]'):null,u=a?a.querySelector('input[type="range"]'):null;if(n&&l&&s&&c&&a&&o&&u){this.attachRect(e,{wrap:n,host:l,mount:s,rowsInput:o,colsInput:u,target:t,initialRows:o.value||1,initialCols:u.value||1}),this.ensureQuizBridge(e,n);return}++r<240&&requestAnimationFrame(i)};i()}},i("fraction-store-created")),e.__LIA_FRACTION_QUIZ__=e[t],window.__LIA_FRACTION_QUIZ__=e[t]}()},{}]},["8RSWf"],"8RSWf","parcelRequire9430",{});
//# sourceMappingURL=index.js.map
