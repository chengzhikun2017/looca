import axios from 'axios'
// 引入store 可以对基础的信息进行配置
import store from '@/store'
// import { HGJ_VUE } from '../main.js'
import helper from '../utils/helper.js'
// import commonRemind from './commonRemind.js'
// const apiUrl='https://hgj.wd577.cn/api'
const apiUrl = '/api'

function handleUnlogin(res) {
  console.log('%c handleUnlogin', 'color:red', )
  // if (!HGJ_VUE.$store.state.account.userId) {
  //   commonRemind.unloginRemind()
  // }

}
const handleUnPayed = (err) => {
  // commonRemind.unPayedRemind(err)
}

function handleWrongCode(res) {
  // HGJ_VUE.hgjAlert(res.message)
}
const handleFetchError = (err) => {
  if (/network error/ig.test(err)) {
    // HGJ_VUE.hgjAlert({
    //   title: '网络错误',
    //   content: '请检查您的网络环境',
    // })
  } else {
    // HGJ_VUE.hgjAlert(err.toString())
  }
}

export default function fetch(options,  {
  resolveAnyway,
  showloading = 1, rejectErr = false,
} = {}) {
  var fetchPromis = new Promise((resolve, reject) => {
    // if (showloading && HGJ_VUE) {
    //   HGJ_VUE.hgjShowLoading()
    // }
    const instance = axios.create({
      // 超时时间设置
      timeout: 30000,
      // 请求的host设置
      baseURL: apiUrl,
      // 通过cookies进行认证
      withCredentials: true,
      // headers: {'Access-Control-Allow-Origin': "*"},
    })
    instance(options).then(response => {
        // status必然是200
        if (showloading && HGJ_VUE) {
          // HGJ_VUE.hgjHideLoading()
        }
        console.log('responese to>>>%c' + options.url, 'color:green', '<<<', response)
        const res = response.data
        if (res.error === 0) {
          resolve(res.data)
        } else {
          // let code=res.error
          if (rejectErr) {
            reject(res)
            return
          }
          switch (res.error) {
            case 20006:
              handleUnlogin(res);
              break;
            case 20200:
              handleUnPayed(res);
              break;
              // case 20040:resolve(res);break;
              // case 20011:handleWrongCode(res);break;
              // case 20012:handleWrongCode(res);break;
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
        if (showloading && HGJ_VUE) {
          // HGJ_VUE.hgjHideLoading()
        }
      })
  })
  return fetchPromis
}

// function simpleFetch(options) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       // 超时时间设置
//       timeout: 6000,
//       // 请求的host设置
//       baseURL: apiUrl,
//       // 通过cookies进行认证
//       withCredentials: true,
//       // headers: {'Access-Control-Allow-Origin': "*"},
//     })
//     instance(options).then(response => {
//         // status必然是200
//         console.log('simpleFetch responese to>>>%c' + options.url, 'color:blue', '<<<', response)
//         const res = response
//         if (res.data.error == 0) {
//           resolve(res)
//         } else {
//           // HGJ_VUE.hgjAlert(res.data.message)
//           reject(res.data)
//         }
//       })
//       .catch(err => {
//         handleFetchError(err)
//       })
//   })
// }
// export { simpleFetch }
