import router from '../router'
import config from '../config.js'
import helper from './helper.js'
class input {
  constructor(keys) {
    this.values = {}
    this.status = {}
    this.validation = {}
    // this.inputHelper = inputHelper
    keys.forEach((key) => {
        this.values[key] = ""
        this.status[key] = {}
        this.validation[key] = ()=>{}
      }
    )
  }
  clearStatus(key){
    this.status[key] = {}
  }
  setValidation(key,func){
    this.validation[key] = ()=>{
      // console.log('%c this','color:red',this)
      this.status[key] = func(this.values[key])
    }
  }
}
class InputHelper {
  _status = {
    empty: {
      validateStatus: "error",
      help: "不能为空"
    }
  }
  newInput = input
  inputedFlag(input) { //absoleted
    let obj = {}
    for (let key in input) {
      obj[key] = false
    }
    return obj
  }
  createStatus(status, help) { // -1 validating,0 success,1 warning,2 error
    if (!helper.isString(status)) {
      if (!helper.isNum(status)) {
        console.error(`${status}is not a num or a string`)
      } else {
        switch (status) {
          case -1:
            status = 'validating';
            break;
          case 0:
            status = 'success';
            break;
          case 1:
            status = 'warning';
            break;
          case 2:
            status = 'error';
            break;
        }
      }
    }
    return {
      validateStatus: status,
      help: help,
    }
  }

  get statusEmpty() {
    return this._status.empty
  }
}
var inputHelper = new InputHelper()
export default inputHelper
