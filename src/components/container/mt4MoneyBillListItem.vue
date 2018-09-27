<template>
  <div class="mt4_balance_list_item">
    <div class="mt4_balance_list_item-content">
      <div class="mt4_balance_list_item-summary" flex="cross:center">
        <div flex-box="1" flex="dir:top">
          <div flex="cross:center">
            <div class="mt4_balance_list_item-summary-title" flex-box="0">
              {{data.type | moneyBillType}}
            </div>
            <div class="mt4_balance_list_item-summary-money" flex-box="1">
              ${{data.dollar | money}}
            </div>
            <div class="mt4_balance_list_item-summary-charge" flex-box="0">
              手续费 {{data.serviceFee|money}}
            </div>
          </div>
          <div class="mt4_balance_list_item-summary-note">
            [MT4订单号：{{data.orderId}}]
          </div>
        </div>
        <div class="mt4_balance_list_item-summary-status"  flex-box="0">
          {{data.status | moneyBillStatus}}
        </div>
      </div>
      <div class="mt4_balance_list_item-others" flex="cross:center">
        <div class="mt4_balance_list_item-others-time" flex-box="1">
          {{data.createTime | timeFull}}
        </div>
        <div class="mt4_balance_list_item-others-turnoff" @click="toggle" flex-box="0">
          <a-icon v-if="!isDetailShow" type="down-circle" />
          <a-icon v-else type="up-circle" />
        </div>
      </div>
    </div>
    <div v-if="isDetailShow" class="mt4_balance_list_item-divider"></div>
    <transition name="slide">
      <div v-if="isDetailShow" class="mt4_balance_list_item-detail">
        <div class="mt4_balance_list_item-detail-item">
          MT4账号：{{data.mt4Uid}}
        </div>
        <div class="mt4_balance_list_item-detail-item">
          流水号：{{data.tradeNo}}
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {getTimeString} from '@/utils/time.js'
  export default {
    name: 'mt4_money_list_item',
    props: {
      data: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        isDetailShow: false
      }
    },
    methods: {
      toggle () {
        this.isDetailShow = !this.isDetailShow
      }
    }
  }
</script>
<style lang="scss">
  $prefix: "mt4_balance_list_item";
  @import '@/styles/listitem/index.scss';
</style>

