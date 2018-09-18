import router from '../router'
import config from '../config.js'
import helper from './helper.js'
import regs from './regs.js'
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
          this.status[key] = inputHelper.right
          this.valid[key] = true
        }
        return true
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
  validate(keys){
    let validations = this.validation
    keys.forEach((key) => {
      validations[key]()
    })
    let flag = true
    ,len = keys.length
    ,valid = this.valid
    for(let i=0;i<len;i++){
      if(!valid[keys[i]]){
        flag = false
        break
      }
    }
    return flag
  }
  clearStatus(key){
    let status = this.status[key]
    for(let key in status){
      status[key] = ''
    }
  }
  setValidation(key,func){
    this.validation[key] = ()=>{
      let result = func(this.values[key])
      if(result===undefined){
        this.status[key] = inputHelper.right
        this.valid[key] = true
        return true
      }else{
        this.valid[key] = false
        this.status[key] = result
        return false
      }
    }
  }
  validateAll(){
    let validations = this.validation
    for(let key in validations){
      validations[key]()
    }
    console.log('%c this.allValid','color:red',this)
    return this.allValid
  }
  clearValues(){
    for(let key in this.values){
      this.values[key] = ""
    }
  }
}
var ValidationSet ={}

ValidationSet.bankCard = function(input,keyName){
  input.setValidation(keyName, (value) => {
    if (!value) {
      return inputHelper.createStatusEmpty('卡号')
    } else if (!regs.bankCard.test(value)) {
      return inputHelper.createStatus(2, "卡号格式不正确")
    }
  })
}

ValidationSet.phone = function(input,keyName){
  input.setValidation(keyName, (value) => {
    if (!value) {
      return inputHelper.createStatusEmpty('手机号码')
    } else if (!regs.phone.test(value)) {
      return inputHelper.createStatus(2, "手机格式不正确")
    }
  })
}

ValidationSet.password = function(input,keyName){
  input.setValidation(keyName, (value) => {
    if (!value) {
      return inputHelper.createStatusEmpty('密码')
    } else if (!regs.password.test(value)) {
      return inputHelper.createStatus(2, "密码格式不正确")
    }
  })
}
ValidationSet.name = function(input,keyName){
  input.setValidation(keyName, (value) => {
    if (!value) {
      return inputHelper.createStatusEmpty('姓名')
    } 
  })
}
ValidationSet.mt4Pwd = function(input,keyName){
  input.setValidation(keyName, (value) => {
    if (!value) {
      return inputHelper.createStatusEmpty('密码')
    } else {
      let result = regs.testMt4Pwd(value)
      if (result!==true) {
        return inputHelper.createStatus(2, result)
      }
    }
  })
}
ValidationSet.code6 = function(input,keyName){
  input.setValidation(keyName, (value) => {
    if (!value) {
      return inputHelper.createStatusEmpty('验证码')
    } else if (!regs.code6.test(value)) {
      return inputHelper.createStatus(2, "验证码格式不正确")
    }
  })
}

ValidationSet.code4 = function(input,keyName){
  input.setValidation(keyName, (value) => {
    if (!value) {
      return inputHelper.createStatusEmpty('验证码')
    } else if (!regs.code4.test(value)) {
      return inputHelper.createStatus(2, "验证码格式不正确")
    }
  })
}

ValidationSet.id = function(input,keyName){
  input.setValidation(keyName, (value) => {
    if (!value) {
      return inputHelper.createStatusEmpty('身份证号码')
    } else if (!regs.ID.test(value)) {
      return inputHelper.createStatus(2, "身份证号码格式不正确")
    }
  })
}

ValidationSet.email = function(input,keyName){
  input.setValidation(keyName, (value) => {
    if (!value) {
      return inputHelper.createStatusEmpty('邮箱')
    } else if (!regs.email.test(value)) {
      return inputHelper.createStatus(2, "邮箱格式不正确")
    }
  })
}

ValidationSet.amount = function(input,keyName){
  input.setValidation(keyName, (value) => {
    if (!value) {
      return inputHelper.createStatusEmpty('金额')
    } else if (!regs.amount.test(value)) {
      return inputHelper.createStatus(2, "邮箱格式不正确")
    }
  })
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
  ValidationSet = ValidationSet
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
  createStatusEmpty(inputName){
    return this.createStatus(2,inputName+'不能为空')
  }
  get statusEmpty() {
    return Object.assign({},this._status.empty)
  }
  get right(){
    return Object.assign({},this._status.right)
  }
}
var inputHelper = new InputHelper()
export default inputHelper
export{
  ValidationSet,
}
