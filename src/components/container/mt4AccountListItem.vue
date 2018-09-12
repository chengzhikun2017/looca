<template>
  <div class="mt4_account_list_item">
    <div class="mt4_account_list_item-content" flex="main:center cross:center">
      <div class="mt4_account_list_item-account">
        <div class="mt4_account_list_item-account-box" flex>
          <div class="mt4_account_list_item-account-box-label">MT4账号：</div>
          <div class="mt4_account_list_item-account-box-input">{{mt4.mt4Uid}}</div>
        </div>
        <div class="mt4_account_list_item-account-box" flex>
          <div class="mt4_account_list_item-account-box-label">名称：</div>
          <div class="mt4_account_list_item-account-box-input">{{mt4.fullName}}</div>
        </div>
      </div>
      <div class="mt4_account_list_item-introduce" flex-box="1" flex="main:center cross:center">
        <div class="mt4_account_list_item-balance" flex-box="1" flex="dir:top main:center cross:center">
          <div>余额</div>
          <div class="money">${{mt4.balanceFee | money}}</div>
        </div>
        <div class="mt4_account_list_item-trade" flex-box="1" flex="dir:top main:center cross:center">
          <div>持仓亏盈</div>
          <div class="red money" v-if="mt4.openOrderProfit!==null&&mt4.openOrderProfit>=0">
            ${{mt4.openOrderProfit | money}}（{{mt4.openOrderNum}}笔）
          </div>
          <div class="green money" v-if="mt4.openOrderProfit<0">
            -${{-mt4.openOrderProfit | money}}（{{mt4.openOrderNum}}笔）
          </div>
          <div class=" money" v-if="mt4.openOrderProfit==null">-</div>
        </div>
      </div>
      <div class="mt4_account_list_item-options" flex-box="0">
        <a-button class="mt4_account_list_item-btn" type="primary" size="small" @click="goAction('/mt4_recharge')">入金</a-button>
        <a-button class="mt4_account_list_item-btn" type="primary" size="small" @click="goAction('/mt4_withdraw')">出金</a-button>
        <a-button class="mt4_account_list_item-btn" type="primary" size="small" @click="goAction('/unknown')">跟单</a-button>
        <a-button class="mt4_account_list_item-btn" type="primary" size="small" @click="goAction('/mt4_trade_history')">交易报表</a-button>
        <a-dropdown>
          <a-button class="mt4_account_list_item-btn" type="primary" size="small">更多</a-button>
          <a-menu slot="overlay">
            <a-menu-item @click="goAction('/mt4_money_bill')">
              出入金记录
            </a-menu-item>
            <a-menu-item @click="goAction('/mt4_modifypwd')">
              修改密码
            </a-menu-item>
            <a-menu-item @click="goAction('/mt4_findpwd')">
              找回密码
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import mt4Account from '../mixin/mt4Account.js'
export default {
  name: 'mt4_account_list_item',
  mixins: [mt4Account],
  props: {

  },
  created() {},
  data() {
    return {}
  }
}

</script>
<style lang="scss">
$prefix: "mt4_account_list_item";
@import '@/styles/listitem/index.scss';
.#{$prefix} {
  .#{$prefix}-account {
    min-width: 200px;
    .#{$prefix}-account-box {
      .#{$prefix}-account-box-label {
        width: 100px;
        text-align: right;
      }
      .#{$prefix}-account-box-input {
        text-align: left;
      }
    }
  }
  .#{$prefix}-btn {
    font-size: 13px;
  }
  .red {
    color: #f5222d;
  }
  .green {
    color: #52c41a;
  }
}

</style>
