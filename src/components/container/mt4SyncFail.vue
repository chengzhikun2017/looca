<template>
  <a-alert
    message="同步失败"
    type="warning"
    v-if="success"
    showIcon
  >
    <p slot="description">
      <span>最新数据同步失败，如需查看最新数据，请稍后点击刷新尝试，或者前往MT4客户端查看</span>
      <a-button type="primary" @click="reSyncFunc">刷新</a-button>
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
