import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
import router from './../router'
const platform = helper.getPlatForm()
const isPC = helper.isPC()
const saveAccount = (account, password) => {
  localStorage.account = account
  localStorage.password = password
}
class defaultAccountInfo {
  constructor(props) {
    this.verifyCode = ''
    this.ancestor = null
    this.saleWay = null
    this.phone = ''
    // this.captcha = ''
    this.userId = null
    this.isRealNamed = ''
    // this.name = null
    // this.idCardNo = null
    this.isLoged = ''
    this.jf = 0
    this.money = 0
    // this.qrcodeUrl = ''
    this.userId = null
    this.unfreezeMoney = 0
    this.freezeMoney = 0
    this.isActive = 0
    // this.level = 0
    this.freePlanTimes = 0
    this.registerTime = null
    this.share={
      brokerage:0,
      level:0,
      qrcodeUrl:'',
    }
    this.identity = {
      idCardNo:"",
      name:"",
      email:"",
    }
    this.authInfo={}
    this.isFindpwd= false
  }
}

export default {
  namespaced: true,
  state: new defaultAccountInfo(),
  getters: {
    realNameAuthed(state){
      return state.authInfo.status === 2
    },
    realNameLoaded(state){
      return state.authInfo.status > 0
    },
  },
  mutations: {
    setQudao(state,qudao) {
      console.log('%c qudao','color:red',qudao)
      state.saleWay = qudao
    },
    setShareInfo(s, { qudao, ancestor, uid }) {
      // console.log('shareInfoSet commit',qudao,ancestor,uid)
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
    reset(state) {
      console.log('%c reset account','color:red',)
      var info = new defaultAccountInfo()
      // for (let key in info) {
      //   state[key] = info[key]
      // }
      Object.assign(state,info)
      state.isLoged = false
    },
    setFindPwd(state,status){
      state.isFindpwd = status
    },
  },
  actions: {
    logoutReset({ state, dispatch, commit }) {
      commit('account/reset')
    },
    isPhoneRegister(context, phone) {
      var promise = fetch({
        // method:'get',
        url: '/account/isPhoneRegister',
        params: {
          phone: phone
        },
      }, { simple: true, showLoading: 0 })
      return promise
    },
    getVerifyCode(context, { phone, code, }) {
      let promise = fetch({
        url: '/account/sendVerifyCode',
        params: {
          phone,
          code,
        },
      }, {
        simple: true,
        showLoading: false,
        resolveAnyway: true,
      })
      promise.then(res => {
        if (res.error === 0) {
          vueApp.$message.info("已发送")
        }
      })
      return promise
    },
    signup({ state , dispatch }, { phone, password, code, save }) {
      var promise = fetch({
        url: 'account/register',
        params: {
          phone: phone,
          code: code, // 存不存store?
          password: password,
          ancestor: state.ancestor,
          qudao:state.saleWay,
        }
      })
      promise.then(res => {
        // this.checkSession()
        // dispatch('checkSession')
        state.isLoged = true
        helper.getInitialInfo()
        if (save) {
          saveAccount(phone, password)
        }
        //save to local
      })
      return promise
    },
    login({ state, dispatch }, { phone, password, save }) {
      var loginPromise = fetch({
        url: 'account/login',
        params: {
          phone: phone,
          password: password,
        }
      })
      loginPromise.then(res => {
        console.log('res account login', res)
        state.userId = res.userId
        state.isLoged = true
        helper.getInitialInfo()
        if (save) {
          saveAccount(phone, password)
        }
        vueApp.$message.info('已登录')
      })
      return loginPromise
    },
    logout({ commit, dispatch }) { //todo :use modal
      vueApp.$modal.confirm({
        title: '登出',
        content: '确认退出Looco?',
        onOk() {
          var promise = fetch({
            url: 'account/logout',
          }, {
            simple: true,
          })
          promise.then(res => {
            console.log('res log out', res)
            if (res.error === 0) {
              vueApp.$message.info("已登出")
              helper.resetInitialInfo()
            }
          })
        },
      })
    },
    checkSession({ commit, state, dispatch }) {
      var promise = fetch({
        url: 'account/checkSession',
      }, {
        simple: true,
        // showloading: false,
      })
      promise.then(res => {
        if (res.data && res.data.userId) {
          helper.getInitialInfo()
        } else {
          state.isLoged = false
          if (res.message === '请登录') {
            console.log('未登录')
          } else if (res.message === '请重新登录') {
            console.log('请重新登录')
          }
        }
      })
      return promise
    },
    getAuthInfo({state,getters,rootState},{isInitingApp=true}={}) {
      // 0等待认证、1等待审核、2认证通过、3认证失败 
      console.log('%c isInitingApp','color:red',isInitingApp)
      var promise = fetch({
        url: "/auth/info"
      })
      // todo init info 之后判断
      // 
      promise.then(res=>{
        state.authInfo = res
        if(!getters.realNameAuthed){
          setTimeout(function() {
            router.replace('/mine_real')
          },50)
        }else{
          if(!rootState.app.isPC && isInitingApp){
            console.log('%c replace to mt4 overview','color:red',)
            setTimeout(function() {
              router.replace('/mt4_overview')
            }, 50);
          }
        }
      })
      return promise
    },
    getUserInfo({ state }, params) {
      if (params == undefined || params.showLoading == undefined) {
        var showLoading = false
      }
      var promise = fetch({
        url: 'profile/info',
      }, showLoading)
      promise.then(res => {
        for (let key in res) {
          state[key] = res[key]
        }
        let identity = res.identity
        if (identity.name && identity.idCardNo) {
          state.isRealNamed = true
        }else{
          state.isRealNamed = false
        }
        if (res.userId) {
          state.userId = res.userId
          state.isLoged = true
        }
        // helper.getInitialInfo()
      })
      return promise
    },
    authVerify({ state ,dispatch}, params) {
      //{ idCardUrl, idCardUrl2, idCardNo, name, email, }
      var promise = fetch({
        url: 'auth/identity',
        params,
      },{
        rejectErr:true,
      })
      promise.then(res => {
        dispatch('getAuthInfo')
      })
      return promise
    },
    modifyPwd({}, { password, newPassword }) {
      return fetch({
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
      return promise
    },
  }
}
