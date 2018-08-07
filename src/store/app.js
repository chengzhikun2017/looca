 // import fetch from '../../utils/fetch.js'
// import {
  // simpleFetch
// } from '../../utils/fetch.js'
// import {HGJ_VUE} from '../../main.js'
import helper from '../utils/helper.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()
export default {
  namespaced:true,
  state: {
    isWX:false,
    wxConfiged:false,
    platform,
    isPC,
    windowHeight:window.innerHeight,
  },
  getters: {},
  mutations: {
    app_checkIsWX(state) {
      var userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.match(/MicroMessenger/i) == 'micromessenger') {
        state.isWX = true;
      } else {
        state.isWX = false;
      }
    },
  },
  actions: {
    app_jsconfig({state}){
      // return
      if(!state.isWX){
        return
      }
      let path=location.href.split('#')[0]
      fetch({
        url:'wechat/jsconfig',
        params:{
          url:path,
        },
      }).then(res=>{
          console.log('%c wechat API','color:red',res)
          var data = res
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline',], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(()=> {
            // console.warn('wx config success')
            state.wxConfiged = true
            console.log('%c 已配置','color:green',)
          });
          wx.error((res) => {
            let str=''
            for(let key in res){
              str=str+`${key}:${res[key]},`
            }
            console.log('err',res)
            // var remind = vm.remind
            // HGJ_VUE.hgjAlert('分享操作无法完成')
          });
      })
      .catch(err=>{})
    },
  }
}

