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
  // vueApp.hgjAlert(res.message)
}
const handleFetchError = (err) => {
  if (/network error/ig.test(err)) {
    vueApp.hgjAlert({
      title: '网络错误',
      content: '请检查您的网络环境',
    })
  } else {
    vueApp.hgjAlert(err.toString())
  }
}

export default function fetch(options, {
  resolveAnyway = false,
  showLoading = 1,
  rejectErr = false,
  simple = false,
} = {}) {
  var fetchPromis = new Promise((resolve, reject) => {
    console.log('%c options', 'color:red', resolveAnyway, showLoading, rejectErr, simple)
    if (showLoading && vueApp) {
      vueApp.$showLoading()
    }else{
      showLoading = false
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
    instance(options).then(response => {
        // status必然是200
        if (showLoading && vueApp) {
          vueApp.$hideLoading()
        }
        // console.log('responese to>>>%c' + options.url, 'color:green', '<<<', response)
        let res = response.data
        if (res.error === 0) {
          if (simple) {
            resolve(res)
          } else {
            resolve(res.data)
          }
        } else {
          // let code=res.error
          if (rejectErr) {
            reject(res)
            return
          }
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
        }
      })
      .catch(err => {
        console.log('err', err)
        handleFetchError(err)
      })
      .finally(() => {
        if (showLoading && vueApp) {
          // vueApp.$hideLoading()
        }
      })
  })
  return fetchPromis
}
