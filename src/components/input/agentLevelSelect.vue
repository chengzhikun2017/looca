<template>
  <a-select style="width: 120px" v-model="level">
    <a-select-option v-for="item in levels" :key="item.value" :value="item.value">
      {{item.label}}
    </a-select-option>
  </a-select>
</template>
<script>
export default {
  name: 'agentLevelSelect',
  data() {
    return {
      level: 0,
      levels: [
        { label: "全部代理级别", value:  0},
        { label: "一级代理", value: 2 },
        { label: "二级代理", value: 3 },
        { label: "三级代理", value: 4 },
      ],
    }
  },
  props:{
    value:{
      required:true,
    },
  },
  watch: {
    level(value) {
      this.$emit('input', value)
    },
    value(value){
      this.level = value
    },
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
