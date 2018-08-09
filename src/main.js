// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import helper from './utils/helper.js'
// import MainLayout from './components/layout/MainLayout.vue'
import "./styles/main.scss"
import "./utils/componentRegister.js"
function registerComponentChild(vue, parentAntComponent) {
  var parent = parentAntComponent
  for(let key in parent){
    let child = parent[key]
    if(child.name&&child.name[0]==="A"){
      vue.component(child.name,child)
    }
  }

}
const widget1 = () =>
  import ('./components/forIndex/widget1.vue')
const widget2 = () =>
  import ('./components/forIndex/widget2.vue')
const widget3 = () =>
  import ('./components/forIndex/widget3.vue')
const widget4 = () =>
  import ('./components/forIndex/widget4.vue')
const widget5 = () =>
  import ('./components/forIndex/widget5.vue')

// import 'vue-antd-ui/dist/antd.css'

Vue.component("widget1", widget1)
Vue.component("widget2", widget2)
Vue.component("widget3", widget3)
Vue.component("widget4", widget4)
Vue.component("widget5", widget5)
/* eslint-disable no-new */
var vueApp = new Vue({
  el: '#app',
  router,
  store,
  components: { App, },
  template: '<App/>'
})
export  {vueApp}
