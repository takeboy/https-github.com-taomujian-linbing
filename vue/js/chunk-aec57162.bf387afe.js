(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-aec57162"],{"008f":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Form",{ref:"NewtargetForm",attrs:{model:e.form,rules:e.rules},nativeOn:{submit:function(e){e.preventDefault()}}},[r("FormItem",{attrs:{prop:"target"}},[r("Input",{attrs:{type:"textarea",placeholder:"请输入目标,格式如10.0.0.1或http://xxx.com或10.0.0.0/24",clearable:""},model:{value:e.form.target,callback:function(t){e.$set(e.form,"target",t)},expression:"form.target"}},[r("span",{attrs:{slot:"prepend"},slot:"prepend"},[r("Icon",{attrs:{size:14,type:"ios-add-circle-outline"}})],1)])],1),r("FormItem",{attrs:{prop:"description"}},[r("Input",{attrs:{type:"textarea",placeholder:"请输入关于目标的描述",clearable:""},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}},[r("span",{attrs:{slot:"prepend"},slot:"prepend"},[r("Icon",{attrs:{size:14,type:"ios-add-circle-outline"}})],1)])],1),r("FormItem",[r("Button",{attrs:{type:"primary",long:""},on:{click:e.handleSubmit}},[e._v("确定")])],1)],1)},_=[],s=(r("28a5"),r("10fd")),i=(r("e0ac"),r("b1d0"),r("c276")),c={name:"NewtargetForm",props:{targetRules:{type:Array,default:function(){return[{required:!0,trigger:"blur",validator:s["d"],max:100}]}},descriptionRules:{type:Array,default:function(){return[{required:!1,trigger:"blur",max:100}]}}},data:function(){return{capta:"",form:{target:"",description:""}}},computed:{rules:function(){return{target:this.targetRules,description:this.descriptionRules}}},methods:{handleSubmit:function(){var e=this;this.$refs.NewtargetForm.validate(function(t){t&&(e.form.target=e.form.target.split(/[(\r\n)\r\n]+/).join(";"),e.$emit("on-success-valid",{target:e.form.target,description:e.form.description,token:Object(i["i"])()}))})}}},n=c,o=r("2877"),l=Object(o["a"])(n,a,_,!1,null,null,null),u=l.exports;t["a"]=u},"10fd":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",function(){return isemail}),__webpack_require__.d(__webpack_exports__,"e",function(){return isusername}),__webpack_require__.d(__webpack_exports__,"d",function(){return istarget}),__webpack_require__.d(__webpack_exports__,"f",function(){return loginusername}),__webpack_require__.d(__webpack_exports__,"a",function(){return ischecknum}),__webpack_require__.d(__webpack_exports__,"c",function(){return ispassword});var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("28a5"),core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_0__),_libs_http__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("b1d0"),_libs_crypto__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("e0ac"),_libs_util__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("c276");function isemail(rule,value,callback){var reg=/^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@.*?\.com$/;if(!reg.test(value.trim()))return callback(new Error("请输入合法邮箱"));var data={type:"email",data:value};data=JSON.stringify(data);var params={data:_libs_crypto__WEBPACK_IMPORTED_MODULE_2__["a"].Encrypt(data)};_libs_http__WEBPACK_IMPORTED_MODULE_1__["a"].post("/api/query",params).then(function(res){switch(res.data=eval("("+res.data+")"),res.data.code){case"Z1001":return callback(new Error("系统异常"));case"Z1002":return callback(new Error("请求方法异常"));case"Z1007":return callback(new Error("邮箱已注册"));default:callback()}})}function isusername(rule,value,callback){var reg=/^[A-Za-z0-9]{1,10}$/;if(!reg.test(value.trim()))return callback(new Error("用户名输入错误"));var data={type:"username",data:value};data=JSON.stringify(data);var params={data:_libs_crypto__WEBPACK_IMPORTED_MODULE_2__["a"].Encrypt(data)};_libs_http__WEBPACK_IMPORTED_MODULE_1__["a"].post("/api/query",params).then(function(res){switch(res.data=eval("("+res.data+")"),res.data.code){case"Z1001":return callback(new Error("系统异常"));case"Z1002":return callback(new Error("请求方法异常"));case"Z1006":return callback(new Error("用户名已注册"));default:callback()}})}function istarget(rule,value,callback){value=value.split(/[(\r\n)\r\n]+/);for(var i=0;i<value.length;i++){var data={type:"target",data:{data:value[i],token:Object(_libs_util__WEBPACK_IMPORTED_MODULE_3__["i"])()}};data=JSON.stringify(data);var params={data:_libs_crypto__WEBPACK_IMPORTED_MODULE_2__["a"].Encrypt(data)};_libs_http__WEBPACK_IMPORTED_MODULE_1__["a"].post("/api/query",params).then(function(res){switch(res.data=eval("("+res.data+")"),res.data.code){case"Z1001":return callback(new Error("系统异常"));case"Z1002":return callback(new Error("请求方法异常"));case"Z10010":return callback(new Error("目标已存在,请不要重复添加目标,如已删除请在垃圾箱内恢复"));default:callback()}})}}function loginusername(e,t,r){var a=/^[A-Za-z0-9]{1,10}$/;if(!a.test(t.trim()))return r(new Error("用户名输入错误"));r()}function ischecknum(e,t,r){var a=/^[A-Za-z0-9]{6}$/;if(!a.test(t.trim()))return r(new Error("注册码输入错误"));r()}function ispassword(e,t,r){var a=/^[A-Za-z0-9]{8,16}$/;if(!a.test(t.trim()))return r(new Error("密码输入错误"));r()}},"8a92":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"newtarget"},[r("div",{staticClass:"newtarget-con"},[r("Card",{staticClass:"card",attrs:{icon:"log-in",title:"添加目标",bordered:!1}},[r("div",{staticClass:"form-con"},[r("newtarget-form",{on:{"on-success-valid":e.handleSubmit}})],1)])],1)])},_=[],s=r("9906"),i=s["a"],c=(r("f82e"),r("2877")),n=Object(c["a"])(i,a,_,!1,null,null,null);t["default"]=n.exports},9906:function(module,__webpack_exports__,__webpack_require__){"use strict";var _c_newtarget_form__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("008f"),_libs_crypto__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("e0ac"),_libs_http__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("b1d0"),_store__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("4360");__webpack_exports__["a"]={components:{NewtargetForm:_c_newtarget_form__WEBPACK_IMPORTED_MODULE_0__["a"]},methods:{handleSubmit:function handleSubmit(_ref){var _this=this,target=_ref.target,description=_ref.description,token=_ref.token,data={target:target.trim(),description:description.trim(),token:token.trim()};data=JSON.stringify(data);var params={data:_libs_crypto__WEBPACK_IMPORTED_MODULE_1__["a"].Encrypt(data)};_libs_http__WEBPACK_IMPORTED_MODULE_2__["a"].post("/api/save",params).then(function(res){switch(res.data=eval("("+res.data+")"),res.data.code){case"Z1000":_this.$Notice.success({title:"添加成功",desc:"请稍后在目标列表中查看"}),setTimeout(function(){_this.$router.push({path:"/target/list"})},5e3);break;case"Z1001":_this.$Notice.error({title:"添加目标失败",desc:"系统发生异常,请稍后再次尝试"});break;case"Z1002":_this.$Notice.error({title:"添加目标失败",desc:"系统发生异常,请稍后再次尝试"});break;case"Z1004":_this.$Notice.error({title:"添加目标失败",desc:"认证失败,请稍后再次尝试"});break;case"Z1008":_this.$Notice.error({title:"添加目标失败",desc:"原密码错误,请重新输入密码再次尝试"});break;case"Z1020":_this.$Notice.error({title:"添加的目标无法解析,请重新输入",desc:"添加的目标无法解析,请重新输入"});break;default:break}})}}}},b2bc:function(e,t,r){},f82e:function(e,t,r){"use strict";var a=r("b2bc"),_=r.n(a);_.a}}]);