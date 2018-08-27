<template>
  <div class="mt4_account_card">
    <div class="mt4_account_card-content">
      <div class="mt4_account_card-account" flex="main:justify">
        <span class="mt4_account_card-account-user">MT4账号：6323232</span>
        <span class="mt4_account_card-account-name">陶雨</span>
      </div>
      <div class="mt4_account_card-introduce" flex="main:center cross:center">
        <div class="mt4_account_card-balance" flex-box="1" flex="dir:top main:center cross:center">
          <div>余额</div>
          <div class="money">$3333.333</div>
        </div>
        <div class="mt4_account_card-trade" flex-box="1" flex="dir:top main:center cross:center">
          <div>持仓亏盈</div>
          <div class="red money">-$333.33（2笔）</div>
        </div>
      </div>
    </div>
    <div class="mt4_account_card-options" flex="">
      <div class="mt4_account_card-btn" flex-box="1">入金</div>
      <div class="mt4_account_card-btn" flex-box="1">出金</div>
      <div class="mt4_account_card-btn" flex-box="1">跟单</div>
      <div class="mt4_account_card-btn" flex-box="1">交易报表</div>
      <a-dropdown  class="mt4_account_card-btn" flex-box="1">
        <div>更多</div>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">修改密码</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">找回密码</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
  import {getTimeString} from '@/utils/time.js'
  export default {
    name: 'mt4_account_list_item',
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
  $prefix: "mt4_account_card";
  .#{$prefix} {
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

