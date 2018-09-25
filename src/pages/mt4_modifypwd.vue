<template>
  <div class="mt4_modifypwd-page">

    <div class="id-list" v-if=false>
      <span>需要修改的MT4账号</span>
      <a-tree-select
        showSearch
        style="width: 300px"
        :value="mt4Uid"
        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
        placeholder='Please select'
        allowClear
        treeDefaultExpandAll
        @change="onIdChange"
      >
        <a-tree-select-node v-for="mt4 in list" :value='mt4.mt4Uid' :title='mt4.mt4Uid' :key='mt4.mt4Uid' />
      </a-tree-select>
    </div>
    <div class="type-choose">
      <a-radio-group name="radioGroup" v-model="type">
        <a-radio value="trade">修改交易密码</a-radio>
        <a-radio value="read">修改只读密码</a-radio>
        <!-- <a-radio value="both">修改交易密码和只读密码</a-radio> -->
        <!-- <a-radio :value="3">C</a-radio> -->
      </a-radio-group>
    </div>
    <div class="form-box">
      <a-form>
        <a-form-item :wrapperCol="{ span: 18 }" label='原交易密码' :labelCol="{ span: 6 }" :validateStatus="input.status.tradePwd.validateStatus" :help="input.status.tradePwd.help">
          <a-input placeholder="请输入原交易密码" ref="inputtradePwd" v-model="input.values.tradePwd" @blur="validate('tradePwd')" @focus="clearValidation('tradePwd')">
          </a-input>
        </a-form-item>
        <a-form-item v-if="showModifyTrade" :wrapperCol="{ span: 18 }" label='新交易密码' :labelCol="{ span: 6 }" :validateStatus="input.status.newTradePwd.validateStatus" :help="input.status.newTradePwd.help">
          <a-input placeholder="请输入新交易密码" ref="inputnewTradePwd" v-model="input.values.newTradePwd" @blur="validate('newTradePwd')" @focus="clearValidation('newTradePwd')">
          </a-input>
        </a-form-item>
        <!-- <a-form-item v-if="showModifyTrade" :wrapperCol="{ span: 18 }" label='重复交易密码' :labelCol="{ span: 6 }" :validateStatus="input.status.renewTradePwd.validateStatus" :help="input.status.renewTradePwd.help">
          <a-input placeholder="请再次输入新的交易密码" ref="inputrenewTradePwd" v-model="input.values.renewTradePwd" @blur="validate('renewTradePwd')" @focus="clearValidation('renewTradePwd')">
          </a-input>
        </a-form-item> -->
        <a-form-item v-if="showModifyRead" :wrapperCol="{ span: 18 }" label='新只读密码' :labelCol="{ span: 6 }" :validateStatus="input.status.newReadPwd.validateStatus" :help="input.status.newReadPwd.help">
          <a-input placeholder="请输入新只读密码" ref="inputnewReadPwd" v-model="input.values.newReadPwd" @blur="validate('newReadPwd')" @focus="clearValidation('newReadPwd')">
          </a-input>
        </a-form-item>
        <!-- <a-form-item v-if="showModifyRead" :wrapperCol="{ span: 18 }" label='重复只读密码' :labelCol="{ span: 6 }" :validateStatus="input.status.renewReadPwd.validateStatus" :help="input.status.renewReadPwd.help">
          <a-input placeholder="请再次输入新的只读密码" ref="inputrenewReadPwd" v-model="input.values.renewReadPwd" @blur="validate('renewReadPwd')" @focus="clearValidation('renewReadPwd')">
          </a-input>
        </a-form-item> -->

        <a-form-item :wrapperCol="{ span: 24}">
          <div class="bttn-box">
            <a-button type='primary'  @click="handleSubmit">
              提交
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import inputMixin from './../components/mixin/input.js'
import inputHelper from './../utils/inputHelper.js'
import { ValidationSet } from './../utils/inputHelper.js'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'mt4_modifypwd',
  data() {
    let newInput = new inputHelper.newInput(['tradePwd', 'newTradePwd', 'renewTradePwd', 'newReadPwd', 'renewReadPwd'])
    ValidationSet.password(newInput,'tradePwd')
    ValidationSet.password(newInput,'newTradePwd')
    ValidationSet.password(newInput,'renewTradePwd')
    ValidationSet.password(newInput,'newReadPwd')
    ValidationSet.password(newInput,'renewReadPwd')
    return {
      type: 'trade',
      mt4Uid: '',
      input: newInput,
      // mt4Id:null,
    }
  },
  mixins: [inputMixin],
  methods: {
    onIdChange(value){
      console.log('%c onchange','color:red',value)
      this.mt4Uid = value
    },
    handleSubmit() {
      if(!this.checkValid()){
        return
      }
      let params
      if(this.type === 'trade'){
        params = this.getParamsTrade()
      }else if(this.type === 'read'){
        params = this.getParamsRead()
      }
      this.modifyPwd(params)
    },
    getParamsRead(){
      return {
        mt4Uid:this.currentMt4Uid,
        password:this.formData.tradePwd,
        newPassword:this.formData.newReadPwd,
        type:'investor',
      }
    },
    getParamsTrade(){
      return {
        mt4Uid:this.currentMt4Uid,
        password:this.formData.tradePwd,
        newPassword:this.formData.newTradePwd,
        type:'main',
      }
    },
    checkValid(){
      let flag = true
      // let data = this.formData
      // if(data.newTradePwd!==data.renewTradePwd){
      //   this.input.status.newTradePwd = inputHelper.createStatus(2,'两次输入密码不一致')
      //   this.input.status.renewTradePwd = inputHelper.createStatus(2,'两次输入密码不一致')
      //   flag = false
      // }
      // if(data.newReadPwd!==data.renewReadPwd){
      //   this.input.status.newReadPwd = inputHelper.createStatus(2,'两次输入密码不一致')
      //   this.input.status.renewReadPwd = inputHelper.createStatus(2,'两次输入密码不一致')
      //   flag = false
      // }
      return flag
    }, 
    ...mapActions('mt4AC',['modifyPwd'])
  },
  created(){
    this.mt4Uid = this.$route.params.mt4Uid
  },
  computed: {
    showModifyTrade(){
      return this.type==='trade'||this.type==='both'
    },
    showModifyRead(){
      return this.type==='read'||this.type==="both"
    },
    ...mapState('mt4AC',['list','currentMt4Uid'])
  },
  components: {},
}

</script>
<style lang='scss' scoped>
.form-box{
  padding-top: 20px;
}
.type-choose{
  margin-top: 20px;
}
</style>
