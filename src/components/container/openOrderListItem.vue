<template>
  <div class="mt4_balance_list_item">
    <div class="mt4_balance_list_item-content">
      <div class="mt4_balance_list_item-summary" flex="cross:center">
        <div flex-box="1" flex="dir:top">
          <div flex="cross:center">
            <div class="mt4_balance_list_item-summary-title" flex-box="0">
              MT4订单号 3333333
            </div>
            <div class="mt4_balance_list_item-summary-money" flex-box="1">
            </div>
            <div class="mt4_balance_list_item-summary-charge" flex-box="0">
              USDGDP
            </div>
          </div>
          <div class="mt4_balance_list_item-summary-note">
            <span class="mt4_balance_list_item-summary-note-item">开 1.7232</span>
            <span class="mt4_balance_list_item-summary-note-item"><a-icon type="sync" /> 1.7232</span>
            <span class="mt4_balance_list_item-summary-note-item"><a-icon type="fork" /> BUY</span>
          </div>
        </div>
        <div class="mt4_balance_list_item-summary-status red" flex-box="0">
          -$6.433
        </div>
      </div>
      <div class="mt4_balance_list_item-others" flex="cross:center">
        <div class="mt4_balance_list_item-others-time" flex-box="1">
          <div>开仓时间：2018-12-12 12:12:12</div>
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
          MT4账号：475643875
        </div>
        <div class="mt4_balance_list_item-detail-item" flex="main:justify">
          <span>手续费：$0</span>
          <span>库存费：$23.33</span>
        </div>
        <div class="mt4_balance_list_item-detail-item" flex="main:justify">
          <span>止损价：$23.33</span>
          <span>止盈价：$23.33</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {getTimeString} from '@/utils/time.js'
  export default {
    name: 'mt4_balance_list_item',
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
  .green {
    color: #52c41a;
  }
  .red {
    color: #f5222d;
  }
</style>

