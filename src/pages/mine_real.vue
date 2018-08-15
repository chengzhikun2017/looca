<template>
  <div class="mine-real-vue">
    <a-form @submit="handleSubmit">
      <a-form-item :wrapperCol="{ span: 18 }" label='姓名' :labelCol="{ span: 6 }" :validateStatus="input.status.name.validateStatus" :help="input.status.name.help">
        <a-input :placeholder="editing?'请输入真实姓名':'未填写'" ref="inputname" v-model="input.values.name" @blur="validate('name')" @focus="clearValidation('name')" :disabled="!editing">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='身份证' :labelCol="{ span: 6 }" :validateStatus="input.status.idCardNo.validateStatus" :help="input.status.idCardNo.help">
        <a-input :placeholder="editing?'请输入身份证号码':'未填写'" ref="inputidCardNo" v-model="input.values.idCardNo" @blur="validate('idCardNo')" @focus="clearValidation('idCardNo')" :disabled="!editing">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='邮箱' :labelCol="{ span: 6 }" :validateStatus="input.status.email.validateStatus" :help="input.status.email.help">
        <a-input :placeholder="editing?'请输入邮箱地址':'未填写'" ref="inputemail" v-model="input.values.email" @blur="validate('email')" @focus="clearValidation('email')" :disabled="!editing">
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='身份证正面' :labelCol="{ span: 6 }" :validateStatus="input.status.email.validateStatus" :help="input.status.email.help">
        <ImageUpload :editing="editing" v-model="idCardUrl" label="身份证正面 " />
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 18 }" label='身份证反面' :labelCol="{ span: 6 }" :validateStatus="input.status.email.validateStatus" :help="input.status.email.help">
        <ImageUpload :editing="editing" v-model="idCardUrl2" label="身份证反面 " />
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}" v-if="editing">
        <div class="bttn-box">
          <a-button type='primary' htmlType='submit'>
            提交
          </a-button>
        </div>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24}" v-if="!editing">
        <div class="bttn-box">
          <a-button @click="editing=true">
            编辑
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
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} from 'vuex'
import ImageUpload from './../components/container/imageUpload.vue'


export default {
  name: 'mine_real',
  mixins: [inputMixin],
  data() {
    var newInput = new inputHelper.newInput(['name', 'email', 'idCardNo'])
    return {
      input: newInput,
      editing: false,
      idCardUrl:'',
      idCardUrl2:'',
    }
  },
  created() {
    setTimeout(() => {
      this.formData.name = this.authInfo.name
      this.formData.email = this.authInfo.email
      this.formData.idCardNo = this.authInfo.idCardNo
    }, 2000);
    // if(this.isRealNamed){
    //   this.editing = false
    // }
  },
  methods: {
    customRequest(e) {
      console.log('%c customRequest', 'color:red', e)
      this.upload(e.file)
    },
    handleSubmit() {

      let params = this.getParams()
      this.realNameVerify(params)
    },
    getParams() {
      return {
        idCardUrl: this.idCardUrl,
        idCardUrl2: this.idCardUrl2,
        idCardNo: this.formData.idCardNo,
        name: this.formData.name,
        email: this.formData.email,
      }
    },
    handleChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            this.$message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            this.$message.error(`${info.file.name} file upload failed.`);
          }
        },
    ...mapActions('account', ['realNameVerify']),
  },
  computed: {
    ...mapState('account', ['authInfo', 'isRealNamed']),
  },
  components: {
    ImageUpload,
  },
}

</script>
<style lang='scss' scoped>
.pic {
  width: 128px;
  height: 128px;
}

</style>
<style lang="scss">
.mine-real-vue {
  
}

</style>
