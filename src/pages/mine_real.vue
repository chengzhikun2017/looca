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

        <a-upload action="/api/upload/image" :showUploadList="{ showPreviewIcon: true, showRemoveIcon: editing }" listType="picture-card" :fileList="fileList" @preview="handlePreview" @change="handleChange" :withCredentials="true">
          <div v-if="fileList.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>

      </a-form-item>

      <a-form-item :wrapperCol="{ span: 18 }" label='身份证背面' :labelCol="{ span: 6 }" :validateStatus="input.status.email.validateStatus" :help="input.status.email.help">

        <a-upload action="/api/upload/image" :showUploadList="{ showPreviewIcon: true, showRemoveIcon: editing }" listType="picture-card" :fileList="fileList" @preview="handlePreview" @change="handleChange" :withCredentials="true">
          <div v-if="fileList.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
        
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
      <!-- <a-form-item :wrapperCol="{ span: 24}">
        <div class="bttn-box">
          <a-button type='primary' htmlType='submit'>
            提交
          </a-button>
        </div>
      </a-form-item> -->
    </a-form>
    <!-- <a-upload action="/api/upload/image" :showUploadList="{ showPreviewIcon: true, showRemoveIcon: editing }" listType="picture-card" :fileList="fileList" @preview="handlePreview" @change="handleChange" :withCredentials="true">
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal> -->
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


function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'mine_real',
  mixins:[inputMixin],
  data() {
    var newInput = new inputHelper.newInput(['name','email','idCardNo'])
    newInput.values.name = '黄树栋'
    return {
      input:newInput,
      headers: {
        authorization: 'authorization-text',
      },
      editing: false,
      loading: false,
      imageUrl: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }
  },
  created(){
    setTimeout(()=> {
      this.formData.name = this.authInfo.name
      this.formData.email = this.authInfo.email
      this.formData.idCardNo = this.authInfo.idCardNo
    }, 2000);
    // if(this.isRealNamed){
    //   this.editing = false
    // }
  },
  methods: {

    handleSubmit(){

      let params = this.getParams()
      this.realNameVerify(params)
    },
    getParams(){
      return{
        idCardUrl:"",
        idCardUrl2:"",
        idCardNo:this.formData.idCardNo,
        name:this.formData.name,
        email:this.formData.email,
      }
    },
    handleChange(info) {
      console.log('%c upload change info', 'color:red', info)
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    },
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    ...mapActions('account',['realNameVerify'])
  },
  computed: {
    ...mapState('account',['authInfo','isRealNamed'])
  },
  components: {},
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
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
}

</style>
