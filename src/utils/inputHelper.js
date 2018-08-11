import router from '../router'
import config from '../config.js'
import helper from './helper.js'
class input {
  constructor(keys) {
    this.values = {}
    this.status = {}
    this.validation = {}
    this.valid = {}
    // this.inputHelper = inputHelper
    keys.forEach((key) => {
        this.values[key] = ""
        this.status[key] = {}
        this.valid[key] = false
        this.validation[key] = ()=>{
          return inputHelper.right
        }
      }
    )
  }
  get allValid(){
    let valid = this.valid
    let flag = true
    for(let key in valid){
      if(!valid[key]){
        flag = false
        break
      }
    }
    return flag
  }
  clearStatus(key){
    let status = this.status[key]
    console.log('this',this)
    for(let key in status){
      status[key] = ''
    }
  }
  setValidation(key,func){
    this.validation[key] = ()=>{
      // console.log('%c this','color:red',this)
      let result = func(this.values[key])
      if(result===undefined){
        this.status[key] = inputHelper.right
        this.valid[key] = true
      }else{
        this.valid[key] = false
        this.status[key] = result
      }
    }
  }
  validateAll(){
    let validations = this.validation
    for(let key in validations){
      validations[key]()
    }
    return this.allValid
  }
}
class InputHelper {
  _status = {
    empty: {
      validateStatus: "error",
      help: "不能为空"
    },
    right:{
      validateStatus: "success",
      help: "",
    },
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
  get right(){
    return this._status.right
  }
}
var inputHelper = new InputHelper()
export default inputHelper
