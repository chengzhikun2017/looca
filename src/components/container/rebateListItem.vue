<template>
  <div class="rebate_list_item">
    <div class="rebate_list_item-content">
      <div class="rebate_list_item-summary" flex="cross:center">
        <div class="rebate_list_item-summary-title" flex-box="1">
          姓名：{{info.name}}
        </div>
        <div class="rebate_list_item-summary-title" flex="main:right" flex-box="1">
          手机号：{{info.phone}}
        </div>
      </div>
      <!-- <div class="rebate_list_item-summary" flex="cross:center">
        <div class="rebate_list_item-summary-money" flex-box="1">
          金额：$222.3
        </div>
        <div class="rebate_list_item-summary-money" flex="main:right" flex-box="1">
          类型：点差
        </div>
      </div> -->
      <div class="rebate_list_item-others" flex="cross:center main:justify">
        <div class="rebate_list_item-others-time" flex-box="1">
          {{info.depth | guestDepth}}
        </div>
        <div class="rebate_list_item-others-time" flex="main:right" flex-box="1">
          {{info.createTime | timeFull}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTimeString } from '@/utils/time.js'
export default {
  name: 'rebate_list_item',
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
  }
}

</script>
<style lang="scss">
$prefix: "rebate_list_item";

@import '@/styles/listitem/index.scss';
.#{$prefix}-summary-money {
  padding-left: 0 !important;
}

.#{$prefix}-others-time {
  padding-top: 8px !important;
  font-size: 14px !important;
}

.rebate_list_item {
  border: 1px solid #ccc;
  padding:5px;
}

</style>
