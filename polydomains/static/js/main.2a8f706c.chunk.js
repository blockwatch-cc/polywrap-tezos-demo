(this.webpackJsonppolydomains=this.webpackJsonppolydomains||[]).push([[0],{642:function(e,t){},727:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=727},757:function(e,t){},763:function(e,t){},765:function(e,t){},771:function(e,t){},773:function(e,t){},782:function(e,t){},794:function(e,t){},843:function(e,t){},845:function(e,t){},852:function(e,t){},853:function(e,t){},906:function(e,t,n){},908:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(113),s=n.n(c),i=n(106),o=n(27),l=n(81),d=n(30),j=n(59),u=(n(445),n(58)),b=n(261),h=n(263),p=n(264),x=n(265),m=n.p+"static/media/search.db237059.png",O=n(9);var f=function(){var e=Object(r.useState)(""),t=Object(o.a)(e,2),n=t[0],a=t[1];return Object(O.jsx)(b.a,{minHeight:"100vh",children:Object(O.jsxs)(b.a,{d:"block",children:[Object(O.jsx)(b.b,{w:"100%",children:Object(O.jsx)(h.a,{justifyContent:"center",boxSize:"20vw",pt:"0",objectFit:"contain",src:m})}),Object(O.jsx)(b.g,{letterSpacing:"wide",size:"4xl",textAlign:"center",children:"PolyDomains"}),Object(O.jsx)(b.a,{d:"flex",mt:"16",justifyContent:"center",children:Object(O.jsxs)(b.a,{d:"flex",width:"60vw",children:[Object(O.jsxs)(p.b,{children:[Object(O.jsx)(p.c,{py:"2rem",px:"1rem",bg:"white",children:Object(O.jsx)(u.g,{color:"gray.300"})}),Object(O.jsx)(p.a,{variant:"outline",colorScheme:"whiteAlpha",placeholder:"Search for Tezos domain",onChange:function(e){a(e.target.value)},value:n,bg:"white",size:"md",mr:0,p:"2rem"})]}),Object(O.jsx)(l.b,{to:{pathname:"/search",search:"?domain=".concat(n)},children:Object(O.jsx)(x.a,{p:"2rem",colorScheme:"teal",borderRadius:0,children:"Search"})})]})})]})})},w=n(47),g=n(70),v=n(0),y=n.n(v),k=n(397),S=Object(r.createContext)({app:{network:"ithacanet",account:null},setApp:function(){}}),C=n(402),z=n(406),A=n(412),D="w3://ens/tezos.web3api.eth",R="w3://ipfs/QmeYu6r6L9YPn3EhPzSqgyCEWPU4KvnwLCWTMPjvGYid7k",E="w3://ens/tezosDomainsPlugin.web3api.eth",I={ithacanet:{provider:"https://rpc.ithaca.tzstats.com",supportedTLDs:["ith"]},mainnet:{provider:"https://rpc.tzstats.com",supportedTLDs:["tez"]}},P=new C.Web3ApiClient({plugins:[{uri:D,plugin:Object(A.tezosPlugin)({networks:{mainnet:{provider:"https://rpc.tzstats.com"},ithacanet:{provider:"https://rpc.ithaca.tzstats.com"}},defaultNetwork:"ithacanet"})},{uri:E,plugin:Object(z.tezosDomainsPlugin)({defaultNetwork:"ithacanet"})}]}),q=function(e,t){var n=t.commitParams;return P.query({uri:R,query:"\n        mutation {\n          commit (\n              network: $network,\n              params: $params\n          )\n        },\n    ",variables:{network:e,params:n}})},T=function(e,t){var n=t.buyParams,r=t.sendParams;return P.query({uri:R,query:"\n        mutation {\n          buy (\n            network: $network,\n            params: $params,\n            sendParams: $sendParams\n          )\n        },\n    ",variables:{network:e,params:{label:n.label,owner:n.owner,address:n.owner,nonce:n.nonce,duration:n.duration,data:JSON.stringify(n.metadata)},sendParams:r}})},L=function(e,t){var n;if(e.length>0&&e[0]){var r=e[0].message.match(/(?<=exception: ).*/);r&&r.length>0&&(n=r[0])}return!n&&t&&(n=t),n||(n="failed to get information"),n},U=function(e){var t=e.split(".");return t[t.length-1]},N=function(e){var t=e.showSearch,n=Object(r.useState)(""),a=Object(o.a)(n,2),c=a[0],s=a[1],i=Object(r.useContext)(S),d=i.app,h=i.setApp,m=function(){var e=Object(g.a)(y.a.mark((function e(){var t,n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r=d.network,P.query({uri:D,query:'\n        mutation {\n          connectTempleWallet(\n              appName: "polydomains", \n              network: $network,\n              connection: $connection\n          )\n        },\n    ',variables:{network:r,connection:{network:r}}});case 2:if(!(t=e.sent).errors){e.next=7;break}return n=L(t.errors,"Failed to connect to temple wallet"),j.b.error(n),e.abrupt("return");case 7:if(!t.data.connectTempleWallet){e.next=11;break}return h((function(e){return Object(w.a)(Object(w.a)({},e),{},{account:t.data.connectTempleWallet})})),j.b.success("Wallet connected"),e.abrupt("return");case 11:j.b.error("Failed to connect to temple wallet");case 12:case"end":return e.stop()}var r}),e)})));return function(){return e.apply(this,arguments)}}();return Object(O.jsxs)(b.c,{justifyContent:"space-between",mx:40,children:[Object(O.jsx)(b.a,{children:Object(O.jsx)(l.b,{to:{pathname:"/"},children:Object(O.jsx)(b.g,{letterSpacing:"wide",size:"1xl",pt:"5",textAlign:"center",children:"PolyDomains"})})}),t?Object(O.jsxs)(b.a,{d:"flex",mt:"5",children:[Object(O.jsxs)(p.b,{children:[Object(O.jsx)(p.c,{py:"1rem",px:"1rem",bg:"white",children:Object(O.jsx)(u.g,{color:"gray.300"})}),Object(O.jsx)(p.a,{colorScheme:"whiteAlpha",p:"1rem",variant:"outline",placeholder:"Search for Tezos domain",bg:"white",size:"md",onChange:function(e){s(e.target.value)},mr:0})]}),Object(O.jsx)(l.b,{to:{pathname:"/search",search:"?domain=".concat(c)},children:Object(O.jsx)(x.a,{p:"1rem",colorScheme:"teal",borderRadius:0,children:"Search"})})]}):null,Object(O.jsxs)(b.a,{d:"flex",mt:5,children:[Object(O.jsx)(b.j,{spacing:3,children:Object(O.jsx)(k.a,{size:"sm",value:d.network,onChange:function(e){h((function(t){return Object(w.a)(Object(w.a)({},t),{},{network:e.target.value})}))},children:Object.keys(I).map((function(e,t){return Object(O.jsx)("option",{value:e,children:e},"".concat(e,"-").concat(t))}))})}),Object(O.jsx)(b.a,{ml:4,children:Object(O.jsx)(x.a,{colorScheme:"teal",size:"sm",onClick:m,disabled:d.account,leftIcon:d.account?Object(O.jsx)(u.h,{color:"gray.300"}):null,children:d.account?"".concat(d.account.pkh.substring(0,4),"...").concat(d.account.pkh.substring(d.account.pkh.length-4)):"Connect Wallet"})})]})]})},M=function(){return Object(O.jsx)("div",{className:"loader loader--style1",title:"0",children:Object(O.jsxs)("svg",{version:"1.1",id:"loader-1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",width:"80px",height:"80px",viewBox:"0 0 40 40",enableBackground:"new 0 0 40 40",xmlSpace:"preserve",children:[Object(O.jsx)("path",{opacity:"0.2",fill:"#2c7a7b",d:"M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"}),Object(O.jsx)("path",{fill:"#000",d:"M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z",children:Object(O.jsx)("animateTransform",{attributeType:"xml",attributeName:"transform",type:"rotate",from:"0 20 20",to:"360 20 20",dur:"0.5s",repeatCount:"indefinite"})})]})})},Y=function(e){var t=!1;return e&&(t=e.pkh&&e.balance),t||j.b.info("Connect Wallet"),t},F=function(e){return e*Math.pow(10,-6)},_=function(e,t){switch(t.state){case"LOADING":return Object(w.a)(Object(w.a)({},e),{},{state:t.state,payload:null,errors:null});case"QUERY_SUCCESS":return Object(w.a)(Object(w.a)({},e),{},{state:t.state,payload:t.payload,errors:null});case"QUERY_FAILED":return Object(w.a)(Object(w.a)({},e),{},{state:t.state,payload:null,errors:t.errors});case"UPDATE_DOMAIN":return Object(w.a)(Object(w.a)({},e),{},{state:t.state,name:t.name});default:return}},$=function(e,t){switch(t.state){case"LOADING":return Object(w.a)(Object(w.a)({},e),{},{state:t.state,payload:null,errors:null});case"QUERY_SUCCESS":return Object(w.a)(Object(w.a)({},e),{},{state:t.state,payload:t.payload,errors:null});case"QUERY_FAILED":return Object(w.a)(Object(w.a)({},e),{},{state:t.state,payload:null,errors:t.errors});default:return}},W=function(){var e=Object(g.a)(y.a.mark((function e(t,n){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",P.query({uri:R,query:"\n            query {\n                resolveDomain(\n                    network: $network, \n                    domain: $domain \n                )\n            }\n        ",variables:{network:t,domain:n}}));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Q=function(){var e=Object(g.a)(y.a.mark((function e(t,n){var r,a=arguments;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.length>2&&void 0!==a[2]?a[2]:365,e.abrupt("return",P.query({uri:E,query:"\n            query {\n                getAcquisitionInfo(\n                    network: $network, \n                    domain: $domain \n                    duration: $days \n                )\n            },\n            ",variables:{network:t,domain:n,days:r}}));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),G=function(){return Object(O.jsx)("div",{className:"tez-sign",children:Object(O.jsx)("svg",{role:"img","aria-hidden":"true",focusable:"false","data-prefix":"fac","data-icon":"tez",className:"svg-inline--fa fa-tez fa-w-12 fa-fw",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1170 1593",children:Object(O.jsx)("path",{fill:"currentColor",d:"M755.68,1593q-170.51,0-248.91-82.14a253.6,253.6,0,0,1-78.15-177,117.39,117.39,0,0,1,13.69-58.5A101.21,101.21,0,0,1,479.64,1238a130.22,130.22,0,0,1,116.24,0A99.55,99.55,0,0,1,633,1275.36a115,115,0,0,1,14.18,58.5,111.73,111.73,0,0,1-19.91,68.45,92.78,92.78,0,0,1-47.31,34.62,129.18,129.18,0,0,0,74.67,46.55,370,370,0,0,0,101.8,14.68,226.91,226.91,0,0,0,128.19-38.33,224,224,0,0,0,83.63-113.25,492,492,0,0,0,27.38-169.5,465.07,465.07,0,0,0-29.87-176.23,217.54,217.54,0,0,0-86.37-109.52,229.68,229.68,0,0,0-124.43-35.59,236.75,236.75,0,0,0-107.78,36.59L567.26,932.4V892.33L926.43,410.5H428.62v500A178.9,178.9,0,0,0,456,1012.8a94.34,94.34,0,0,0,83.63,40.07,139.85,139.85,0,0,0,82.63-29.12,298.38,298.38,0,0,0,69.2-71.19,24.86,24.86,0,0,1,9-11.94,18.4,18.4,0,0,1,12-4.48,41.55,41.55,0,0,1,23.4,9.95,49.82,49.82,0,0,1,12.69,33.85,197.86,197.86,0,0,1-4.48,24.89,241,241,0,0,1-85.38,106,211.78,211.78,0,0,1-119.76,36.38q-161.67,0-224-63.72A238.67,238.67,0,0,1,253.2,909.25V410.5H0V317.6H254.38V105.78L196.14,47.5V0h169l63.48,32.86V317.6l657.6-2,65.47,65.71L748.46,786.5a271,271,0,0,1,76.16-18.42A330.1,330.1,0,0,1,972,810.15a302.7,302.7,0,0,1,126.95,113.29,399.78,399.78,0,0,1,57.25,136.65,575.65,575.65,0,0,1,13.69,117,489.39,489.39,0,0,1-49.78,216.79,317.92,317.92,0,0,1-149.35,149.35A483.27,483.27,0,0,1,755.68,1593Z"})})})};var B=function(){var e="",t=Object(d.e)(),n=new URLSearchParams(t.search),a=Object(r.useContext)(S),c=a.app,s=a.setApp,i=n.get("domain");"string"===typeof i&&i.length>0&&(e=i);var h=Object(r.useReducer)(_,{state:"",name:e,payload:null,errors:null}),m=Object(o.a)(h,2),f=m[0],v=m[1],k=function(){var e=Object(g.a)(y.a.mark((function e(){var t,n,r,a,i,o,l,d;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("string"===typeof f.name&&0!==f.name.length){e.next=2;break}return e.abrupt("return");case 2:if(v({state:"LOADING"}),n=c.network,r=U(f.name),I[c.network].supportedTLDs.includes(r)){e.next=15;break}a=function(){var e=o[i];if(I[e].supportedTLDs.includes(r))return n=e,s((function(t){return Object(w.a)(Object(w.a)({},t),{},{network:e})})),"break"},i=0,o=Object.keys(I);case 8:if(!(i<o.length)){e.next=15;break}if("break"!==a()){e.next=12;break}return e.abrupt("break",15);case 12:i++,e.next=8;break;case 15:return e.next=17,Q(n,f.name);case 17:if(!(l=e.sent).errors){e.next=23;break}return d=L(l.errors,"failed to get domain available"),j.b.error(d),v({state:"QUERY_FAILED",errors:l.errors}),e.abrupt("return");case 23:null!==(t=l.data.getAcquisitionInfo)&&void 0!==t&&t.state&&v({state:"QUERY_SUCCESS",payload:l.data.getAcquisitionInfo});case 24:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){k()}),[]),Object(O.jsxs)(b.a,{minHeight:"100vh",children:[Object(O.jsx)(N,{}),Object(O.jsx)(b.a,{d:"block",children:Object(O.jsx)(b.a,{d:"flex",mt:"10",justifyContent:"center",children:Object(O.jsxs)(b.a,{d:"flex",width:"60vw",children:[Object(O.jsxs)(p.b,{children:[Object(O.jsx)(p.c,{py:"2rem",px:"1rem",bg:"white",children:Object(O.jsx)(u.g,{color:"gray.300"})}),Object(O.jsx)(p.a,{colorScheme:"whiteAlpha",p:"2rem",variant:"outline",placeholder:"Search for Tezos domain",bg:"white",size:"md",value:f.name,onChange:function(e){v({state:"UPDATE_DOMAIN",name:e.target.value})},mr:0})]}),Object(O.jsx)(x.a,{p:"2rem",colorScheme:"teal",onClick:function(e){k()},borderRadius:0,children:"Search"})]})})}),"LOADING"===f.state?Object(O.jsx)(b.a,{mt:"20",d:"flex",justifyContent:"center",children:Object(O.jsx)(M,{})}):"QUERY_SUCCESS"===f.state?Object(O.jsx)(b.a,{mt:"10",d:"flex",justifyContent:"center",children:Object(O.jsx)(b.h,{spacing:3,children:Object(O.jsx)(b.i,{mt:"5",p:"8",pb:"10",borderRadius:"10",boxShadow:"xl",children:Object(O.jsxs)(b.c,{width:"60vw",justifyContent:"space-between",children:[Object(O.jsx)(b.a,{mr:2,children:Object(O.jsx)(b.k,{bgClip:"text",fontSize:"2xl",mt:"2",color:"black",children:f.name})}),["Taken","CanBeBought"].includes(f.payload.state)?Object(O.jsxs)(b.a,{d:"flex",flexDirection:"row",children:[f.payload.cost?Object(O.jsxs)(b.a,{mr:5,d:"flex",flexDirection:"row",children:[F(f.payload.cost)," ",Object(O.jsx)(G,{})]}):null,Object(O.jsx)(l.b,{to:"Taken"===f.payload.state?{pathname:"/details/".concat(f.name)}:{pathname:"/buy/".concat(f.name)},children:"Taken"===f.payload.state?Object(O.jsxs)(x.a,{colorScheme:"teal",variant:"solid",size:"md",children:[Object(O.jsx)(u.e,{color:"white",w:15,h:15}),Object(O.jsx)(b.k,{ml:"2",children:"View"})]}):Object(O.jsxs)(x.a,{colorScheme:"teal",variant:"solid",size:"md",children:[Object(O.jsx)(u.f,{color:"white",w:15,h:15}),Object(O.jsx)(b.k,{ml:"2",children:"Register"})]})})]}):null]})})})}):null]})},H=n(61),V=n(400);var J=function(){var e,t,n,a,c,s=Object(d.g)().name,i=Object(r.useState)(""),l=Object(o.a)(i,2),h=l[0],m=l[1],f=Object(H.c)(h),w=f.hasCopied,v=f.onCopy,k=Object(r.useReducer)($,{state:"",name:s,payload:null,errors:null}),C=Object(o.a)(k,2),z=C[0],A=C[1],D=Object(r.useContext)(S).app,R=Object(r.useCallback)(Object(g.a)(y.a.mark((function e(){var t,n,r,a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("string"===typeof z.name&&0!==z.name.length){e.next=2;break}return e.abrupt("return");case 2:return A({state:"LOADING"}),e.next=5,W(D.network,z.name);case 5:if(!(t=e.sent).errors){e.next=11;break}return n=L(t.errors,"failed to get domain records"),j.b.error(n),A({state:"QUERY_FAILED",errors:t.errors}),e.abrupt("return");case 11:t.data.resolveDomain&&(m(null===(r=t.data.resolveDomain)||void 0===r?void 0:r.Address),t.data.resolveDomain.Metadata=JSON.parse(null===(a=t.data.resolveDomain)||void 0===a?void 0:a.Data),A({state:"QUERY_SUCCESS",payload:t.data.resolveDomain}));case 12:case"end":return e.stop()}}),e)}))),[D.network,z.name]);return Object(r.useEffect)((function(){R()}),[R]),Object(O.jsxs)(b.a,{minHeight:"100vh",children:[Object(O.jsx)(N,{showSearch:!0}),Object(O.jsx)(b.a,{d:"block",children:Object(O.jsx)(b.a,{d:"flex",mt:"10",justifyContent:"center",children:Object(O.jsx)(b.a,{d:"flex",width:"80vw",borderRadius:"10",boxShadow:"xl",children:Object(O.jsxs)(b.d,{children:[Object(O.jsx)(b.e,{rowSpan:2,children:Object(O.jsx)(b.h,{spacing:3,children:Object(O.jsx)(b.i,{mt:"5",p:"8",pb:"10",children:Object(O.jsxs)(b.d,{templateColumns:"repeat(5, 1fr)",gap:6,children:[Object(O.jsx)(b.a,{w:"100%",h:"10",children:Object(O.jsx)(b.g,{letterSpacing:"wide",size:"2xl",textAlign:"center",children:s})}),"QUERY_SUCCESS"===z.state&&z.payload?Object(O.jsx)(b.a,{w:"100%",h:"10",gridColumnStart:5,children:h?Object(O.jsxs)(b.c,{mb:2,children:[Object(O.jsx)(p.a,{value:h,isReadOnly:!0,placeholder:"Welcome",py:"4"}),Object(O.jsxs)(x.a,{onClick:v,ml:2,children:[Object(O.jsx)(u.c,{color:"black"})," ",w?"Copied":"Copy"]})]}):null}):null]})})})}),Object(O.jsx)(b.e,{rowSpan:2,children:Object(O.jsx)(b.d,{p:"5",gap:4,children:"LOADING"===z.state?Object(O.jsx)(b.a,{mt:"20",d:"flex",justifyContent:"center",children:Object(O.jsx)(M,{})}):"QUERY_SUCCESS"===z.state?Object(O.jsx)(b.e,{colSpan:4,children:Object(O.jsxs)(V.e,{align:"start",variant:"enclosed",children:[Object(O.jsxs)(V.b,{children:[Object(O.jsx)(V.a,{children:"Details"}),Object(O.jsx)(V.a,{children:"Subdomains"})]}),Object(O.jsxs)(V.d,{children:[Object(O.jsx)(V.c,{children:Object(O.jsxs)(b.l,{align:"left",mt:"6",children:[Object(O.jsx)(b.g,{fontSize:"lg",mt:"2",children:"Address Details"}),Object(O.jsxs)(b.f,{spacing:"30px",align:"left",children:[Object(O.jsx)(b.a,{w:"130px",children:Object(O.jsx)(b.g,{fontSize:"md",mt:"2",children:"Name"})}),Object(O.jsx)(b.a,{w:"670px",children:Object(O.jsx)(b.k,{fontSize:"md",mt:"2",children:null!==z&&void 0!==z&&z.name?null===z||void 0===z?void 0:z.name:null})})]}),Object(O.jsxs)(b.f,{spacing:"30px",children:[Object(O.jsx)(b.a,{w:"130px",children:Object(O.jsx)(b.g,{fontSize:"md",mt:"2",children:"Address"})}),Object(O.jsx)(b.a,{w:"670px",children:Object(O.jsx)(b.k,{fontSize:"md",mt:"2",children:null!==z&&void 0!==z&&null!==(e=z.payload)&&void 0!==e&&e.Address?null===z||void 0===z||null===(t=z.payload)||void 0===t?void 0:t.Address:""})})]}),Object(O.jsxs)(b.f,{spacing:"30px",pb:"2",children:[Object(O.jsx)(b.a,{w:"130px",children:Object(O.jsx)(b.g,{fontSize:"md",mt:"2",children:"Expiry"})}),Object(O.jsx)(b.a,{w:"670px",children:Object(O.jsx)(b.k,{fontSize:"md",mt:"2",children:null!==z&&void 0!==z&&null!==(n=z.payload)&&void 0!==n&&n.Expiry?null===z||void 0===z||null===(a=z.payload)||void 0===a?void 0:a.Expiry:""})})]}),Object(O.jsx)("hr",{}),Object(O.jsx)(b.g,{fontSize:"lg",py:"2",children:"Additional Information"}),Object.keys(null===z||void 0===z||null===(c=z.payload)||void 0===c?void 0:c.Metadata).map((function(e,t){var n;return Object(O.jsxs)(b.f,{spacing:"24px",children:[Object(O.jsx)(b.a,{w:"130px",children:Object(O.jsx)(b.g,{fontSize:"md",mt:"2",children:e})}),Object(O.jsx)(b.a,{w:"670px",children:Object(O.jsx)(b.k,{fontSize:"md",mt:"2",children:null===z||void 0===z||null===(n=z.payload)||void 0===n?void 0:n.Metadata[e]})})]},"".concat(e,"-").concat(t))}))]})}),Object(O.jsx)(V.c,{children:Object(O.jsx)(b.k,{fontSize:"xl",mt:"5",textAlign:"center",children:" No Subdomains"})})]})]})}):null})})]})})})})]})},K=n(414),X=n(398),Z=n(399),ee=function(e){var t=e.type,n=e.message,r=e.spin;return Object(O.jsx)(b.c,{justifyContent:"space-between",mt:"3",children:Object(O.jsxs)(b.a,{style:{margin:"0 auto"},children:["error"===t&&Object(O.jsxs)(X.a,{borderRadius:"md",status:"error",children:[r?Object(O.jsx)(Z.a,{size:"5",isIndeterminate:!0,color:"red.300",mr:"3"}):Object(O.jsx)(X.b,{}),n]}),"success"===t&&Object(O.jsxs)(X.a,{borderRadius:"md",status:"success",children:[r?Object(O.jsx)(Z.a,{size:"5",isIndeterminate:!0,color:"green.300",mr:"3"}):Object(O.jsx)(X.b,{}),n]}),"warning"===t&&Object(O.jsxs)(X.a,{borderRadius:"md",status:"warning",children:[r?Object(O.jsx)(Z.a,{size:"5",isIndeterminate:!0,color:"yellow.300",mr:"3"}):Object(O.jsx)(X.b,{}),n]}),"info"===t&&Object(O.jsxs)(X.a,{borderRadius:"md",status:"info",children:[r?Object(O.jsx)(Z.a,{size:"5",isIndeterminate:!0,color:"blue.300",mr:"3"}):Object(O.jsx)(X.b,{}),n]})]})})};var te=function(){var e=this,t=Object(d.g)().name,n=Object(r.useState)(""),a=Object(o.a)(n,2),c=a[0],s=a[1],i=Object(r.useState)("1"),h=Object(o.a)(i,2),m=h[0],f=h[1],w=Object(r.useState)({price:"1000000",years:"1",days:"365"}),v=Object(o.a)(w,2),k=v[0],C=v[1],z=Object(r.useState)(0),A=Object(o.a)(z,2),R=A[0],E=A[1],I=Object(r.useState)({show:!1,type:"",message:"",spin:!1}),U=Object(o.a)(I,2),M=U[0],_=U[1],$=Object(r.useContext)(S).app,W=function(){var e=Object(g.a)(y.a.mark((function e(n,r){var a,c,s,i;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _({show:!0,type:"info",message:"Getting price for "+n+" years",spin:!0}),e.next=3,Q($.network,t,r);case 3:if(!(c=e.sent).errors){e.next=9;break}return s=L(c.errors,"failed to get domain avaialable. Please try again."),j.b.error(s),_({show:!0,type:"error",message:s,spin:!1}),e.abrupt("return");case 9:null!==(a=c.data.getAcquisitionInfo)&&void 0!==a&&a.state&&(C({price:null===(i=c.data.getAcquisitionInfo)||void 0===i?void 0:i.cost.toString(),years:n,days:r.toString()}),_({show:!1,type:"",message:"",spin:!1}));case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),B=function(){var e=Object(g.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:f(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),H=function(){var t=Object(g.a)(y.a.mark((function t(){var n,r,a,s,i,o,l,d,u,b,h,p,x;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(Y($.account)){t.next=2;break}return t.abrupt("return");case 2:return r=Math.floor(2147483648*Math.random()),E(r),_({show:!0,type:"info",message:"Confirm the operation in your wallet to proceed.",spin:!0}),t.next=7,q($.network,{commitParams:{label:c,owner:$.account.pkh,nonce:r}});case 7:if(!(a=t.sent).errors){t.next=13;break}return s=L(a.errors,"Failed to commit domain. Please try again."),j.b.error(s),_({show:!0,type:"error",message:s,spin:!1}),t.abrupt("return");case 13:_({show:!0,type:"info",message:"Waiting for the operation to be included on the blockchain...",spin:!0}),i=P.subscribe({uri:D,query:"\n        query {\n          getOperationStatus (\n            hash: $hash\n            network: $network\n          )\n        }\n      ",variables:{hash:null===(n=a.data)||void 0===n?void 0:n.commit,network:$.network},frequency:{ms:6e3}}),o=!1,l=!1,t.prev=17,u=Object(K.a)(i);case 19:return t.next=21,u.next();case 21:if(!(o=!(b=t.sent).done)){t.next=32;break}if(!(p=b.value).errors){t.next=25;break}return t.abrupt("continue",29);case 25:if(void 0===(x=null===(h=p.data)||void 0===h?void 0:h.getOperationStatus)){t.next=29;break}if(!(x.confirmations>3)){t.next=29;break}return t.abrupt("break",32);case 29:o=!1,t.next=19;break;case 32:t.next=38;break;case 34:t.prev=34,t.t0=t.catch(17),l=!0,d=t.t0;case 38:if(t.prev=38,t.prev=39,!o||null==u.return){t.next=43;break}return t.next=43,u.return();case 43:if(t.prev=43,!l){t.next=46;break}throw d;case 46:return t.finish(43);case 47:return t.finish(38);case 48:_({show:!0,type:"success",message:"Done registering the domain",spin:!1}),setTimeout(function(){_({show:!1,type:"",message:"",spin:!1}),B("2")}.bind(e),2e3);case 50:case"end":return t.stop()}}),t,null,[[17,34,38,48],[39,,43,47]])})));return function(){return t.apply(this,arguments)}}(),V=function(){var t=Object(g.a)(y.a.mark((function t(n){var r,a;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(Y($.account)){t.next=2;break}return t.abrupt("return");case 2:return _({show:!0,type:"info",message:"Waiting for the buy operation to complete...",spin:!0}),t.next=5,T($.network,{buyParams:{label:c,owner:$.account.pkh,duration:parseInt(k.days),metadata:{isMichelsonMap:!0,values:[]},nonce:n},sendParams:{amount:F(parseInt(k.price))}});case 5:if(!(r=t.sent).errors){t.next=11;break}return a=L(r.errors,"Failed to buy domain. Please try again."),j.b.error(a),_({show:!0,type:"error",message:a,spin:!1}),t.abrupt("return");case 11:r.data.buy&&j.b.success("domain '".concat(c,"' bought")),_({show:!0,type:"success",message:"Done registering the domain",spin:!1}),setTimeout(function(){_({show:!1,type:"",message:"",spin:!1}),B("3")}.bind(e),2e3);case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(r.useEffect)((function(){!c&&t&&s(function(e){var t=e.split(".");return 0===t.length?"":t[0]}(t))}),[]),Object(O.jsxs)(b.a,{minHeight:"100vh",children:[Object(O.jsx)(N,{showSearch:!0}),Object(O.jsxs)(b.a,{d:"block",children:[Object(O.jsx)(b.a,{d:"flex",mt:"10",justifyContent:"center",children:Object(O.jsx)(b.a,{d:"flex",width:"80vw",borderRadius:"10",children:Object(O.jsx)(b.d,{templateColumns:"repeat(5, 1fr)",gap:6,children:Object(O.jsx)(b.a,{w:"100%",p:8,d:"flex",children:Object(O.jsxs)(b.c,{width:"75vw",justifyContent:"space-between",children:[Object(O.jsx)(b.a,{mr:2,children:Object(O.jsx)(b.g,{letterSpacing:"wide",size:"2xl",textAlign:"center",children:t})}),Object(O.jsx)(b.a,{mr:2})]})})})})}),Object(O.jsx)(b.a,{d:"flex",justifyContent:"center",children:Object(O.jsx)(b.a,{d:"flex",width:"80vw",borderRadius:"10",boxShadow:"xl",children:Object(O.jsx)(b.d,{templateColumns:"repeat(5, 1fr)",gap:6,children:Object(O.jsx)(b.a,{w:"100%",p:8,d:"flex",children:Object(O.jsx)(b.c,{width:"75vw",justifyContent:"space-between",direction:"vertical",children:Object(O.jsxs)(b.a,{children:[Object(O.jsxs)(b.a,{d:"flex",flexDirection:"row",children:[Object(O.jsxs)(b.g,{letterSpacing:"wide",size:"md",textAlign:"left",children:["This domain is available! Register it now for ",F(k.price)]}),Object(O.jsx)(G,{})]}),Object(O.jsx)(b.k,{bgClip:"text",fontSize:"md",mt:"2",color:"black",children:"Complete the following steps to register your domain:"}),Object(O.jsxs)(b.a,{children:[Object(O.jsxs)(b.g,{letterSpacing:"wide",size:"sm",mt:"10",textAlign:"left",children:[Object(O.jsx)(u.f,{color:"teal",mr:"2"}),"Request"]}),"1"===m&&Object(O.jsxs)(b.a,{align:"center",children:[M.show&&Object(O.jsx)(ee,{type:M.type,message:M.message,spin:M.spin}),Object(O.jsx)(b.k,{bgClip:"text",fontSize:"md",mt:"5",color:"black",children:"First, we need to publish your intent to buy this domain. This protects your domain from being taken by an adversary. Click 'Request' and your wallet will open. You will then be asked to confirm the operation."}),Object(O.jsx)(x.a,{colorScheme:"teal",onClick:H,variant:"solid",size:"md",mt:"5",width:"30vw",children:" Request"})]})]}),Object(O.jsxs)(b.a,{children:[Object(O.jsxs)(b.g,{letterSpacing:"wide",size:"sm",mt:"10",textAlign:"left",color:"2"===m||"3"===m?"teal":"gray.300",children:[Object(O.jsx)(u.d,{mr:"2"}),"Register"]}),"2"===m&&Object(O.jsxs)(b.a,{children:[M.show&&Object(O.jsx)(ee,{type:M.type,message:M.message,spin:M.spin}),Object(O.jsx)(b.k,{bgClip:"text",fontSize:"md",mt:"5",color:"black",children:"Select a registration period and click 'Register'. Your wallet will re-open so that you can confirm the operation. Once confirmed the domain is yours."}),Object(O.jsxs)(b.a,{border:"1px",borderColor:"gray.200",borderRadius:"md",mt:"5",p:"2",textAlign:"left",children:[Object(O.jsxs)(b.a,{d:"flex",flexDirection:"row",children:[Object(O.jsxs)(b.g,{letterSpacing:"wide",size:"md",textAlign:"left",children:[" Price : ",F(k.price)]}),Object(O.jsx)(G,{})]}),Object(O.jsxs)(b.a,{d:"flex",flexDirection:"row",children:[Object(O.jsx)(b.k,{bgClip:"text",fontSize:"md",mt:"5",color:"black",children:"Domain points to: "}),Object(O.jsxs)(b.g,{letterSpacing:"wide",size:"sm",mt:"6",ml:"2",textAlign:"left",children:[" ",$.account?"".concat($.account.pkh):"Connect Wallet"," "]})]}),Object(O.jsxs)(b.a,{d:"flex",flexDirection:"column",children:[Object(O.jsx)(b.k,{bgClip:"text",fontSize:"md",mt:"5",color:"black",children:"Registration Period: "}),Object(O.jsxs)(p.b,{mt:"2",mb:"2",width:"50%",height:"50%",children:[Object(O.jsx)(p.c,{bg:"white",children:Object(O.jsx)(u.a,{color:"gray.300"})}),Object(O.jsx)(p.a,{variant:"outline",colorScheme:"whiteAlpha",placeholder:"Years",type:"number",onChange:function(e){var t=e.target.value,n=365*parseInt(t);C({price:k.price,years:t,days:n.toString()}),W(t,n)},value:k.years,bg:"white",size:"md",mr:0}),Object(O.jsx)(p.d,{children:"years"})]})]})]}),Object(O.jsx)(b.a,{w:"100%",align:"center",children:Object(O.jsx)(x.a,{colorScheme:"teal",onClick:function(){return V(R)},variant:"solid",size:"md",mt:"5",width:"30vw",children:" Request"})})]})]}),Object(O.jsxs)(b.a,{children:[Object(O.jsxs)(b.g,{letterSpacing:"wide",size:"sm",mt:"10",textAlign:"left",color:"3"===m?"teal":"gray.300",children:[Object(O.jsx)(u.b,{mr:"2"}),"Done. It's yours!"]}),"3"===m&&Object(O.jsxs)(b.a,{align:"center",children:[Object(O.jsx)(b.k,{bgClip:"text",fontSize:"md",mt:"5",color:"black",children:"Congratulations! Your domain was successfully registered."}),Object(O.jsx)(l.b,{to:{pathname:"/search",search:"?domain=".concat(t)},children:Object(O.jsx)(x.a,{colorScheme:"teal",variant:"solid",size:"md",mt:"5",width:"30vw",children:" Manage Domain"})})]})]})]})})})})})})]})]})};var ne=function(){var e=Object(r.useState)({network:"ithacanet",account:null}),t=Object(o.a)(e,2),n=t[0],a=t[1];return Object(O.jsxs)(S.Provider,{value:{app:n,setApp:a},children:[Object(O.jsx)(l.a,{children:Object(O.jsxs)(d.c,{children:[Object(O.jsx)(d.a,{exact:!0,path:"/",element:Object(O.jsx)(f,{})}),Object(O.jsx)(d.a,{path:"/search",element:Object(O.jsx)(B,{})}),Object(O.jsx)(d.a,{path:"/details/:name",element:Object(O.jsx)(J,{})}),Object(O.jsx)(d.a,{path:"/buy/:name",element:Object(O.jsx)(te,{})})]})}),Object(O.jsx)(j.a,{position:"top-center"})]})},re=(n(906),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,928)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))});s.a.render(Object(O.jsx)(a.a.StrictMode,{children:Object(O.jsx)(i.a,{children:Object(O.jsx)(ne,{})})}),document.getElementById("root")),re()}},[[908,1,2]]]);
//# sourceMappingURL=main.2a8f706c.chunk.js.map