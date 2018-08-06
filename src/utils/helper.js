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
  // static updateOnOrderSucc(productId,params){
  //   let state=HGJ_VUE.$store.state
  //   let account=state.account
  //   console.log('%c loglog','color:red',state,account,productId)
  //   switch(productId){
  //     case 20000: account.isActive=true; break;
  //     case 20001: account.level=4; break;
  //     case 20002: account.level=3; break;
  //     case 20003: account.level=2; break;
  //     case 10000:handleNewPlan(); break;
  //   }
  //   function handleNewPlan(){
  //     setTimeout(()=> {
  //       HGJ_VUE.$store.dispatch('account_getUserInfo')
  //     }, 2000);
  //   }
  // }

  // static resetInitialInfo() {
  //   HGJ_VUE.$store.commit('cards_clearListCC')
  //   HGJ_VUE.$store.commit('cards_clearListDC')
  //   HGJ_VUE.$store.commit('account_reset')
  //   HGJ_VUE.$store.commit('share_resetReport')
  //   HGJ_VUE.$store.dispatch('market_resetList')
  //     // HGJ_VUE.$store.commit('order_clearProductList')
  // }

  // static getInitialInfo() {
  //   HGJ_VUE.$store.dispatch('cards_getListCC')
  //   HGJ_VUE.$store.dispatch('cards_getListDC')
  //   HGJ_VUE.$store.dispatch('account_getUserInfo')
  //   .then((res) => {
  //     if(HGJ_VUE.$store.state.account.level>0){
  //       HGJ_VUE.$store.dispatch('market_getAllList')
  //     } 
  //   })
  //   HGJ_VUE.$store.dispatch('order_productsListGet')
  //   HGJ_VUE.$store.dispatch('share_getCount')
  //   HGJ_VUE.$store.dispatch('share_viewCount')

  // }
}
