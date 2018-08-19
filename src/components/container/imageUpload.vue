<template>
  <div class="l-image-upload">
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    <a-upload 
      :headers="headers" 
      @change="handleChange"
      name="imgFile" 
      action="/api/upload/image" 
      :withCredentials="true"
      listType="picture-card" 
      :beforeUpload="beforeUpload"
      @preview="handlePreview" 
      :showUploadList="showUploadList" 
      :disabled="disabled"
      :fileList="fileList"
      @remove="onremove"
    >
      <div v-if="imageNum < 1&&!loading">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </div>
</template>
<script>
import helper from '../../utils/helper.js'
export default {
  name: 'imageUpload',
  data() {
    return {
      headers: {
        authorization: 'authorization-text',
        // "Content-Type": "multipart/form-data",
      },
      loading: false,
      imageNum:0,
      imageUrl: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }
  },
  model: {
    prop: 'url',
    event: 'img_uploaded'
  },
  props: {
    // disabled: {
    //   default: false,
    // },
    url:{
      required:true,
      type:String,
    },
    editing:{
      default:true,
      // type:Boolean,
    },
    label:{
      default:'图片'
    },
  },
  watch:{
    url(value){
      this.onUrlChange()
    },
  },
  created(){
    this.onUrlChange()
  },
  methods: {
    onUrlChange(){
      if(this.url){
        this.fileList = [{
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url:this.url,
        }]
        this.imageNum = 1
      }
    },
    emitUrl(url){
      this.$emit('img_uploaded',url)
    },
    onremove(e){
      console.log('%c on remove','color:red',e)
      this.imageNum--
      this.fileList = []
    },
    handleChange(info) {
      this.fileList =info.fileList
      console.log('%c upload change info', 'color:red', info)
      if (info.file.status === 'uploading') {
        // console.log('%c loading~~~','color:red',)
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(this.label+"上传成功");
        this.emitUrl(info.file.response.data.url)
        this.loading = false
        
      } else if (info.file.status === 'error') {
        this.loading = false
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      this.loading = true
      this.imageNum++
      // console.log('%c file beforeUpload','color:red',file)
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
  },
  computed: {
    disabled(){
      return !this.editing
    },
    showUploadList(){
      return {
        showPreviewIcon: true,
        showRemoveIcon: this.editing
      }
    },
    // fileList(){
    //   return [{
    //     uid: -1,
    //     name: 'xxx.png',
    //     status: 'done',
    //     url: this.url,
    //   }]
    // },
  },
  components: {},
}

</script>
<style lang="scss" scoped>
.l-image-upload{
  height: 112px;
}
</style>
<style lang='scss' >

.l-image-upload{
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
