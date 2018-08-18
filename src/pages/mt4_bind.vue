<template>
  <div class="mt4_bind-page">
    <a-form @submit="handleSubmit">
      <a-form-item :wrapperCol="{ span: 18 }" label='mt4 账号' :labelCol="{ span: 6 }" :validateStatus="input.status.mt4Uid.validateStatus" :help="input.status.mt4Uid.help">
        <a-input placeholder="输入需要绑定的mt4 账号"  ref="inputmt4Uid" v-model="input.values.mt4Uid" @blur="validate('mt4Uid')" @focus="clearValidation('mt4Uid')">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='交易密码' :labelCol="{ span: 6 }" :validateStatus="input.status.password.validateStatus" :help="input.status.password.help">
        <a-input placeholder="请输入交易密码" type="password" ref="inputPassword" v-model="input.values.password" @blur="validate('password')" @focus="clearValidation('password')">
        </a-input>
      </a-form-item>

      <a-form-item :wrapperCol="{ span: 24}">
        <div class="bttn-box">
          <a-button type='primary' htmlType='submit'>
            提交
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import helper from './../utils/helper.js'
import inputMixin from './../components/mixin/input.js'
import inputHelper from './../utils/inputHelper.js'
import { ValidationSet } from './../utils/inputHelper.js'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'mt4_bind',
  data() {
    let newInput = new inputHelper.newInput(['password','mt4Uid'])
    return {
      input: newInput,
    }
  },
  mixins: [inputMixin],
  created(){
  },
  methods: {
    cancelCreate(){
      
    },
    handleSubmit(){
      // if(!this.checkValid()){
      //   return
      // }
      let params = this.getParams()
      this.bindAC(params)
      .then((res) => {
        helper.goPage(-1) 
      })
    },
    getParams(){
      return {
        password:this.formData.password,
        mt4Uid:this.formData.mt4Uid,
      }
    },
    // checkValid(){
    //   let flag = true
    //   if(!this.validateAll()){
    //     return false
    //   }
    //   return flag
    // },  
    ...mapActions("mt4AC",['bindAC',])
  },
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
