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
  .#{$prefix} {
    width: 100%;
    .#{$prefix}-content {
      padding:0 5px;
      .#{$prefix}-summary {
        .#{$prefix}-summary-title {
          font-size: 16px;
        }
        .#{$prefix}-summary-money {
          padding-left: 15px;
          font-size: 16px;
          font-weight: 500;
        }
        .#{$prefix}-summary-charge {
          padding-right: 10px;
          font-size: 13px;
          color: #aaa;
        }
        .#{$prefix}-summary-status {
          font-size: 14px;
        }
        .#{$prefix}-summary-note {
          padding-top: 6px;
          font-size: 12px;
          color: #666;
          line-height: 12px;
        }
      }
      .#{$prefix}-others {
        .#{$prefix}-others-time {
          font-size: 12px;
          color: #aaa;
        }
        .#{$prefix}-others-turnoff {
          color: #1890ff;
          font-size: 18px;
          padding:0 3px;
        }
      }
    }
    .#{$prefix}-divider {
      margin: 0 5px;
      border-top: 1px dashed #b7eb8f;
    }
    .#{$prefix}-detail {
      padding:5px 5px 0;
      .#{$prefix}-detail-item {
        font-size: 13px;
      }
      .#{$prefix}-detail-item-button {
        padding-top: 3px;
        font-size: 13px;
        color: #1890ff;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .3s ease;
  }
  .slide-enter, .slide-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>

