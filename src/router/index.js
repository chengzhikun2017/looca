import Vue from 'vue'
import Router from 'vue-router'
import config from '../config.js'
import error_page from '../pages/error.vue'
import index_page from '../pages/index.vue'


/**
 * test part 
 */
import test1 from './../pages/test/test1.vue'

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
var newRoute = function(paths, name, component, options) {
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
  index = []
index = index.concat(

)
var indexPageArr = newRoute('/index_page', 'index_page', index_page, {
  // meta: {
  //   keepAlive: true //需要被缓存
  // }
})
var indexPage = indexPageArr[0]
// console.log('indexPage', indexPage)
route_test = route_test.concat(
  // newRoute('/test', 'test', test),
  newRoute('/test1', 'test1', test1),
  // newRoute('/test2', 'test2', test2),
  // newRoute('/test3', 'test3', test3),
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
), basicRoutes)
var router = new Router({
  mode: 'history',
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
