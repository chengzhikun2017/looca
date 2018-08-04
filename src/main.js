// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import Button from 'vue-antd-ui/lib/button'
// import Carousel from 'vue-antd-ui/lib/button'
import { Button ,Carousel,Icon} from 'vue-antd-ui';
const widget2 = ()=>import('./components/forIndex/widget2.vue')

// import 'vue-antd-ui/dist/antd.css'
Vue.config.productionTip = false
Vue.component(Button.name,Button)
Vue.component(Icon.name,Icon)
Vue.component(Carousel.name,Carousel)
Vue.component("widget2",widget2)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App, },
  template: '<App/>'
})
