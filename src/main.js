import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.scss'
import data from "./config/global.config"

import App from './App'
import router from './router'
import components from './components/*.vue'

Vue.use(ElementUI);
Vue.component("app", App);


[data.ipData, data.userData].forEach((v) => addEdit(v));

function addEdit (c) {
  c.forEach( (v, i) => {
    v.edit = false
    v.id = i
  })
}


Vue.config.productionTip = false;

function vueRegisterAll(c) {
  for(let i in c){
      if(i == 'default') continue;
      // console.log(i, c[i].default, c[i]);
      Vue.component(i, c[i].default);
  }
}

[components].forEach((v) => vueRegisterAll(v));



let vm = new Vue({
  el: '#app',
  data,
  router
});

window.vm = vm;