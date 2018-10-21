<template>
  <div class="wallet_list_card">
    <div class="wallet_list_card-content">
      <div class="wallet_list_card-summary" flex="cross:center">
        <div flex-box="1" flex="dir:top">
          <div flex="cross:center main:justify">
            <div class="wallet_list_card-summary-title" flex-box="1" flex>
              <div class="wallet_list_card-summary-title-h1">
                622012332
              </div>
              <div class="wallet_list_card-summary-title-h2">
                VIP账户
              </div>
            </div>
            <div class="wallet_list_card-summary-money" flex-box="0">
              1000.00
            </div>
          </div>
        </div>
      </div>
      <div class="wallet_list_card-others" flex="cross:center">
        <div class="wallet_list_card-others-time" flex-box="1">
          2018-19-19 08:00:00
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
        <div class="wallet_list_card-detail-item" v-for="(value, key) in details" :key="key" flex="main:justify">
          <div class="wallet_list_card-detail-item-title">
            <!-- like this 自定义规则 -->
            <span v-if="key === 'bank'">{{config.title[key]}}银行</span>
            <span v-else>{{config.title[key]}}</span>
          </div>
          <div class="wallet_list_card-detail-item-content">{{value}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {getTimeString} from '@/utils/time.js'
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
    computed:{
    },
    data() {
      // 配置表
      const config = {
        title: {
          'alipay': '支付宝转账',
          'rate': '汇率',
          'bank': '招商'
        }
      }
      return {
        config: config,
        isDetailShow: false,
        details: {
          bank: '63548273****8493',
          alipay: 20000,
          rate: 6.18237
        }
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
  $prefix: "wallet_list_card";
  @import '@/styles/listitem/index.scss';
  #app .wallet_list_card {
    .wallet_list_card-summary-title{
      &-h2 {
        padding-left: 10px;
      }
    }
    .wallet_list_card-summary-money{
      padding-left: 0;
      text-align: right;
    }
  }
</style>

