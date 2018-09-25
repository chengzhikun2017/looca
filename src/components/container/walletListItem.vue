<template>
  <div class="wallet_list_item">
    <div class="wallet_list_item-content">
      <div class="wallet_list_item-summary" flex="cross:center">
        <div flex-box="1" flex="dir:top">
          <div flex="cross:center">
            <!-- <div class="wallet_list_item-summary-title" flex-box="0">
              {{type=="recharge"?"充值":"提现"}}
            </div> -->
            <div class="wallet_list_item-summary-money" flex-box="1">
              ${{info.dollar | money}}
            </div>
          </div>
          <div class="wallet_list_item-summary-note">
            {{info.payWay | payway}}
          </div>
        </div>
        <div class="wallet_list_item-summary-status" v-if="type==='widthdraw'"  flex-box="0">
          {{info.status | withdrawStatus}}
        </div>
        <div class="wallet_list_item-summary-status" v-if="type==='recharge'"  flex-box="0">
          {{info.status | payStatus}}
        </div>
      </div>
      <div class="wallet_list_item-others" flex="cross:center">
        <div class="wallet_list_item-others-time" flex-box="1">
          {{info.createTime | timeFull}}
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
          <span>汇率：{{info.dollar2rmbRate}}</span>
          <span>人民币：¥{{info.rmb | money}}</span>
        </div>
        <div class="wallet_list_item-detail-item" flex="main:justify">
          流水号：{{info.tradeNo}}
        </div>
        <div class="wallet_list_item-detail-item-button" v-if="info.remarkUrl">
          <span @click="showBill" >转账截图</span>
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
      info: {
        type: Object,
        default: () => {}
      },
    },
    computed:{
      type(){
        if(this.info.hasOwnProperty('receiptName')){
          return 'widthdraw'
        }
        if(this.info.hasOwnProperty('payWay')){
          return 'recharge'
        }
      }, 
    },
    data() {
      return {
        isDetailShow: false
      }
    },
    methods: {
      showBill() {
        if(!this.info.remarkUrl){
          return
        }
        this.$modal.info({
          title:'转账截图',
          content: (<img src={this.info.remarkUrl} style="width: 200px" alt=""/>)
        })
      },
      toggle () {
        this.isDetailShow = !this.isDetailShow
      }
    }
  }
</script>
<style lang="scss">
  $prefix: "wallet_list_item";
  @import '@/styles/listitem/index.scss';
  #app .wallet_list_item .wallet_list_item-summary-money{
    padding-left: 0;
  }
</style>

