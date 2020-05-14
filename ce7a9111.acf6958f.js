(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{196:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return o})),t.d(n,"metadata",(function(){return c})),t.d(n,"rightToc",(function(){return l})),t.d(n,"default",(function(){return s}));var r=t(1),a=t(9),i=(t(0),t(214)),o={id:"experimental-checkers",title:"Infer : Experimental Checkers"},c={id:"version-0.17.0/experimental-checkers",title:"Infer : Experimental Checkers",description:"Infer contains a number of experimental checkers that can be run using just like",source:"@site/versioned_docs/version-0.17.0/01-experimental-checkers.md",permalink:"/docs/experimental-checkers",version:"0.17.0",sidebar:"version-0.17.0/docs",previous:{title:"Infer : RacerD",permalink:"/docs/racerd"},next:{title:"Advanced usage",permalink:"/docs/advanced-features"}},l=[],u={rightToc:l};function s(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},u,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Infer contains a number of experimental checkers that can be run using just like\nthe normal infer analysis\n",Object(i.b)("inlineCode",{parentName:"p"},"infer -a checkers --<checker_name> -- <your build command>"),". ",Object(i.b)("inlineCode",{parentName:"p"},"checker_name")," can\nbe ",Object(i.b)("inlineCode",{parentName:"p"},"bufferoverrun"),", ",Object(i.b)("inlineCode",{parentName:"p"},"siof"),", or ",Object(i.b)("inlineCode",{parentName:"p"},"quandary"),'. We\'ll explain the capabilities of\neach experimental checker, its level of maturity (on a scale including "in\ndevelopment", "medium", and "probably deployable"), and the language(s) it\ntargets.'),Object(i.b)("h1",{id:"inferbo"},"Inferbo"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Languages: C (but should be easy to adapt to Objective-C/C++, and possibly\nJava.)"),Object(i.b)("li",{parentName:"ul"},"Maturity: Medium")),Object(i.b)("p",null,"Inferbo is a detector for out-of-bounds array accesses. You can read all about\nit in this blog\n",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://research.fb.com/inferbo-infer-based-buffer-overrun-analyzer/"}),"post"),". It\nhas been tuned for C, but we are planning to adapt it to other languages in the\nnear future."),Object(i.b)("h1",{id:"quandary"},"Quandary"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Languages: Java, C/C++"),Object(i.b)("li",{parentName:"ul"},"Maturity: Medium")),Object(i.b)("p",null,"Quandary is a static taint analyzer that identifies a variety of unsafe\ninformation flows. It has a small list of built-in\n",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/facebook/infer/blob/master/infer/src/quandary/JavaTrace.ml#L36"}),"sources"),"\nand\n",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/facebook/infer/blob/master/infer/src/quandary/JavaTrace.ml#L178"}),"sinks"),",\nand you can define custom sources and sinks in your ",Object(i.b)("inlineCode",{parentName:"p"},".inferconfig")," file (see\nexample\n",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/facebook/infer/blob/master/infer/tests/codetoanalyze/java/quandary/.inferconfig"}),"here"),")."))}s.isMDXComponent=!0},214:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return m}));var r=t(0),a=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var u=a.a.createContext({}),s=function(e){var n=a.a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):c({},n,{},e)),t},b=function(e){var n=s(e.components);return a.a.createElement(u.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},f=Object(r.forwardRef)((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),b=s(t),f=r,m=b["".concat(o,".").concat(f)]||b[f]||p[f]||i;return t?a.a.createElement(m,c({ref:n},u,{components:t})):a.a.createElement(m,c({ref:n},u))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=f;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var u=2;u<i;u++)o[u]=t[u];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"}}]);