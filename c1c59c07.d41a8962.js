(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{190:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return i})),t.d(n,"rightToc",(function(){return l})),t.d(n,"default",(function(){return p}));var r=t(1),a=t(9),o=(t(0),t(214)),c={id:"adding-checkers",title:"Simple intraprocedural checkers"},i={id:"version-0.17.0/adding-checkers",title:"Simple intraprocedural checkers",description:"## How can I create my own checkers?",source:"@site/versioned_docs/version-0.17.0/04-adding-checkers.md",permalink:"/docs/adding-checkers",version:"0.17.0",sidebar:"version-0.17.0/docs",previous:{title:"Building checkers with the Infer.AI framework",permalink:"/docs/absint-framework"},next:{title:"Infer Internal OCaml Modules API",permalink:"/docs/internal-API"}},l=[{value:"How can I create my own checkers?",id:"how-can-i-create-my-own-checkers",children:[]},{value:"Before you start",id:"before-you-start",children:[]},{value:"Let&#39;s go",id:"lets-go",children:[]}],s={rightToc:l};function p(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"how-can-i-create-my-own-checkers"},"How can I create my own checkers?"),Object(o.b)("p",null,"Infer Checkers provide a framework to perform intra-procedural static analyses.\nSince this is an open source project, everyone is welcome to contribute with new\ngreat checkers. In this page, we will create a very basic checker - a detector\nfor every time the output method ",Object(o.b)("inlineCode",{parentName:"p"},"java.io.PrintStream.println")," is called. This\nshould be enough to get you started."),Object(o.b)("h2",{id:"before-you-start"},"Before you start"),Object(o.b)("p",null,"Make sure you are able to successfully build Infer and your developer\nenvironment is set up:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{}),"./build-infer.sh\nmake devsetup\n")),Object(o.b)("p",null,"Get familiar with Infer checkers and run Infer with some examples:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{}),"infer run -- javac Hello.java\n")),Object(o.b)("p",null,"In addition, get familiar with the Control Flow Graph (CFG) that Infer generates\nfor you:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{}),"infer run -g -- javac Hello.java\ndot -Tpdf infer-out/captured/Hello.java*/icfg.dot -o icfg.pdf\nopen icfg.pdf\n")),Object(o.b)("p",null,"This will give you further information about the analysis that is being done,\nincluding the CFG in dot format. It is important that you understand the\ngenerated CFG since this is the abstraction of code that Checkers will analyze."),Object(o.b)("p",null,"Infer is built with ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://ocaml.org"}),"OCaml"),". This is a programming language\nthat combines both functional and imperative programming. If you are not\nfamiliar with OCaml, it might be hard at the beginning to understand the code.\nTake your time to review the\n",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://ocaml.org/learn/tutorials/basics.html"}),"basics")," and do some\n",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://ocaml.org/learn/tutorials/99problems.html"}),"exercises"),"."),Object(o.b)("h2",{id:"lets-go"},"Let's go"),Object(o.b)("p",null,"The directory ",Object(o.b)("inlineCode",{parentName:"p"},"infer/src/absint")," contains utilities for the abstract\ninterpretation framework that checkers are based on."),Object(o.b)("p",null,"Looking into ",Object(o.b)("inlineCode",{parentName:"p"},"infer/src/checkers")," we can find some simple checkers. Most of them\nare implemented as a module created from a ",Object(o.b)("inlineCode",{parentName:"p"},"TransferFunctions")," module that is\nturned into an analyzer by applying one of the ",Object(o.b)("inlineCode",{parentName:"p"},"AbstractInterpreter.Make*"),"\nfunctors, together with a ",Object(o.b)("inlineCode",{parentName:"p"},"checker")," function that calls into it. You can start\nby copying the code for one of these and modify it (eg\ncheckers/SimpleChecker.ml). For example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ocaml"}),'module TransferFunctions = struct\n  ...\n  let exec_instr astate proc_data cfg_node (instr : Sil.instr) =\n    match instr with\n    | pattern ->\n        ST.report_error\n          proc_name\n          proc_desc\n          "CHECKERS_MY_SIMPLE_CHECKER"\n          location\n          "A description of my simple checker"\n    | _ -> astate\nend\n\nmodule Analyzer = AbstractInterpreter.Make (TransferFunctions)\n\nlet checker {Callbacks.exe_env; summary; get_procs_in_file} : Summary.t =\n  let proc_name = Summary.get_proc_name summary in\n  let tenv = Exe_env.get_tenv exe_env proc_name in\n  let proc_data = ProcData.make_default summary tenv in\n  ignore (Analyzer.compute_post proc_data ~initial) ;\n  summary\n')),Object(o.b)("p",null,"Checkers implement a function that detects a given pattern for our specific\nchecker and then calls ",Object(o.b)("inlineCode",{parentName:"p"},"AbstractInterpreter.Make")," to iterate over all the nodes\nof the CFG."),Object(o.b)("p",null,"So now we need to know how to create our pattern. As an example, consider the\nfollowing:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ocaml"}),"Sil.Call (_, Sil.Const (Sil.Cfun pn), _, loc, _)\n")),Object(o.b)("p",null,"This pattern matches every function call. In our code, it would look like:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ocaml"}),'  let exec_instr astate proc_data cfg_node (instr : Sil.instr) =\n    match instr with\n    | Call (_, Const (Cfun pn), _, loc, _) ->\n        ST.report_error\n          proc_name\n          proc_desc\n          "CHECKERS_MY_SIMPLE_CHECKER"\n          location\n          "A description of my simple checker"\n    | _ -> astate\n')),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"absint/PatternMatch.ml")," module contains the\n",Object(o.b)("inlineCode",{parentName:"p"},"java_proc_name_with_class_method")," function which we can use for matching the\nrequired pattern."),Object(o.b)("p",null,"Each node is represented using the type ",Object(o.b)("inlineCode",{parentName:"p"},"instr")," from the Smallfoot Intermediate\nLanguage (SIL). Take a look at ",Object(o.b)("inlineCode",{parentName:"p"},"IR/Sil.mli")," to get familiar with all the types.\nAll source code languages supported by Infer are converted to this\nrepresentation."),Object(o.b)("p",null,"In this particular example, ",Object(o.b)("inlineCode",{parentName:"p"},"Sil.Call")," has the following information:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ocaml"}),"Sil.Call (\n    list_of_return_values,\n    Sil.Const (Const.Cfun name_of_function),\n    list_of_arguments,\n    location,\n    call_flags\n)\n")),Object(o.b)("p",null,"I hope this looks straight forward. Argument ",Object(o.b)("inlineCode",{parentName:"p"},"call_flags")," holds information\nabout the function, such as whether it is virtual or not. Again, this is\nspecified in the file ",Object(o.b)("inlineCode",{parentName:"p"},"Sil.mli"),"."),Object(o.b)("p",null,"The Checker we have written so far is able to detect every single function call.\nNow, we have to detect whether a specific function call is actually calling\n",Object(o.b)("inlineCode",{parentName:"p"},"java.io.PrintStream.println"),"."),Object(o.b)("p",null,"Let's try this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ocaml"}),'  let is_println pln = match pln with\n    | Procname.Java pn_java ->\n        PatternMatch.java_proc_name_with_class_method\n          pn_java "java.io.PrintStream" "println"\n    | _ ->\n        false in\n\n  let exec_instr astate proc_data cfg_node (instr : Sil.instr) =\n    match instr with\n    | Call (_, Const (Cfun pn), _, loc, _) when is_println pn ->\n        ST.report_error\n          proc_name\n          proc_desc\n          "CHECKERS_MY_SIMPLE_CHECKER"\n          location\n          "A description of my simple checker"\n    | _ -> astate\n\n')),Object(o.b)("p",null,"Can you spot the difference? A new restriction was added to our pattern --\n",Object(o.b)("inlineCode",{parentName:"p"},"is_println")," expression helps us to check whether the current method is a\n",Object(o.b)("inlineCode",{parentName:"p"},"java.io.PrintStream.println")," method or not."),Object(o.b)("p",null,"So our implementation is done. Now we have to register it as an enabled Checker\nin ",Object(o.b)("inlineCode",{parentName:"p"},"checkers/registerCheckers.ml"),"."),Object(o.b)("p",null,"Assuming the code is in SimpleCheckers.ml, you would register your checker as a\n",Object(o.b)("em",{parentName:"p"},"java_checker")," in ",Object(o.b)("inlineCode",{parentName:"p"},"checkers/registerCheckers.ml")," by adding it to the\n",Object(o.b)("inlineCode",{parentName:"p"},"all_checkers")," list:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ocaml"}),'let all_checkers =\n  [ { name= "my simple checker"\n    ; active= true\n    ; callbacks= [(Procedure SimpleChecker.checker, Language.Java)] }\n  ; (* the rest of the list as it was there *)\n    ... ]\n')),Object(o.b)("p",null,"Build Infer with ",Object(o.b)("inlineCode",{parentName:"p"},"./build-infer.sh")," and your first Checker is ready!"),Object(o.b)("p",null,"If you want you can try with this java example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-java"}),'/*Hello.java*/\nclass Hello {\n    int println(){\n        return 0;\n    }\n    int test() {\n        String s = "Hello World";\n        System.out.println(s);\n        s = null;\n        println();\n        return s.length();\n    }\n}\n')),Object(o.b)("p",null,"Notice that only ",Object(o.b)("inlineCode",{parentName:"p"},"System.out.println")," is being detected."),Object(o.b)("p",null,"All set! You are ready to create your own Checkers! Infer is an open source\nproject and you are more than welcome to contribute. Take a look at the\n",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/facebook/infer/"}),"Github")," page and feel free to fork or even\nopen an issue if you're facing any trouble."))}p.isMDXComponent=!0},214:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return h}));var r=t(0),a=t.n(r);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=a.a.createContext({}),p=function(e){var n=a.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i({},n,{},e)),t},b=function(e){var n=p(e.components);return a.a.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},m=Object(r.forwardRef)((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),b=p(t),m=r,h=b["".concat(c,".").concat(m)]||b[m]||u[m]||o;return t?a.a.createElement(h,i({ref:n},s,{components:t})):a.a.createElement(h,i({ref:n},s))}));function h(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,c=new Array(o);c[0]=m;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var s=2;s<o;s++)c[s]=t[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"}}]);