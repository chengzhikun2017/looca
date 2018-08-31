<template>
  <div class="mine_customer_list_item">
    <div class="mine_customer_list_item-content">
      <div class="mine_customer_list_item-summary" flex="cross:center">
        <div class="mine_customer_list_item-summary-title" flex-box="1">
          姓名：陶*
        </div>
        <div class="mine_customer_list_item-summary-title" flex="main:right" flex-box="1">
          手机号：177****1234
        </div>
      </div>
      <div class="mine_customer_list_item-others" flex="cross:center main:justify">
        <div class="mine_customer_list_item-others-time" flex-box="1">
          一级
        </div>
        <div class="mine_customer_list_item-others-time" flex="main:right" flex-box="1">
          2018-12-12 12:12:12
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getTimeString} from '@/utils/time.js'
  export default {
    name: 'mine_customer_list_item',
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
  $prefix: "mine_customer_list_item";
  @import '@/styles/listitem/index.scss';
  .#{$prefix}-others-time {
    padding-top: 8px !important;
    font-size: 14px !important;
  }
</style>

