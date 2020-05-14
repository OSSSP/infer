(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{140:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return u}));var n=r(1),o=r(9),a=(r(0),r(214)),i={id:"getting-started",title:"Getting started with Infer"},c={id:"getting-started",title:"Getting started with Infer",description:"## Get Infer",source:"@site/docs/00-getting-started.md",permalink:"/docs/next/getting-started",version:"next",sidebar:"docs",next:{title:"Hello, World!",permalink:"/docs/next/hello-world"}},l=[{value:"Get Infer",id:"get-infer",children:[]},{value:"Try Infer in your browser",id:"try-infer-in-your-browser",children:[]}],s={rightToc:l};function u(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"get-infer"},"Get Infer"),Object(a.b)("p",null,"You can use Homebrew (Mac only), our binary releases, build infer from source,\nor use our Docker image."),Object(a.b)("p",null,"On Mac, the simplest way is to use ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"http://brew.sh/"}),"Homebrew"),". Type this into a\nterminal:"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sh"}),"brew install infer\n")),Object(a.b)("p",null,"On Linux, or if you do not wish to use Homebrew on Mac, use our latest\n",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/facebook/infer/releases/latest"}),"binary release"),". Download\nthe tarball then extract it anywhere on your system to start using infer. For\nexample, this downloads infer in /opt on Linux (replace ",Object(a.b)("inlineCode",{parentName:"p"},"VERSION")," with the\nlatest release, eg ",Object(a.b)("inlineCode",{parentName:"p"},"VERSION=0.17.0"),"):"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),'VERSION=0.XX.Y; \\\ncurl -sSL "https://github.com/facebook/infer/releases/download/v$VERSION/infer-linux64-v$VERSION.tar.xz" \\\n| sudo tar -C /opt -xJ && \\\nln -s "/opt/infer-linux64-v$VERSION/bin/infer" /usr/local/bin/infer\n')),Object(a.b)("p",null,"If the binaries do not work for you, or if you would rather build infer from\nsource, follow the\n",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/facebook/infer/blob/master/INSTALL.md#install-infer-from-source"}),"install from source"),"\ninstructions to install Infer on your system."),Object(a.b)("p",null,"Alternatively, use our ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://docs.docker.com/engine/installation/"}),"Docker"),"\nimage:"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"wget -O Dockerfile https://raw.githubusercontent.com/facebook/infer/master/docker/0.14.0/Dockerfile\nwget -O run.sh https://raw.githubusercontent.com/facebook/infer/master/docker/0.14.0/run.sh\nsh run.sh\n")),Object(a.b)("h2",{id:"try-infer-in-your-browser"},"Try Infer in your browser"),Object(a.b)("p",null,"Try Infer on a small example on\n",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://codeboard.io/projects/11587?view=2.1-21.0-22.0"}),"Codeboard"),"."))}u.isMDXComponent=!0},214:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return d}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=o.a.createContext({}),u=function(e){var t=o.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c({},t,{},e)),r},b=function(e){var t=u(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=Object(n.forwardRef)((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),b=u(r),f=n,d=b["".concat(i,".").concat(f)]||b[f]||p[f]||a;return r?o.a.createElement(d,c({ref:t},s,{components:r})):o.a.createElement(d,c({ref:t},s))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<a;s++)i[s]=r[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}f.displayName="MDXCreateElement"}}]);