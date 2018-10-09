<template>
  <a-select style="width: 140px" v-model="mt4Type">
    <a-select-option v-for="item in mt4Types" :key="item.value" :value="item.value">
      {{item.label}}MT4账户
    </a-select-option>
  </a-select>
</template>
<script>
export default {
  name: 'mt4TypeSelect',
  data() {
    return {
      mt4Type: "",
      mt4Types: [
        { label: "全部", value: "" },
        { label: "跟单", value: "follow" },
        { label: "普通", value: "normal" },
      ],
    }
  },
  props: {
    value: {
      required: true,
    },
  },
  watch: {
    mt4Type(value) {
      this.$emit('input', value)
    },
    value(value) {
      this.mt4Type = value
    },
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
