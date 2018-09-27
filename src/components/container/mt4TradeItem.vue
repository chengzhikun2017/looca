<template>
  <div class="l-mt4_trade_item">
    <openOrderListItem :info="info" v-if="!info.closeTime"></openOrderListItem>
    <mt4TradeListItem :info="info" v-if="info.closeTime"></mt4TradeListItem>
  </div>
</template>

<script>
const openOrderListItem = ()=> import('./openOrderListItem.vue')
const mt4TradeListItem = ()=> import('./mt4TradeListItem.vue')
export default {
  name:'mt4TradeItem',
  data() {
    return {
      
    }
  },
  props:{
    info:{
      required:true,
      type:Object,
    },
  },
  methods: {},
  computed: {},
  components: {
    openOrderListItem,
    mt4TradeListItem,
  },
}
</script>

<style lang='scss' scoped>
.l-mt4_trade_item{
  width: 100%;
}
</style>
