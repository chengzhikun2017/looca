<template>
  <div class="modifypwd-page">
    <a-form >
      <a-form-item :wrapperCol="{ span: 18 }" label='原密码' :labelCol="{ span: 6 }" :validateStatus="input.status.password.validateStatus" :help="input.status.password.help">
        <a-input placeholder="请输入原密码" ref="inputPassword" v-model="input.values.password" @blur="validate('password')" @focus="clearValidation('password')">
          <!-- <a-icon slot="prefix" type="user" /> -->
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='新密码' :labelCol="{ span: 6 }" :validateStatus="input.status.newPassword.validateStatus" :help="input.status.newPassword.help">
        <a-input placeholder="请输入新密码" ref="inputnewPassword" v-model="input.values.newPassword" @blur="validate('newPassword')" @focus="clearValidation('newPassword')">
          <!-- <a-icon slot="prefix" type="user" /> -->
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}">
        <div class="bttn-box">
          <a-button type='primary' @click="handleSubmit">
            提交
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import inputMixin from './../components/mixin/input.js'
import inputHelper from './../utils/inputHelper.js'
import { ValidationSet } from './../utils/inputHelper.js'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import helper from './../utils/helper.js'
export default {
  name: 'modifypwd',
  data() {
    let newInput = new inputHelper.newInput(['password','newPassword'])
    ValidationSet.password(newInput,'password')
    ValidationSet.password(newInput,'newPassword')
    return {
      input: newInput,
    }
  },
  mixins: [inputMixin],
  methods: {
    handleSubmit(){
      if(!this.validateAll()){
        return
      }
      this.modifyPwd({
        password:this.formData.password,
        newPassword:this.formData.newPassword,
      })
      .then((res) => {
        this.$message.info('修改成功')
        helper.goPage('/wallet_review')
      })
    },
    ...mapActions("account",['modifyPwd',])
  },
  computed: {},
  components: {}
}

</script>
<style lang='scss' scoped>


</style>
