import e,{useEffect as t,useState as n,useRef as o,useCallback as a}from"react";function r(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===n&&o.firstChild?o.insertBefore(a,o.firstChild):o.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}var i,d,l,c,s,f;r(".fable-embed{background-color:#fff}"),"function"==typeof SuppressedError&&SuppressedError,function(e){e.DemoLoadingStarted="demo-loading-started",e.DemoLoadingFinished="demo-loading-finished",e.OnNavigation="on-navigation",e.JourneySwitch="journey-switch",e.NavToAnnotation="navigate-to-annotation"}(i||(i={})),function(e){e.Large="large",e.Medium="medium",e.Small="small"}(d||(d={})),function(e){e.Primary="primary",e.Link="link",e.Outline="outline"}(l||(l={})),function(e){e.TOP_LEFT="c-top-left",e.TOP_CENTER="c-top-center",e.TOP_RIGHT="c-top-right",e.RIGHT_TOP="c-right-top",e.RIGHT_CENTER="c-right-center",e.RIGHT_BOTTOM="c-right-bottom",e.BOTTOM_RIGHT="c-bottom-right",e.BOTTOM_CENTER="c-bottom-center",e.BOTTOM_LEFT="c-bottom-left",e.LEFT_BOTTOM="c-left-bottom",e.LEFT_CENTER="c-left-center",e.LEFT_TOP="c-left-top"}(c||(c={})),function(e){e.Auto="auto"}(s||(s={})),function(e){e.BottomRight="bottom-right",e.BottomLeft="bottom-left",e.Center="center",e.Follow="follow"}(f||(f={}));const m=n=>(t((()=>{function e(e){if(e.data.type===i.OnNavigation&&n.onAnnotationChange){const t=e.data.payload;if(n.demoRid!==t.demoRid)return;n.onAnnotationChange(t.currentAnnotationRefId,t.journeyIndex)}if(e.data.type===i.DemoLoadingFinished&&n.onLoaded){const t=e.data.payload;if(n.demoRid!==t.demoRid)return;n.onLoaded(t.annConfigs,t.journeyData)}}return window.addEventListener("message",e),()=>{window.removeEventListener("message",e)}}),[n.onLoaded,n.onAnnotationChange]),e.createElement("iframe",{ref:n.innerRef,style:Object.assign({border:"1px solid rgba(0, 0, 0, 0.1)",width:"100%",height:"100%",marginTop:"1rem"},n.style),height:"100%",className:"fable-embed",src:((e,t)=>{const o=n.origin||"https://app.sharefable.com",a=t||{hm:1,ha:1},r=JSON.stringify(a),i=encodeURIComponent(btoa(r));return new URL(`p/demo/${e}?c=${i}`,o).href})(n.demoRid),allowFullScreen:!0,id:"sharefable"}));r('.fable-hoc{background:transparent;display:flex;flex-direction:column;height:auto;max-width:1440px;width:100%}.fable-hoc .con-module-f-hoc{display:flex;flex:0 0 auto;flex-direction:row;flex-wrap:nowrap;gap:2.6rem;overflow-x:auto;padding:1rem}.fable-hoc .con-module-f-hoc .journey-data{color:#333;flex:none;position:relative}.fable-hoc .con-module-f-hoc .journey-data h1{font-size:1rem;font-weight:700}.fable-hoc .con-module-f-hoc .journey-data:not(:last-child):after{border-right:3px solid #000;border-top:3px solid #000;content:"";height:1.4rem;position:absolute;right:-1.3rem;top:50%;transform:translate(.3rem,-50%) rotate(45deg);transform-origin:center;width:1.4rem}.fable-hoc .con-fable-hoc{display:grid;gap:1rem;position:relative;width:100%}.fable-hoc .con-fable-hoc .con-demo{height:fit-content;position:sticky;width:100%;z-index:1}.fable-hoc .con-fable-hoc .con-buttons{align-items:center;display:flex;gap:2rem;justify-content:end}.fable-hoc .con-fable-hoc .con-buttons .fable-nav{background:rgba(0,0,0,.1);cursor:pointer;padding:1rem}.fable-hoc .con-fable-hoc .con-ann-text{display:flex;flex-direction:column;height:100%;margin:1rem auto;max-height:100%;scrollbar-width:thin}.fable-hoc .con-fable-hoc .con-text-journey{border-bottom:1px solid #bbb;display:flex;flex-direction:column;gap:.4rem;padding:.4rem}.fable-hoc .con-fable-hoc .con-text-journey .journey-title{color:#333;font-size:1.2rem;font-weight:700;margin-bottom:.4rem;text-align:center}.fable-hoc .con-fable-hoc .ann-text{border-radius:.5rem;padding:1rem;transition:box-shadow .8s ease}.fable-hoc .con-fable-hoc .ann-text .ann-number{align-items:center;aspect-ratio:1/1;background:#e78895;border-radius:1rem;color:#fff;display:flex;font-size:.8rem;font-weight:700;height:fit-content;justify-content:center;min-height:fit-content;min-width:fit-content;padding:.4rem;width:2rem}');const h=(e,t)=>{var n;const o=t.current;o&&(null===(n=o.contentWindow)||void 0===n||n.postMessage({type:"navigate-to-annotation",sender:"sharefable.com",payload:{action:e}},"*"))};r(".ann-text{border-radius:.5rem;padding:1rem;transition:box-shadow .8s ease}.ann-text .ann-number{align-items:center;aspect-ratio:1/1;background:#e78895;border-radius:1rem;color:#fff;display:flex;font-size:.8rem;font-weight:700;height:fit-content;justify-content:center;max-height:1.6rem;max-width:1.6rem;padding:.4rem;width:1.6rem}");const u=t=>e.createElement("div",{style:{boxShadow:t.currAnnRefId===t.ann.refId?"0 0 0 2px rgba(0, 0, 0)":"",position:"stacked"===t.layout?"sticky":"static",top:"stacked"===t.layout?"170px":"auto"},className:"ann-text",key:t.ann.refId,"data-f-id":t.ann.refId,"data-f-annidx":t.idx,onClick:()=>{t.handleAnnotationClick(t.idx,t.jIdx)}},e.createElement("div",{style:{display:"flex",gap:"0.4rem",width:"100%"}},e.createElement("span",{className:"ann-number"},t.idx+1),e.createElement("p",null,t.ann.displayText))),p=r=>{var{layout:i="sidebyside",origin:d,demoRid:l,contentWidthPercentage:c=30,stopDuration:s=1e3}=r,f=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n}(r,["layout","origin","demoRid","contentWidthPercentage","stopDuration"]);const[p,g]=n(""),[b,y]=n(!1),[x,v]=n(null),[w,I]=n(0),[T,E]=n([]),O=o(null),R=o(null),k=o(null),[C,N]=n(!1),j=o(null);t((()=>{j.current&&(p===j.current.destinationRefId?(N(!1),j.current=null):setTimeout((()=>{h(j.current.direction,O)}),s<=600?600:s))}),[p]);const L=(e,t=0)=>{if(C)return;let n,o,a;const r=e;let i=0;x&&x.length>0?(n=t,o=w,a=x[o].annsInOrder.findIndex((e=>e.refId===p)),i=((e,t,n,o,a)=>{let r=0;if(o!==n){const i=Math.min(o,n),d=Math.max(o,n);for(let e=i+1;e<d;e++)r+=a[e].annsInOrder.length;r+=n-o>=1?a[o].annsInOrder.length-t+e:e-a[n].annsInOrder.length-t}else r=e-t;return r})(r,a,n,o,x)):(a=T.findIndex((e=>e.refId===p)),i=r-a),((e,t,n,o,a)=>{if(0===e)return void N(!1);if(N(!0),a&&void 0!==n&&void 0!==t&&e<0){if(t===n){const t=a[n].annsInOrder[o].refId;return j.current={direction:e<0?"prev":"next",destinationRefId:t},void h(e<0?"prev":"next",O)}{const n=a[t],r=n.annsInOrder[0].refId;if(((e,t,n)=>{var o;const a=n.current;a&&(null===(o=a.contentWindow)||void 0===o||o.postMessage({type:"navigate-to-annotation",sender:"sharefable.com",payload:{main:`${e}/${t}`}},"*"))})(n.annsInOrder[0].screenId,r,O),I(t),g(r),0===o)return void N(!1);e=o}}const r=T&&T.length>0?T[o].refId:a[t].annsInOrder[o].refId;j.current={direction:e<0?"prev":"next",destinationRefId:r},setTimeout((()=>{h(e<0?"prev":"next",O)}),s<=600?600:s)})(i,n,o,r,x)},A=a(((e,t)=>{if(y(!0),e&&e.length)return E(e),void g(e[0].refId);v(t),(null==t?void 0:t.length)&&g(t[0].annsInOrder[0].refId)}),[]),B=a(((e,t)=>{g(e),I(t||0)}),[]);return t((()=>{var e,t;if(!b)return;const n=null===(e=k.current)||void 0===e?void 0:e.querySelector(`[data-f-id="${p}"]`);if(n)if("sidebyside"===i){const e=n.offsetTop-window.innerHeight/2;window.scrollTo({top:e,behavior:"smooth"})}else{const e=null===(t=R.current)||void 0===t?void 0:t.getBoundingClientRect().bottom,o=n.getBoundingClientRect().top,a=n.getBoundingClientRect().height;window.scrollBy({top:o-e-a,behavior:"smooth"})}}),[p]),e.createElement("div",Object.assign({className:"fable-hoc"},f),e.createElement("div",{className:"con-module-f-hoc"},x&&(null==x?void 0:x.map((t=>e.createElement("div",{className:"journey-data",key:`journey-${t.main}`},e.createElement("h1",null,t.header1),e.createElement("p",null,t.header2)))))),e.createElement("div",{className:"con-fable-hoc",style:{gridTemplateColumns:"stacked"===i?"1fr":`${c}% auto`,gridTemplateRows:"stacked"===i?"auto 1fr":"1fr"}},e.createElement("div",{className:"con-demo",ref:R,style:{top:"sidebyside"===i?"1.5rem":"170px"}},e.createElement(m,{origin:d,demoRid:l,onLoaded:A,innerRef:O,onAnnotationChange:B,style:{minHeight:"sidebyside"===i?"40rem":"30rem",marginTop:"0"}}),e.createElement("div",{className:"con-buttons"},e.createElement("span",{className:"fable-nav",onClick:()=>h("prev",O)},"Prev"),e.createElement("span",{className:"fable-nav",onClick:()=>h("next",O)},"Next"))),e.createElement("div",{ref:k,className:"con-ann-text",style:{cursor:C?"progress":"pointer",position:"stacked"===i?"sticky":"static",top:"stacked"===i?"1.5rem":"auto",order:"sidebyside"===i?-1:0,width:"stacked"===i?c+"%":"auto"}},x&&(null==x?void 0:x.map(((t,n)=>e.createElement("div",{key:t.main,className:"con-text-journey"},e.createElement("h3",{className:"journey-title"},t.header1),t.annsInOrder.map(((t,o)=>e.createElement(u,{ann:t,idx:o,jIdx:n,handleAnnotationClick:L,currAnnRefId:p,key:t.refId,layout:i}))))))),T&&T.length>0&&T.map(((t,n)=>e.createElement(u,{ann:t,idx:n,handleAnnotationClick:L,currAnnRefId:p,key:t.refId,layout:i}))))))};export{p as default};
//# sourceMappingURL=fable-hoc.mjs.map
