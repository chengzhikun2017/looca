<template>
  <a-select style="width: 100px" v-model="depth">
    <a-select-option v-for="item in depthes" :key="item.value" :value="item.value">
      {{item.label}}
    </a-select-option>
  </a-select>
</template>
<script>
export default {
  name: 'depthSelect',
  data() {
    return {
      depth: 0,
      depthes: [
        { label: "全部级别", value: 0 },
        { label: "一级", value: 1 },
        { label: "二级", value: 2 },
        { label: "三级", value: 3 },
      ],
    }
  },
  props:{
    value:{
      required:true,
    },
  },
  watch: {
    depth(value) {
      this.$emit('input', value)
    },
    value(value){
      this.depth = value
    },
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
