(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-087fa5ca"],{"0f6f":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Card",[a("Table",{attrs:{border:"",editable:"",searchable:"","search-place":"top",data:e.tableData,columns:e.columns}}),a("Page",{staticClass:"page",attrs:{current:this.page.pageNum,"page-size":this.page.pageSize,total:this.page.count,"page-size-opts":[10,20],"show-sizer":"","show-elevator":"","show-total":""},on:{"on-change":e.handlePage,"on-page-size-change":e.handlePageSize}})],1)],1)},r=[],i=a("f465"),_=i["a"],o=(a("30e9"),a("2877")),n=Object(o["a"])(_,s,r,!1,null,null,null);t["default"]=n.exports},"30e9":function(e,t,a){"use strict";var s=a("b25b"),r=a.n(s);r.a},b25b:function(e,t,a){},f465:function(module,__webpack_exports__,__webpack_require__){"use strict";var _libs_crypto__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("e0ac"),_libs_http__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("b1d0"),_libs_util__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("c276");__webpack_exports__["a"]={inject:["reload"],name:"tables_page",data:function(){var e=this;return{token:Object(_libs_util__WEBPACK_IMPORTED_MODULE_2__["i"])(),page:{pageNum:1,pageSize:10,count:0},columns:[{title:"目标",key:"target",sortable:!0,resizable:!0,width:150},{title:"描述",key:"description",sortable:!0,resizable:!0,width:290},{title:"创建时间",key:"create_time",resizable:!0,width:260},{title:"漏洞数量",key:"vulner_number",resizable:!0,width:150},{title:"扫描状态",key:"scan_schedule",resizable:!0,width:150},{title:"操作",key:"action",width:350,resizable:!0,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"primary",size:"small"},style:{marginRight:"10px"},on:{click:function(){e.scan(a)}}},"开始扫描"),t("Button",{props:{type:"primary",size:"small"},style:{marginRight:"10px"},on:{click:function(){e.scan_set(a)}}},"扫描设置"),t("Button",{props:{type:"primary",size:"small"},style:{marginRight:"10px"},on:{click:function(){e.show(a)}}},"漏洞详情"),t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.remove(a)}}},"删除")])}}],tableData:[]}},created:function(){var e=this;sessionStorage.getItem("store")&&this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store")))),window.addEventListener("beforeunload",function(){sessionStorage.setItem("store",JSON.stringify(e.$store.state))})},methods:{getTableData:function getTableData(){var _this3=this,data={pagenum:this.page.pageNum,pagesize:this.page.pageSize,flag:"0",token:this.token.trim()};data=JSON.stringify(data);var params={data:_libs_crypto__WEBPACK_IMPORTED_MODULE_0__["a"].Encrypt(data)};_libs_http__WEBPACK_IMPORTED_MODULE_1__["a"].post("/api/targetlist",params).then(function(res){switch(res.data=eval("("+res.data+")"),res.data.code){case"Z1000":""!==res.data.data.result&&(_this3.tableData=res.data.data.result),_this3.page.count=res.data.data.total;break;case"Z1001":_this3.$Notice.error({title:"获取数据失败",desc:"系统发生异常,请稍后再次尝试"});break;case"Z1002":_this3.$Notice.error({title:"获取数据失败",desc:"系统发生异常,请稍后再次尝试"});break;case"Z1004":_this3.$Notice.error({title:"获取数据失败",desc:"认证失败,请稍后再次尝试"});break;case"Z1009":_this3.$Notice.info({title:"数据为空",desc:"数据为空,请新建笔记"});break;default:break}})},scan:function scan(params){var _this4=this,data={target:params.row.target,description:params.row.description,token:this.token.trim()};data=JSON.stringify(data);var req_params={data:_libs_crypto__WEBPACK_IMPORTED_MODULE_0__["a"].Encrypt(data)};_libs_http__WEBPACK_IMPORTED_MODULE_1__["a"].post("/api/scan",req_params).then(function(res){switch(res.data=eval("("+res.data+")"),res.data.code){case"Z1000":_this4.$Notice.success({title:"已开始扫描",desc:"请稍后在扫描列表中查看"}),setTimeout(function(){_this4.$router.push({path:"/scan/list"})},5e3);break;case"Z1001":_this4.$Notice.error({title:"请求失败",desc:"系统发生异常,请稍后再次尝试"});break;case"Z1002":_this4.$Notice.error({title:"请求失败",desc:"系统发生异常,请稍后再次尝试"});break;case"Z1004":_this4.$Notice.error({title:"请求失败",desc:"认证失败,请稍后再次尝试"});break;case"Z1020":_this4.$Notice.error({title:"请求失败",desc:"添加的目标无法解析,请重新输入"});break;default:break}})},show:function(e){this.$router.push({name:"漏洞详情",query:{params:e["row"]["target"]}})},scan_set:function(e){this.$router.push({name:"扫描设置",query:{params:e["row"]["target"]}})},remove:function remove(params){var _this5=this,flag={type:"target",data:"1"},data={target:params.row.target,flag:flag,token:this.token.trim()};data=JSON.stringify(data);var req_params={data:_libs_crypto__WEBPACK_IMPORTED_MODULE_0__["a"].Encrypt(data)};_libs_http__WEBPACK_IMPORTED_MODULE_1__["a"].post("/api/setflag",req_params).then(function(res){switch(res.data=eval("("+res.data+")"),res.data.code){case"Z1000":_this5.reload();break;case"Z1001":_this5.$Notice.error({title:"请求失败",desc:"系统发生异常,请稍后再次尝试"});break;case"Z1002":_this5.$Notice.error({title:"请求失败",desc:"系统发生异常,请稍后再次尝试"});break;case"Z1004":_this5.$Notice.error({title:"请求失败",desc:"认证失败,请稍后再次尝试"});break;default:break}})},handlePage:function(e){this.page.pageNum=e,this.getTableData()},handlePageSize:function(e){this.page.pageSize=e,this.getTableData()}},mounted:function(){this.getTableData()}}}}]);