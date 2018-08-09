 // import fetch from '../../utils/fetch.js'
// import {
  // simpleFetch
// } from '../../utils/fetch.js'
// import {HGJ_VUE} from '../../main.js'
import helper from '../utils/helper.js'
const platform = helper.getPlatForm()
const isPC = helper.isPC()
const saveAccount = (account,password) => {
  localStorage.account=account
  localStorage.password=password
}
class defaultAccountInfo {
  constructor(props) {
    this.ancestor = null
    this.qudao = null
    this.phone = ''
    this.captcha = ''
    this.verifyCode = ''
    this.userId = null
    this.isRealNamed = false
    this.name = null
    this.idCardNo = null
    this.isLoged = false
    this.jf = 0
    this.money = 0
    this.qrcodeUrl = ''
    this.userId = null
    this.unfreezeMoney = 0
    this.freezeMoney = 0
    this.isActive = 0
    this.level = 0
    this.freePlanTimes = 0
  }
}

export default {
  namespaced:true,
  state: new defaultAccountInfo(),
  getters: {},
  mutations: {
    shareInfoSet(s, { qudao, ancestor, uid }) {
      // console.log('shareInfoSet commit',qudao,ancestor,uid)
      s.qudao = qudao
      // s.ancestor=ancestor
      s.ancestor = uid
    },
    setActived(s) {
      s.isActive = true
    },
    setPhone(s, phone) {
      s.phone = phone
    },
    setCaptcha(s, captcha) {
      s.captcha = captcha
    },
    setVerifyCode(s, code) {
      s.verifyCode = code
    },
    reset(s) {
      var info = new defaultAccountInfo()
      for (let key in info) {
        s[key] = info[key]
      }
    },
  },
  actions: {
    logoutReset({ state, dispatch, commit }) {
      console.log('reset')
      commit('account/reset')
    },
    isPhoneRegister(context, phone) {
      var promise = fetch({
        // method:'get',
        url: '/account/isPhoneRegister',
        params: {
          phone: phone
        },
      })
      return promise
    },
    getVerifyCode(context, code) {
      console.log('code', code)
      // return
      let promise = fetch({
        url: '/account/sendVerifyCode',
        params: {
          phone: context.state.phone,
          code: code
        },
      })
      promise.then(res => {
        HGJ_VUE.hgjToast('已发送')
      }, err => {})
      return promise
    },
    signUp({ state }, { password, code }) {
      var promise = fetch({
        url: 'account/register',
        params: {
          phone: state.phone,
          code: code, // 存不存store?
          password: password,
          ancestor: state.ancestor,
          qudao: state.qudao,
        }
      })
      promise.then(res => {
        state.isLoged = true
        helper.getInitialInfo()
        //save to local
      })
      return promise
    },
    login({ state, dispatch }, { phone, pwd }) {
      var loginPromise = fetch({
        url: 'account/login',
        params: {
          phone: phone,
          password: pwd,
        }
      })
      loginPromise.then(res => {
        console.log('res account login', res)
        state.userId = res.userId
        state.isLoged = true
        state.phone = phone
        helper.getInitialInfo()
        saveAccount(phone,pwd)
      })
      return loginPromise
    },
    logout({ commit, dispatch }) {
      HGJ_VUE.hgjAlert({
        title: '退出登录',
        options: [{
          text: '确认',
          callback: () => {
            var promise = simpleFetch({
              url: 'account/logout',
            })
            promise.then(res => {
              console.log('res log out', res)
              if (res.data.error === 0) {
                HGJ_VUE.hgjToast({
                  content: '已登出',
                  cbEntered: () => {
                    helper.resetInitialInfo()
                    commit('router_willBackToIndex')
                    dispatch('market_resetList')
                    helper.goPage(-1)
                  },
                })
              }
            })
          }
        }, {
          text: '取消',
        }],
      })

      // return promise
    },
    checkSession({ commit, dispatch }) {
      var promise = simpleFetch({
        url: 'account/checkSession',
      })
      promise.then(res => {
        if (res.data.data && res.data.data.userId) {
          // dispatch('getUserInfo')
          helper.getInitialInfo()
        } else if (res.data.message === '请登录') {
          console.log('未登录')
        }
      })
      return promise
    },
    getUserInfo({ state }, params) {

      if (params == undefined || params.showLoading == undefined) {
        var showLoading = false
      }
      return new Promise((resolve, reject) => {
        fetch({
          url: 'profile/info',
        }, showLoading).then(res => {
          for (let key in res) {
            state[key] = res[key]
          }
          if (res.name && res.idCardNo) {
            state.isRealNamed = true
            state.name = res.name
            state.idCardNo = res.idCardNo
          }
          if (res.userId) {
            state.userId = res.userId
            state.isLoged = true
          }
          resolve(res)
          // helper.getInitialInfo()
        })
      })

    },
    realNameVerify({ state }, { name, idCardNo }) {
      console.log('name,idCardNo%c', 'color:red', name, idCardNo)
      var promise = fetch({
        url: 'profile/realName',
        params: {
          name,
          idCardNo,
        },
      })
      promise.then(res => {
        console.log('real name verify ', res)
        state.name = name
        state.idCardNo = idCardNo
      })
    },
    modifyPwd({}, { password, newPassword }) {
      fetch({
        url: 'profile/modifyPwd',
        params: {
          password,
          newPassword,
        },
      })
    },
    findPwd({ state, dispatch }, { phone, code, password }) {
      var promise = fetch({
        url: 'account/findPwd',
        params: {
          phone,
          code,
          password,
        },
      })
      promise.then(res => {
        dispatch('account/getUserInfo')
      })
      return promise
    },
  }
}

