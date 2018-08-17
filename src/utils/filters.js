import Vue from 'vue'
import TimeUtil from './time.js'
Vue.filter('bankCard',function(value){
  var start4 = value.slice(0,4)
  var end4 = value.slice(value.length-4)
  return `${start4}****${end4}`
})

Vue.filter('timeFull',function(value){
  
  return TimeUtil.getTimeString(value)
})


Vue.filter('money',function(value){
  return Number(value/100).toFixed(2)
})