<template>
  <a-select style="width: 100px" v-model="accountType">
    <a-select-option v-for="item in accountTypes" :key="item.value" :value="item.value">
      {{item.label}}账户
    </a-select-option>
  </a-select>
</template>
<script>
export default {
  name: 'accountTypeSelect',
  data() {
    return {
      accountType: '',
      accountTypes: [
        { label: "全部", value: "" },
        { label: "普通", value: "normal" },
        { label: "保本", value: "protect" },
      ],
    }
  },
  props:{
    value:{
      required:true,
    },
  },
  watch: {
    accountType(value) {
      this.$emit('input', value)
    },
    value(value){
      this.accountType = value
    },
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
