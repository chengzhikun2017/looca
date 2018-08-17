import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()
class defaultMt4InfoAC {
  constructor(props) {
    this.list = []
  }
}

export default {
  namespaced: true,
  state: new defaultMt4InfoAC(),
  getters: {},
  mutations: {
    resetList(s){
      s.list = []
    },
  },
  actions: {
    getList({state}) {
      fetch({
        url: "mt4Account/list",
      }).then(res => {
        state.list = res
        console.log('%c mt4 account list', 'color:red', res)
      })
    },
    create({}, params) {
      console.log('%c params','color:red',params)
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
      fetch({
        url:'mt4Account/bind',
        params:{
          mt4Uid,
          password,
        },
      })
    },
    modifyPwd({},params){
      // mt4Uid: MT4账号
      // password: 交易密码
      // newPassword: 新的密码，（必须包含数字和字母，6位以上）
      // type: 修改密码类型：main为交易密码，investor为只读密码
      fetch({
        url:"mt4Account/modifyPwd",
        params,
      })
    },
    findPwd({},mt4Uid){
      fetch({
        url:"mt4Account/findPwd",
        mt4Uid,
      })
    },
  }
}
