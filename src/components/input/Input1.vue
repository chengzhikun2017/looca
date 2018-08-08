<template>
  <a-form-item :wrapperCol="{ span: 24 }" :validateStatus="input.status.phone.validateStatus" :help="input.status.phone.help">
    <a-input placeholder="123" ref="inputPhone" v-model="input.values.phone" @blur="onInputBlur('phone')" @focus="onInputFocus('phone')">
      <a-icon slot="prefix" type="user" />
      <!-- <a-icon slot=suffix type="close-circle-o" /> -->
    </a-input>
  </a-form-item>
</template>

<script>
export default {
  name:'Input1',
  data() {
    return {
      
    }
  },
  props:{
    key:{
      required:true,
    },
  },
  methods: {},
  computed: {},
  components: {},
}
</script>

<style lang='scss' scoped>

</style>
