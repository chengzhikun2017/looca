<template>
  <div class="guest_list_item">
    <div class="guest_list_item-content">
      <div class="guest_list_item-summary" flex="cross:center">
        <div class="guest_list_item-summary-title" flex-box="1">
          姓名：{{info.name}}
        </div>
        <div class="guest_list_item-summary-title" flex="main:right" flex-box="1">
          手机号：{{info.phone}}
        </div>
      </div>
      <div class="guest_list_item-summary" flex="cross:center" v-if="type===2">
        <div class="guest_list_item-summary-money" flex-box="1">
          金额：${{info.fee | money}}
        </div>
        <div class="guest_list_item-summary-money" flex="main:right" flex-box="1">
          类型：{{info.type | incomeType}}
        </div>
      </div>
      <div class="guest_list_item-others" flex="cross:center main:justify">
        <div class="guest_list_item-others-time" flex-box="1">
          {{info.depth | guestDepth}}
        </div>
        <div class="guest_list_item-others-time" flex="main:right" flex-box="1">
          {{info.createTime | timeFull}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTimeString } from '@/utils/time.js'
export default {
  name: 'guest_list_item',
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    type:{
      default:1,
      type:Number,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        //1:guestList,2:guest profit list
        let valid = [1,2].indexOf(value) !== -1
        if(!valid){
          console.error("prop type should get 1:guestList,2:guest profit list,but got:"+value)
        }
        return valid
      }
    },
  },
  data() {
    return {
      isDetailShow: false
    }
  },
  computed:{
    depth(){
      if(this.type===1){
        return this.info.depth
      }
      if(this.type===2){
        return this.info.relationDepth
      }
    },
  },
  methods: {
    toggle() {
      this.isDetailShow = !this.isDetailShow
    }
  }
}

</script>
<style lang="scss">
$prefix: "guest_list_item";

@import '@/styles/listitem/index.scss';
.#{$prefix}-summary-money {
  padding-left: 0 !important;
}

.#{$prefix}-others-time {
  padding-top: 8px !important;
  font-size: 14px !important;
}

.guest_list_item {
  // border: 1px solid #ccc;
  padding:5px;
}

</style>
