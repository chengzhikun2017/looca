import Vue from 'vue'
import Router from 'vue-router'
import config from '../config.js'

// import crm_index from '../pages/crm_index.vue'

const findpwd = ()=> import( '../pages/findpwd.vue')
const error_page = ()=> import( '../pages/error.vue')
const index_page = ()=> import( '../pages/index.vue')
const modifypwd = ()=> import( '../pages/modifypwd.vue')
const mine_cards = ()=> import( '../pages/mine_cards.vue')
const mine_real = ()=> import( '../pages/mine_real.vue')
const mt4_overview = ()=> import( '../pages/mt4_overview.vue')
const mt4_create = ()=> import( '../pages/mt4_create.vue')
const mt4_bind = ()=> import( '../pages/mt4_bind.vue')
const mt4_modifypwd = ()=> import( '../pages/mt4_modifypwd.vue')
const mt4_findpwd = ()=> import( '../pages/mt4_findpwd.vue')
const mt4_trade_history = ()=> import( '../pages/mt4_trade_history.vue')
const trade_wallet = ()=> import( '../pages/trade_wallet.vue')
const trade_wallet_withdraw = ()=> import( '../pages/trade_wallet_withdraw.vue')
const trade_wallet_recharge = ()=> import( '../pages/trade_wallet_recharge.vue')



/**
 * test part
 */
const test1 = () =>  import ('./../pages/test/test1.vue')
const test2 = () =>  import ('./../pages/test/test2.vue')
const test3 = () =>  import ('./../pages/test/test3.vue')
const test4 = () =>  import ('./../pages/test/test4.vue')
const test5 = () =>  import ('./../pages/test/test5.vue')

/**
 * accounting part (accounting) webpackChunkName: "accounting"
 */
/**
 * account part
 */


// const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
// const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
// const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
Vue.use(Router)
/**
 * 针对某一个组件创建路由数组（多个路由）
 * @param  {string || array} paths     路由字符串或者路由数组
 * @param  {string} name      路由名称
 * @param  {Vue component} component 指定的组件/模块
 * @param  {[配置]} options   路由的配置，e.g. meta:{ keepAlive:true}
 * @return {[type]}           [description]
 */
const newRoute = function(paths, name, component, options) {
  if (typeof paths === 'string') {
    paths = [paths]
  }
  if (options === undefined) {
    options = {}
  }
  var l = paths.length,
    routes = [],
    newRoute, i
  for (i = 0; i < l; i++) {
    newRoute = new Object({
      path: config.routerRoot + paths[i],
      name: name + '_' + i,
      component: component,
    })
    Object.assign(newRoute, options)
    routes.push(newRoute)
  }
  return routes
}
var routes = [],
  basicRoutes = [],
  route_test = [],
  index = [],
  crmRoutes = []
crmRoutes = crmRoutes.concat(
  // newRoute('/crm_index', 'crm_index', crm_index),
  // newRoute('/findpwd', 'findpwd', findpwd),
  newRoute('/modifypwd', 'modifypwd', modifypwd),
  newRoute('/index_page', 'index_page', index_page),
  newRoute('/mine_cards', 'mine_cards', mine_cards),
  newRoute('/mine_real', 'mine_real', mine_real),
  newRoute('/mt4_overview', 'mt4_overview', mt4_overview),
  newRoute('/mt4_bind', 'mt4_bind', mt4_bind),
  newRoute('/mt4_modifypwd', 'mt4_modifypwd', mt4_modifypwd),
  newRoute('/mt4_create/:server', 'mt4_create', mt4_create),
  newRoute('/mt4_trade_history', 'mt4_trade_history', mt4_trade_history),
  newRoute('/mt4_findpwd', 'mt4_findpwd', mt4_findpwd),
  newRoute('/trade_wallet', 'trade_wallet', trade_wallet),
  newRoute('/trade_wallet_withdraw', 'trade_wallet_withdraw', trade_wallet_withdraw),
  newRoute('/trade_wallet_recharge', 'trade_wallet_recharge', trade_wallet_recharge),
)


// var indexPageArr = newRoute('/index_page', 'index_page', index_page, {
  var indexPageArr = newRoute('/mine_real', 'mine_real', mine_real, {
})
// meta: {
//   keepAlive: true //需要被缓存
// }
var indexPage = indexPageArr[0]
// console.log('indexPage', indexPage)
route_test = route_test.concat(
  // newRoute('/test', 'test', test),
  newRoute('/test1', 'test1', test1),
  newRoute('/test2', 'test2', test2),
  newRoute('/test3', 'test3', test3),
  newRoute('/test4', 'test4', test4),
  newRoute('/test5', 'test5', test5,{
    // meta:{keepAlive:true,}
  }),
)
basicRoutes = [{
  path: '',
  name: indexPage.name + 'index',
  redirect: indexPage.path,
  component: indexPage.component,
}, {
  path: '/*',
  name: 'error_page',
  // redirect: '/cards',
  component: error_page
}, ]
routes = routes.concat(index.concat(
  indexPage,
  route_test,
  crmRoutes,
), basicRoutes)
// console.log('%c routes', 'color:red', routes)
var router = new Router({
  // mode: 'history',
  routes: routes
})


// router.beforeEach((to, from, next) => {
//   // console.log('router',to,from)
//   // console.log('first enter app',router.firstEnter,router)
//   // &&firstEnter===1
//   let indexPath = config.routerRoot + indexPage.path
//   if (!from.name && to.path !== indexPath) {
//     router.push(indexPath)
//     router.push(to.fullPath)
//     // router.prototype.firstEnter=0
//     return
//   }
//   next()
// })
export default router
