"use strict";(self.webpackChunkwingrow=self.webpackChunkwingrow||[]).push([[325],{7325:function(e,o,s){s.r(o),s.d(o,{default:function(){return v}});var n=s(4942),r=s(1413),t=s(9439),i=s(2791),a=s(7205),l=s(5017),c=s(4565),u=s(7689),g=s(1087),m=s(6457),d=s(1840),h=s(5985),p=(s(5462),s(184)),f=m.Z.getCurrentUser();function v(){(0,i.useEffect)((function(){f&&(m.Z.logout(),window.location.reload())}),[]);var e=(0,u.s0)(),o=(0,i.useState)(!1),s=(0,t.Z)(o,2),v=s[0],w=s[1],x=(0,i.useState)({phone:"",password:"hello"}),b=(0,t.Z)(x,2),C=b[0],j=b[1];return(0,p.jsxs)("div",{className:"authContainer",children:[(0,p.jsx)(h.Ix,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),(0,p.jsx)(h.Ix,{}),v?(0,p.jsx)(d.Z,{}):(0,p.jsxs)("div",{className:"authbox",children:[(0,p.jsx)("img",{className:"login_image",src:"./images/2.png",alt:"logo"}),(0,p.jsxs)("form",{onSubmit:function(o){o.preventDefault(),C.phone?(w(!0),m.Z.login(C.phone,C.password).then((function(o){"farmer"===o.role&&(h.Am.success("Login successful!",{position:"top-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),setTimeout((function(){e("/farmers"),window.location.reload()}),1e3)),"admin"===o.role&&(h.Am.success("Login successful!",{position:"top-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),setTimeout((function(){e("/admin"),window.location.reload()}),1e3)),"customer"===o.role&&(h.Am.success("Login successful!",{position:"top-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),setTimeout((function(){e("/customers"),window.location.reload()}),1e3)),w(!1)}),(function(e){console.log(e),h.Am.warn("Login failed",{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),j({phone:"",password:""}),w(!1)}))):h.Am.warn("data invalid",{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},className:"login_details",children:[(0,p.jsx)("img",{className:"form-logo",src:"./logo.png",alt:"form-logo"}),(0,p.jsx)(c.Z,{component:"h1",variant:"h5",children:"Welcome to Wingrowagritech"}),(0,p.jsx)(c.Z,{mt:2,component:"h1",variant:"h5",children:"Login here."}),(0,p.jsx)(l.Z,{inputlabelprops:{style:{fontSize:16,fontFamily:"monospace"}},margin:"normal",required:!0,fullWidth:!0,id:"phone",label:"Mobile Number",name:"phone",value:C.phone,autoComplete:"phone",autoFocus:!0,color:"success",className:"textfield",onChange:function(e){var o=e.target,s=o.name,t=o.value;j((function(e){return(0,r.Z)((0,r.Z)({},e),{},(0,n.Z)({},s,t))}))}}),(0,p.jsx)(g.rU,{className:"form-link",to:"/Forgot",variant:"body2",children:"Forgot your password?"}),(0,p.jsx)(a.Z,{className:"form-btn",type:"submit",color:"success",variant:"contained",size:"large",sx:{mt:3,mb:2},children:"Login"}),(0,p.jsxs)(c.Z,{className:"form-link",mt:2,children:["New to Wingrow?",(0,p.jsx)(g.rU,{to:"/Register",variant:"body2",className:"form-link signupWithUs",children:"Signup with us"})]})]})]})]})}},5462:function(){}}]);
//# sourceMappingURL=325.4febced0.chunk.js.map