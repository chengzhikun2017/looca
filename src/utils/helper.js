import router from '../router'
import config from '../config.js'
// import {
//   HGJ_VUE
// } from '../main.js'
// import commonRemind from './commonRemind.js'
export default class helper {
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
  static goPage(path, callback, stopGo) {
    console.log('go page ',path)
    if (stopGo) {
      HGJ_VUE.hgjAlert('服务暂时关闭')
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
    if (!HGJ_VUE.$store.state.account.isLoged) {
      commonRemind.unloginRemind()
      return
    }
    helper.goPage(path, callback)
  }

  static replaceRouter(path) {
    router.replace(config.routerRoot + path)
  }

  static saveUserInfoToLocal(data) {
    console.log('data')
    //save user info to localstorage
    //后续单项的更新，也通过此方法更新
  }
  static getPlatForm() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "IOS", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

    if (!!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      return "ios";
    }

    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.toLowerCase().indexOf(Agents[v].toLowerCase()) > 0) {
        return Agents[v];
      }
    }
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
}
