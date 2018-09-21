import router from '../router'
import config from '../config.js'
import { vueApp } from '../main.js'
const agent_levels = [
  { label: '所有', value: 0 },
  { label: '一级', value: 1 },
  { label: '二级', value: 2 },
  { label: '三级', value: 3 },
]
// import commonRemind from './commonRemind.js'
const _toString = Object.prototype.toString
export default class helper {
  static platform = null
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
  static secretName(name){
    name = name+''
    let len = name.length
    let s = ''
    switch(len){
      case 0: s=''; break;
      case 1: s='*'; break;
      case 2: s=name[0]+'*'; break;
      case 3: s=name[0]+'**'; break;
      case 3: s=name[0]+'**'; break;
      case 4: s=''+name[0]+name[1]+'**'; break;
      default: s=name[0]+'**';break;
    }
    return s
  }
  static secretPhone(phone){
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

    vueApp.$store.commit('mt4AC/resetCurrent')
  }

  static getInitialInfo() {
    vueApp.$bus.emit('app_loged')
    vueApp.$store.dispatch('account/getAuthInfo')
    vueApp.$store.dispatch('account/getUserInfo')
    vueApp.$store.dispatch('mt4AC/getList')
    vueApp.$store.dispatch('wallet/getPayAccount')
    vueApp.$store.dispatch('wallet/getWallet')
  }

  static resetStoreTrade() {
    vueApp.$store.commit('trade/reset')
  }
}
