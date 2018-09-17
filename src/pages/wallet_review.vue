<template>
  <div class="trade_wallet-page">
    <div class="trade_wallet-list">
      <div class="trade_wallet-list-title">余额</div>
      <div class="trade_wallet-list-content">${{money.balance | money}}</div>
      <div class="trade_wallet-list-opt">
        <a-button type='primary' class="wallet-list-btn" @click="go('/wallet_recharge')">
          充值
        </a-button>
        <a-button type='primary' class="wallet-list-btn" @click="go('/wallet_withdraw')">
          提现
        </a-button>
        <a-button type='primary' class="wallet-list-btn" @click="go('/wallet_history')">
          查看流水
        </a-button>
      </div>
    </div>
    <div class="tarde_wallet-divider"></div>
    <div class="trade_wallet-list">
      <div class="trade_wallet-list-title">可提现佣金分红</div>
      <div class="trade_wallet-list-content">${{money.brokerage | money}}</div>
      <div class="trade_wallet-list-opt">
        <a-button type='primary' @click="go('/brokerage_withdraw')" class="trade_wallet-list-btn">
          提取佣金至余额
        </a-button>
      </div>
    </div>
    <div class="tarde_wallet-divider"></div>
    <div class="trade_wallet-list">
      <div class="trade_wallet-list-title">累计佣金分红</div>
      <div class="trade_wallet-list-content">${{money.totalBrokerage | money}}</div>
      <div class="trade_wallet-list-opt">
        <a-button type='primary' class="trade_wallet-list-btn" @click="go('/agent_profit_overview')">
          查看分红记录
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import helper from './../utils/helper.js'
export default {
  name: 'trade_wallet',
  data() {
    return {

    }
  },
  created(){
    this.getWallet()
  },
  methods: {
    go(path){
      helper.goPage(path)
    },
    ...mapActions('wallet',['getWallet'])
  },
  computed: {
    ...mapState('wallet',['money',])
  },
  components: {
  }
}
</script>
<style lang='scss' scoped>
.trade_wallet-page {
  .trade_wallet-list {
    .trade_wallet-list-title {
      margin-bottom: 15px;
      font-weight: 500;
      font-size: 18px;
      color: rgba(0,0,0,.85);
    }
    .trade_wallet-list-content {
      padding-bottom: 15px;
      font-size: 16px;
      color: #f5222d;
    }
    .trade_wallet-list-btn {
      margin-bottom: 10px;
    }
  }
  .tarde_wallet-divider {
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0 32px;
    clear: both;
    background: #e8e8e8;
  }
}
</style>
