// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import events from 'events'
import 'babel-polyfill'
// flex.css
import './styles/icons.css'
import 'flex.css'
import moment from 'moment'
import helper from './utils/helper.js'
// import MainLayout from './components/layout/MainLayout.vue'
import "./styles/main.scss"
import "./utils/componentRegister.js"
import "./utils/filters.js"
import "./utils/directives.js"
import "./utils/vue_proto.js"
import _ from 'underscore'
import infiniteScroll from 'vue-infinite-scroll'
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)
window._ = _
Vue.use(infiniteScroll)
Vue.config.productionTip = true
// Vue.prototype.__test="test"
// Vue.config.errorHandler = function (err, vm, info) {
//   console.log('%c vue error handle:::','color:#c0c')
//   console.log('%c error',err)
//   console.log('%c vm',vm)
//   console.log('%c info',info)
//   // handle error
//   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
//   // 只在 2.2.0+ 可用
// }
// Vue.config.warnHandler = function (msg, vm, trace) {
//   // `trace` 是组件的继承关系追踪
//   console.log('%c vue warn handle:::','color:#808')
//   console.log('%c error',msg)
//   console.log('%c vm',vm)
//   console.log('%c inof',trace)
// }

Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // camelCase 不可用
  mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  "media-play-pause": 179,
  up: [38, 87]
}
Vue.config.performace = true

const Bus = new events()
router.beforeEach((to,from,next)=>{

  let isloged =  store.state.account.isLoged
  // console.log('%c // store.account.isLoged','color:red',isloged)
  if(isloged || to.path==="/signup"){
    next()
  }else if(from.path==='/signup'){
    next()
  }
  else{
    Bus.on('app_loged',() => {
      next() 
    })
  }
})

/* eslint-disable no-new */
var vueApp = new Vue({
  el: '#app',
  router,
  store,
  components: { App, },
  template: '<App/>'
})
vueApp.$bus = Bus


window.vueApp = vueApp
export  {vueApp}
