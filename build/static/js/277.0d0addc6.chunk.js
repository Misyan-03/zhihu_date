"use strict";(self.webpackChunkreact_knowledge=self.webpackChunkreact_knowledge||[]).push([[277],{3762:function(e,n,t){var r=t(4165),a=t(5861),c=t(9439),i=t(1413),s=t(7313),u=t(556),o=t(6417);n.Z=function(e){var n=(0,i.Z)({},e),t=n.children,l=n.onClick;delete n.children;var d=(0,s.useState)(!1),f=(0,c.Z)(d,2),p=f[0],h=f[1],x=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h(!0),e.prev=1,e.next=4,l();case 4:e.next=8;break;case 6:e.prev=6,e.t0=e.catch(1);case 8:h(!1);case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(){return e.apply(this,arguments)}}();return l&&(n.onClick=x),(0,o.jsx)(u.zx,(0,i.Z)((0,i.Z)({},n),{},{loading:p,children:t}))}},6793:function(e,n,t){t.d(n,{Z:function(){return o}});var r=t(9439),a=(t(7313),t(556)),c=t(8467),i=t(2135),s=t(6417),u=function(e){var n=e.title,t=(0,c.s0)(),u=(0,c.TH)(),o=(0,i.lr)(),l=(0,r.Z)(o,1)[0];return(0,s.jsx)(a.l2,{className:"navbar-again-box",onBack:function(){var e=l.get("to");"/login"===u.pathname&&/^\/detail\/\d+$/.test(e)?t(e,{replace:!0}):t(-1)},children:n,style:{"--height":"36px","--border-bottom":"1px #eee solid"}})};u.defaultProps={title:"\u4e2a\u4eba\u4e2d\u5fc3"};var o=u},4277:function(e,n,t){t.r(n);var r,a=t(4165),c=t(5861),i=t(9439),s=t(168),u=t(7313),o=t(6793),l=t(3762),d=t(4444),f=t(556),p=t(6135),h=t(8695),x=t(4403),v=t(6417),m=d.ZP.div(r||(r=(0,s.Z)(["\n  .formBox {\n    padding: 0.4rem;\n\n    .item {\n      display: flex;\n      align-items: center;\n      height: 1.46667rem;\n      line-height: 1.46667rem;\n      font-size: 0.37333rem;\n\n      .label {\n        width: 20%;\n        text-align: center;\n      }\n\n      .input {\n        width: 80%;\n      }\n    }\n  }\n\n  .submit {\n    display: block;\n    margin: 0 auto;\n    width: 60%;\n    height: 0.93333rem;\n    font-size: 0.37333rem;\n  }\n"])));n.default=(0,p.$j)((function(e){return e.base}),h.Z.base)((function(e){var n=e.info,t=e.queryUserInfoAsync,r=e.navigate,s=(0,u.useState)([{url:n.pic}]),d=(0,i.Z)(s,2),p=d[0],h=d[1],b=(0,u.useState)(n.name),Z=(0,i.Z)(b,2),k=Z[0],w=Z[1],g=function(){var e=(0,c.Z)((0,a.Z)().mark((function e(n){var t,r,c,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.Z.upload(n);case 3:if(r=e.sent,c=r.code,i=r.pic,0===+c){e.next=9;break}return f.FN.show({icon:"fail",content:"\u4e0a\u4f20\u5931\u8d25"}),e.abrupt("return");case 9:t=i,h([{url:i}]),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(0);case 15:return e.abrupt("return",{url:t});case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(n){return e.apply(this,arguments)}}(),N=function(){var e=(0,c.Z)((0,a.Z)().mark((function e(){var n,c,s;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==p.length){e.next=3;break}return f.FN.show({icon:"fail",content:"\u8bf7\u5148\u4e0a\u4f20\u56fe\u7247"}),e.abrupt("return");case 3:if(""!==k.trim()){e.next=6;break}return f.FN.show({icon:"fail",content:"\u8bf7\u5148\u8f93\u5165\u8d26\u53f7"}),e.abrupt("return");case 6:return n=(0,i.Z)(p,1),c=n[0].url,e.prev=7,e.next=10,x.Z.userUpdate(k.trim(),c);case 10:if(s=e.sent,0===+s.code){e.next=15;break}return f.FN.show({icon:"fail",content:"\u4fee\u6539\u4fe1\u606f\u5931\u8d25"}),e.abrupt("return");case 15:f.FN.show({icon:"success",content:"\u4fee\u6539\u4fe1\u606f\u6210\u529f"}),t(),r(-1),e.next=22;break;case 20:e.prev=20,e.t0=e.catch(7);case 22:case"end":return e.stop()}}),e,null,[[7,20]])})));return function(){return e.apply(this,arguments)}}();return(0,v.jsxs)(m,{children:[(0,v.jsx)(o.Z,{title:"\u4fee\u6539\u4fe1\u606f"}),(0,v.jsxs)("div",{className:"formBox",children:[(0,v.jsxs)("div",{className:"item",children:[(0,v.jsx)("div",{className:"label",children:"\u5934\u50cf"}),(0,v.jsx)("div",{className:"input",children:(0,v.jsx)(f.wA,{value:p,maxCount:1,onDelete:function(){h([]),f.FN.show({icon:"fail",content:"\u5df2\u5220\u9664"})},beforeUpload:function(e){return e.size>1048576?(f.FN.show({icon:"fail",content:"\u56fe\u7247\u987b\u57281MB\u5185"}),null):e},upload:g,capture:!0})})]}),(0,v.jsxs)("div",{className:"item",children:[(0,v.jsx)("div",{className:"label",children:"\u59d3\u540d"}),(0,v.jsx)("div",{className:"input",children:(0,v.jsx)(f.II,{placeholder:"\u8bf7\u8f93\u5165\u8d26\u53f7\u540d\u79f0",value:k,onChange:function(e){w(e)}})})]}),(0,v.jsx)(l.Z,{color:"primary",className:"submit",onClick:N,children:"\u63d0\u4ea4"})]})]})}))}}]);