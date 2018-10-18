<template>
  <div class="mt4_account_card-vue">
    <div class="mt4_account_card-content">
      <div class="mt4_account_card-account" flex="main:justify">
        <span class="mt4_account_card-account-user">
          MT4{{mt4.type| mt4Type}}：{{mt4.mt4Uid}}
          <!-- <div class="mt4_account_list_item-account-box-follow" v-if="mt4.type==='vip'">  -->
            <a class="btn" v-if="mt4.type==='vip'" type="primary" size="small" @click="viewVIP(mt4)">VIP账号</a>
          <!-- </div> -->
          <a-button size="small" icon="usb" type="primary" ghost v-if="mt4.type=='follow'"  @click="goAction('/unknown')">
            跟单
          </a-button>
        </span>
        <span class="mt4_account_card-account-name">{{mt4.fullName}}</span>
      </div>
      <div class="mt4_account_card-introduce" flex="main:center cross:center">
        <div class="mt4_account_card-balance" flex-box="1" flex="dir:top main:center cross:center">
          <div>余额</div>
          <div class="money">${{mt4.balanceFee | money}}</div>
        </div>
        <div class="mt4_account_card-trade" flex-box="1" flex="dir:top main:center cross:center">
          <div>持仓亏盈</div>
          <div class="red money" v-if="mt4.openOrderProfit!==null&&mt4.openOrderProfit>=0">
            ${{mt4.openOrderProfit}}（{{mt4.openOrderNum}}笔）
          </div>
          <div class="green money" v-if="mt4.openOrderProfit<0">
            -${{-mt4.openOrderProfit}}（{{mt4.openOrderNum}}笔）
          </div>
          <div class=" money" v-if="mt4.openOrderProfit==null">-</div>
        </div>
      </div>
    </div>
    <div class="mt4_account_card-options" flex="">
      <div class="mt4_account_card-btn" flex-box="1" @click="goRechage">
        <a-button size="small" icon="login" type="primary" ghost>
          入金
        </a-button>
      </div>
      <div class="mt4_account_card-btn" flex-box="1" @click="goWithdraw">
        <a-button size="small" icon="logout" type="primary" ghost :disabled="mt4.balanceFee === 0">
          出金
        </a-button>
      </div>
      <!-- <div v-if="mt4.type==='follow' && false" class="mt4_account_card-btn" flex-box="1">
        
      </div> -->
      <div class="mt4_account_card-btn" flex-box="1" @click="goAction('/mt4_trade_history')">
        <a-button size="small" icon="bar-chart" type="primary" ghost>
          交易报表
        </a-button>
      </div>
      <a-dropdown class="mt4_account_card-btn" flex-box="1">
        <div>
          <a-button size="small" type="primary" ghost>
            更多...
          </a-button>
        </div>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="goAction('/mt4_money_bill')">出入金记录</a>
          </a-menu-item>
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
import helper from '../../utils/helper.js'
import mt4Account from '../mixin/mt4Account.js'
import { getTimeString } from '@/utils/time.js'
export default {
  name: 'mt4_account_list_item',
  mixins: [mt4Account],
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
$prefix: "mt4_account_card";
.#{$prefix}-vue {
  .ant-btn > .anticon + span, .ant-btn > span + .anticon {
      margin-left: 2px;
  }
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
      padding: 10px 0;
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
    color: #f5222d;
  }
  .green {
    color: #52c41a;
  }
}

</style>
