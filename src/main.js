// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import Button from 'vue-antd-ui/lib/button'
// import Carousel from 'vue-antd-ui/lib/button'
import { Button ,Carousel} from 'vue-antd-ui';
// import 'vue-antd-ui/dist/antd.css'
Vue.config.productionTip = false
Vue.component(Button.name,Button)
Vue.component(Carousel.name,Carousel)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
