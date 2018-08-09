<template>
  <div class="signup-vue">
    <a-form @submit="handleSubmit">
      <!-- component  input key -->
      <a-form-item :wrapperCol="{ span: 24 }" :validateStatus="input.status.phone.validateStatus" :help="input.status.phone.help">
        <a-input placeholder="123" ref="inputPhone" v-model="input.values.phone" @blur="validate('phone')" @focus="clearValidation('phone')">
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" :validateStatus="input.status.captcha.validateStatus" :help="input.status.captcha.help">
        <a-input placeholder="123" v-model="input.values.captcha" @blur="validate('captcha')" @focus="onFocusCaptcha">
          <a-icon slot="prefix" type="picture" />
          <div class="captcha-box" slot="suffix">
            <img :src="captchaSrc" class="captcha" ref="captchaImg" alt="获取图片码" @click='getCaptcha'>
          </div>
          <!-- <img :src="captchaSrc" alt="" class="captch"> -->
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" :validateStatus="input.status.code.validateStatus" :help="input.status.code.help">
        <a-input placeholder="123" v-model="input.values.code" @blur="validate('code')" @focus="clearValidation('code')">
          <a-icon slot="prefix"  type="exclamation-circle-o" />
          <!-- <div class="captcha-box" slot="suffix"></div> -->
          <!-- <img :src="captchaSrc" alt="" class="captch"> -->
          <a-button slot="suffix" :type="codeBtnType" @click.native="sendVerifyCode">发送验证码</a-button>
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" :validateStatus="input.status.password.validateStatus" :help="input.status.password.help">
        <a-input v-model="input.values.password" @focus="clearValidation('password')">
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item :labelCol="{ span: 24 }" :wrapperCol="{ span: 24 }">
        <a-checkbox>
          记住我
        </a-checkbox>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}">
        <div class="bttn-box">
          <a-button type='primary' htmlType='submit'>
            Submit
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import regs from './../../utils/regs.js'
import {mapState,mapMuations,mapActions,mapGetters} from 'vuex'
import inputHelper from './../../utils/inputHelper.js'
import inputMixin from './../../components/mixin/input.js'
import helper from './../../utils/helper.js'
export default {
  name: 'signup',
  data() {
    var newInput = new inputHelper.newInput(['phone', "password", "captcha", 'code', ])
    newInput.values.phone = "15317077361"
    return {
      codeBtnType: "primary",
      input: newInput,
      captchaSrc: '',
    }
  },
  created() {
    this.getCaptcha()
  },
  mounted() {
    this.$refs.captchaImg.onload = function(...args) {
      console.log('args', args)
    }
  },
  mixins: [inputMixin],
  methods: {
    handleSubmit() {
      let {phone,code,password} = this.formData
      this.signup({
        phone,
        code,
        password,
      })
    },

    onFocusCaptcha() {
      this.clearValidation('captcha')
      this.getCaptcha()
    },
    getCaptcha() {
      //todo: 万一没有手机号
      
      let url = helper.urlConcat('/account/captcha', {
        phone: this.formData.phone,
        v: (new Date()).getTime()
      })
      console.log('%c url', 'color:red', url)
      this.captchaSrc = '/api' + url
    },
    sendVerifyCode() {
      let phone = this.formData.phone
      let code = this.formData.captcha
      this.getVerifyCode({phone,code})
    },
    ...mapActions('account',['getVerifyCode','signup','isPhoneRegister'])
  },
  computed: {

  },
  watch: {
    'formData.phone'(v) {

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
}

</style>
