"use strict";(self.webpackChunkzoomkoding_com=self.webpackChunkzoomkoding_com||[]).push([[293],{9452:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var a=n(6540);const l=function(e,t){void 0===t&&(t=100);let n=null;return a=>{n||(n=setTimeout((()=>{e(a),clearTimeout(n),n=null}),t))}};var r=n(3421),c=n(2949);var s=function(){return a.createElement("hgroup",null,a.createElement("h1",{className:"main-title--header"},"LESS,",a.createElement("br",null),"BUT",a.createElement("br",null),"BETTER"),a.createElement("h2",{className:"main-title--who"},"by SOOBING"))},o=n(1748);var m=function(){const{0:e,1:t}=(0,a.useState)(0),n=(0,a.useRef)(null);(0,a.useEffect)((()=>{const e=l((e=>{if(null==n||!n.current)return;const a=n.current.getBoundingClientRect(),l={x:a.x+a.width/2,y:a.y+a.height/2},r=((e,t)=>{let{x:n,y:a}=e,{x:l,y:r}=t;const c=r-a,s=l-n;return Math.atan2(c,s)*(180/Math.PI)})({x:e.clientX,y:e.clientY},l);t(r>=90&&r<=180?r-90:r+270)}),50);return window.addEventListener("mousemove",e),()=>{window.removeEventListener("mousemove",e)}}),[]);const r={home:e>=345||e<=15,about:e>=75&&e<=105,posts:e>=165&&e<=195},c=r.home||r.about||r.posts;return a.createElement("nav",{ref:n,className:"round-navigation__wrapper"},a.createElement("span",{className:"current-line",style:{transform:`translate(-50%, 0%) rotate(${e}deg)`}},a.createElement("span",{className:"current-line--orange",style:{border:"1px solid "+(c?"#FF5C00":"#585858"),backgroundColor:""+(c?"#FF5C00":"#585858")}})),a.createElement("ul",null,a.createElement("li",{className:"link link--12"},a.createElement(o.Link,{to:"/"},a.createElement("hr",{className:"line"}),a.createElement("span",{className:"label"},"HOME"))),a.createElement("li",{className:"link link--3"},a.createElement(o.Link,{to:"/about"},a.createElement("hr",{className:"line"}),a.createElement("span",{className:"label"},"ABOUT"))),a.createElement("li",{className:"link link--6"},a.createElement(o.Link,{to:"/posts"},a.createElement("hr",{className:"line"}),a.createElement("span",{className:"label"},"POSTS")))))},i=n(4348);var u=function(e){let{data:t}=e;const{0:n,1:o}=(0,a.useState)(!0);return(0,a.useEffect)((()=>{const e=l((()=>{o(window.innerWidth<500)}),100);return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]),a.createElement(r.A,{showHeader:!1},a.createElement(c.A,{title:"Home"}),a.createElement("div",{className:"main-page"},a.createElement("section",{className:"content"},a.createElement(s,null),n?a.createElement(i.A,{type:"vertical"}):a.createElement(m,null))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-434fa41e40c821c2f362.js.map