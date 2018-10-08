<template>
  <div class="mt4_balance_list_item">
    <div class="mt4_balance_list_item-content">
      <div class="mt4_balance_list_item-summary" flex="cross:center">
        <div flex-box="1" flex="dir:top">
          <div flex="cross:center">
            <div class="mt4_balance_list_item-summary-title" flex-box="1">
              MT4订单号: {{info.orderId}}
            </div>
            <!-- <div class="mt4_balance_list_item-summary-money" flex-box="0">
            </div> -->
            <div class="mt4_balance_list_item-summary-charge" flex-box="0">
              {{info.symbol}}
            </div>
            <div class="mt4_balance_list_item-summary-money"
              :class="{'green':info.profit<0,'red':info.profit>0,}"
              flex-box="0">
              ${{info.profit}}
            </div>
          </div>
          <div class="mt4_balance_list_item-summary-note">
            <span class="mt4_balance_list_item-summary-note-item">开 {{info.openPrice}}</span>
            <span class="mt4_balance_list_item-summary-note-item">平 {{info.closePrice}}</span>
            <span class="mt4_open_item-summary-note-item action-type" :class="actionTypeClass">
              <a-icon type="fork" />
              {{info.actionType}}
            </span>
          </div>
        </div>
        <div class="mt4_balance_list_item-summary-status"
          :class="{'l-blue':info.profit<0,'l-red':info.profit>0,}"
          flex-box="0">
          ${{info.profit}}
        </div>
      </div>
      <div class="mt4_balance_list_item-others" flex="cross:center">
        <div class="mt4_balance_list_item-others-time" flex-box="1">
          <div>开仓时间：{{info.openTime | timeFull}}</div>
          <div>平仓时间：{{info.closeTime | timeFull}}</div>
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
          MT4账号：{{info.mt4Uid}}
        </div>
        <div class="mt4_balance_list_item-detail-item" flex="main:justify">
          <span>手续费：${{info.serviceFee | money}}</span>
          <span>库存费：${{info.rollver|money}}</span>
        </div>
        <div class="mt4_balance_list_item-detail-item" flex="main:justify">
          <span>止损价：${{info.stopLoss | money}}</span>
          <!-- <span>止盈价：${{info}}</span> -->
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {getTimeString} from '@/utils/time.js'
  export default {
    name: 'mt4_Trade_list_item',
    props: {
      info: {
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
    },
    computed: {
      actionTypeClass(){
        return this.info.actionType.toLowerCase()
      },
    },
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
  .#{$prefix}-summary-money {
    width: 100px !important;
    text-align: right;
  }
</style>

