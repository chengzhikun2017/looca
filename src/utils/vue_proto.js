import Vue from 'vue'
import moment from 'moment'
import events  from 'events'
window.moment = moment
Vue.prototype.$showLoading = (loadingText) => {
  vueApp.$store.commit('feedback/showLoading', loadingText)
}
Vue.prototype.$hideLoading = () => {
  vueApp.$store.commit('feedback/hideLoading')
}
Vue.prototype.$showPageLoading = (loadingText) => {
  vueApp.$store.commit('feedback/showPageLoading', loadingText)
}
Vue.prototype.$hidePageLoading = () => {
  vueApp.$store.commit('feedback/hidePageLoading')
}
Vue.prototype.moment = moment

Vue.prototype.l$event = new events();

document.body.addEventListener('click',function(event){
  Vue.prototype.l$event.emit('body_click',event)
})

// Vue.prototype.l$removeBodyClickEvent = function(){

// }
// Vue.prototype.l$addBodyClickEvent = function(callback){
  
// }