webpackJsonp([21],{"5TKe":function(e,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=n("fZjL"),t=n.n(a),p=n("pFYg"),o=n.n(p),r=n("woOf"),c=n.n(r);var s=n("vLgD"),v={zh:{hint:"点击，或拖动图片至此处",loading:"正在上传……",noSupported:"浏览器不支持该功能，请使用IE10以上或其他现在浏览器！",success:"上传成功",fail:"图片上传失败",preview:"头像预览",btn:{off:"取消",close:"关闭",back:"上一步",save:"保存"},error:{onlyImg:"仅限图片格式",outOfSize:"单文件大小不能超过 ",lowestPx:"图片最低像素为（宽*高）："}},en:{hint:"Click, or drag the file here",loading:"Uploading……",noSupported:"Browser does not support, please use IE10+ or other browsers",success:"Upload success",fail:"Upload failed",preview:"Preview",btn:{off:"Cancel",close:"Close",back:"Back",save:"Save"},error:{onlyImg:"Image only",outOfSize:"Image exceeds size limit: ",lowestPx:"The lowest pixel in the image: "}}},d="image/jpeg",l={props:{field:{type:String,default:"avatar"},url:{type:String,default:""},params:{type:Object,default:null},width:{type:Number,default:200},height:{type:Number,default:200},noCircle:{type:Boolean,default:!1},maxSize:{type:Number,default:10240},langType:{type:String,default:"zh"}},data:function(){var e=this.langType,i=this.width,n=this.height,a=!0,t=v[e]?v[e]:t.zh;return"function"!=typeof FormData&&(a=!1),{show:!0,mime:d,lang:t,isSupported:a,step:1,loading:0,progress:0,hasError:!1,errorMsg:"",ratio:i/n,sourceImg:null,sourceImgUrl:"",createImgUrl:"",sourceImgMouseDown:{on:!1,mX:0,mY:0,x:0,y:0},previewContainer:{width:100,height:100},sourceImgContainer:{width:240,height:180},scale:{zoomAddOn:!1,zoomSubOn:!1,range:1,x:0,y:0,width:0,height:0,maxWidth:0,maxHeight:0,minWidth:0,minHeight:0,naturalWidth:0,naturalHeight:0}}},computed:{progressStyle:function(){return{width:this.progress+"%"}},sourceImgStyle:function(){var e=this.scale,i=this.sourceImgMasking;return{top:e.y+i.y+"px",left:e.x+i.x+"px",width:e.width+"px",height:e.height+"px"}},sourceImgMasking:function(){var e=this.width,i=this.height,n=this.ratio,a=this.sourceImgContainer,t=a.width/a.height,p=0,o=0,r=a.width,c=a.height,s=1;return n<t&&(s=a.height/i,r=a.height*n,p=(a.width-r)/2),n>t&&(s=a.width/e,c=a.width/n,o=(a.height-c)/2),{scale:s,x:p,y:o,width:r,height:c}},sourceImgShadeStyle:function(){var e=this.sourceImgContainer,i=this.sourceImgMasking;return{width:(i.width==e.width?i.width:(e.width-i.width)/2)+"px",height:(i.height==e.height?i.height:(e.height-i.height)/2)+"px"}},previewStyle:function(){this.width,this.height;var e=this.ratio,i=this.previewContainer,n=i.width,a=i.height,t=n/a;return e<t&&(n=i.height*e),e>t&&(a=i.width/e),{width:n+"px",height:a+"px"}}},methods:{ripple:function(e){!function(e,i){var n=c()({ele:e.target,type:"hit",bgc:"rgba(0, 0, 0, 0.15)"},i),a=n.ele;if(a){var t=a.getBoundingClientRect(),p=a.querySelector(".e-ripple");switch(p?p.className="e-ripple":((p=document.createElement("span")).className="e-ripple",p.style.height=p.style.width=Math.max(t.width,t.height)+"px",a.appendChild(p)),n.type){case"center":p.style.top=t.height/2-p.offsetHeight/2+"px",p.style.left=t.width/2-p.offsetWidth/2+"px";break;default:p.style.top=e.pageY-t.top-p.offsetHeight/2-document.body.scrollTop+"px",p.style.left=e.pageX-t.left-p.offsetWidth/2-document.body.scrollLeft+"px"}p.style.backgroundColor=n.bgc,p.className="e-ripple z-active"}}(e)},off:function(){this.show=!1,this.$emit("close")},setStep:function(e){var i=this;setTimeout(function(){i.step=e},200)},preventDefault:function(e){return e.preventDefault(),!1},handleClick:function(e){1!==this.loading&&e.target!==this.$refs.fileinput&&(e.preventDefault(),document.activeElement!==this.$refs&&this.$refs.fileinput.click())},handleChange:function(e){if(e.preventDefault(),1!==this.loading){var i=e.target.files||e.dataTransfer.files;this.reset(),this.checkFile(i[0])&&this.setSourceImg(i[0])}},checkFile:function(e){var i=this.lang,n=this.maxSize;return-1===e.type.indexOf("image")?(this.hasError=!0,this.errorMsg=i.error.onlyImg,!1):(this.mime=e.type,!(e.size/1024>n)||(this.hasError=!0,this.errorMsg=i.error.outOfSize+n+"kb",!1))},reset:function(){this.step=1,this.loading=0,this.hasError=!1,this.errorMsg="",this.progress=0},setSourceImg:function(e){var i=this,n=new FileReader;n.onload=function(e){i.sourceImgUrl=n.result,i.startCrop()},n.readAsDataURL(e)},startCrop:function(){var e=this,i=(e.width,e.height,e.ratio),n=e.scale,a=e.sourceImgUrl,t=e.sourceImgMasking,p=(e.lang,t),o=new Image;o.src=a,o.onload=function(){var a=o.naturalWidth,t=o.naturalHeight,r=a/t,c=p.width,s=p.height,v=0,d=0;i>r&&(s=c/r,d=(p.height-s)/2),i<r&&(c=s*r,v=(p.width-c)/2),n.range=0,n.x=v,n.y=d,n.width=c,n.height=s,n.minWidth=c,n.minHeight=s,n.maxWidth=a*p.scale,n.maxHeight=t*p.scale,n.naturalWidth=a,n.naturalHeight=t,e.sourceImg=o,e.createImg(),e.setStep(2)}},imgStartMove:function(e){var i=this.sourceImgMouseDown,n=this.scale,a=i;a.mX=e.screenX,a.mY=e.screenY,a.x=n.x,a.y=n.y,a.on=!0},imgMove:function(e){var i=this.sourceImgMouseDown,n=i.on,a=i.mX,t=i.mY,p=i.x,o=i.y,r=this.scale,c=this.sourceImgMasking,s=p+(e.screenX-a),v=o+(e.screenY-t);n&&(s>0&&(s=0),v>0&&(v=0),s<c.width-r.width&&(s=c.width-r.width),v<c.height-r.height&&(v=c.height-r.height),r.x=s,r.y=v)},startZoomAdd:function(e){var i=this,n=i.scale;n.zoomAddOn=!0;function a(){if(n.zoomAddOn){var e=n.range>=100?100:++n.range;i.zoomImg(e),setTimeout(function(){a()},60)}}a()},endZoomAdd:function(e){this.scale.zoomAddOn=!1},startZoomSub:function(e){var i=this,n=i.scale;n.zoomSubOn=!0;function a(){if(n.zoomSubOn){var e=n.range<=0?0:--n.range;i.zoomImg(e),setTimeout(function(){a()},60)}}a()},endZoomSub:function(e){this.scale.zoomSubOn=!1},zoomChange:function(e){this.zoomImg(e.target.value)},zoomImg:function(e){var i=this,n=this.sourceImgMasking,a=(this.sourceImgMouseDown,this.scale),t=a.maxWidth,p=a.maxHeight,o=a.minWidth,r=a.minHeight,c=a.width,s=a.height,v=a.x,d=a.y,l=(a.range,n),g=l.width,u=l.height,h=o+(t-o)*e/100,m=r+(p-r)*e/100,f=g/2-h/c*(g/2-v),w=u/2-m/s*(u/2-d);f>0&&(f=0),w>0&&(w=0),f<g-h&&(f=g-h),w<u-m&&(w=u-m),a.x=f,a.y=w,a.width=h,a.height=m,a.range=e,setTimeout(function(){a.range==e&&i.createImg()},300)},createImg:function(e){var i=this.mime,n=this.sourceImg,a=this.scale,t=a.x,p=a.y,o=a.width,r=a.height,c=this.sourceImgMasking.scale,s=this.$refs.canvas,v=s.getContext("2d");e&&(this.sourceImgMouseDown.on=!1),v.drawImage(n,t/c,p/c,o/c,r/c),this.createImgUrl=s.toDataURL(i)},upload:function(){var e=this,i=this.lang,n=this.imgFormat,a=this.mime,p=this.url,r=this.params,c=(this.headers,this.field),v=this.ki,d=this.createImgUrl,l=new FormData;l.append(c,function(e,i){e=e.split(",")[1],e=window.atob(e);for(var n=new Uint8Array(e.length),a=0;a<e.length;a++)n[a]=e.charCodeAt(a);return new Blob([n],{type:i})}(d,a),c+"."+n),"object"==(void 0===r?"undefined":o()(r))&&r&&t()(r).forEach(function(e){l.append(e,r[e])});e.reset(),e.loading=1,e.setStep(3),e.$emit("crop-success",d,c,v),Object(s.a)({url:p,method:"post",data:l}).then(function(i){e.loading=2,e.$emit("crop-upload-success",i.data)}).catch(function(n){e.value&&(e.loading=3,e.hasError=!0,e.errorMsg=i.fail,e.$emit("crop-upload-fail",n,c,v))})}}},g={render:function(){var e=this,i=e.$createElement,n=e._self._c||i;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"vue-image-crop-upload"},[n("div",{staticClass:"vicp-wrap"},[n("div",{staticClass:"vicp-close",on:{click:e.off}},[n("i",{staticClass:"vicp-icon4"})]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:1==e.step,expression:"step == 1"}],staticClass:"vicp-step1"},[n("div",{staticClass:"vicp-drop-area",on:{dragleave:e.preventDefault,dragover:e.preventDefault,dragenter:e.preventDefault,click:e.handleClick,drop:e.handleChange}},[n("i",{directives:[{name:"show",rawName:"v-show",value:1!=e.loading,expression:"loading != 1"}],staticClass:"vicp-icon1"},[n("i",{staticClass:"vicp-icon1-arrow"}),e._v(" "),n("i",{staticClass:"vicp-icon1-body"}),e._v(" "),n("i",{staticClass:"vicp-icon1-bottom"})]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:1!==e.loading,expression:"loading !== 1"}],staticClass:"vicp-hint"},[e._v(e._s(e.lang.hint))]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!e.isSupported,expression:"!isSupported"}],staticClass:"vicp-no-supported-hint"},[e._v(e._s(e.lang.noSupported))]),e._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"fileinput",attrs:{type:"file"},on:{change:e.handleChange}})]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"vicp-error"},[n("i",{staticClass:"vicp-icon2"}),e._v(" "+e._s(e.errorMsg)+"\n            ")]),e._v(" "),n("div",{staticClass:"vicp-operate"},[n("a",{on:{click:e.off,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.off))])])]),e._v(" "),2==e.step?n("div",{staticClass:"vicp-step2"},[n("div",{staticClass:"vicp-crop"},[n("div",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"vicp-crop-left"},[n("div",{staticClass:"vicp-img-container"},[n("img",{ref:"img",staticClass:"vicp-img",style:e.sourceImgStyle,attrs:{src:e.sourceImgUrl,draggable:"false"},on:{drag:e.preventDefault,dragstart:e.preventDefault,dragend:e.preventDefault,dragleave:e.preventDefault,dragover:e.preventDefault,dragenter:e.preventDefault,drop:e.preventDefault,mousedown:e.imgStartMove,mousemove:e.imgMove,mouseup:e.createImg,mouseout:e.createImg}}),e._v(" "),n("div",{staticClass:"vicp-img-shade vicp-img-shade-1",style:e.sourceImgShadeStyle}),e._v(" "),n("div",{staticClass:"vicp-img-shade vicp-img-shade-2",style:e.sourceImgShadeStyle})]),e._v(" "),n("div",{staticClass:"vicp-range"},[n("input",{attrs:{type:"range",step:"1",min:"0",max:"100"},domProps:{value:e.scale.range},on:{change:e.zoomChange}}),e._v(" "),n("i",{staticClass:"vicp-icon5",on:{mousedown:e.startZoomSub,mouseout:e.endZoomSub,mouseup:e.endZoomSub}}),e._v(" "),n("i",{staticClass:"vicp-icon6",on:{mousedown:e.startZoomAdd,mouseout:e.endZoomAdd,mouseup:e.endZoomAdd}})])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"vicp-crop-right"},[n("div",{staticClass:"vicp-preview"},[n("div",{staticClass:"vicp-preview-item"},[n("img",{style:e.previewStyle,attrs:{src:e.createImgUrl}}),e._v(" "),n("span",[e._v(e._s(e.lang.preview))])]),e._v(" "),n("div",{staticClass:"vicp-preview-item"},[e.noCircle?e._e():n("img",{style:e.previewStyle,attrs:{src:e.createImgUrl}}),e._v(" "),n("span",[e._v(e._s(e.lang.preview))])])])])]),e._v(" "),n("div",{staticClass:"vicp-operate"},[n("a",{on:{click:function(i){e.setStep(1)},mousedown:e.ripple}},[e._v(e._s(e.lang.btn.back))]),e._v(" "),n("a",{staticClass:"vicp-operate-btn",on:{click:e.upload,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.save))])])]):e._e(),e._v(" "),3==e.step?n("div",{staticClass:"vicp-step3"},[n("div",{staticClass:"vicp-upload"},[n("span",{directives:[{name:"show",rawName:"v-show",value:1===e.loading,expression:"loading === 1"}],staticClass:"vicp-loading"},[e._v(e._s(e.lang.loading))]),e._v(" "),n("div",{staticClass:"vicp-progress-wrap"},[n("span",{directives:[{name:"show",rawName:"v-show",value:1===e.loading,expression:"loading === 1"}],staticClass:"vicp-progress",style:e.progressStyle})]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"vicp-error"},[n("i",{staticClass:"vicp-icon2"}),e._v(" "+e._s(e.errorMsg)+"\n                ")]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:2===e.loading,expression:"loading === 2"}],staticClass:"vicp-success"},[n("i",{staticClass:"vicp-icon3"}),e._v(" "+e._s(e.lang.success)+"\n                ")])]),e._v(" "),n("div",{staticClass:"vicp-operate"},[n("a",{on:{click:function(i){e.setStep(2)},mousedown:e.ripple}},[e._v(e._s(e.lang.btn.back))]),e._v(" "),n("a",{on:{click:e.off,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.close))])])]):e._e(),e._v(" "),n("canvas",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"canvas",attrs:{width:e.width,height:e.height}})])])},staticRenderFns:[]};var u={name:"avatarUpload-demo",components:{ImageCropper:n("VU/8")(l,g,!1,function(e){n("pVgZ")},"data-v-30f57684",null).exports,PanThumb:n("kCe2").a},data:function(){return{imagecropperShow:!1,imagecropperKey:0,image:"https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191"}},methods:{cropSuccess:function(e){this.imagecropperShow=!1,this.imagecropperKey=this.imagecropperKey+1,this.image=e.files.avatar},close:function(){this.imagecropperShow=!1}}},h={render:function(){var e=this,i=e.$createElement,n=e._self._c||i;return n("div",{staticClass:"components-container"},[e._m(0),e._v(" "),n("pan-thumb",{attrs:{image:e.image}}),e._v(" "),n("el-button",{staticStyle:{position:"absolute",bottom:"15px","margin-left":"40px"},attrs:{type:"primary",icon:"upload"},on:{click:function(i){e.imagecropperShow=!0}}},[e._v("修改头像\n  ")]),e._v(" "),n("image-cropper",{directives:[{name:"show",rawName:"v-show",value:e.imagecropperShow,expression:"imagecropperShow"}],key:e.imagecropperKey,attrs:{width:300,height:300,url:"https://httpbin.org/post"},on:{close:e.close,"crop-upload-success":e.cropSuccess}})],1)},staticRenderFns:[function(){var e=this.$createElement,i=this._self._c||e;return i("code",[this._v("这里核心代码用的是\n    "),i("a",{staticClass:"link-type",attrs:{href:"//github.com/dai-siki/vue-image-crop-upload"}},[this._v(" vue-image-crop-upload")]),this._v("\n    由于我在使用时它只有vue@1版本，而且有些业务的需求耦合到七牛等等原因吧，自己改造了一下，如果大家要使用的话，优先还是使用官方component\n  ")])}]};var m=n("VU/8")(u,h,!1,function(e){n("ERRE")},"data-v-21fb1be4",null);i.default=m.exports},ERRE:function(e,i,n){var a=n("iOvU");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("3601c79b",a,!0)},iOvU:function(e,i,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n.avatar[data-v-21fb1be4]{\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n}\n",""])},nxjB:function(e,i,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n@charset \"UTF-8\";\n@-webkit-keyframes vicp_progress-data-v-30f57684 {\n0% {\n        background-position-y: 0;\n}\n100% {\n        background-position-y: 40px;\n}\n}\n@keyframes vicp_progress-data-v-30f57684 {\n0% {\n        background-position-y: 0;\n}\n100% {\n        background-position-y: 40px;\n}\n}\n@-webkit-keyframes vicp-data-v-30f57684 {\n0% {\n        opacity: 0;\n        -webkit-transform: scale(0) translatey(-60px);\n        transform: scale(0) translatey(-60px);\n}\n100% {\n        opacity: 1;\n        -webkit-transform: scale(1) translatey(0);\n        transform: scale(1) translatey(0);\n}\n}\n@keyframes vicp-data-v-30f57684 {\n0% {\n        opacity: 0;\n        -webkit-transform: scale(0) translatey(-60px);\n        transform: scale(0) translatey(-60px);\n}\n100% {\n        opacity: 1;\n        -webkit-transform: scale(1) translatey(0);\n        transform: scale(1) translatey(0);\n}\n}\n.vue-image-crop-upload[data-v-30f57684] {\n    position: fixed;\n    display: block;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    z-index: 10000;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.65);\n    -webkit-tap-highlight-color: transparent;\n    -moz-tap-highlight-color: transparent;\n}\n.vue-image-crop-upload .vicp-wrap[data-v-30f57684] {\n    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\n    position: fixed;\n    display: block;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    z-index: 10000;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: auto;\n    width: 600px;\n    height: 330px;\n    padding: 25px;\n    background-color: #fff;\n    border-radius: 2px;\n    -webkit-animation: vicp-data-v-30f57684 0.12s ease-in;\n    animation: vicp-data-v-30f57684 0.12s ease-in;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-close[data-v-30f57684] {\n    position: absolute;\n    right: -30px;\n    top: -30px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4[data-v-30f57684] {\n    position: relative;\n    display: block;\n    width: 30px;\n    height: 30px;\n    cursor: pointer;\n    -webkit-transition: -webkit-transform 0.18s;\n    transition: -webkit-transform 0.18s;\n    transition: transform 0.18s;\n    transition: transform 0.18s, -webkit-transform 0.18s;\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4[data-v-30f57684]::after, .vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4[data-v-30f57684]::before {\n    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\n    content: '';\n    position: absolute;\n    top: 12px;\n    left: 4px;\n    width: 20px;\n    height: 3px;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n    background-color: #fff;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4[data-v-30f57684]::after {\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4[data-v-30f57684]:hover {\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area[data-v-30f57684] {\n    position: relative;\n    padding: 35px;\n    height: 200px;\n    background-color: rgba(0, 0, 0, 0.03);\n    text-align: center;\n    border: 1px dashed rgba(0, 0, 0, 0.08);\n    overflow: hidden;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1[data-v-30f57684] {\n    display: block;\n    margin: 0 auto 6px;\n    width: 42px;\n    height: 42px;\n    overflow: hidden;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 .vicp-icon1-arrow[data-v-30f57684] {\n    display: block;\n    margin: 0 auto;\n    width: 0;\n    height: 0;\n    border-bottom: 14.7px solid rgba(0, 0, 0, 0.3);\n    border-left: 14.7px solid transparent;\n    border-right: 14.7px solid transparent;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 .vicp-icon1-body[data-v-30f57684] {\n    display: block;\n    width: 12.6px;\n    height: 14.7px;\n    margin: 0 auto;\n    background-color: rgba(0, 0, 0, 0.3);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 .vicp-icon1-bottom[data-v-30f57684] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    display: block;\n    height: 12.6px;\n    border: 6px solid rgba(0, 0, 0, 0.3);\n    border-top: none;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-hint[data-v-30f57684] {\n    display: block;\n    padding: 15px;\n    font-size: 14px;\n    color: #666;\n    line-height: 30px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-no-supported-hint[data-v-30f57684] {\n    display: block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    padding: 30px;\n    width: 100%;\n    height: 60px;\n    line-height: 30px;\n    background-color: #eee;\n    text-align: center;\n    color: #666;\n    font-size: 14px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area[data-v-30f57684]:hover {\n    cursor: pointer;\n    border-color: rgba(0, 0, 0, 0.1);\n    background-color: rgba(0, 0, 0, 0.05);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop[data-v-30f57684] {\n    overflow: hidden;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left[data-v-30f57684] {\n    float: left;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container[data-v-30f57684] {\n    position: relative;\n    display: block;\n    width: 240px;\n    height: 180px;\n    background-color: #e5e5e0;\n    overflow: hidden;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img[data-v-30f57684] {\n    position: absolute;\n    display: block;\n    cursor: move;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade[data-v-30f57684] {\n    -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);\n    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);\n    position: absolute;\n    background-color: rgba(241, 242, 243, 0.8);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade.vicp-img-shade-1[data-v-30f57684] {\n    top: 0;\n    left: 0;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade.vicp-img-shade-2[data-v-30f57684] {\n    bottom: 0;\n    right: 0;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range[data-v-30f57684] {\n    position: relative;\n    margin: 30px 0;\n    width: 240px;\n    height: 18px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5[data-v-30f57684],\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6[data-v-30f57684] {\n    position: absolute;\n    top: 0;\n    width: 18px;\n    height: 18px;\n    border-radius: 100%;\n    background-color: rgba(0, 0, 0, 0.08);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5[data-v-30f57684]:hover,\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6[data-v-30f57684]:hover {\n    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\n    cursor: pointer;\n    background-color: rgba(0, 0, 0, 0.14);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5[data-v-30f57684] {\n    left: 0;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5[data-v-30f57684]::before {\n    position: absolute;\n    content: '';\n    display: block;\n    left: 3px;\n    top: 8px;\n    width: 12px;\n    height: 2px;\n    background-color: #fff;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6[data-v-30f57684] {\n    right: 0;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6[data-v-30f57684]::before {\n    position: absolute;\n    content: '';\n    display: block;\n    left: 3px;\n    top: 8px;\n    width: 12px;\n    height: 2px;\n    background-color: #fff;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6[data-v-30f57684]::after {\n    position: absolute;\n    content: '';\n    display: block;\n    top: 3px;\n    left: 8px;\n    width: 2px;\n    height: 12px;\n    background-color: #fff;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684] {\n    display: block;\n    padding-top: 5px;\n    margin: 0 auto;\n    width: 180px;\n    height: 8px;\n    vertical-align: top;\n    background: transparent;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    cursor: pointer;\n    /* 滑块\n                     ---------------------------------------------------------------*/\n    /* 轨道\n                     ---------------------------------------------------------------*/\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]:focus {\n    outline: none;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]::-webkit-slider-thumb {\n    -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);\n    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);\n    -webkit-appearance: none;\n    appearance: none;\n    margin-top: -3px;\n    width: 12px;\n    height: 12px;\n    background-color: #61c091;\n    border-radius: 100%;\n    border: none;\n    -webkit-transition: 0.2s;\n    transition: 0.2s;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]::-moz-range-thumb {\n    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);\n    -moz-appearance: none;\n    appearance: none;\n    width: 12px;\n    height: 12px;\n    background-color: #61c091;\n    border-radius: 100%;\n    border: none;\n    -webkit-transition: 0.2s;\n    transition: 0.2s;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]::-ms-thumb {\n    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);\n    appearance: none;\n    width: 12px;\n    height: 12px;\n    background-color: #61c091;\n    border: none;\n    border-radius: 100%;\n    -webkit-transition: 0.2s;\n    transition: 0.2s;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]:active::-moz-range-thumb {\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\n    width: 14px;\n    height: 14px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]:active::-ms-thumb {\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\n    width: 14px;\n    height: 14px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]:active::-webkit-slider-thumb {\n    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);\n    margin-top: -4px;\n    width: 14px;\n    height: 14px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]::-webkit-slider-runnable-track {\n    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\n    width: 100%;\n    height: 6px;\n    cursor: pointer;\n    border-radius: 2px;\n    border: none;\n    background-color: rgba(68, 170, 119, 0.3);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]::-moz-range-track {\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\n    width: 100%;\n    height: 6px;\n    cursor: pointer;\n    border-radius: 2px;\n    border: none;\n    background-color: rgba(68, 170, 119, 0.3);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]::-ms-track {\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);\n    width: 100%;\n    cursor: pointer;\n    background: transparent;\n    border-color: transparent;\n    color: transparent;\n    height: 6px;\n    border-radius: 2px;\n    border: none;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]::-ms-fill-lower {\n    background-color: rgba(68, 170, 119, 0.3);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]::-ms-fill-upper {\n    background-color: rgba(68, 170, 119, 0.15);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]:focus::-webkit-slider-runnable-track {\n    background-color: rgba(68, 170, 119, 0.5);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]:focus::-moz-range-track {\n    background-color: rgba(68, 170, 119, 0.5);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]:focus::-ms-fill-lower {\n    background-color: rgba(68, 170, 119, 0.45);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range][data-v-30f57684]:focus::-ms-fill-upper {\n    background-color: rgba(68, 170, 119, 0.25);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right[data-v-30f57684] {\n    float: right;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview[data-v-30f57684] {\n    height: 150px;\n    overflow: hidden;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item[data-v-30f57684] {\n    position: relative;\n    padding: 5px;\n    width: 100px;\n    height: 100px;\n    float: left;\n    margin-right: 16px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item span[data-v-30f57684] {\n    position: absolute;\n    bottom: -30px;\n    width: 100%;\n    font-size: 14px;\n    color: #bbb;\n    display: block;\n    text-align: center;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item img[data-v-30f57684] {\n    position: absolute;\n    display: block;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: auto;\n    padding: 3px;\n    background-color: #fff;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    overflow: hidden;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item[data-v-30f57684]:last-child {\n    margin-right: 0;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item:last-child img[data-v-30f57684] {\n    border-radius: 100%;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload[data-v-30f57684] {\n    position: relative;\n    padding: 35px;\n    height: 200px;\n    background-color: rgba(0, 0, 0, 0.03);\n    text-align: center;\n    border: 1px dashed #ddd;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-loading[data-v-30f57684] {\n    display: block;\n    padding: 15px;\n    font-size: 16px;\n    color: #999;\n    line-height: 30px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap[data-v-30f57684] {\n    margin-top: 12px;\n    background-color: rgba(0, 0, 0, 0.08);\n    border-radius: 3px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap .vicp-progress[data-v-30f57684] {\n    position: relative;\n    display: block;\n    height: 5px;\n    border-radius: 3px;\n    background-color: #4a7;\n    -webkit-box-shadow: 0 2px 6px 0 rgba(68, 170, 119, 0.3);\n    box-shadow: 0 2px 6px 0 rgba(68, 170, 119, 0.3);\n    -webkit-transition: width 0.15s linear;\n    transition: width 0.15s linear;\n    background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);\n    background-size: 40px 40px;\n    -webkit-animation: vicp_progress-data-v-30f57684 0.5s linear infinite;\n    animation: vicp_progress-data-v-30f57684 0.5s linear infinite;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap .vicp-progress[data-v-30f57684]::after {\n    content: '';\n    position: absolute;\n    display: block;\n    top: -3px;\n    right: -3px;\n    width: 9px;\n    height: 9px;\n    border: 1px solid rgba(245, 246, 247, 0.7);\n    -webkit-box-shadow: 0 1px 4px 0 rgba(68, 170, 119, 0.7);\n    box-shadow: 0 1px 4px 0 rgba(68, 170, 119, 0.7);\n    border-radius: 100%;\n    background-color: #4a7;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-error[data-v-30f57684],\n.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-success[data-v-30f57684] {\n    height: 100px;\n    line-height: 100px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-operate[data-v-30f57684] {\n    position: absolute;\n    right: 20px;\n    bottom: 20px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-operate a[data-v-30f57684] {\n    position: relative;\n    float: left;\n    display: block;\n    margin-left: 10px;\n    width: 100px;\n    height: 36px;\n    line-height: 36px;\n    text-align: center;\n    cursor: pointer;\n    font-size: 14px;\n    color: #4a7;\n    border-radius: 2px;\n    overflow: hidden;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-operate a[data-v-30f57684]:hover {\n    background-color: rgba(0, 0, 0, 0.03);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-error[data-v-30f57684],\n.vue-image-crop-upload .vicp-wrap .vicp-success[data-v-30f57684] {\n    display: block;\n    font-size: 14px;\n    line-height: 24px;\n    height: 24px;\n    color: #d10;\n    text-align: center;\n    vertical-align: top;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-success[data-v-30f57684] {\n    color: #4a7;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-icon3[data-v-30f57684] {\n    position: relative;\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    top: 4px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-icon3[data-v-30f57684]::after {\n    position: absolute;\n    top: 3px;\n    left: 6px;\n    width: 6px;\n    height: 10px;\n    border-width: 0 2px 2px 0;\n    border-color: #4a7;\n    border-style: solid;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n    content: '';\n}\n.vue-image-crop-upload .vicp-wrap .vicp-icon2[data-v-30f57684] {\n    position: relative;\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    top: 4px;\n}\n.vue-image-crop-upload .vicp-wrap .vicp-icon2[data-v-30f57684]::after, .vue-image-crop-upload .vicp-wrap .vicp-icon2[data-v-30f57684]::before {\n    content: '';\n    position: absolute;\n    top: 9px;\n    left: 4px;\n    width: 13px;\n    height: 2px;\n    background-color: #d10;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n}\n.vue-image-crop-upload .vicp-wrap .vicp-icon2[data-v-30f57684]::after {\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}\n.e-ripple[data-v-30f57684] {\n    position: absolute;\n    border-radius: 100%;\n    background-color: rgba(0, 0, 0, 0.15);\n    background-clip: padding-box;\n    pointer-events: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    opacity: 1;\n}\n.e-ripple.z-active[data-v-30f57684] {\n    opacity: 0;\n    -webkit-transform: scale(2);\n    transform: scale(2);\n    -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\n    transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out;\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out, -webkit-transform 0.6s ease-out;\n}\n",""])},pVgZ:function(e,i,n){var a=n("nxjB");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("21b0ae7e",a,!0)}});