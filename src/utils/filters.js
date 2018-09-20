import Vue from 'vue'
import TimeUtil from './time.js'
Vue.filter('bankCard', function(value) {
  var start4 = value.slice(0, 4)
  var end4 = value.slice(value.length - 4)
  return `${start4}****${end4}`
})

Vue.filter('timeFull', function(value) {
  return TimeUtil.getTimeString(value)
})
Vue.filter('timeDay', function(value) {
  return TimeUtil.getTimeString(value, 0, 10)
})

Vue.filter('money', function(value) {
  return Number(value / 100).toFixed(2)
})

Vue.filter('authStatus', function(value) {
  //认证状态：0等待认证、1等待审核、2认证通过、3认证失败 
  let str = ''
  switch (value) {
    case 0:
      str = "等待认证";
      break;
    case 1:
      str = "等待审核";
      break;
    case 2:
      str = "认证通过";
      break;
    case 3:
      str = "认证失败";
      break;
  }
  return str
})
Vue.filter('incomeType', function(value) {
  if (value === "point") {
    return "点差"
  } else if (value === "follow") {
    return '跟单'
  }
})
Vue.filter('agentLevel', function(value) {
  // 代理级别
  // 0：无
  // 1：股东
  // 2：经理
  // 3：组长
  // 4：小喽喽
  let str = ""
  switch (value) {
    case 0:
      str = "无级别";
      break;
    case 1:
      str = "股东";
      break;
    case 2:
      str = "经理";
      break;
    case 3:
      str = "组长";
      break;
    case 4:
      str = "小喽喽";
      break;
  }
  return str
})

Vue.filter('guestDepth', function(value) {
  // 级别
  // 1：股东
  // 2：经理
  // 3：组长
  let str = ""
  switch (value) {
    case 1:
      str = "一级";
      break;
    case 2:
      str = "二级";
      break;
    case 3:
      str = "三级";
      break;
  }
  return str
})
Vue.filter('payStatus', function(value) {
  switch (value) {
    case 1:
      return "等待审核";
    case 2:
      return "完成充值";
    case 3:
      return "付款无效";
  }
})
Vue.filter('withdrawStatus', function(value) {
  switch (value) {
    case 1:
      return "等待转账";
    case 2:
      return "转账完成";
    case 3:
      return "撤销申请";
  }
})
Vue.filter('payway', function(value) {
  switch (value) {
    case 'alipay_personal':
      return "支付宝转账";
    case 'brokerage':
      return "佣金提现";
  }
})
Vue.filter('moneyBillType', function(value) {
  switch (value) {
    case 'withdraw':
      return "出金";
    case 'deposit':
      return "入金";
    case 'withdraw_follow_settlement':
      return "出金（跟单结算）";
  }
})
Vue.filter('moneyBillStatus', function(value) {
  switch (value) {
    case 0:
      return "正在处理";
    case 1:
      return "完成";
    case 2:
      return "失败";
  }
})

Vue.filter('mt4Type', function(value) {
  switch (value) {
    case 'normal':
      return "普通账号";
    case 'follow':
      return "跟单账号";
  }
})
