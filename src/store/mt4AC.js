import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()
class defaultMt4InfoAC {
  constructor(props) {
    this.list = []
    this.countNormal = 0
    this.countFollow = 0
    this.loadingList = false
    this.syncSuccess = false
    this.currentMt4Info = {}
    this.currentMt4Uid = helper.getLocalStorage('currentMt4Uid')
  }
}

export default {
  namespaced: true,
  state: {
    ...new defaultMt4InfoAC(),
    listGot:false,
  },
  getters: {
    hasCurrentStorage() {
      return !!helper.getLocalStorage('currentMt4Uid')
    },
    currentSavedMt4Uid(){
      return helper.getLocalStorage('currentMt4Uid')
    },
  },
  mutations: {
    setCurrent(s, id) {
      s.currentMt4Uid = id
      helper.resetStoreTrade()
      // console.log('%c s.list','color:red',s.list)
      s.currentMt4Info = s.list.find((item) => {
        return item.mt4Uid === id 
      })
      helper.saveToLocal('currentMt4Uid', id)
    },
    resetList(s) {
      s.list = []
    },
    resetCurrent(s) {
      helper.removeLocal('currentMt4Uid')
    },
  },

  actions: {
    setDefaultCurrent({ state, commit, dispatch }) {
      commit('setCurrent', state.list[0].mt4Uid)
    },
    getList({ state, getters, dispatch, commit }) {
      console.log('%c get  list','color:red',)
      // state.listGot = false //静默 获取mt4 list, 如果获取之后再获取，不设置成false
      state.listGot = false
      state.loadingList = true
      state.list = []
      var promise = fetch({
        url: "mt4Account/list",
      }, {
        rejectErr: true,
        showLoading: false,
      })
      promise.then(res => {
          let tempArr = []
          let tempVip = []
          state.countNormal=0
          state.countFollow=0
          res.data.forEach((item) => {
            if(item.type==='normal') {
              tempArr.push(item)
              state.countNormal++
            }else if(item.type==='follow'){
              tempArr.unshift(item)
              state.countFollow++
            }else{
              tempVip.push(item)
            }
          })
          state.list = tempVip.concat(tempArr)
          state.syncSuccess = res.syncSuccess
          if (!getters.hasCurrentStorage) {
            dispatch('setDefaultCurrent')
          }else {
            commit('setCurrent',getters.currentSavedMt4Uid)
          }
          state.listGot = true
        })
        .catch(err => {
          // if (err.error === 20003) {
          //   dispatch('getList')
          // }
        })
        .finally(() => {
          state.loadingList = false
        })
      return promise
    },
    create({dispatch}, params) {
      // console.log('%c params','color:red',params)
      let promise = fetch({
        //server: 服务器: live实盘，demo模拟盘
        //password: 交易密码（必须包含数字和字母，6位以上）
        //password2: 只读密码（必须包含数字和字母，6位以上）
        url: 'mt4Account/create',
        params,
      })
      promise.then(res => {
        vueApp.$message.info("创建成功")
        dispatch('getList')
      })
      return promise
    },
    bindAC({dispatch}, { mt4Uid, password }) {
      var promise = fetch({
        url: 'mt4Account/bind',
        params: {
          mt4Uid,
          password,
        },
      })
      promise.then(res => {
        dispatch('getList')
        vueApp.$message.info('绑定成功')
      })
      return promise
    },
    modifyPwd({}, params) {
      // mt4Uid: MT4账号
      // password: 交易密码
      // newPassword: 新的密码，（必须包含数字和字母，6位以上）
      // type: 修改密码类型： main 为交易密码， investor 为只读密码
      let promise = fetch({
        url: "mt4Account/modifyPwd",
        params,
      })
      promise.then(() => {
        vueApp.$message.info('修改成功')
      })
      return promise
    },
    findPwd({}, mt4Uid) {
      var promise = fetch({
        url: "mt4Account/findPwd",
        params: {
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
