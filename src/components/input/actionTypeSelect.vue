<template>
  <a-select style="width: 100px" v-model="actionType">
    <a-select-option v-for="item in actionTypes" :key="item.value" :value="item.value">
      {{item.label}}
    </a-select-option>
  </a-select>
</template>
<script>
export default {
  name: 'actiongTypeSelect',
  data() {
    return {
      actionType: 0,
      actionTypes: [
        { label:'全部方向',value:0},
        { label:'Sell',value:'Sell'},
        { label:'Buy',value:'Buy'},
      ],
    }
  },
  props:{
    value:{
      required:true,
    },
  },
  watch: {
    actionType(value) {
      this.$emit('input', value)
    },
    value(value){
      this.actionType = value
    },
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
