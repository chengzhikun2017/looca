<template>
  <div class="wallet_list_card">
    <div class="wallet_list_card-content">
      <div class="wallet_list_card-summary" flex="cross:center">
        <div flex-box="1" flex="dir:top">
          <div flex="cross:center main:justify">
            <div class="wallet_list_card-summary-title" flex-box="1" flex>
              <div class="wallet_list_card-summary-title-h1" v-if="info.mt4Uid" style="margin-right: 5px">
                {{info.mt4Uid}} 
              </div>
              <div class="wallet_list_card-summary-title-h1">
                {{walletTypes[info.type]}}
              </div>
              <!-- <div class="wallet_list_card-summary-title-h1"> -->
                <!-- {{info.orderId}} -->
              <!-- </div> -->
              <!-- <div class="wallet_list_card-summary-title-h2">
                这里不知道根据什么参数来确定的
                VIP账户
              </div> -->
            </div>
            <div class="wallet_list_card-summary-money" flex-box="0">
              ${{info.amount | money}}
            </div>
          </div>
        </div>
      </div>
      <div class="wallet_list_card-others" flex="cross:center">
        <div class="wallet_list_card-others-time" flex-box="1">
          {{info.createTime | timeFull}}
        </div>
        <div class="wallet_list_card-others-turnoff" @click="toggle" flex-box="0">
          <a-icon v-if="!isDetailShow" type="down-circle" />
          <a-icon v-else type="up-circle" />
        </div>
      </div>
    </div>
    <div v-if="isDetailShow" class="wallet_list_card-divider"></div>
    <transition name="slide">
      <div v-if="isDetailShow" class="wallet_list_card-detail">
        <div class="wallet_list_card-detail-item" v-if="detailInfo.bizNo" flex="main:justify">
          <div class="wallet_list_card-detail-item-title">业务编号：</div>
          <div class="wallet_list_card-detail-item-content">{{detailInfo.bizNo}}</div>
        </div>
        <div class="wallet_list_card-detail-item" v-if="detailInfo.payWay" flex="main:justify">
          <div class="wallet_list_card-detail-item-title">支付方式：</div>
          <div class="wallet_list_card-detail-item-content">{{detailInfo.payWay | payway}}</div>
        </div>
        <div class="wallet_list_card-detail-item" v-if="detailInfo.bankName" flex="main:justify">
          <div class="wallet_list_card-detail-item-title">银行：</div>
          <div class="wallet_list_card-detail-item-content">{{detailInfo.bankName}}</div>
        </div>
        <div class="wallet_list_card-detail-item" v-if="detailInfo.bankCardNum" flex="main:justify">
          <div class="wallet_list_card-detail-item-title">银行卡号：</div>
          <div class="wallet_list_card-detail-item-content">{{detailInfo.bankCardNum | bankCard}}</div>
        </div>
        <div class="wallet_list_card-detail-item" v-if="detailInfo.dollar2RMBRate" flex="main:justify">
          <div class="wallet_list_card-detail-item-title">汇率：</div>
          <div class="wallet_list_card-detail-item-content">{{detailInfo.dollar2RMBRate}}</div>
        </div>
        <div class="wallet_list_card-detail-item" v-if="detailInfo.level" flex="main:justify">
          <div class="wallet_list_card-detail-item-title">VIP等级：</div>
          <div class="wallet_list_card-detail-item-content">{{detailInfo.level}}</div>
        </div>
        <div class="wallet_list_card-detail-item" v-if="detailInfo.st" flex="main:justify">
          <div class="wallet_list_card-detail-item-title">开始时间：</div>
          <div class="wallet_list_card-detail-item-content">{{detailInfo.st | timeFull}}</div>
        </div>
        <div class="wallet_list_card-detail-item" v-if="detailInfo.et" flex="main:justify">
          <div class="wallet_list_card-detail-item-title">结束时间：</div>
          <div class="wallet_list_card-detail-item-content">{{detailInfo.et | timeFull}}</div>
        </div>
        <div class="wallet_list_card-detail-item" v-if="detailInfo.orderId" flex="main:justify">
          <div class="wallet_list_card-detail-item-title">订单号：</div>
          <div class="wallet_list_card-detail-item-content">{{detailInfo.orderId}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import helper from './../../utils/helper.js'
var walletTypes = helper.walletTypes
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import { getTimeString } from '@/utils/time.js'
export default {
  name: 'wallet_list_card',
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          dollar: 10
        }
      }
    },
  },
  computed: {},
  created() {
    // console.log('info', this.info)
  },
  data() {
    // 配置表
    // const config = {
    //   title: {
    //     'alipay': '支付宝转账',
    //     'rate': '汇率',
    //     'bank': '招商'
    //   }
    // }
    return {
      walletTypes,
      detailInfo:{},
      // config: config,
      isDetailShow: false,
      // details: {
      //   bank: '63548273****8493',
      //   alipay: 20000,
      //   rate: 6.18237
      // }
    }
  },
  methods: {
    toggle() {
      this.isDetailShow = !this.isDetailShow
      this.getDetail()
    },
    getDetail(){
      this.getBalanceDetail({
        type:this.info.type,
        bizNo:this.info.bizNo,
      })
      .then((res) => {
        this.detailInfo = {bizNo:this.info.bizNo,...res}
      })
    },
    ...mapActions('wallet',['getBalanceDetail']),
  }
}

</script>
<style lang="scss">
$prefix: "wallet_list_card";
@import '@/styles/listitem/index.scss';
#app .wallet_list_card {
  .wallet_list_card-summary-title {
    &-h2 {
      padding-left: 10px;
    }
  }
  .wallet_list_card-summary-money {
    padding-left: 0;
    text-align: right;
  }
}

</style>
