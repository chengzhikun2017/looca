<template>
  <div class="wallet_list_item">
    <div class="wallet_list_item-content">
      <div class="wallet_list_item-summary" flex="cross:center">
        <div flex-box="1" flex="dir:top">
          <div flex="cross:center">
            <div class="wallet_list_item-summary-title" flex-box="0">
              充值
            </div>
            <div class="wallet_list_item-summary-money" flex-box="1">
              $1000
            </div>
          </div>
          <div class="wallet_list_item-summary-note">
            [支付宝转账/佣金提现]
          </div>
        </div>
        <div class="wallet_list_item-summary-status"  flex-box="0">
          完成
        </div>
      </div>
      <div class="wallet_list_item-others" flex="cross:center">
        <div class="wallet_list_item-others-time" flex-box="1">
          2018-08-23 10:22:22
        </div>
        <div class="wallet_list_item-others-turnoff" @click="toggle" flex-box="0">
          <a-icon v-if="!isDetailShow" type="down-circle" />
          <a-icon v-else type="up-circle" />
        </div>
      </div>
    </div>
    <div v-if="isDetailShow" class="wallet_list_item-divider"></div>
    <transition name="slide">
      <div v-if="isDetailShow" class="wallet_list_item-detail">
        <div class="wallet_list_item-detail-item" flex="main:justify">
          <span>汇率：6.1823</span>
          <span>人民币：¥634433</span>
        </div>
        <div class="wallet_list_item-detail-item" flex="main:justify">
          流水号：6456763284238432
        </div>
        <div class="wallet_list_item-detail-item-button">
          <span>转账截图</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {getTimeString} from '@/utils/time.js'
  export default {
    name: 'wallet_list_item',
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
  $prefix: "wallet_list_item";
  @import '@/styles/listitem/index.scss';
</style>

