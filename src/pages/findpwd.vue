<template>
  <div class="findpwd-page">
    <SignUp :type="2"></SignUp>
    <!-- <a-form @submit="handleSubmit">
      <a-form-item :wrapperCol="{ span: 18 }" label='原密码' :labelCol="{ span: 6 }" :validateStatus="input.status.password.validateStatus" :help="input.status.password.help">
        <a-input placeholder="请输入原密码" type="password" ref="inputPassword" v-model="input.values.password" @blur="validate('password')" @focus="clearValidation('password')">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='新密码' :labelCol="{ span: 6 }" :validateStatus="input.status.newPassword.validateStatus" :help="input.status.newPassword.help">
        <a-input placeholder="请输入新密码" type="password" ref="inputnewPassword" v-model="input.values.newPassword" @blur="validate('newPassword')" @focus="clearValidation('newPassword')">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}">
        <div class="bttn-box">
          <a-button type='primary' htmlType='submit'>
            提交
          </a-button>
        </div>
      </a-form-item>
    </a-form> -->
  </div>
</template>
<script>
import inputMixin from './../components/mixin/input.js'
import inputHelper from './../utils/inputHelper.js'
import { ValidationSet } from './../utils/inputHelper.js'
import {mapState,mapMuations,mapActions,mapGetters} from 'vuex'
import SignUp from "./../components/views/signup.vue"

export default {
  name: 'findpwd',
  data() {
    // let newInput = new inputHelper.newInput(['password','newPassword'])
    // ValidationSet.password(newInput,'password')
    // ValidationSet.password(newInput,'newPassword')
    return {
      // input: newInput,
    }
  },
  mixins: [inputMixin],
  methods: {
    // handleSubmit(){
    //   this.modifyPwd({
    //     password:this.formData.password,
    //     newPassword:this.formData.newPassword,
    //   })
    // },
    // ...mapActions("account",['modifyPwd',])
  },
  computed: {},
  components: {
    SignUp,
  },
}

</script>
<style lang='scss' scoped>


</style>
