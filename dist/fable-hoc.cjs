"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react");function t(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===n&&o.firstChild?o.insertBefore(r,o.firstChild):o.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}}var n,o,r,a,i,d;t(".fable-embed{background-color:#fff}"),"function"==typeof SuppressedError&&SuppressedError,function(e){e.DemoLoadingStarted="demo-loading-started",e.DemoLoadingFinished="demo-loading-finished",e.OnNavigation="on-navigation",e.JourneySwitch="journey-switch",e.NavToAnnotation="navigate-to-annotation"}(n||(n={})),function(e){e.Large="large",e.Medium="medium",e.Small="small"}(o||(o={})),function(e){e.Primary="primary",e.Link="link",e.Outline="outline"}(r||(r={})),function(e){e.TOP_LEFT="c-top-left",e.TOP_CENTER="c-top-center",e.TOP_RIGHT="c-top-right",e.RIGHT_TOP="c-right-top",e.RIGHT_CENTER="c-right-center",e.RIGHT_BOTTOM="c-right-bottom",e.BOTTOM_RIGHT="c-bottom-right",e.BOTTOM_CENTER="c-bottom-center",e.BOTTOM_LEFT="c-bottom-left",e.LEFT_BOTTOM="c-left-bottom",e.LEFT_CENTER="c-left-center",e.LEFT_TOP="c-left-top"}(a||(a={})),function(e){e.Auto="auto"}(i||(i={})),function(e){e.BottomRight="bottom-right",e.BottomLeft="bottom-left",e.Center="center",e.Follow="follow"}(d||(d={}));const l=t=>(e.useEffect((()=>{function e(e){if(e.data.type===n.OnNavigation&&t.onAnnotationChange){const n=e.data.payload;if(t.demoRid!==n.demoRid)return;t.onAnnotationChange(n.currentAnnotationRefId,n.journeyIndex)}if(e.data.type===n.DemoLoadingFinished&&t.onLoaded){const n=e.data.payload;if(t.demoRid!==n.demoRid)return;t.onLoaded(n.annConfigs,n.journeyData)}}return window.addEventListener("message",e),()=>{window.removeEventListener("message",e)}}),[t.onLoaded,t.onAnnotationChange]),e.createElement("iframe",{ref:t.innerRef,style:Object.assign({border:"1px solid rgba(0, 0, 0, 0.1)",width:"100%",height:"100%",marginTop:"1rem"},t.style),height:"100%",className:"fable-embed",src:((e,n)=>{const o=t.origin||"https://app.sharefable.com",r=n||{hm:1,ha:1},a=JSON.stringify(r),i=encodeURIComponent(btoa(a));return new URL(`p/demo/${e}?c=${i}`,o).href})(t.demoRid),allowFullScreen:!0,id:"sharefable"}));t('.fable-hoc{background:transparent;display:flex;flex-direction:column;height:auto;max-width:1440px;width:100%}.fable-hoc .con-module-f-hoc{display:flex;flex:0 0 auto;flex-direction:row;flex-wrap:nowrap;gap:2.6rem;overflow-x:auto;padding:1rem}.fable-hoc .con-module-f-hoc .journey-data{color:#333;flex:none;position:relative}.fable-hoc .con-module-f-hoc .journey-data h1{font-size:1rem;font-weight:700}.fable-hoc .con-module-f-hoc .journey-data:not(:last-child):after{border-right:3px solid #000;border-top:3px solid #000;content:"";height:1.4rem;position:absolute;right:-1.3rem;top:50%;transform:translate(.3rem,-50%) rotate(45deg);transform-origin:center;width:1.4rem}.fable-hoc .con-fable-hoc{display:grid;gap:1rem;position:relative;width:100%}.fable-hoc .con-fable-hoc .con-demo{height:fit-content;position:sticky;width:100%;z-index:1}.fable-hoc .con-fable-hoc .con-buttons{align-items:center;display:flex;gap:2rem;justify-content:end}.fable-hoc .con-fable-hoc .con-buttons .fable-nav{background:rgba(0,0,0,.1);cursor:pointer;padding:1rem}.fable-hoc .con-fable-hoc .con-ann-text{display:flex;flex-direction:column;height:100%;margin:1rem auto;max-height:100%;scrollbar-width:thin}.fable-hoc .con-fable-hoc .con-text-journey{border-bottom:1px solid #bbb;display:flex;flex-direction:column;gap:.4rem;padding:.4rem}.fable-hoc .con-fable-hoc .con-text-journey .journey-title{color:#333;font-size:1.2rem;font-weight:700;margin-bottom:.4rem;text-align:center}.fable-hoc .con-fable-hoc .ann-text{border-radius:.5rem;padding:1rem;transition:box-shadow .8s ease;transition:visibility .3s ease-out}.fable-hoc .con-fable-hoc .ann-text .ann-number{align-items:center;aspect-ratio:1/1;background:#e78895;border-radius:1rem;color:#fff;display:flex;font-size:.8rem;font-weight:700;height:fit-content;justify-content:center;min-height:fit-content;min-width:fit-content;padding:.4rem;width:2rem}');const c=(e,t)=>{var n;const o=t.current;o&&(null===(n=o.contentWindow)||void 0===n||n.postMessage({type:"navigate-to-annotation",sender:"sharefable.com",payload:{action:e}},"*"))};t(".ann-text{border-radius:.5rem;padding:1rem;transition:box-shadow .8s ease}.ann-text .ann-number{align-items:center;aspect-ratio:1/1;background:#e78895;border-radius:1rem;color:#fff;display:flex;font-size:.8rem;font-weight:700;height:fit-content;justify-content:center;max-height:1.6rem;max-width:1.6rem;padding:.4rem;width:1.6rem}");const s=t=>e.createElement("div",{style:{boxShadow:t.currAnnRefId===t.ann.refId?"0 0 0 2px rgba(0, 0, 0)":"",position:"stacked"===t.layout?"sticky":"static",top:"stacked"===t.layout?"50px":"auto"},className:"ann-text",key:t.ann.refId,"data-f-id":t.ann.refId,"data-f-annidx":t.idx,onClick:()=>{t.handleAnnotationClick(t.idx,t.jIdx)}},e.createElement("div",{style:{display:"flex",gap:"0.4rem",width:"100%"}},e.createElement("span",{className:"ann-number"},t.idx+1),e.createElement("p",{style:{margin:0}},t.ann.displayText)));exports.default=t=>{var{layout:n="sidebyside",origin:o,demoRid:r,contentWidthPercentage:a=30,stopDuration:i=1e3,top:d}=t,f=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n}(t,["layout","origin","demoRid","contentWidthPercentage","stopDuration","top"]);const[m,u]=e.useState(""),[h,p]=e.useState(!1),[g,b]=e.useState(null),[y,v]=e.useState(0),[x,w]=e.useState([]),E=e.useRef(null),I=e.useRef(null),T=e.useRef(null),[O,R]=e.useState(!1),k=e.useRef(null);e.useEffect((()=>{k.current&&(m===k.current.destinationRefId?(R(!1),k.current=null):setTimeout((()=>{c(k.current.direction,E)}),i<=600?600:i))}),[m]);const C=(e,t=0)=>{if(O)return;let n,o,r;const a=e;let d=0;g&&g.length>0?(n=t,o=y,r=g[o].annsInOrder.findIndex((e=>e.refId===m)),d=((e,t,n,o,r)=>{let a=0;if(o!==n){const i=Math.min(o,n),d=Math.max(o,n);for(let e=i+1;e<d;e++)a+=r[e].annsInOrder.length;a+=n-o>=1?r[o].annsInOrder.length-t+e:e-r[n].annsInOrder.length-t}else a=e-t;return a})(a,r,n,o,g)):(r=x.findIndex((e=>e.refId===m)),d=a-r),((e,t,n,o,r)=>{if(0===e)return void R(!1);if(R(!0),r&&void 0!==n&&void 0!==t&&e<0){if(t===n){const t=r[n].annsInOrder[o].refId;return k.current={direction:e<0?"prev":"next",destinationRefId:t},void c(e<0?"prev":"next",E)}{const n=r[t],a=n.annsInOrder[0].refId;if(((e,t,n)=>{var o;const r=n.current;r&&(null===(o=r.contentWindow)||void 0===o||o.postMessage({type:"navigate-to-annotation",sender:"sharefable.com",payload:{main:`${e}/${t}`}},"*"))})(n.annsInOrder[0].screenId,a,E),v(t),u(a),0===o)return void R(!1);e=o}}const a=x&&x.length>0?x[o].refId:r[t].annsInOrder[o].refId;k.current={direction:e<0?"prev":"next",destinationRefId:a},setTimeout((()=>{c(e<0?"prev":"next",E)}),i<=600?600:i)})(d,n,o,a,g)},j=e.useCallback(((e,t)=>{if(p(!0),e&&e.length)return w(e),void u(e[0].refId);b(t),(null==t?void 0:t.length)&&u(t[0].annsInOrder[0].refId)}),[]),N=e.useCallback(((e,t)=>{u(e),v(t||0)}),[]);return e.useEffect((()=>{var e,t;if(!h)return;const o=null===(e=T.current)||void 0===e?void 0:e.querySelector(`[data-f-id="${m}"]`);if(o)if("sidebyside"===n){const e=o.offsetTop-window.innerHeight/2;window.scrollTo({top:e,behavior:"smooth"})}else{const e=null===(t=I.current)||void 0===t?void 0:t.getBoundingClientRect().bottom,n=o.getBoundingClientRect().top,r=o.getBoundingClientRect().height;window.scrollBy({top:n-e-r,behavior:"smooth"})}}),[m]),e.useEffect((()=>{if("sidebyside"===n&&!h)return;const e=()=>{const e=I.current;if(!e)return;(e=>{var t;const n=null===(t=T.current)||void 0===t?void 0:t.querySelectorAll(".ann-text");n&&n.forEach((t=>{const n=t.getBoundingClientRect();console.log(e.bottom,n.bottom,e.y,t),e.bottom-n.height-30<n.top&&e.top>0?t.style.visibility="visible":t.style.visibility="hidden"}))})(e.getBoundingClientRect())};return window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}}),[n,h]),e.createElement("div",Object.assign({className:"fable-hoc"},f),e.createElement("div",{className:"con-module-f-hoc"},g&&(null==g?void 0:g.map((t=>e.createElement("div",{className:"journey-data",key:`journey-${t.main}`},e.createElement("h1",null,t.header1),e.createElement("p",null,t.header2)))))),e.createElement("div",{className:"con-fable-hoc",style:{gridTemplateColumns:"stacked"===n?"1fr":`${a}% auto`,gridTemplateRows:"stacked"===n?"auto 1fr":"1fr"}},e.createElement("div",{className:"con-demo",ref:I,style:{top:"sidebyside"===n?d||"1.5rem":d||"170px"}},e.createElement(l,{origin:o,demoRid:r,onLoaded:j,innerRef:E,onAnnotationChange:N,style:{minHeight:"sidebyside"===n?"40rem":"30rem",marginTop:"0"}}),e.createElement("div",{className:"con-buttons"},e.createElement("span",{className:"fable-nav",onClick:()=>c("prev",E)},"Prev"),e.createElement("span",{className:"fable-nav",onClick:()=>c("next",E)},"Next"))),e.createElement("div",{ref:T,className:"con-ann-text",style:{cursor:O?"progress":"pointer",position:"stacked"===n?"sticky":"static",top:"stacked"===n?"1.5rem":"auto",order:"sidebyside"===n?-1:0,width:"stacked"===n?a+"%":"auto"}},g&&(null==g?void 0:g.map(((t,o)=>e.createElement("div",{key:t.main,className:"con-text-journey"},e.createElement("h3",{className:"journey-title"},t.header1),t.annsInOrder.map(((t,r)=>e.createElement(s,{ann:t,idx:r,jIdx:o,handleAnnotationClick:C,currAnnRefId:m,key:t.refId,layout:n}))))))),x&&x.length>0&&x.map(((t,o)=>e.createElement(s,{ann:t,idx:o,handleAnnotationClick:C,currAnnRefId:m,key:t.refId,layout:n}))))))};
//# sourceMappingURL=fable-hoc.cjs.map
