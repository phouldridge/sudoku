(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{60:function(e,n,t){},61:function(e,n,t){},62:function(e,n,t){},63:function(e,n,t){},64:function(e,n,t){},65:function(e,n,t){},66:function(e,n,t){},67:function(e,n,t){},68:function(e,n,t){"use strict";t.r(n);var c=t(3),a=t.n(c),r=t(27),u=t.n(r),o=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,78)).then((function(n){var t=n.getCLS,c=n.getFID,a=n.getFCP,r=n.getLCP,u=n.getTTFB;t(e),c(e),a(e),r(e),u(e)}))},i=t(9),l=t(0),s=t(7),f=t(10),b=t(1),v=t(75),j=t(45),O=t(44),d=t(69),p=t(38),m=t(43),h=t.n(m),g="ui/SET_SELECTION_MODE",x="ui/SELECT_CELL",y="ui/CLEAR_SELECTED",k="ui/SET_PENCIL_MODE",E=function(e){return{type:g,value:e}},N=function(e){return{type:x,index:e}},A=function(){return{type:y}},C=function(e){return e.ui.selected},S=function(e){return _(e,"pencilMode")||"normal"},_=function(e,n){return l.a.reduce(Object.keys(e.ui[n]),(function(t,c){return e.ui[n][c]?c:t}),void 0)},T=["#0074D9AA","#7FDBFFAA","#39CCCCAA","#3D9970AA","#FFDC0088","#FF851BAA","#85144B44","#B10DC9FF","#DDDDDDFF"],w=Object(v.a)(),D={selecting:!1,selected:[],pencilMode:{normal:!0,corner:!1,center:!1,color:!1,show:!1,find:!1}},L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,n=arguments.length>1?arguments[1]:void 0,t=n.type,c=n.value,a=n.index,r=n.mode;switch(t){case g:return Object(b.a)(Object(b.a)({},e),{},{selecting:c});case y:return Object(b.a)(Object(b.a)({},e),{},{selected:[]});case x:return Object(b.a)(Object(b.a)({},e),{},{selected:Object(b.a)(Object(b.a)({},e.selected),{},Object(f.a)({},a,!0))});case k:return Object(b.a)(Object(b.a)({},e),{},{pencilMode:r});default:return e}},I="sudoku/LOAD_SUDOKU",M="sudoku/UPDATE_VALUES",R="sudoku/SET_VALUE",F="sudoku/SET_CORNER",P="sudoku/SET_CENTER",B="sudoku/SET_COLOR",U=function(e){return{type:M,value:e}},K=function(e,n){return{type:R,index:e,value:n}},V=function(e,n){return{type:F,index:e,value:n}},q=function(e,n,t){return{type:P,index:e,value:n,action:t}},G=function(e,n){return e.sudoku[n]?e.sudoku[n].given||e.sudoku[n].value:0},H=function(e,n){return e.sudoku[n]?e.sudoku[n]:0},J=Object(v.a)((function(e,n){return e.pipe(Object(j.a)(M),Object(O.a)((function(e){var t=e.value;return{mode:S(n.value),value:t}})),Object(d.a)((function(e){var n=e.mode;e.value;return"show"===n})),Object(p.a)((function(e){var t=e.value,c=function(e,n){return l.a.chain(e.sudoku).filter((function(e){return e.given===n||e.value===n})).map((function(e){return e.index})).value()}(n.value,t);return[A()].concat(Object(s.a)(void 0!==t?l.a.map(c,(function(e){return N(e)})):[]))})))}),(function(e,n){return e.pipe(Object(j.a)(M),Object(O.a)((function(e){var t=e.value;return{mode:S(n.value),value:t}})),Object(d.a)((function(e){var n=e.mode;e.value;return"find"===n})),Object(p.a)((function(e){var t=e.value,c=oe(n.value,t);return[A()].concat(Object(s.a)(void 0!==t?l.a.map(c,(function(e){return N(e)})):[]))})))}),(function(e,n){return e.pipe(Object(j.a)(M),Object(O.a)((function(e){var t=e.value;return{mode:S(n.value),value:t}})),Object(d.a)((function(e){return"pairs"===e.mode})),Object(p.a)((function(e){var t=e.value,c=l.a.without.apply(l.a,[oe(n.value,t,2)].concat(Object(s.a)(ae(n.value,"corner",t))));return[A()].concat(Object(s.a)(void 0!==t?l.a.map(c,(function(e){return V(e,t)})):[]))})))}),(function(e,n){return e.pipe(Object(j.a)(M),Object(O.a)((function(e){var t=e.value;return{mode:S(n.value),value:t}})),Object(d.a)((function(e){var n=e.mode;return"show"!==n&&"find"!==n&&"pairs"!==n})),Object(O.a)((function(e){var t=e.mode,c=e.value;return{selected:C(n.value),mode:t,value:c}})),Object(p.a)((function(e){var n=e.selected,t=e.mode,c=e.value;switch(t){case"normal":return l.a.map(Object.keys(n),(function(e){return K(e,c)}));case"corner":return l.a.map(Object.keys(n),(function(e){return V(e,c)}));case"center":return l.a.map(Object.keys(n),(function(e){return q(e,c)}));case"color":return l.a.map(Object.keys(n),(function(e){return function(e,n){return{type:B,index:e,value:n}}(e,c)}));default:return}})))})),X=function(e,n,t,c,a){var r="set"===a||"clear"!==a&&-1===l.a.indexOf(e[t][n],c);return Object(b.a)(Object(b.a)({},e),{},Object(f.a)({},t,Object(b.a)(Object(b.a)({},e[t]),{},Object(f.a)({},n,e[t][n]?r?l.a.chain([].concat(Object(s.a)(e[t][n]),[c])).first(8).sort().value():l.a.without(e[t][n],c):[c]))))},Y={},z=[0,3,6,27,30,33,54,57,60],Q=function(e){return Z(e[0])===Z(e[1])},W=function(e){return $(e[0])===$(e[1])},Z=function(e){return e%9},$=function(e){return Math.floor(e/9)},ee=function(e){return 3*Math.floor(e/27)+Math.floor(Z(e)/3)},ne=function(e){return l.a.range(e,81+e,9)},te=function(e){return l.a.range(9*e,9*e+9)},ce=function(e){return l.a.chain(l.a.range(z[e],z[e]+3)).map((function(e){return[e,e+9,e+18]})).flatten().value()},ae=function(e,n,t){return l.a.chain(l.a.range(0,81)).map((function(n){return H(e,n)})).filter((function(e){return l.a.contains(e[n],t)})).map((function(e){return e.index})).value()},re=function(e,n,t){return l.a.chain([].concat(Object(s.a)(ne(Z(n))),Object(s.a)(te($(n))),Object(s.a)(ce(ee(n))))).unique().without(n).filter((function(n){var c=H(e,n);return c.center&&l.a.contains(c.center,t)})).value()},ue=function(e,n,t){return l.a.chain([].concat(Object(s.a)(Q(n)?ne(Z(n[0])):[]),Object(s.a)(W(n)?te($(n[0])):[]),Object(s.a)(function(e){return ee(e[0])===ee(e[1])}(n)?ce(ee(n[0])):[]))).unique().without(n[0],n[1]).tap((function(c){return 7===n[0]&&8===n[1]?console.log(" *** result1:",n,t,c,H(e,0)):""})).filter((function(n){var c=H(e,n);return!c.given&&!c.value&&(c.center&&l.a.contains(c.center,t))})).tap((function(e){return 7===n[0]&&8===n[1]?console.log(" *** result2:",n,t,e):""})).value()},oe=function(e,n,t){return l.a.chain(l.a.range(0,9)).map((function(t){return function(e,n,t){var c=ce(n);return 0===l.a.filter(c,(function(n){return G(e,n)===t})).length?l.a.chain(c).filter((function(n){var t=G(e,n);return 0===t||void 0===t})).filter((function(n){var c=l.a.chain(l.a.union(te($(n)),ne(Z(n)))).map((function(n){return G(e,n)===t})).value();return!l.a.contains(c,!0)})).value():[]}(e,t,n)})).filter((function(e){return!t||e.length<=t})).flatten().unique().value()},ie=function(e,n){return e.sudoku[n].given||e.sudoku[n].value?[]:e.sudoku[n].center?e.sudoku[n].center:[]},le={box:ce,row:te,column:ne},se={box:ee,row:$,column:Z},fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,n=arguments.length>1?arguments[1]:void 0,t=n.type,c=n.index,a=n.value,r=n.values,u=n.action;switch(t){case I:return l.a.object(l.a.range(r.length),l.a.map(r,(function(e,n){return{index:n,given:e}})));case R:return Object(b.a)(Object(b.a)({},e),{},Object(f.a)({},c,Object(b.a)(Object(b.a)({},e[c]),{},{value:a})));case F:return void 0!==a?X(e,"corner",c,a):Object(b.a)(Object(b.a)({},e),{},Object(f.a)({},c,Object(b.a)(Object(b.a)({},e[c]),{},{corner:a})));case P:return void 0!==a?X(e,"center",c,a,u):Object(b.a)(Object(b.a)({},e),{},Object(f.a)({},c,Object(b.a)(Object(b.a)({},e[c]),{},{center:a})));case B:return Object(b.a)(Object(b.a)({},e),{},Object(f.a)({},c,Object(b.a)(Object(b.a)({},e[c]),{},{color:a})));default:return e}},be=t(4),ve=["corner-ul","corner-top","corner-ur","corner-r","corner-lr","corner-bottom","corner-ll","corner-l"],je=["tl","tc","tr","tl","tc","tr","tl","tc","tr"].concat(["cl","cc","cr","cl","cc","cr","cl","cc","cr"],["bl","bc","br","bl","bc","br","bl","bc","br"],["tl","tc","tr","tl","tc","tr","tl","tc","tr"],["cl","cc","cr","cl","cc","cr","cl","cc","cr"],["bl","bc","br","bl","bc","br","bl","bc","br"],["tl","tc","tr","tl","tc","tr","tl","tc","tr"],["cl","cc","cr","cl","cc","cr","cl","cc","cr"],["bl","bc","br","bl","bc","br","bl","bc","br"]),Oe=function(e){var n=e.id,t=Object(i.c)((function(e){return H(e,n)})),c=Object(i.c)((function(e){return function(e,n){return e.ui.selected[n]}(e,n)})),a="sudoku-cell ".concat(je[n]),r=t.given||t.value,u=l.a.map(t.corner,(function(e,t){return Object(be.jsx)("span",{className:"sudoku-corner ".concat(ve[t]),children:e},"".concat(n,"-").concat(t))})),o=t.center&&Object(be.jsx)("span",{className:"sudoku-center",children:l.a.reduce(t.center,(function(e,n){return"".concat(e).concat(n)}),"")},"".concat(n,"-center")),f=[].concat(Object(s.a)(u),[o]),b=function(e,n){return e&&n?h.a.mix(T[e-1],"#ffffa0"):e?T[e-1]:n?"#ffffa0":"snow"}(t.color,c);return Object(be.jsx)("div",{className:a,id:n,style:{backgroundColor:b},children:0!==r&&Object(be.jsx)("div",{className:"sudoku-value",style:t.given?{color:"#040404"}:{},children:r||(f&&f.length>0?f:"")})})},de=(t(60),function(e){var n=e.row;return Object(be.jsx)("div",{className:"sudoku-row",children:l.a.map(l.a.range(0,9),(function(e){var t=9*n+e;return Object(be.jsx)(Oe,{id:t},t)}))})}),pe=function(){var e=Object(i.b)(),n=Object(c.useRef)(),t=Object(i.c)((function(e){return C(e)})),a=Object(i.c)((function(e){return function(e,n){return e.ui.selecting}(e)})),r=function(c){var r=n.current.getBoundingClientRect(),u=r.width/9,o=9*Math.trunc((c.clientY-r.y)/u)+Math.trunc((c.clientX-r.x)/u);switch(c.type){case"mousedown":c.shiftKey||e(A()),e(E(!0)),e(N(o));break;case"mouseup":e(E(!1));break;case"mouseover":a&&!t[o]&&e(N(o))}};return Object(be.jsx)("div",{className:"sudoku-grid",ref:n,onMouseDown:r,onMouseOver:r,onMouseUp:r,children:l.a.range(0,9).map((function(e,n){return Object(be.jsx)(de,{row:e},"row-".concat(n))}))})},me=(t(61),t(46)),he=t.n(me),ge=(t(62),function(e){var n=e.className,t=void 0===n?"":n,c=e.style,a=void 0===c?{}:c,r=e.label,u=e.onClick,o=e.value,i=e.toggle,l=void 0!==i&&i?he()("button ".concat(t),{"button-on":o}):"button ".concat(t);return Object(be.jsx)("button",{className:l,style:a,type:"button",onClick:function(e){return u(e)},children:r},"".concat(r,"-button"))}),xe=t(47),ye=t(77),ke=t(76),Ee=t(71),Ne=t(72),Ae=t(74),Ce="solve/START",Se="solve/NAKED_SINGLES",_e="solve/HIDDEN_SINGLES",Te="solve/NAKED_PAIRS",we="solve/POINTING_PAIRS",De="solve/ADD_STEPS",Le="solve/APPLY_STEPS",Ie="solve/CHECK_VALUES",Me="solve/ADD_ACTION",Re="solve/NEXT_ACTION",Fe="solve/REMOVE_ACTION",Pe="solve/CLEAR_ACTIONS",Be="solve/MORE_ACTIONS",Ue="solve/LAST_ACTION",Ke=function(e){return{type:De,steps:e}},Ve=function(e){return{type:Le,steps:e}},qe=function(e){return"R".concat($(e)+1,"C").concat(Z(e)+1)},Ge=function(e){return"".concat(qe(e[0])," & ").concat(qe(e[1]))},He=function(e,n,t,c){return{type:"single",method:n,index:t,value:c,cellName:qe(t)}},Je=function(e,n,t,c){return{type:"pair",method:n,indexes:t,values:c,cellName:Ge(t)}},Xe=function(e,n){return-1!==l.a.findIndex(e.solve.steps,(function(e){return e.cellName===n}))},Ye=[{type:Se},{type:_e,check:"box"},{type:_e,check:"row"},{type:_e,check:"column"},{type:Te,check:"box"},{type:Te,check:"row"},{type:Te,check:"column"},{type:we,check:"box"},{type:we,check:"row"},{type:we,check:"column"},{type:"solve/UNABLE_TO_SOLVE"}],ze=Object(v.a)((function(e,n){return e.pipe(Object(j.a)(Ce),Object(O.a)((function(){return A()})))}),(function(e,n){return e.pipe(Object(j.a)(Ce),Object(O.a)((function(){return l.a.range(1,10).map((function(e){return{value:e,cells:oe(n.value,e)}}))})),Object(p.a)((function(e){return Object(xe.a)([].concat(Object(s.a)(l.a.flatten(e.map((function(e){var n=e.value;return e.cells.map((function(e){return q(e,n)}))})))),[{type:Be}]))})))}),(function(e,n){return e.pipe(Object(j.a)(Ie),Object(O.a)((function(){return e=n.value,{missing:l.a.filter(l.a.range(0,81),(function(n){var t=H(e,n);return!t.given&&!t.value})),invalid:l.a.chain(["box","column","row"]).map((function(n){return l.a.map(l.a.range(0,9),(function(t){return l.a.chain(le[n](t)).map((function(n){var t=H(e,n);return{index:n,value:t.given||t.value}})).filter((function(e){return e.value})).groupBy((function(e){return e.value})).filter((function(e){return e.length>1})).map((function(e){return l.a.map(e,(function(e){return e.index}))})).value()}))})).flatten().unique().value()};var e})),Object(O.a)((function(e){return 0===e.missing.length&&0===e.invalid.length?"Looks good to me!":"Unresolved cells: ".concat(e.missing.length,"\nBroken cells: ").concat(l.a.map(e.invalid,(function(e){return qe(e)})))})),Object(ke.a)((function(e){return alert(e)})),Object(Ee.a)())}),(function(e,n){return e.pipe(Object(j.a)(Se),Object(O.a)((function(){return l.a.map((e=n.value,l.a.chain(l.a.range(81)).filter((function(n){return 1===ie(e,n).length})).map((function(n){return{index:n,value:ie(e,n)[0]}})).value()),(function(e){return He(0,"Naked single",e.index,e.value)}));var e})),Object(d.a)((function(e){return e.length>0})),Object(O.a)((function(e){return l.a.map(e,(function(e){return Object(b.a)(Object(b.a)({},e),{},{affected:Object(f.a)({},e.value,re(n.value,e.index,e.value))})}))})),Object(p.a)((function(e){return Object(xe.a)([Ke(e),Ve(e)])})))}),(function(e,n){return e.pipe(Object(j.a)(_e),Object(O.a)((function(e){var t=e.check,c=function(e,n){return l.a.chain(l.a.range(0,9)).map((function(t){var c=le[n](t),a=l.a.chain(l.a.range(1,10)).map((function(n){return{value:n,indexes:l.a.filter(c,(function(t){return l.a.contains(ie(e,t),n)}))}})).filter((function(e){return 1===e.indexes.length})).value();return l.a.map(a,(function(e){return{type:n,id:t,value:e.value,index:e.indexes[0]}}))})).filter((function(e){return e.length>0})).flatten().value()}(n.value,t),a=l.a.filter(c,(function(e){var t=e.index;return!Xe(n.value,qe(t))}));return l.a.map(a,(function(e){var n=e.type,t=e.id,c=e.index,a=e.value;return He(0,"Hidden single in ".concat(n," ").concat(t+1),c,a)}))})),Object(O.a)((function(e){return l.a.map(e,(function(e){return Object(b.a)(Object(b.a)({},e),{},{affected:Object(f.a)({},e.value,re(n.value,e.index,e.value))})}))})),Object(p.a)((function(e){return Object(xe.a)([Ke(e),Ve(e)])})))}),(function(e,n){return e.pipe(Object(j.a)(Te),Object(O.a)((function(e){var t=e.check,c=function(e,n){return l.a.chain(l.a.range(0,9)).map((function(t){var c=le[n](t);return l.a.chain(c).map((function(n){return{index:n,values:ie(e,n)}})).filter((function(e){return 2===e.values.length})).groupBy((function(e){return e.values})).map((function(e){return{type:n,id:t,values:e[0].values,indexes:l.a.map(e,(function(e){return e.index}))}})).filter((function(e){return 2===e.values.length&&2===e.indexes.length})).value()})).filter((function(e){return e.length>0})).flatten().value()}(n.value,t),a=l.a.filter(c,(function(e){var t=e.indexes;return!Xe(n.value,Ge(t))}));return l.a.map(a,(function(e){var n=e.type,t=e.id,c=e.indexes,a=e.values;return Je(0,"Naked pair in ".concat(n," ").concat(t+1),c,a)}))})),Object(O.a)((function(e){return l.a.map(e,(function(e){var t;return Object(b.a)(Object(b.a)({},e),{},{affected:(t={},Object(f.a)(t,e.values[0],ue(n.value,e.indexes,e.values[0])),Object(f.a)(t,e.values[1],ue(n.value,e.indexes,e.values[1])),t)})}))})),Object(p.a)((function(e){return Object(xe.a)([Ke(e),Ve(e)])})))}),(function(e,n){return e.pipe(Object(j.a)(we),Object(O.a)((function(e){var t=e.check,c=function(e,n){return l.a.chain(l.a.range(0,9)).map((function(t){var c=le[n](t);return l.a.chain(l.a.range(1,10)).reduce((function(n,t){var a=l.a.filter(c,(function(n){return l.a.contains(ie(e,n),t)}));return 2===a.length?[].concat(Object(s.a)(n),[{value:t,indexes:a}]):n}),[]).value()})).flatten().filter((function(e){return Q(e.indexes)||W(e.indexes)})).value()}(n.value,"box"),a=l.a.filter(c,(function(e){var t=e.indexes;return!Xe(n.value,Ge(t))}));return l.a.map(a,(function(e){var n=e.indexes,c=e.value;return Je(0,"Pointing pair in ".concat(t," ").concat(se[t](n[0])+1),n,[c])}))})),Object(O.a)((function(e){return l.a.chain(e).map((function(e){return Object(b.a)(Object(b.a)({},e),{},{affected:Object(f.a)({},e.values[0],ue(n.value,e.indexes,e.values[0]))})})).filter((function(e){return l.a.every(l.a.map(e.values,(function(n){return 0!==e.affected[n].length})))})).value()})),Object(p.a)((function(e){return Object(xe.a)([Ke(e),Ve(e)])})))}),(function(e,n){return e.pipe(Object(j.a)(Le),Object(p.a)((function(e){var n=e.steps;return l.a.chain(n).map((function(e){return[K(e.index,e.value)].concat(Object(s.a)(l.a.map(e.affected,(function(e,n){return l.a.map(e,(function(e){return q(e,+n,"clear")}))}))))})).flatten().value()})))}),(function(e,n){return e.pipe(Object(j.a)("solve/REVERSE_STEP"),Object(p.a)((function(){var e=l.a.last(n.value.solve.steps),t=[K(e.index,void 0)].concat(Object(s.a)(l.a.map(e.data,(function(n){return q(e.index,n)}))),Object(s.a)(l.a.map(e.affected,(function(n){return q(n,e.value,"set")}))));return Object(xe.a)(t)})))}),(function(e,n){return e.pipe(Object(j.a)(Re),Object(O.a)((function(){return e=n.value,l.a.first(e.solve.actions);var e})),Object(d.a)((function(e){return!!e})),Object(Ne.a)((function(e){return Object(ye.a)(5).pipe(Object(Ee.a)(),Object(Ae.a)(e))})),Object(p.a)((function(e){return Object(xe.a)([{type:Fe},e,{type:Re}])})))}),(function(e,n){return e.pipe(Object(j.a)(Be),Object(O.a)((function(){var e,t=(e=n.value,l.a.chain(e.sudoku).filter((function(e){return!e.given&&!e.value})).map((function(e){return e.index})).compact().value()).length;return{unresolved:t,nextAction:n.value.solve.lastAction.unresolved!==t||n.value.solve.lastAction.id===Ye.length-1?0:++n.value.solve.lastAction.id}})),Object(p.a)((function(e){var n,t,c=e.unresolved,a=e.nextAction;return 0===c||8===a.id?Object(xe.a)([{type:Pe},{type:De,steps:[{type:"solved",cellName:"Solved"}]}]):Object(xe.a)([(t=Object(b.a)(Object(b.a)({},Ye[a]),{},{unresolved:c,id:a}),{type:Ue,action:t}),(n=[Ye[a],{type:Be}],{type:Me,actions:n}),{type:Re}])})))})),Qe={buttons:[{name:"Solve",action:{type:Ce}},{name:"Check",action:{type:Ie}}],actions:[],steps:[],lastAction:{type:"start",unresolved:81,id:-1}},We=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Qe,n=arguments.length>1?arguments[1]:void 0,t=n.type,c=n.steps,a=n.actions,r=n.action;switch(t){case Me:return Object(b.a)(Object(b.a)({},e),{},{actions:l.a.unique([].concat(Object(s.a)(e.actions),Object(s.a)(a)),!1,(function(e){return e.type+e.check}))});case Fe:return Object(b.a)(Object(b.a)({},e),{},{actions:l.a.rest(e.actions,1)});case Pe:return Object(b.a)(Object(b.a)({},e),{},{actions:[]});case De:return Object(b.a)(Object(b.a)({},e),{},{steps:[].concat(Object(s.a)(e.steps),Object(s.a)(c))});case Ue:return Object(b.a)(Object(b.a)({},e),{},{lastAction:r});default:return e}},Ze=(t(63),function(){var e=Object(i.b)(),n=Object(i.c)((function(e){return function(e){return e.solve.buttons}(e)}));return Object(be.jsx)("div",{className:"action-bar",children:n.map((function(n){var t=n.name,c=n.action;return Object(be.jsx)(ge,{label:t,onClick:function(){e(c)}},t)}))})}),$e=(t(64),function(){var e=Object(i.b)(),n=Object(i.c)((function(e){return S(e)}));return Object(be.jsx)("div",{className:"number-bar",children:l.a.map(l.a.range(1,10),(function(t){var c={backgroundColor:T[t-1]};return Object(be.jsx)(ge,{className:"number",style:"color"===n?c:{},label:"color"!==n&&Object(be.jsx)("span",{className:"number-".concat(n),children:t}),onClick:function(n){e(U(t))}},t)}))})}),en=function(e){var n=e.buttonState,t=e.onClick,c=function(e){var c=l.a.reduce(Object.keys(n),(function(n,t){return Object(b.a)(Object(b.a)({},n),{},Object(f.a)({},t,t===e))}),{});t(c)};return l.a.map(Object.keys(n),(function(e){return Object(be.jsx)(ge,{label:e,toggle:!0,value:n[e],onClick:function(){return c(e)}},"gb-".concat(e))}))},nn=(t(65),function(){var e=Object(i.b)(),n=Object(i.c)((function(e){return function(e){return e.ui.pencilMode}(e)}));return Object(be.jsx)(be.Fragment,{children:Object(be.jsx)("div",{className:"button-bar",children:Object(be.jsx)(en,{buttonState:n,onClick:function(n){return e({type:k,mode:n})}})})})}),tn=(t(66),function(e){return"solved"===e.type?e.cellName:"single"===e.type?"".concat(e.method,": ").concat(e.cellName," \u2192 ").concat(e.value):"".concat(e.method,": ").concat(e.cellName," ").concat(function(e){return e.values[1]?"(".concat(e.values[0],",").concat(e.values[1],")"):"(".concat(e.values[0],")")}(e))}),cn=function(){var e=Object(i.c)((function(e){return function(e){return e.solve.steps}(e)}));return Object(be.jsx)("div",{className:"step-list",children:e.map((function(e,n){return Object(be.jsx)("div",{children:"".concat(n,": ").concat(tn(e))},n)}))})},an=function(){var e=Object(i.b)();return Object(be.jsx)("div",{className:"App",onKeyDown:function(n){n.key>=0&&n.key<=9&&e(U(+n.key))},tabIndex:0,children:Object(be.jsx)("header",{className:"App-header",children:Object(be.jsxs)("div",{className:"App-container",children:[Object(be.jsxs)("div",{className:"display-container",children:[Object(be.jsx)($e,{}),Object(be.jsx)(pe,{}),Object(be.jsx)(nn,{})]}),Object(be.jsx)(Ze,{}),Object(be.jsx)(cn,{})]})})})},rn=t(23),un=t(73),on="toggle/TOGGLE_ON",ln=Object(v.a)(),sn={corner:{title:"Corners",on:!1},center:{title:"Center",on:!1}},fn=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:sn,n=arguments.length>1?arguments[1]:void 0,t=n.type,c=n.name;switch(t){case on:return Object(b.a)(Object(b.a)({},e),{},Object(f.a)({},c,Object(b.a)(Object(b.a)({},e[c]),{},{on:!e[c].on})));default:return e}},bn=Object(v.a)(w,J,ln,ze),vn=Object(rn.b)({ui:L,sudoku:fe,toggle:fn,solve:We}),jn=function(e,n){return"RESET"===n.type&&(e=void 0),vn(e,n)},On=function(e){var n=Object(un.a)({dependencies:{}}),t=rn.c,c=Object(rn.d)(jn,e,t(Object(rn.a)(n)));return n.run(bn),c},dn=(t(67),On(window.___INITIAL_STATE___));u.a.render(Object(be.jsx)(a.a.StrictMode,{children:Object(be.jsx)(i.a,{store:dn,children:Object(be.jsx)(an,{})})}),document.getElementById("root"));var pn=[0,7,2,0,0,9,0,0,0].concat([0,3,0,6,0,0,4,0,0],[0,0,1,0,0,0,0,8,7],[1,0,0,0,0,0,7,0,0],[9,0,0,2,0,3,0,0,0],[0,0,0,0,0,0,0,0,6],[0,0,0,3,0,0,5,6,0],[0,0,0,0,0,4,9,0,0],[0,0,0,0,1,8,0,0,2]);dn.dispatch({type:I,values:pn}),o()}},[[68,1,2]]]);
//# sourceMappingURL=main.3c0b064b.chunk.js.map