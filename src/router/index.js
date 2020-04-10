import Vue from 'vue'
import Router from 'vue-router'
import {menu} from '../config/global.config'
import views from '../views/*.vue'

/* Layout */
import Layout from '../layout/Index.vue'

var componentName = [];
[views].forEach(l => {
  for(let i in l){
    componentName[i] = l[i];
  }
})
// console.log(componentName);
Vue.use(Router)

var routes = [
    {path: '/', redirect: 'Login'},  
    {path: '/Login', components: componentName["Login"]}
]

menu.forEach((item) => {
  if (item.sub) {
    let router = {
      path: `/${item.id}`,
      component: Layout,
      children: []
    };
    item.sub.forEach((sub, i) => {
      router.children.push({
        path: `/${sub.component}`,
        name: sub.name,
        components: componentName[sub.component], // resolve => require([`../Layout/${sub.component}`], resolve)
        meta: sub.meta
      })
    })
    routes.push(router);
  } else {
    routes.push({
      path: '/',
      component: Layout,
      redirect: '/Dashboard',
      children: [{
          path: `/${item.component}`,
          name: item.name,
          components: componentName[item.component], // resolve => require([`../Layout/${sub.component}`], resolve)
          meta: item.meta
      }] 
    })
  }
})
// console.log(routes);

export default new Router({ 
    mode: 'history',
    routes 
})