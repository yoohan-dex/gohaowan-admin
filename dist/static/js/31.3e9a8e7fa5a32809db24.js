webpackJsonp([31],{HXAK:function(t,e,a){var r=a("WuIY");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("38fb2a0f",r,!0)},SpwM:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Xxa5"),o=a.n(r),n=a("exGp"),s=a.n(n),i=a("5aCZ"),c=a("quiT"),l={title:"",cover_image:"",content:"",share_text:""},m={name:"information-add",components:{Tinymce:i.a},data:function(){return{form:l}},methods:{handleCoverSuccess:function(t,e){this.form.cover_image="http://112.74.25.233:8004/"+t.data},reset:function(){this.form=l},onSubmit:function(){var t=this;return s()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.a.add(t.form);case 3:t.$message("发布成功"),e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}},e,t,[[0,6]])}))()}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-form",{ref:"form",attrs:{"label-width":"120px"}},[a("el-form-item",{attrs:{label:"标题"}},[a("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"封面图片"}},[a("el-upload",{staticClass:"cover-uploader",attrs:{action:"http://112.74.25.233:8004/store/activity/upload",name:"files[]","show-file-list":!1,"on-success":t.handleCoverSuccess}},[t.form.cover_image?a("img",{staticClass:"cover",attrs:{src:t.form.cover_image}}):a("i",{staticClass:"el-icon-plus cover-uploader-icon"}),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件")])])],1),t._v(" "),a("el-form-item",{attrs:{label:"微信分享描述"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},model:{value:t.form.share_text,callback:function(e){t.$set(t.form,"share_text",e)},expression:"form.share_text"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"资讯内容"}},[a("tinymce",{attrs:{height:400},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("立即添加")]),t._v(" "),a("el-button",{on:{click:t.reset}},[t._v("清空")])],1)],1)],1)},staticRenderFns:[]};var f=a("VU/8")(m,u,!1,function(t){a("HXAK")},"data-v-5d9da6a1",null);e.default=f.exports},WuIY:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.container[data-v-5d9da6a1] {\n  width: 80%;\n  min-width: 400px;\n  margin: 0 auto;\n  padding-top: 50px;\n}\n",""])}});