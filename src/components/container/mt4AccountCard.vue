<template>
  <div class="mt4_account_card-vue">
    <div class="mt4_account_card-content">
      <div class="mt4_account_card-account" flex="main:justify">
        <span class="mt4_account_card-account-user">
          MT4{{mt4.type| mt4Type}}<a class="btn" v-if="mt4.type==='vip'" type="primary" size="small" @click="viewVIP(mt4)">VIP账号</a>：{{mt4.mt4Uid}}
          <!-- <div class="mt4_account_list_item-account-box-follow" v-if="mt4.type==='vip'">  -->
          <!-- </div> -->
          <a-button size="small" icon="usb" type="primary" ghost v-if="mt4.type=='follow'"  @click="onClickFollowBtn">
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
      <div class="mt4_account_card-ribbons" :class="mt4.vipNewestStatus===0?'active':''" v-if="mt4.type==='vip'" @click="viewVIP(mt4)">
        <div class="mt4_account_card-ribbons-bg"></div>
        <div class="mt4_account_card-ribbons-add"></div>
        <div class="mt4_account_card-ribbons-add2"></div>
        <div class="mt4_account_card-ribbons-text">VIP</div>
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
  position: relative;
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
  .#{$prefix}-ribbons {
    position: absolute;
    bottom: 40px;
    right: -2px;
    &.active {
      .#{$prefix}-ribbons-bg {
        border-right: 49px solid #f5222d;
      }
      .#{$prefix}-ribbons-text {
        color: #f4f80a;
      }
    }
    &-bg {
      position: absolute;
      bottom: 49px;
      right: 1px;
      border-bottom: 49px solid transparent;
      border-left: 49px solid transparent;
      border-right: 49px solid #ccc;
      transform-origin: center bottom;
      transform: rotate(90deg);
    }
    &-add {
      position: absolute;
      bottom: 22px;
      right: 1px;
      // z-index: 1;
      border-bottom: 22px solid transparent;
      border-left: 22px solid transparent;
      border-right: 22px solid #ccc;
      transform-origin: center bottom;
      transform: rotateZ(90deg);
    }
    &-add2 {
      position: absolute;
      bottom: 21px;
      right: 2px;
      border-bottom: 20px solid transparent;
      border-left: 20px solid transparent;
      border-right: 20px solid white;
      transform-origin: center bottom;
      transform: rotateZ(90deg);
    }
    &-text {
      position: absolute;
      bottom: 12px;
      right: 18px;
      transform-origin: top right;
      transform: rotateZ(-45deg);
      font-weight: 700;
      color: white;
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
