webpackJsonp([0],{0:function(t,e){},"7qb0":function(t,e){},EdaU:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("VCXJ"),r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"translate"}},[a("div",{staticClass:"row",attrs:{id:"translateForm"}},[a("div",{staticClass:"col-md-6 col-md-offset-3"},[a("form",{staticClass:"well form-inline",attrs:{id:"transform"},on:{submit:t.formSubmit}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.textToTranslate,expression:"textToTranslate"}],staticClass:"form-control",attrs:{type:"text",placeholder:"输入"},domProps:{value:t.textToTranslate},on:{input:function(e){e.target.composing||(t.textToTranslate=e.target.value)}}}),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.language,expression:"language"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.language=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"en"}},[t._v("English")]),t._v(" "),a("option",{attrs:{value:"ru"}},[t._v("Russian")]),t._v(" "),a("option",{attrs:{value:"ko"}},[t._v("Korean")])]),t._v(" "),a("input",{staticClass:"btn btn-primary",attrs:{type:"submit",value:"翻译"}})])])])])},staticRenderFns:[]};var s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"translateoutput"}},[e("h2",[this._v(this._s(this.translatedTxt))])])},staticRenderFns:[]};var o={name:"App",data:function(){return{translatedTxt:""}},components:{TranslateForm:a("Z0/y")({name:"translateForm",data:function(){return{textToTranslate:"",language:""}},methods:{formSubmit:function(t){this.$emit("formSub",this.textToTranslate,this.language),t.preventDefault()}},created:function(){this.language="en"}},r,!1,function(t){a("o/y6")},"data-v-88edf540",null).exports,TranslateOutput:a("Z0/y")({name:"translateOutPut",props:["translatedTxt"]},s,!1,function(t){a("EdaU")},"data-v-2fda31ce",null).exports},methods:{translateTxt:function(t,e){var a=this;this.$http.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170721T082515Z.54cf3dc583f679db.f4a96182281281d8b5dfe24b4e88298e2133f219&lang="+e+"&text="+t).then(function(t){a.translatedTxt=t.body.text[0]})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("h1",[t._v("在线翻译")]),t._v(" "),a("h5",{staticClass:"text-muted"},[t._v("简单/易用/便捷")]),t._v(" "),a("TranslateForm",{on:{formSub:t.translateTxt}}),t._v(" "),a("TranslateOutput",{domProps:{textContent:t._s(t.translatedTxt)}})],1)},staticRenderFns:[]};var i=a("Z0/y")(o,l,!1,function(t){a("7qb0")},null,null).exports,u=a("Mdbh");n.a.config.productionTip=!1,n.a.use(u.a),new n.a({el:"#app",components:{App:i},template:"<App/>"})},"o/y6":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.220586c4ca3e6289f969.js.map