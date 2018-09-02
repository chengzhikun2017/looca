<template>
  <a-alert
    message="Success Text"
    type="warning"
    v-if="success"
    showIcon
  >
    <p slot="description">
      <span>同步失败，请重新刷新</span>
      <a-button type="primary" @click="reSyncFunc">重新请求</a-button>
    </p>
  </a-alert>
</template>

<script>
export default {
  name:'mt4SyncFail',
  data() {
    return {
      
    }
  },
  props:{
    success:{
      default:false,
      type:Boolean,
    },
    reSyncFunc:{
      required:true,
      type:Function,
    },
  },
  methods: {},
  computed: {},
  components: {},
}
</script>

<style lang='scss' scoped>
span{
  margin-right: 10px;
}
</style>
