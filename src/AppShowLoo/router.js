import Vue from 'vue'
import Router from 'vue-router'
const index_page = () =>
  import ('./../pages/index.vue')
const widget1 = () =>
  import ('./../components/forIndex/widget1.vue')
const widget2 = () =>
  import ('./../components/forIndex/widget2.vue')
const widget3 = () =>
  import ('./../components/forIndex/widget3.vue')
const widget4 = () =>
  import ('./../components/forIndex/widget4.vue')
const widget5 = () =>
  import ('./../components/forIndex/widget5.vue')

Vue.component("widget1", widget1)
Vue.component("widget2", widget2)
Vue.component("widget3", widget3)
Vue.component("widget4", widget4)
Vue.component("widget5", widget5)

Vue.use(Router)
var router = new Router({
  // mode: 'history',
  routes: [{
    path: '/*',
    name: 'index_page',
    // redirect: '/cards',
    component: index_page
  }]
})
export default router
