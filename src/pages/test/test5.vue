<template>
  <div class="test5">
    <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
        label='Note'
        :labelCol="{ span: 5 }"
        :wrapperCol="{ span: 12 }"
        fieldDecoratorId="note"
        :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your note!' }]}"
      >
        <a-input />
      </a-form-item>
      <a-form-item
        label='Gender'
        :labelCol="{ span: 5 }"
        :wrapperCol="{ span: 12 }"
        fieldDecoratorId="gender"
        :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please select your gender!' }]}"
      >
        <a-select
          placeholder='Select a option and change input text above'
          @change="this.handleSelectChange"
        >
          <a-select-option value='male'>male</a-select-option>
          <a-select-option value='female'>female</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 12, offset: 5 }"
      >
        <a-button type='primary' htmlType='submit'>
          Submit
        </a-button>
      </a-form-item>
      
    </a-form>
  </div>
</template>

<script>
export default {
  name:'test5',

  data () {
     return {
       formLayout: 'horizontal',
       header:"test5",
     }
   },
   methods: {
     handleSubmit (e) {
       e.preventDefault()
       this.form.validateFields((err, values) => {
         if (!err) {
           console.log('Received values of form: ', values)
         }
       })
     },
     handleSelectChange (value) {
       console.log(value)
       this.form.setFieldsValue({
         note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
       })
     },
   },
}
</script>

<style lang='scss' scoped>

</style>
 