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

Vue.filter('authStatus',function(value){
  //认证状态：0等待认证、1等待审核、2认证通过、3认证失败 
  let str=''
  switch(value){
    case 0: str = "等待认证";break;
    case 1: str = "等待审核";break;
    case 2: str = "认证通过";break;
    case 3: str = "认证失败";break;
  }
  return str
})

Vue.filter('agentLevel',function(value){
  // 代理级别
  // 0：无
  // 1：股东
  // 2：经理
  // 3：组长
  // 4：小喽喽
  let str = ""
  switch(value){
    case 0: str = "无级别";break;
    case 1: str = "股东";break;
    case 2: str = "经理";break;
    case 3: str = "组长";break;
    case 4: str = "小喽喽";break;
  }
  return str
})