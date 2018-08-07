<template>
  <div class="login-vue">
    <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
       <a-form-item
         :wrapperCol="{ span: 24 }"
         fieldDecoratorId="phone"
         :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your phone!' }]}"
       >
         <a-input placeholder="123">
          <a-icon slot="prefix" type="user" />
         </a-input>
       </a-form-item>
       <a-form-item
         :wrapperCol="{ span: 12 }"
         fieldDecoratorId="pwd"
         :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please select your pwd' }]}"
       >
         <a-input type="password"/>

       </a-form-item>
       <a-form-item
         :wrapperCol="{ span: 12, offset: 5 }"
       >
         <!-- <a-button type='primary' htmlType='submit'>
           Submit
         </a-button> -->
       </a-form-item>
     </a-form>
  </div>
</template>

<script>
export default {
  name:'login',
  data() {
    return {
      
    }
  },
  methods: {
    handleSubmit(){
      
    },
  },
  computed: {},
  components: {},
}
</script>

<style lang='scss' scoped>

</style>
