<template>
  <div class="signup-vue">
    <a-form @submit="handleSubmit">
      <!-- component  input key -->
      <a-form-item :wrapperCol="{ span: 24 }" :validateStatus="input.status.phone.validateStatus" :help="input.status.phone.help">
        <a-input placeholder="请输入手机号" ref="inputPhone" v-model="input.values.phone" @blur="onPhoneBlur" @focus="clearValidation('phone')">
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" :validateStatus="input.status.captcha.validateStatus" :help="input.status.captcha.help">
        <a-input placeholder="4位图片验证码" v-model="input.values.captcha" @blur="validate('captcha')" @focus="onFocusCaptcha">
          <a-icon slot="prefix" type="picture" />
          <div class="captcha-box" slot="suffix">
            <img :src="captchaSrc" class="captcha" ref="captchaImg" alt="获取图片码" @click='getCaptcha'>
          </div>
          <!-- <img :src="captchaSrc" alt="" class="captch"> -->
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" :validateStatus="input.status.code.validateStatus" :help="input.status.code.help">
        <a-input placeholder="6位手机验证码" v-model="input.values.code" @blur="validate('code')" @focus="clearValidation('code')">
          <a-icon slot="prefix" type="exclamation-circle-o" />
          <!-- <div class="captcha-box" slot="suffix"></div> -->
          <!-- <img :src="captchaSrc" alt="" class="captch"> -->
          <a-button slot="suffix" :type="codeBtnType" @click.native="sendVerifyCode" :loading="sendingCode" :ghost="codeBtnDisabled">{{codeBtnMsg}}</a-button>
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" type="password" :validateStatus="input.status.password.validateStatus" :help="input.status.password.help">
        <a-input placeholder="密码，至少8位数字+字母" v-model="input.values.password" @focus="clearValidation('password')" @blur="validate('password')">
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item :labelCol="{ span: 24 }" :wrapperCol="{ span: 24 }" v-if="isRegister">
        <a-checkbox>
          记住我
        </a-checkbox>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}">
        <div class="bttn-box">
          <a-button type='primary' htmlType='submit'>
            {{isFindpwd?"修改密码并重新登录":"注册并登录"}}
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import regs from './../../utils/regs.js'
import { mapState, mapMutations
, mapActions, mapGetters } from 'vuex'
import inputHelper from './../../utils/inputHelper.js'
import { ValidationSet } from './../../utils/inputHelper.js'
import inputMixin from './../../components/mixin/input.js'
import helper from './../../utils/helper.js'
export default {
  name: 'signup',
  data() {
    var newInput = new inputHelper.newInput(['phone', "password", "captcha", 'code', ])
    ValidationSet.password(newInput, 'password')
    ValidationSet.phone(newInput, 'phone')
    // newInput.values.phone = "17702103430"
    return {
      input: newInput,
      captchaSrc: '',
      countdown: 60,
      countTimer: null,
      sendingCode: false,
    }
  },
  props: {
    type: {
      default: 1, //1:signup 2:findpwd
      type: Number,
    },
  },
  created() {
    this.getCaptcha()
  },
  mounted() {
    this.$refs.captchaImg.onload = function(...args) {
      // console.log('args', args)
    }
  },
  mixins: [inputMixin],
  methods: {
    startCountdown() {
      this.countTimer = setInterval(() => {
        this.countdown--
          if (this.countdown <= 0) {
            clearInterval(this.countTimer)
            this.countTimer = null
            this.countdown = 60
          }
      }, 1000)
    },
    handleSubmit() {
      let { phone, code, password } = this.formData
      this.signup({
        phone,
        code,
        password,
        save: this.savePassword
      })
    },
    onPhoneBlur() {
      this.validate('phone')
      if (this.valid.phone) {
        let status = this.input.status
        status.phone = inputHelper.createStatus(-1)

        // status = {
        //   validateStatus: "success",
        //   help: "该手机号可以注册"
        // }
        this.isPhoneRegister(this.formData.phone)
          .then(res => {
            console.log('%c res', 'color:red', res)
            if (res.data.status === 1) {
              status.phone = inputHelper.createStatus(2, '该手机号已经被注册')
            } else {
              status.phone = inputHelper.createStatus(0, '该手机号可以注册')
            }
          })
      }

    },
    onFocusCaptcha() {
      this.clearValidation('captcha')
      this.getCaptcha()
    },
    getCaptcha() {
      //todo: 万一没有手机号
      //判断phone  validation
      let url = helper.urlConcat('/account/captcha', {
        phone: this.formData.phone,
        v: (new Date()).getTime()
      })
      this.captchaSrc = '/api' + url
    },
    sendVerifyCode() {
      if(this.codeBtnDisabled){
        return
      }
      let phone = this.formData.phone
      let code = this.formData.captcha
      this.sendingCode = true
      this.getVerifyCode({ phone, code })
        .then((res) => {
          if (res.error === 0 && res.message === "success") {
            this.startCountdown()
          }
        })
        .finally(() => {
          this.sendingCode = false
        })
    },
    ...mapActions('account', ['getVerifyCode', 'signup', 'isPhoneRegister'])
  },
  computed: {
    codeBtnType() {
      // if(this.sendingCode){
      //   return "loading"
      // }
      return "primary"
    },
    isRegister() {
      return this.type === 1
    },
    isFindpwd() {
      return this.type === 2
    },
    codeBtnDisabled() {
      return this.countTimer !== null || this.sendingCode
    },
    codeBtnMsg() {
      if (this.codeBtnDisabled) {
        return `${this.countdown}s后获取`
      } else {
        return "获取验证码"
      }
    },
  },
  watch: {
    'formData.phone' (v) {
    },
  },
  components: {},
}

</script>
<style lang='scss' scoped>
.captcha-box {
  width: 75px;
  border: 1px solid transparent;
  height: 100%;
  overflow: hidden;
}

.captcha {
  height: 108%;
  margin-left: -1px;
  margin-top: -1px;
}

</style>
<style lang="scss">
.signup-vue {
  .ant-input-suffix {
    height: 100%;
    right: 0;
  }
  .ant-btn {
    width: 100%;
  }
  .ant-input-suffix .ant-btn{
    width: 120px;

  }
}

</style>
