<template>
  <div class="mt4_account_card-vue">
    <div class="mt4_account_card-content">
      <div class="mt4_account_card-account" flex="main:justify">
        <span class="mt4_account_card-account-user">MT4账号：{{mt4.mt4Uid}}</span>
        <span class="mt4_account_card-account-name">{{mt4.fullName}}</span>
      </div>
      <div class="mt4_account_card-introduce" flex="main:center cross:center">
        <div class="mt4_account_card-balance" flex-box="1" flex="dir:top main:center cross:center">
          <div>余额</div>
          <div class="money">${{mt4.balanceFee | money}}</div>
        </div>
        <div class="mt4_account_card-trade" flex-box="1" flex="dir:top main:center cross:center">
          <div>持仓亏盈</div>
          <div class="red money" v-if="mt4.openOrderProfit>=0">
            ${{mt4.openOrderProfit | money}}（{{mt4.openOrderNum}}笔）
          </div>
          <div class="green money" v-if="mt4.openOrderProfit<0">
            -${{-mt4.openOrderProfit | money}}（{{mt4.openOrderNum}}笔）
          </div>
          <div class=" money" v-if="mt4.openOrderProfit==null">-</div>
        </div>
      </div>
    </div>
    <div class="mt4_account_card-options" flex="">
      <div class="mt4_account_card-btn" flex-box="1" @click="goAction('/mt4_recharge')">入金</div>
      <div class="mt4_account_card-btn" flex-box="1" @click="goAction('/mt4_withdraw')">出金</div>
      <div class="mt4_account_card-btn" flex-box="1" @click="goAction('/unknown')">跟单</div>
      <div class="mt4_account_card-btn" flex-box="1" @click="goAction('/mt4_trade_history')">交易报表</div>
      <a-dropdown  class="mt4_account_card-btn" flex-box="1">
        <div>更多</div>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="goAction('/mt4_modifypwd')">修改密码</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="goAction('/mt4_findpwd')">找回密码</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
  import mt4Account  from '../mixin/mt4Account.js'
  import {getTimeString} from '@/utils/time.js'
  export default {
    name: 'mt4_account_list_item',
    mixins:[mt4Account],
    props: {
      
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
  $prefix: "mt4_account_card";
  .#{$prefix}-vue {
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    .#{$prefix}-content {
      padding: 10px;
      .#{$prefix}-account {
        .#{$prefix}-account-user {
          font-size: 14px;
          font-weight: 500;
        }
        .#{$prefix}-account-name {
          font-size: 14px;
          color: #aaa;
        }
      }
      .#{$prefix}-introduce {
        padding:10px 0;
        .money {
          font-weight: 500;
        }
      }
    }
    .#{$prefix}-options {
      border-top: 1px solid #ccc;
      background: #f7f9fa;
      .#{$prefix}-btn {
        margin: 8px 0;
        font-size: 12px;
        color: #1890ff;
        text-align: center;
        &:not(:last-child) {
          border-right: 1px solid #ccc;
        }
      }
    }
    .red {
      color:#f5222d;
    }
    .green {
      color:#52c41a;
    }
  }
</style>

