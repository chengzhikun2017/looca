<template>
  <div class="mt4_modifypwd-page">
    <div class="type-choose">
      <a-radio-group name="radioGroup" v-model="type" >
        <a-radio value="trade">修改交易密码</a-radio>
        <a-radio value="read">修改只读密码</a-radio>
        <a-radio value="both">修改交易密码和只读密码</a-radio>
        <!-- <a-radio :value="3">C</a-radio> -->
      </a-radio-group>
    </div>
    <div class="form-box">
      
    </div>
  </div>
</template>

<script>
export default {
  name:'mt4_modifypwd',
  data() {
    return {
      type:'',
    }
  },
  methods: {},
  computed: {},
  components: {},
}
</script>

<style lang='scss' scoped>

</style>
