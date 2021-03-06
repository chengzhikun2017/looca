import router from '../router'
import config from '../config.js'
import { vueApp } from '../main.js'
const agent_levels = [
  { label: '所有', value: 0 },
  { label: '一级', value: 1 },
  { label: '二级', value: 2 },
  { label: '三级', value: 3 },
]
const walletTypes = {
  pay:'充值',
  pay_cancel:'充值（撤销）',
  withdraw:'提现',
  withdraw_cancel:'提现（撤销）',
  mt4_deposit:'入金',
  mt4_deposit_cancel:'入金（撤销）',
  mt4_withdraw:'出金',
  mt4_withdraw_cancel:'出金（撤销）',
  brokerage2balance:'佣金转余额',
  mt4_account_vip:'VIP账号',
  mt4_vip_return:'VIP手续费返还',
}
// import commonRemind from './commonRemind.js'
const _toString = Object.prototype.toString
export default class helper {
  static platform = null
  static walletTypes = walletTypes
  static agent_levels = agent_levels
 
  static saveToLocal(key, value) {
    localStorage[key] = value
  }
  static getLocalStorage(key) {
    return localStorage[key]
  }
  static removeLocal(key) {
    localStorage.removeItem(key)
  }
  static urlConcat(url, obj) {
    var str = '',
      queryArr = []
    for (var key in obj) {
      // str = str + key + '=' + obj[key] + '&'
      queryArr.push(key + '=' + obj[key])
    }
    str = queryArr.join('&')
    str = url + '?' + str
    return str
  }
  static padStart0_2(v) {
    if (v >= 10) {
      return v
    } else {
      return '0' + v
    }
  }
  static getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  static goPage(path, callback, stopGo) {
    if (stopGo) {
      // HGJ_VUE.hgjAlert('服务暂时关闭')
      return
    }
    if (typeof path === 'number') {
      // console.log('back unknown', 1)
      router.go(path)
    } else {
      router.push(config.routerRoot + path)
    }
    if (callback !== undefined && callback instanceof Function) {
      callback()
    }
  }
  static goPageLoged(path, callback, stopGo) {
    if (stopGo) {
      HGJ_VUE.hgjAlert('服务暂时关闭')
      return
    }
    if (!store.state.account.isLoged) {
      commonRemind.unloginRemind()
      return
    }
    helper.goPage(path, callback)
  }

  static replaceRouter(path) {
    router.replace(config.routerRoot + path)
  }
  static secretName(name) {
    name = name + ''
    let len = name.length
    let s = ''
    switch (len) {
      case 0:
        s = '';
        break;
      case 1:
        s = '*';
        break;
      case 2:
        s = name[0] + '*';
        break;
      case 3:
        s = name[0] + '**';
        break;
      case 3:
        s = name[0] + '**';
        break;
      case 4:
        s = '' + name[0] + name[1] + '**';
        break;
      default:
        s = name[0] + '**';
        break;
    }
    return s
  }
  static secretPhone(phone) {
    phone = phone + ''
    return `${phone.substring(0,4)}****${phone.substring(8)}`
  }
  static saveUserInfoToLocal(data) {
    console.log('data')
    //save user info to localstorage
    //后续单项的更新，也通过此方法更新
  }
  static getPlatForm() {
    if (helper.platform) {
      return helper.platform
    }
    var platform
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "IOS", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

    if (!!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      helper.platform = "ios";
      return platform
    }

    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.toLowerCase().indexOf(Agents[v].toLowerCase()) > 0) {
        helper.platform = Agents[v];
        return platform
      }
    }
    helper.platform = "PC"
    return "PC";
  }
  static isPC() {
    return helper.getPlatForm() === "PC";
  }
  static isIOS() {
    return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }
  static isAndroid() {
    var u = navigator.userAgent
    return !!(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1);
  }
  static isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }
  static getWeixinVersion() {
    var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
    return wechatInfo
  }
  static isNum(value) {
    return _toString.call(value) === "[object Number]"
  }
  static isArray(value) {
    return
  }
  static isObject(value) {
    return
  }
  static isFunction(value) {
    return
  }
  static isString(value) {
    return _toString.call(value) === "[object String]"
  }

  static isNullObj(obj, deep = false) {
    return Object.keys(obj).find(key => {
      if (!!obj[key]) {
        return true;
      }
    })
  }

  static isPrimitiveVariable(value) {
    // {} []
  }


  static updateMoney() {
    vueApp.$store.dispatch('wallet/getWallet')
    vueApp.$store.dispatch('share/getIncomeCount')
  }
  static resetInitialInfo() {
    vueApp.$store.commit('account/reset')
    vueApp.$store.commit('mt4AC/resetList')
    vueApp.$store.commit('mt4Balance/resetList')
    vueApp.$store.commit('wallet/resetList')
    vueApp.$store.commit('cards/clearListDC')
    vueApp.$store.commit('mt4AC/resetCurrent')
    vueApp.$store.commit('broker/resetPartner')
  }

  static getInitialInfo() {
    vueApp.$bus.emit('app_loged')
    vueApp.$store.dispatch('account/getAuthInfo')
    vueApp.$store.dispatch('account/getUserInfo')
    vueApp.$store.dispatch('mt4AC/getList')
    vueApp.$store.dispatch('wallet/getPayAccount')
    vueApp.$store.dispatch('wallet/getWallet')
    vueApp.$store.dispatch('broker/getPartner')
    vueApp.$store.dispatch('share/getShareInfo')
  }

  static resetStoreTrade() {
    vueApp.$store.commit('trade/reset')
  }
  /**
   * [createTableFootData description]
   * @param  {array} columns      [description]
   * @param  {array} dataIndexes [{key:value}],key = dataIndex key,  value=value
   * @return {[type]}             [description]
   */
  static createTableFootData(columns, dataIndexes) {
    var len = columns.length
    var arr = []
    while (len--) {
      arr.push('')
    }
    arr[0] = '总计'
    len = columns.length
    for(let i=0;i<len;i++){
      let key = columns[i].dataIndex
      if(dataIndexes[key]!== undefined){
        arr[i] = dataIndexes[key]
      }
    }

    // find index correspond to the dataIndex, then change the value
    return arr

    // return changed array
  }
  /**
   *
   * @param {数据源：确定列数和数据} data
   * @param {Jquery选择器：如果当前页只有一个table，可不填} selector
   */
  static addTableFooter(data, selector) {
    // 参数的数据类型校验(暂时没有，如果需要统一封装一个，放在调用该函数前)
    if (!data) {
      // 默认data
      data = ['总计', '', '', '', '', '', '0.00', '3000.00', '0.00', '', '']
    }
    let table
    if (!selector) {
      table = document.getElementsByTagName('table')[0]
    } else {
      table = document.querySelector(selector)
    }
    let tableFooter = document.createElement('tfoot')
    tableFooter.className = 'ant-table-tbody'
    let tabletr = document.createElement('tr')
    const len = data.length
    for (let i = 0; i < len; i++) {
      let tabletd = document.createElement('td')
      let tabletdText = document.createTextNode(data[i])
      tabletd.appendChild(tabletdText)
      tabletr.appendChild(tabletd)
    }
    tableFooter.appendChild(tabletr)
    const lastChild = table.lastChild
    if (lastChild.nodeName === 'TFOOT') {
      table.replaceChild(tableFooter, lastChild)
    } else {
      table.appendChild(tableFooter)
    }
  }

  static removeTableFooter(selector) {
    let table
    if (!selector) {
      table = document.getElementsByTagName('table')[0]
    } else {
      table = document.querySelector(selector)
    }
    if(!table){
      return
    }
    let tfoot = table.querySelector('tfoot')
    if(tfoot){
      tfoot.replaceWith('')
    }
  }
  static openNewPage(url) {
    window.open(url)
  }
}
