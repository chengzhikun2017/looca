<template>
  <div class="mt4_open_item">
    <div class="mt4_open_item-content">
      <div class="mt4_open_item-summary" flex="cross:center">
        <div flex-box="1" flex="dir:top">
          <div flex="cross:center">
            <div class="mt4_open_item-summary-title" flex-box="1">
              MT4订单号 {{info.orderId}}
            </div>
            <div class="mt4_open_item-summary-charge" flex-box="0">
              {{info.symbol}}
            </div>
            <div class="mt4_open_item-summary-money"
              :class="{'green':info.profit<0,'red':info.profit>0,}"
              flex-box="0">
              ${{info.profit}}
            </div>
          </div>
          <div class="mt4_open_item-summary-note">
            <span class="mt4_open_item-summary-note-item">开 {{info.openPrice}}</span>
            <span class="mt4_open_item-summary-note-item"><a-icon type="sync" /> 1.7232</span>
            <span class="mt4_open_item-summary-note-item action-type" :class="actionTypeClass">
              <a-icon type="fork" />
              {{info.actionType}}
            </span>
          </div>
        </div>
        <div class="mt4_open_item-summary-status"
          :class="{'l-blue':info.profit<0,'l-red':info.profit>0,}"
          flex-box="0">
          ${{info.profit}}
        </div>
      </div>
      <div class="mt4_open_item-others" flex="cross:center">
        <div class="mt4_open_item-others-time" flex-box="1">
          <div>开仓时间：{{info.openTime | timeFull}}</div>
        </div>
        <div class="mt4_open_item-others-turnoff" @click="toggle" flex-box="0">
          <a-icon v-if="!isDetailShow" type="down-circle" />
          <a-icon v-else type="up-circle" />
        </div>
      </div>
    </div>
    <div v-if="isDetailShow" class="mt4_open_item-divider"></div>
    <transition name="slide">
      <div v-if="isDetailShow" class="mt4_open_item-detail">
        <div class="mt4_open_item-detail-item">
          MT4账号：{{info.mt4Uid}}
        </div>
        <div class="mt4_open_item-detail-item" flex="main:justify">
          <span>手续费：${{info.serviceFee | money}}</span>
          <span>库存费：${{info.rollver|money}}</span>
        </div>
        <div class="mt4_open_item-detail-item" flex="main:justify">
          <span>止损价：${{info.stopLoss | money}}</span>
          <!-- <span>止盈价：$23.33</span> -->
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { getTimeString } from '@/utils/time.js'
export default {
  name: 'mt4_open_item',
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
    toggle() {
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
$prefix: "mt4_open_item";
@import '@/styles/listitem/index.scss';

.red {
  color: #f5222d;
}
.#{$prefix}-summary-money {
  width: 100px !important;
  text-align: right;
}
</style>
