<template>
  <div class="mt4_account_list_item">
    <div class="mt4_account_list_item-content" flex="main:center cross:center">
      <div class="mt4_account_list_item-account" >
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
          <div class="red money">-$333.33（2笔）</div>
        </div>
      </div>
      <div class="mt4_account_list_item-options" flex-box="0">
        <a-button class="mt4_account_list_item-btn" type="primary" size="small">入金</a-button>
        <a-button class="mt4_account_list_item-btn" type="primary" size="small">出金</a-button>
        <a-button class="mt4_account_list_item-btn" type="primary" size="small">跟单</a-button>
        <a-button class="mt4_account_list_item-btn" type="primary" size="small">交易报表</a-button>
        <a-dropdown>
          <a-button class="mt4_account_list_item-btn" type="primary" size="small">更多</a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              修改密码
            </a-menu-item>
            <a-menu-item>
              找回密码
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'mt4_account_list_item',
    props: {
      mt4: {
        type: Object,
        default(){
          return {

          }
        }
      }
    },
    created(){
    },
    data() {
      return {
      }
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
      color:#f5222d;
    }
    .green {
      color:#52c41a;
    }
  }
</style>

