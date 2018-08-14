import Vue from 'vue'

Vue.filter('bankCard',function(value){
  var start4 = value.slice(0,4)
  var end4 = value.slice(value.length-4)
  return `${start4}****${end4}`
})
