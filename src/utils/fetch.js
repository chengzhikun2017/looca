import axios from 'axios'
// 引入store 可以对基础的信息进行配置
import store from '@/store'
import { vueApp } from '../main.js'
import helper from '../utils/helper.js'
// import commonRemind from './commonRemind.js'
const apiUrl = '/api'

function handleUnlogin(res) {
  console.log('%c handleUnlogin', 'color:red', )
  // if (!vueApp.$store.state.account.userId) {
  //   commonRemind.unloginRemind()
  // }

}
const handleUnPayed = (err) => {
  // commonRemind.unPayedRemind(err)
}

function handleWrongCode(res) {
  vueApp.$message.error(res.message)
}
const handleFetchError = (err,options) => {
  console.error("err",err,options)
  if (/network error/ig.test(err)) {
    vueApp.$modal.info({
      title: '网络错误',
      content: '请检查您的网络环境',
    })
  } else {
    vueApp.$modal.info({
      title:"error",
      content:err.toString()
    })
  }
}

export default function fetch(options, {
  resolveAnyway = false,
  showLoading = 1,
  showPageLoading = 0,
  rejectErr = false,
  simple = false,
} = {}) {
  // console.log('%c options', 'color:red', resolveAnyway, showLoading, rejectErr, simple)
  if (showLoading && vueApp) {
    vueApp.$showLoading()
  }else{
    showLoading = false
  }
  if (showPageLoading && vueApp) {
    vueApp.$showPageLoading()
  }else{
    showPageLoading = false
  }
  const instance = axios.create({
    // 超时时间设置
    timeout: 60000,
    // 请求的host设置
    baseURL: apiUrl,
    // 通过cookies进行认证
    withCredentials: true,
    // headers: {'Access-Control-Allow-Origin': "*"},
  })
  var fetchPromise = new Promise((resolve, reject) => {
    instance(options).then(response => {
        // status必然是200
        if (showLoading && vueApp) {
          vueApp.$hideLoading()
        }
        console.log('responese to>>>%c' + options.url, 'color:green', '<<<', response)
        let res = response.data
        if (res.error === 0) {
          if (simple) {
            resolve(res)
          } else {
            resolve(res.data)
          }
        } else {
          switch (res.error) {
            case 20006:
              // handleUnlogin(res);
              break;
            case 20200:
              // handleUnPayed(res);
              break;
              // case 20040:resolve(res);break;
              // case 20006:console.log('code 20006');break;
            default:
              handleWrongCode(res)
          }
          if (resolveAnyway) {
            resolve(res)
          }
          if (rejectErr) {
            reject(res)
            // return
          }
        }
      })
      .catch(err => {
        console.log('err', err)
        handleFetchError(err,options)
      })
      .finally(() => {
        if (showLoading && vueApp) {
          vueApp.$hideLoading()
        }
        if (showPageLoading && vueApp) {
          vueApp.$hidePageLoading()
        }
      })
  })
  return fetchPromise
}
