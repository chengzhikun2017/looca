import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()
class defaultMt4InfoAC {
  constructor(props) {
    this.list = []
    this.listGot = false
    this.loadingList = false
    this.syncSuccess = false
    this.currentMt4Uid = helper.getLocalStorage('currentMt4Uid')
  }
}

export default {
  namespaced: true,
  state: new defaultMt4InfoAC(),
  getters: {},
  mutations: {
    setCurrent(s,id){
      s.currentMt4Uid = id
      helper.saveToLocal('currentMt4Uid',id)
    },
    resetList(s){
      s.list = []
    },
    resetCurrent(s){
      helper.removeLocal('currentMt4Uid')
    },

  },

  actions: {
    setDefaultCurrent({state,commit}){
      if(!helper.getLocalStorage('currentMt4Uid')){
        commit('setCurrent',state.list[0].mt4Uid)
      }
    },
    getList({state,dispatch,commit}) {
      state.listGot = false
      state.loadingList = true
      var promise = fetch({
        url: "mt4Account/list",
      },{
        rejectErr:true,
        showLoading:false,
      })
      promise.then(res => {
        console.log('%c res mt4 account ','color:red',res)
        state.list = res.data
        state.syncSuccess = res.syncSuccess
        dispatch('setDefaultCurrent')
      })
      .catch(err=>{
        if(err.error === 20003){
          dispatch('getList')
        }
      })
      .finally(() => {
        state.loadingList = false 
        state.listGot = true
      })
      return promise
    },
    create({}, params) {
      // console.log('%c params','color:red',params)
      let promise = fetch({
        //server: 服务器: live实盘，demo模拟盘
        //password: 交易密码（必须包含数字和字母，6位以上）
        //password2: 只读密码（必须包含数字和字母，6位以上）
        url: 'mt4Account/create',
        params,
      })
      promise.then(res=>{
        vueApp.$message.info("创建成功")
      })
      return promise
    },
    bindAC({},{mt4Uid,password}){
      var promise = fetch({
        url:'mt4Account/bind',
        params:{
          mt4Uid,
          password,
        },
      })
      promise.then(res=>{
        vueApp.$message.info('绑定成功')
      })
      return promise
    },
    modifyPwd({},params){
      // mt4Uid: MT4账号
      // password: 交易密码
      // newPassword: 新的密码，（必须包含数字和字母，6位以上）
      // type: 修改密码类型： main 为交易密码， investor 为只读密码
      fetch({
        url:"mt4Account/modifyPwd",
        params,
      })
    },
    findPwd({},mt4Uid){
      var promise = fetch({
        url:"mt4Account/findPwd",
        params:{
          mt4Uid,
        },
      }).then(() => {
        vueApp.$modal.info({
            title: '找回密码',
            content: `新密码已发送至实名账户邮箱`,
            onOk() {},
        }) 
      })
      return promise
    },
  }
}
