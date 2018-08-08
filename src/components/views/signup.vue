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
        <a-input placeholder="123" v-model="input.values.captcha" @blur="validate('captcha')" @focus="clearValidation('captcha')">
          <a-icon slot="prefix" type="picture" />
          <div class="captcha-box" slot="suffix"></div>
          <!-- <img :src="captchSrc" alt="" class="captch"> -->
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" :validateStatus="input.status.captcha.validateStatus" :help="input.status.captcha.help">
        <a-input-search placeholder="123" v-model="input.values.captcha" @blur="validate('captcha')" @focus="clearValidation('captcha')">
          <a-icon slot="prefix" type="picture" />
          <!-- <div class="captcha-box" slot="suffix"></div> -->
          <!-- <img :src="captchSrc" alt="" class="captch"> -->
          <a-button slot="enterButton" :type="codeBtnType">发送验证码</a-button>
        </a-input-search>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 12 }" :validateStatus="'warning'">
        <a-input v-model="input.values.password">
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
import inputHelper from './../../utils/inputHelper.js'
import inputMixin from './../../components/mixin/input.js'
export default {
  name: 'signup',
  data() {
    var newInput = new inputHelper.newInput(['phone', "password", "captcha", 'code', ])
    return {
      codeBtnType: "primary",
      input: newInput,
      captchSrc: '',
    }
  },
  mixins: [inputMixin],
  methods: {
    handleSubmit() {

    },
  },
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>
.captcha-box {
  width: 80px;
  border: 1px solid red;
  height: 100%;
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
