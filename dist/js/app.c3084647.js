(function(){"use strict";var t={6955:function(t,e,a){a.d(e,{T:function(){return n},Y:function(){return o}});const o="https://api-internal.gli.id:5001/parking/",n="https://api-internal.gli.id:5001/gocorp/"},6544:function(t,e,a){var o=a(144),n=a(998),r=a(9256),i=function(){var t=this,e=t._self._c;return e(n.Z,{attrs:{id:"app"}},[e(r.Z,{staticClass:"ma-0 pa-0 d-flex flex-row",attrs:{fluid:""}},[e("div",{staticStyle:{width:"100%"}},[e(r.Z,{staticClass:"ma-0 pa-0 d-flex flex-row",staticStyle:{height:"100%",width:"100%"},attrs:{fluid:""}},[t.$route.meta.hideNavbar?t._e():e("Navbar",{staticStyle:{"min-height":"100vh"}}),t.$route.meta.hideNavbar?e("div",{staticClass:"mx-auto",staticStyle:{width:"100%"}},[e("router-view",{key:t.$route.fullPath}),t.$route.meta.hideFooter?t._e():e("Footer")],1):e("div",{staticClass:"mx-auto",staticStyle:{width:"100%"}},[e("router-view",{key:t.$route.fullPath,staticStyle:{"min-height":"94vh"},attrs:{fluid:""}}),t.$route.meta.hideFooter?t._e():e("Footer")],1)],1)],1)])],1)},l=[],s=(a(7658),a(1705));o.ZP.use(s.Z);var c=new s.Z({}),p=a(4886),u=a(9223),m=a(8271),d=function(){var t=this,e=t._self._c;return e(m.Z,{staticClass:"d-flex align-center justify-center",staticStyle:{"background-color":"transparent !important"}},[e("div",{staticClass:"text-center white--text",attrs:{flat:"",tile:"",width:"100%"}},[e(u.Z,{staticClass:"mx-auto red",attrs:{width:"96%"}}),e(p.ZB,{staticClass:"mb-0 pb-0 white--text",staticStyle:{"letter-spacing":"1.2px"}},[t._v(" Copyright "+t._s((new Date).getFullYear())+" - PT. Global Loyalty Indonesia ")]),e(p.ZB,{staticClass:"ma-0 pa-0 white--text",staticStyle:{"letter-spacing":"1.2px","font-size":"12px"}},[t._v(" Version 0.1.0 ")])],1)])},f=[],h={name:"Footer",components:{}},g=h,v=a(1001),b=(0,v.Z)(g,d,f,!1,null,"b3c8e4aa",null),Z=b.exports,k=a(7359),y=a(3423),S=a(6190),x=a(4145),C=a(266),w=a(4061),A=a(255),_=a(2348),P=a(400),T=a(1214),I=a(8224),j=a(4324),N=a(5495),E=a(5808),O=a(4525),q=a(6900),Y=a(8251),H=a(4528),R=a(9709),V=a(1713),B=a(3687),L=a(7808),G=function(){var t=this,e=t._self._c;return e(R.Z,{directives:[{name:"show",rawName:"v-show",value:!t.$route.meta.hideNavbar,expression:"!$route.meta.hideNavbar"}],staticStyle:{"border-right":"2.5px solid #f46d3d !important",width:"23% !important"},attrs:{permanent:"",color:"#073e5d"}},[e(w.Z,{attrs:{width:"250","content-class":"elevation-0","hide-overlay":""},model:{value:t.alert.success,callback:function(e){t.$set(t.alert,"success",e)},expression:"alert.success"}},[e(k.Z,{attrs:{type:"success"}},[t._v(" Update Profile Berhasil! ")])],1),e(w.Z,{attrs:{width:"250","content-class":"elevation-0","hide-overlay":""},model:{value:t.alert.fail,callback:function(e){t.$set(t.alert,"fail",e)},expression:"alert.fail"}},[e(k.Z,{attrs:{type:"error"}},[t._v(" Update Profile Gagal! ")])],1),e(w.Z,{attrs:{persistent:"","content-class":"elevation-0",width:"750"},model:{value:t.dialog.profile,callback:function(e){t.$set(t.dialog,"profile",e)},expression:"dialog.profile"}},[e("div",{staticStyle:{display:"flex","align-items":"start","justify-content":"center"}},[e(x.Z,{staticClass:"text-center",staticStyle:{"border-radius":"25px 25px 25px 25px !important"},attrs:{flat:"",tile:"",width:"100%"}},[e("div",{staticClass:"my-4 pa-4 px-6 d-flex flex-row",staticStyle:{width:"100% !important"}},[e(x.Z,{staticStyle:{width:"100% !important"},attrs:{elevation:"3",outlined:""}},[e(V.Z,[e(C.Z,[e("div",{staticClass:"ma-2 ml-6 pa-2 d-flex flex-row"},[e("h2",{staticStyle:{"font-weight":"500"}},[t._v("Profile")]),e(B.Z),t.flag?e(I.Z,{scopedSlots:t._u([{key:"default",fn:function({hover:a}){return[e(S.Z,{staticClass:"mr-5",class:a?"red--text":"",attrs:{icon:""},on:{click:t.closeDialog}},[e(j.Z,[t._v("mdi-close")])],1)]}}],null,!1,3318119713)}):t._e()],1)])],1),e(u.Z,{staticClass:"ml-8 mr-8"}),e("div",{staticStyle:{width:"100%"}},[e(C.Z,{attrs:{cols:"12",md:"12"}},[e(x.Z,{staticClass:"ma-0 pa-0",attrs:{flat:"",width:"100%"}},[e(p.ZB,{attrs:{width:"100%"}},[e(r.Z,[e(V.Z,{staticClass:"d-flex"},[e(C.Z,{attrs:{cols:"12"}},[e(V.Z,{staticClass:"pr-4 text-start mb"},[e(C.Z,{staticClass:"text-start ma-0 pa-auto",attrs:{cols:"4"}},[e("h3",{staticClass:"black--text pt-2",staticStyle:{"font-weight":"400","font-size":"16px"}},[t._v("NIK")])]),e(C.Z,{attrs:{cols:"8"}},[e(L.Z,{attrs:{outlined:"",value:t.nik,"hide-details":"",dense:"",filled:"",readonly:!0}})],1)],1),e(V.Z,{staticClass:"pr-4 text-start"},[e(C.Z,{staticClass:"text-start ma-0 pa-auto",attrs:{cols:"4"}},[e("h3",{staticClass:"black--text pt-2",staticStyle:{"font-weight":"400","font-size":"16px"}},[t._v("Nama")])]),e(C.Z,{attrs:{cols:"8"}},[e(L.Z,{attrs:{value:t.fullname,outlined:"",filled:"",dense:"",readonly:!0,"hide-details":""}})],1)],1),e(V.Z,{staticClass:"pr-4 text-start"},[e(C.Z,{staticClass:"text-start ma-0 pa-auto",attrs:{cols:"4"}},[e("h3",{staticClass:"black--text pt-2",staticStyle:{"font-weight":"400","font-size":"16px"}},[t._v("Departemen")])]),e(C.Z,{attrs:{cols:"8"}},[e(L.Z,{attrs:{value:t.cost_center,outlined:"",filled:"",dense:"",readonly:!0,"hide-details":""}})],1)],1),e(V.Z,{staticClass:"pr-4 text-start"},[e(C.Z,{staticClass:"text-start ma-0 pa-auto",attrs:{cols:"4"}},[e("h3",{staticClass:"black--text pt-2",staticStyle:{"font-weight":"400","font-size":"16px"}},[t._v("No. Telepon")])]),e(C.Z,{attrs:{cols:"8"}},[e(V.Z,{staticClass:"ma-0"},[e(L.Z,{class:t.phone?"":"outline-red hint-red",attrs:{outlined:"",hint:t.phone?"":"Kolom wajib diisi!","persistent-hint":"",dense:"","hide-details":"auto"},model:{value:t.profile.phone,callback:function(e){t.$set(t.profile,"phone",e)},expression:"profile.phone"}})],1),e(V.Z,{staticClass:"ma-0 pb-0"},[e("small",[t._v("*No Telepon Akun Gojek")])])],1)],1),e(V.Z,{staticClass:"pr-4 text-start"},[e(C.Z,{staticClass:"text-start ma-0 pa-auto",attrs:{cols:"4"}},[e("h3",{staticClass:"black--text pt-2",staticStyle:{"font-weight":"400","font-size":"16px"}},[t._v("Email")])]),e(C.Z,{attrs:{cols:"8"}},[e(V.Z,{staticClass:"ma-0"},[e(L.Z,{class:t.email?"":"outline-red hint-red",attrs:{outlined:"",hint:t.email?"":"Kolom wajib diisi!","persistent-hint":"",dense:"","hide-details":"auto"},model:{value:t.profile.email,callback:function(e){t.$set(t.profile,"email",e)},expression:"profile.email"}})],1),e(V.Z,{staticClass:"ma-0 pb-0"},[e("small",[t._v("*Email Kantor")])])],1)],1)],1)],1),e(V.Z,{staticClass:"d-flex justify-center"},[e(S.Z,{staticClass:"pr-7 pl-7 mt-3",attrs:{color:"green white--text",width:"350"},on:{click:t.onSubmit}},[e(j.Z,{attrs:{small:""}},[t._v("mdi-account-cog")]),t._v("  Update Profile")],1)],1)],1)],1)],1)],1)],1)],1)],1)])],1)]),e(O.Z,{staticClass:"px-2 py-6"},[e(N.Z,{staticClass:"mr-3",class:"gocorp"==t.selection?"ml-7":"ml-3",attrs:{src:a(3010),"max-height":"40","max-width":"40",contain:""}}),e(Y.oZ,{staticStyle:{color:"#fff !important","font-size":"13px","letter-spacing":"1.1px","line-height":"1.5"}},[e("span",{domProps:{innerHTML:t._s(t.title)}})])],1),e(u.Z,{staticStyle:{"border-width":"1px"},attrs:{color:"#f26d3b"}}),e(E.Z,{staticClass:"pa-0 ma-0",attrs:{dense:""}},[e(H.Z,{staticStyle:{"border-radius":"10px"},attrs:{"open-on-click":""},scopedSlots:t._u([{key:"activator",fn:function({on:a}){return[e(O.Z,t._g({staticClass:"pb-3",attrs:{link:""}},a),[e(q.Z,[e(j.Z,{attrs:{color:"#fff","x-large":""}},[t._v("mdi-account-circle")])],1),e(C.Z,[e(V.Z,[e(Y.V9,{staticClass:"mt-1",staticStyle:{color:"#fff !important"}},[t._v(t._s(t.fullname))])],1),e(V.Z,[e(Y.oZ,{staticClass:"mt-1",staticStyle:{color:"lightslategrey !important"}},[t._v(t._s("Y"==t.manager||"T"==t.manager?t.cost_center+" Manager":t.cost_center))])],1)],1)],1),e(O.Z,[e(V.Z,{staticClass:"d-flex justify-center"},[e(S.Z,{staticClass:"mb-3",attrs:{block:"",color:"#f26d3b",dark:""},on:{click:function(e){t.dialog.profile=!0}}},[e(j.Z,{attrs:{small:""}},[t._v("mdi-account")]),t._v(" Profile")],1)],1)],1)]}}])},[e(E.Z,{staticClass:"pa-3",attrs:{"min-height":"100","min-width":"250"}},[e(V.Z,{staticClass:"px-1 d-flex flex-row justify-center align-center"},[e(C.Z,{staticClass:"mr-0 pr-0",staticStyle:{width:"104px !important"}},[e(y.Z,{attrs:{color:"primary",size:"80"}},[e("span",{staticClass:"white--text text-h5"},[t._v(t._s(t.user_init))])])],1),e(C.Z,{staticClass:"ml-0 pl-0"},[e("h4",{staticClass:"text-left"},[t._v(t._s(t.fullname))]),e("h5",{staticClass:"text-left",staticStyle:{"font-weight":"500"}},[t._v(t._s(t.nik))])])],1),e(u.Z,{staticClass:"mt-3 mb-3"}),e(V.Z,[e(C.Z,{staticClass:"mb-3 pb-1"},[e(S.Z,{staticClass:"noTextTransform ml-auto",staticStyle:{color:"white",float:"left"},attrs:{small:"",right:"",color:"red darken-1"},on:{click:t.onLogout}},[t._v(" Logout ")])],1)],1)],1)],1)],1),e(u.Z,{staticStyle:{"border-width":"1px"},attrs:{color:"#f26d3b"}}),e(T.Z,{attrs:{accordion:""},model:{value:t.panel,callback:function(e){t.panel=e},expression:"panel"}},[e(A.Z,{staticClass:"rounded-0",staticStyle:{"border-bottom":"2px solid #f46d3d !important"}},[e(P.Z,{staticClass:"white--text",staticStyle:{background:"#073e5d !important"},attrs:{dark:""},scopedSlots:t._u([{key:"actions",fn:function(){return[e(j.Z,{attrs:{color:"white"}},[t._v("$expand")])]},proxy:!0}])},[t._v(" Parking ")]),e(_.Z,[e("div",[e(E.Z,{staticClass:"pa-0 ma-0",attrs:{dense:""}},[e(H.Z,{staticStyle:{"border-radius":"10px"},attrs:{"open-on-click":""},scopedSlots:t._u([{key:"activator",fn:function({on:a}){return[e(O.Z,t._g({staticClass:"pb-3",attrs:{link:""},on:{click:function(e){return t.route("home")}}},a),[e(q.Z,[e(j.Z,{attrs:{color:"#fff","x-large":""}},[t._v("mdi-home")])],1),e(Y.V9,{staticStyle:{color:"#fff !important"}},[t._v("Beranda")])],1)]}}])})],1),e(E.Z,{staticClass:"pa-0 ma-0",attrs:{dense:""}},["HRGA"==t.cost_center?e(H.Z,{staticStyle:{"border-radius":"10px"},attrs:{"open-on-click":""},scopedSlots:t._u([{key:"activator",fn:function({on:a}){return[e(O.Z,t._g({staticClass:"pb-3",attrs:{link:""},on:{click:function(e){return t.route("list-kendaraan")}}},a),[e(q.Z,[e(j.Z,{attrs:{color:"#fff","x-large":""}},[t._v("mdi-clipboard-list-outline")])],1),e(Y.V9,{staticStyle:{color:"#fff !important","font-size":"small"}},[t._v("List Kendaraan")])],1)]}}],null,!1,1046567191)}):t._e()],1),e(E.Z,{staticClass:"pa-0 ma-0",attrs:{dense:""}},["HRGA"==t.cost_center?e(H.Z,{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:o}){return[e(O.Z,t._g(t._b({staticClass:"pb-3",attrs:{link:""}},"v-list-item",o,!1),a),[e(q.Z,[e(j.Z,{attrs:{color:"#fff","x-large":""}},[t._v("mdi-receipt-text-outline")])],1),e(Y.V9,{staticStyle:{color:"#fff !important"}},[t._v("Report")])],1)]}}],null,!1,4034378931)},[e(E.Z,{staticClass:"ma-0 pa-0"},[e(O.Z,[e(S.Z,{staticStyle:{"text-transform":"unset","font-size":"13px"},attrs:{text:"",block:""},on:{click:function(e){return t.routeFinance("report-finance","finance")}}},[t._v("Finance"),e(B.Z)],1)],1)],1),e(E.Z,[e(O.Z,[e(S.Z,{staticStyle:{"text-transform":"unset","font-size":"13px"},attrs:{text:"",block:""},on:{click:function(e){return t.routeFinance("report-quality-parking","quality-parking")}}},[t._v("Quality Parking"),e(B.Z)],1)],1)],1),e(E.Z,[e(O.Z,[e(S.Z,{staticStyle:{"text-transform":"unset","font-size":"13px"},attrs:{text:"",block:""},on:{click:function(e){return t.route("posting")}}},[t._v("Posting"),e(B.Z)],1)],1)],1)],1):t._e()],1)],1)])],1),e(A.Z,{staticClass:"rounded-0",staticStyle:{"border-bottom":"2px solid #f46d3d !important"},attrs:{value:t.panel}},[e(P.Z,{staticClass:"white--text",staticStyle:{background:"#073e5d !important"},attrs:{dark:""},scopedSlots:t._u([{key:"actions",fn:function(){return[e(j.Z,{attrs:{color:"white"}},[t._v("$expand")])]},proxy:!0}])},[t._v(" Transportasi Online ")]),e(_.Z,[e("div",[e(E.Z,{staticClass:"pa-0 ma-0",attrs:{dense:""}},[e(H.Z,{staticStyle:{"border-radius":"10px"},attrs:{"open-on-click":""},scopedSlots:t._u([{key:"activator",fn:function({on:a}){return[e(O.Z,t._g({staticClass:"pb-3",attrs:{link:""},on:{click:function(e){return t.route("home-gocorp")}}},a),[e(q.Z,[e(j.Z,{attrs:{color:"#fff","x-large":""}},[t._v("mdi-home")])],1),e(Y.V9,{staticStyle:{color:"#fff !important"}},[t._v("Beranda")])],1)]}}])})],1),e(E.Z,{staticClass:"pa-0 ma-0",attrs:{dense:""}},["HRGA"==t.cost_center&&"Y"!=t.manager&&"T"!=t.manager?e(H.Z,{staticStyle:{"border-radius":"10px"},attrs:{"open-on-click":""},scopedSlots:t._u([{key:"activator",fn:function({on:a}){return[e(O.Z,t._g({staticClass:"pb-3",attrs:{link:""},on:{click:function(e){return t.route("menu-ga")}}},a),[e(q.Z,[e(j.Z,{attrs:{color:"#fff","x-large":""}},[t._v("mdi-playlist-edit")])],1),e(Y.V9,{staticStyle:{color:"#fff !important","font-size":"small"}},[t._v("Menu GA")])],1)]}}],null,!1,430834862)}):t._e()],1),e(E.Z,{staticClass:"pa-0 ma-0",attrs:{dense:""}},["HRGA"==t.cost_center&&"Y"!=t.manager?e(H.Z,{staticStyle:{"border-radius":"10px"},attrs:{"open-on-click":""},scopedSlots:t._u([{key:"activator",fn:function({on:a}){return[e(O.Z,t._g({staticClass:"pb-3",attrs:{link:""},on:{click:function(e){return t.route("report-gocorp")}}},a),[e(q.Z,[e(j.Z,{attrs:{color:"#fff","x-large":""}},[t._v("mdi-receipt-text-outline")])],1),e(Y.V9,{staticStyle:{color:"#fff !important","font-size":"small"}},[t._v("Report")])],1)]}}],null,!1,1862356894)}):t._e()],1),e(E.Z,{staticClass:"pa-0 ma-0",attrs:{dense:""}},["HRGA"==t.cost_center&&"Y"!=t.manager?e(H.Z,{staticStyle:{"border-radius":"10px"},attrs:{"open-on-click":""},scopedSlots:t._u([{key:"activator",fn:function({on:a}){return[e(O.Z,t._g({staticClass:"pb-3",attrs:{link:""},on:{click:function(e){return t.route("history-trip")}}},a),[e(q.Z,[e(j.Z,{attrs:{color:"#fff","x-large":""}},[t._v("mdi-history")])],1),e(Y.V9,{staticStyle:{color:"#fff !important","font-size":"small"}},[t._v("History Trip")])],1)]}}],null,!1,2482027675)}):t._e()],1),e(E.Z,{staticClass:"pa-0 ma-0",attrs:{dense:""}},["Y"==t.manager||"T"==t.manager?e(H.Z,{staticStyle:{"border-radius":"10px"},attrs:{"open-on-click":""},scopedSlots:t._u([{key:"activator",fn:function({on:a}){return[e(O.Z,t._g({staticClass:"pb-3",attrs:{link:""},on:{click:function(e){return t.route("request-trip")}}},a),[e(q.Z,[e(j.Z,{attrs:{color:"#fff","x-large":""}},[t._v("mdi-folder-account-outline")])],1),e(Y.V9,{staticStyle:{color:"#fff !important","font-size":"small"}},[t._v("Request Trip")])],1)]}}],null,!1,4185072686)}):t._e()],1)],1)])],1)],1)],1)},F=[],W=a(594),D=a(6955),U={name:"app",vuetify:c,components:{},data(){return{fullname:null,alert:{success:!1,fail:!1},flag:!0,title:"Aplikasi<br/>Transportasi<br/>Online",selection:null,user_init:null,user:null,nik:null,phone:null,profile:{email:null,phone:null},email:null,manager:null,cost_center:null,nama_cost_center:null,dialog:{profile:!1,loading:!1},panel:0,textInputRules:[t=>!!t||"Kolom harus diisi"],btnDisable:""}},computed:{checkSelection(){return this.$store.state.selection}},watch:{checkSelection(t){this.selection=this.$store.state.selection,this.title="parking"==this.selection?"Aplikasi<br/>Transportasi<br/>Online":"gocorp"==this.selection?"Transportasi<br/>Online":"Aplikasi<br/>Transportasi<br/>Online",this.panel="parking"==this.selection?0:1}},async created(){this.fullname=localStorage.getItem("nama"),this.nik=localStorage.getItem("nik");var t=this.fullname.match(/\b(\w)/g);this.cost_center=localStorage.getItem("cost_center"),this.getCostCenter(),this.manager=localStorage.getItem("manager"),this.user_init=t.join(""),this.phone=localStorage.getItem("phone"),this.email=localStorage.getItem("email"),this.nama=localStorage.getItem("nama"),null==localStorage.getItem("phone")||""==localStorage.getItem("phone")||null==localStorage.getItem("email")||""==localStorage.getItem("email")?(this.flag=!1,this.dialog.profile=!0):this.flag=!0},methods:{changeRole(t){"hrga"==t?(localStorage.setItem("cost_center","HRGA"),localStorage.setItem("manager","N")):"manager"==t?localStorage.setItem("manager","Y"):(localStorage.setItem("cost_center",this.nama_cost_center),localStorage.setItem("manager","N")),location.reload()},closeDialog(){this.dialog.profile=!1,this.profile.phone=this.phone,this.profile.email=this.email},async getCostCenter(){try{const t={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":"true","Access-Control-Allow-Methods":"GET, PUT, POST, DELETE, OPTIONS, post, get","Access-Control-Allow-Headers":"Origin, Content-Type, X-Auth-Token","Content-Type":"application/json","Content-Length":"<calculated when request is sent>",Host:"<calculated when request is sent>",Accept:"*/*","Accept-Encoding":"gzip, deflate, br",Connection:"keep-alive",app:"sso"};await W.Z.get(D.T+"get-cost-center?mu_username="+localStorage.getItem("nik")+"&mu_token="+localStorage.getItem("token"),t).then((t=>{var e=t.data.data[0];this.email=e.email,this.profile.email=e.email,this.phone=e.phone,this.profile.phone=e.phone,this.nama_cost_center=e.nama_cost_center})).catch((t=>{console.log("GoCorp.vue (error) :: ",t)}))}catch(t){return void console.error(t)}},async onSubmit(){if(null!=this.profile.phone&&""!=this.profile.phone)if(null!=this.profile.email&&""!=this.profile.email){try{this.dialog.loading=!0;const t={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":"true","Access-Control-Allow-Methods":"GET, PUT, POST, DELETE, OPTIONS, post, get","Access-Control-Allow-Headers":"Origin, Content-Type, X-Auth-Token","Content-Type":"application/json","Content-Length":"<calculated when request is sent>",Host:"<calculated when request is sent>",Accept:"*/*","Accept-Encoding":"gzip, deflate, br",Connection:"keep-alive",app:"sso"},e={nik:this.nik,phone:this.profile.phone,email:this.profile.email};await W.Z.post(D.T+"get-cost-center?mu_token="+localStorage.getItem("token")+"&mu_username="+localStorage.getItem("nik"),e,t).then((t=>{var e=t.data.data;if(console.log(e),"22"==t.data.response_code)alert("Token sudah kadaluarsa. Silahkan Login kembali!"),this.removeLocalStorage();else if("21"==t.data.response_code)alert("NIK tidak ditemukan. Silahkan Login kembali!"),this.removeLocalStorage();else if("20"==t.data.response_code)alert("Token tidak sesuai. Silahkan Login kembali!"),this.removeLocalStorage();else{if("12"==t.data.response_code)return this.dialog.loading=!1,void(this.dialog.profile=!1);if("success"!=t.data.response_message)return this.dialog.loading=!1,this.dialog.profile=!1,this.alert.fail=!0,void window.setTimeout((()=>{this.alert.fail=!1}),2e3);this.dialog.loading=!1,localStorage.setItem("email",this.email),localStorage.setItem("phone",this.phone),this.email=this.profile.email,this.phone=this.profile.phone,this.alert.success=!0,this.dialog.profile=!1,window.setTimeout((()=>{this.alert.success=!1}),2e3)}})).catch((t=>{console.log("GoCorp.vue (error) :: ",t),this.alert.fail=!0,this.dialog.loading=!1,this.dialog.profile=!1}))}catch(t){return console.error(t),alert("Error: koneksi gagal"),this.dialog.loading=!1,void(this.dialog.profile=!1)}this.getCostCenter(),this.dialog.loading=!1}else alert("Email tidak boleh kosong!");else alert("No. Hp tidak boleh kosong!")},removeLocalStorage(){localStorage.removeItem("nama"),localStorage.removeItem("phone"),localStorage.removeItem("email"),localStorage.removeItem("manager"),localStorage.removeItem("cost_center"),localStorage.removeItem("token"),localStorage.removeItem("selection"),localStorage.removeItem("nik"),this.route("login")},route(t){this.$router.push({name:t}).catch((t=>{console.log(t)}))},routeFinance(t,e){this.$router.push({name:t,params:{mode:e}}).catch((t=>{console.log(t)}))},async onLogout(){const t={"Content-Type":"application/json",Host:"<calculated when request is sent>",Accept:"*/*","Accept-Encoding":"gzip, deflate, br",Connection:"keep-alive",token:localStorage.token,username:localStorage.nik,app:"sso"};await W.Z.post("https://api-internal.gli.id:5001/sso/logout",t).then((t=>{200==t.data.response_code&&alert("Server error !"),localStorage.removeItem("nama"),localStorage.removeItem("phone"),localStorage.removeItem("email"),localStorage.removeItem("manager"),localStorage.removeItem("phone"),localStorage.removeItem("cost_center"),localStorage.removeItem("token"),localStorage.removeItem("selection"),localStorage.removeItem("nik"),this.$router.push({name:"login"})})).catch((t=>{console.log("Header.vue (error) :: ",t),alert("Server error!"),localStorage.removeItem("nama"),localStorage.removeItem("selection"),localStorage.removeItem("phone"),localStorage.removeItem("email"),localStorage.removeItem("manager"),localStorage.removeItem("phone"),localStorage.removeItem("cost_center"),localStorage.removeItem("token"),localStorage.removeItem("nik")}))}}},X=U,z=(0,v.Z)(X,G,F,!1,null,"e358c1aa",null),M=z.exports,Q={name:"app",vuetify:c,components:{Footer:Z,Navbar:M},data(){return{}},computed:{},methods:{route(t){this.$router.push({name:t}).catch((t=>{console.log(t)}))}}},K=Q,J=(0,v.Z)(K,i,l,!1,null,null,null),$=J.exports,tt=a(8345);o.ZP.use(tt.ZP);const et=[{path:"*",redirect:"/login"},{path:"/login",name:"login",component:()=>a.e(903).then(a.bind(a,9903)),meta:{hideNavbar:!0,hideFooter:!0}},{path:"/home",name:"home",component:()=>Promise.all([a.e(481),a.e(906),a.e(401)]).then(a.bind(a,4848)),meta:{selection:"parking"}},{path:"/home-gocorp",name:"home-gocorp",component:()=>Promise.all([a.e(481),a.e(906),a.e(716)]).then(a.bind(a,6716)),meta:{selection:"gocorp"}},{path:"/list-kendaraan",name:"list-kendaraan",component:()=>Promise.all([a.e(481),a.e(906),a.e(848)]).then(a.bind(a,3848)),meta:{selection:"parking"}},{path:"/report",name:"report",component:()=>Promise.all([a.e(481),a.e(30),a.e(951)]).then(a.bind(a,3682)),meta:{selection:"parking"}},{path:"/report-finance",name:"report-finance",component:()=>Promise.all([a.e(481),a.e(30),a.e(951)]).then(a.bind(a,3682)),meta:{mode:"finance",selection:"parking"}},{path:"/report-quality-parking",name:"report-quality-parking",component:()=>Promise.all([a.e(481),a.e(30),a.e(951)]).then(a.bind(a,3682)),meta:{mode:"quality-parking",selection:"parking"}},{path:"/posting",name:"posting",component:()=>Promise.all([a.e(30),a.e(893)]).then(a.bind(a,3980))},{path:"/tambah-kendaraan",name:"tambah-kendaraan",component:()=>Promise.all([a.e(481),a.e(906),a.e(456)]).then(a.bind(a,456)),meta:{hideNavbar:!0,selection:"parking"}},{path:"/tambah-trip",name:"tambah-trip",component:()=>Promise.all([a.e(30),a.e(525)]).then(a.bind(a,2959)),meta:{hideNavbar:!0,selection:"gocorp"}},{path:"/reschedule-trip",name:"reschedule-trip",component:()=>Promise.all([a.e(30),a.e(525)]).then(a.bind(a,2959)),meta:{hideNavbar:!0,selection:"gocorp",mode:"reschedule"}},{path:"/cancel-trip",name:"cancel-trip",component:()=>Promise.all([a.e(30),a.e(525)]).then(a.bind(a,2959)),meta:{hideNavbar:!0,selection:"gocorp",mode:"delete"}},{path:"/mutasi-kendaraan",name:"mutasi-kendaraan",component:()=>Promise.all([a.e(481),a.e(620)]).then(a.bind(a,7783)),meta:{hideNavbar:!0,selection:"parking"}},{path:"/qp-download",name:"qp-download",component:()=>Promise.all([a.e(481),a.e(906),a.e(320)]).then(a.bind(a,8320)),meta:{hideNavbar:!0,selection:"parking",hideFooter:!0}},{path:"/menu-ga",name:"menu-ga",component:()=>Promise.all([a.e(481),a.e(906),a.e(30),a.e(62)]).then(a.bind(a,364)),meta:{selection:"gocorp",mode:"menu-ga"}},{path:"/request-trip",name:"request-trip",component:()=>Promise.all([a.e(481),a.e(906),a.e(30),a.e(62)]).then(a.bind(a,364)),meta:{selection:"gocorp",mode:"request-trip"}},{path:"/history-trip",name:"history-trip",component:()=>Promise.all([a.e(481),a.e(906),a.e(30),a.e(62)]).then(a.bind(a,364)),meta:{selection:"gocorp",mode:"history-trip"}},{path:"/report-gocorp",name:"report-gocorp",component:()=>Promise.all([a.e(481),a.e(30),a.e(951)]).then(a.bind(a,3682)),meta:{selection:"gocorp",mode:"report-gocorp"}}],at=new tt.ZP({scrollBehavior(){return{x:0,y:0}},routes:et});var ot=at,nt=a(629);o.ZP.use(nt.ZP);var rt=new nt.ZP.Store({state:{selection:null,u:null,nik:null},getters:{},mutations:{setUser(t,e){t.u=e},setNik(t,e){t.nik=e},setSelection(t,e){t.selection=e}},actions:{},modules:{}}),it=a(2022);o.ZP.use(it.Z);var lt=a(9015);o.ZP.component("v-text-field",L.Z),o.ZP.use(lt.ZP,{locale:"en-US",decimalLength:0,autoDecimalMode:!0,min:null,max:null,defaultValue:null,valueAsInteger:!1,allowNegative:!1}),o.ZP.config.productionTip=!1,new o.ZP({router:ot,store:rt,vuetify:c,render:t=>t($)}).$mount("#app")},3010:function(t){t.exports="data:image/png;base64,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"}},e={};function a(o){var n=e[o];if(void 0!==n)return n.exports;var r=e[o]={exports:{}};return t[o].call(r.exports,r,r.exports,a),r.exports}a.m=t,function(){a.amdO={}}(),function(){var t=[];a.O=function(e,o,n,r){if(!o){var i=1/0;for(p=0;p<t.length;p++){o=t[p][0],n=t[p][1],r=t[p][2];for(var l=!0,s=0;s<o.length;s++)(!1&r||i>=r)&&Object.keys(a.O).every((function(t){return a.O[t](o[s])}))?o.splice(s--,1):(l=!1,r<i&&(i=r));if(l){t.splice(p--,1);var c=n();void 0!==c&&(e=c)}}return e}r=r||0;for(var p=t.length;p>0&&t[p-1][2]>r;p--)t[p]=t[p-1];t[p]=[o,n,r]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){var t,e=Object.getPrototypeOf?function(t){return Object.getPrototypeOf(t)}:function(t){return t.__proto__};a.t=function(o,n){if(1&n&&(o=this(o)),8&n)return o;if("object"===typeof o&&o){if(4&n&&o.__esModule)return o;if(16&n&&"function"===typeof o.then)return o}var r=Object.create(null);a.r(r);var i={};t=t||[null,e({}),e([]),e(e)];for(var l=2&n&&o;"object"==typeof l&&!~t.indexOf(l);l=e(l))Object.getOwnPropertyNames(l).forEach((function(t){i[t]=function(){return o[t]}}));return i["default"]=function(){return o},a.d(r,i),r}}(),function(){a.d=function(t,e){for(var o in e)a.o(e,o)&&!a.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){a.f={},a.e=function(t){return Promise.all(Object.keys(a.f).reduce((function(e,o){return a.f[o](t,e),e}),[]))}}(),function(){a.u=function(t){return"js/"+t+"."+{30:"8106f35e",43:"e3b36cac",62:"9e45aaee",320:"6b33e3d5",401:"4ca90691",456:"29046296",481:"87ea1290",525:"0cf4869a",620:"04206498",716:"51ac5074",848:"af707aef",856:"bc2fd3f3",893:"3a3297d3",903:"ba7b5ad4",906:"451ecf38",951:"4c3fe634"}[t]+".js"}}(),function(){a.miniCssF=function(t){return"css/"+t+"."+{62:"685421f2",320:"1fc96fef",401:"5c4e0448",456:"efe8dd45",525:"9a4919a0",620:"841d40cc",716:"301acf65",848:"0f22819a",893:"a768519c",903:"b5c9f1d6",906:"fdb4288c",951:"bb28b9a5"}[t]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="parking_registration:";a.l=function(o,n,r,i){if(t[o])t[o].push(n);else{var l,s;if(void 0!==r)for(var c=document.getElementsByTagName("script"),p=0;p<c.length;p++){var u=c[p];if(u.getAttribute("src")==o||u.getAttribute("data-webpack")==e+r){l=u;break}}l||(s=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,a.nc&&l.setAttribute("nonce",a.nc),l.setAttribute("data-webpack",e+r),l.src=o),t[o]=[n];var m=function(e,a){l.onerror=l.onload=null,clearTimeout(d);var n=t[o];if(delete t[o],l.parentNode&&l.parentNode.removeChild(l),n&&n.forEach((function(t){return t(a)})),e)return e(a)},d=setTimeout(m.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=m.bind(null,l.onerror),l.onload=m.bind(null,l.onload),s&&document.head.appendChild(l)}}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){a.p=""}(),function(){var t=function(t,e,a,o,n){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var i=function(a){if(r.onerror=r.onload=null,"load"===a.type)o();else{var i=a&&("load"===a.type?"missing":a.type),l=a&&a.target&&a.target.href||e,s=new Error("Loading CSS chunk "+t+" failed.\n("+l+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=i,s.request=l,r.parentNode.removeChild(r),n(s)}};return r.onerror=r.onload=i,r.href=e,a?a.parentNode.insertBefore(r,a.nextSibling):document.head.appendChild(r),r},e=function(t,e){for(var a=document.getElementsByTagName("link"),o=0;o<a.length;o++){var n=a[o],r=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(r===t||r===e))return n}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){n=i[o],r=n.getAttribute("data-href");if(r===t||r===e)return n}},o=function(o){return new Promise((function(n,r){var i=a.miniCssF(o),l=a.p+i;if(e(i,l))return n();t(o,l,null,n,r)}))},n={143:0};a.f.miniCss=function(t,e){var a={62:1,320:1,401:1,456:1,525:1,620:1,716:1,848:1,893:1,903:1,906:1,951:1};n[t]?e.push(n[t]):0!==n[t]&&a[t]&&e.push(n[t]=o(t).then((function(){n[t]=0}),(function(e){throw delete n[t],e})))}}(),function(){var t={143:0};a.f.j=function(e,o){var n=a.o(t,e)?t[e]:void 0;if(0!==n)if(n)o.push(n[2]);else{var r=new Promise((function(a,o){n=t[e]=[a,o]}));o.push(n[2]=r);var i=a.p+a.u(e),l=new Error,s=function(o){if(a.o(t,e)&&(n=t[e],0!==n&&(t[e]=void 0),n)){var r=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",l.name="ChunkLoadError",l.type=r,l.request=i,n[1](l)}};a.l(i,s,"chunk-"+e,e)}},a.O.j=function(e){return 0===t[e]};var e=function(e,o){var n,r,i=o[0],l=o[1],s=o[2],c=0;if(i.some((function(e){return 0!==t[e]}))){for(n in l)a.o(l,n)&&(a.m[n]=l[n]);if(s)var p=s(a)}for(e&&e(o);c<i.length;c++)r=i[c],a.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return a.O(p)},o=self["webpackChunkparking_registration"]=self["webpackChunkparking_registration"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=a.O(void 0,[998],(function(){return a(6544)}));o=a.O(o)})();