import fetch from './../utils/fetch.js'
import helper from '../utils/helper.js'
import { vueApp } from './../main.js'
class defaultInfo {
  constructor(props) {
    this.name = null
    // this.idCardNo=null
    this.idCardNo = null
    this.phone = null
    // this.cardNo='6214852109847213'
    this.cardNo = null
    // '6217850800002045332'
  }
}
export default {
  namespaced: true,
  state: {
    // cardsListCC: [],
    listDC: [],
    listGot:false,
    cardIdSC: null,
    cardsDict: {
      'ICBC': '工商银行',
      'ABC': '农业银行',
      'BOC': '中国银行',
      'CCB': '建设银行',
      'CMB': '招商银行',
      'PSBC': '邮政储蓄',
      'CITIC': '中信银行',
      'CEB': '光大银行',
      'COMM': '交通银行',
      'CIB': '兴业银行',
      'CMBC': '民生银行',
      'SPABANK': '平安银行',
      'GDB': '广发银行',
      'BJBANK': '北京银行',
      'HXBANK': '华夏银行',
      'SPDB': '浦发银行',
      'SHBANK': '上海银行',
      'BOHAIB': '渤海银行',
      'JSBANK': '江苏银行'
    },
    newInfo: new defaultInfo(),
  },
  getters: {},
  mutations: {
    // clearListCC(s) {
    //   s.cardsListCC = []
    // },
    clearListDC(s) {
      s.listDC = []
      s.listGot = false
    },
    setInfoDC(s, cardInfoObj) {
      for (let key in s.newInfo) {
        if (cardInfoObj.hasOwnProperty(key)) {
          s.newInfo[key] = cardInfoObj[key]
        }
      }
    },
    resetInfoDC(s) {
      console.log('%c addCardDC_resetValue', 'color:red')
      s.newInfo = new defaultInfo()
    },
    setListGot(s,status){
      if(status===undefined){
        s.listGot = false
        // store.dispatch('cards/getListDC')
      }else{
        s.listGot = true
      }
    },
  },
  actions: {
    getInfoDC({}, cardNo) {
      return fetch({
        url: 'card/info',
        params: {
          cardNo,
        },
      })
    },
    reGetListDC({dispatch,commit}){
      commit('setListGot')
      dispatch('getListDC')
    },
    getListDC({ state }) {
      if(state.listGot){
        return
      }
      let promise = fetch({
        url: 'bankCard/list',
      }).then(res => {
        // console.log('%c res','color:red',res)
        state.listDC = res
        state.listGot = true
      })
      return promise
    },
    addDC(store, { name,  cardNo, bankName,bankBranch}) {
      var promise = fetch({
        url: 'bankCard/add',
        // method:'post',
        params: {
         name,cardNo, bankName,bankBranch,
        },
      })
      promise.then(res => {
        vueApp.$message.info("添加成功")
        store.dispatch("reGetListDC")
      })
      return promise
    },
    delDC({ state, dispatch }, cardNo) {
      var promise = fetch({
        url: 'bankCard/del',
        // method:'post',
        params: {
          cardNo,
        },
      },{
        simple:true,
      })
      promise.then(res => {
        console.log('%c res','color:red',res)
        if (res.error===0 && res.message === 'success') {
          vueApp.$message.info('已删除')
          dispatch("reGetListDC")
        }
      })
      return promise
    },
  }
}
