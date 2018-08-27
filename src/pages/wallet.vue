<template>
  <div class="wallet-page">
    <div class="wallet-list">
      <div class="wallet-list-title">余额</div>
      <div class="wallet-list-content">${{money.balance|money}}343.44</div>
      <div class="wallet-list-opt">
        <a-button type='primary' class="wallet-list-btn" @click="goPage('wallet_recharge')">
          充值
        </a-button>
        <a-button type='primary' class="wallet-list-btn" @click="goPage('wallet_withdraw')">
          提现
        </a-button>
        <a-button type='primary' class="wallet-list-btn" @click="goPage('wallet_history')">
          查看流水
        </a-button>
      </div>
    </div>
    <div class="wallet-divider"></div>
    <div class="wallet-list">
      <div class="wallet-list-title">可提现佣金分红</div>
      <div class="wallet-list-content">${{money.brokerage|money}}343.44</div>
      <div class="wallet-list-opt">
        <a-button type='primary' class="wallet-list-btn" @click="goPage('wallet_withdraw')">
          提现至余额
        </a-button>
      </div>
    </div>
    <div class="wallet-divider"></div>
    <div class="wallet-list">
      <div class="wallet-list-title">累计佣金分红</div>
      <div class="wallet-list-content">${{money.totalBrokerage|money}}343.44</div>
      <div class="wallet-list-opt">
        <a-button type='primary' class="wallet-list-btn" @click="goPage('wallet_history')">
          查看分红记录
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import helper from '../utils/helper.js'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name: 'wallet',
  data() {
    return {
    }
  },
  methods: {
    goPage(path){
      helper.goPage(path)
    },
  },
  computed: {
    ...mapState('wallet',['money'])
  },
  components: {
  }
}
</script>
<style lang='scss' scoped>
.wallet-page {
  .wallet-list {
    .wallet-list-title {
      margin-bottom: 15px;
      font-weight: 500;
      font-size: 18px;
      color: rgba(0,0,0,.85);
    }
    .wallet-list-content {
      padding-bottom: 15px;
      font-size: 16px;
      color: #f5222d;
    }
    .wallet-list-btn {
      margin-bottom: 10px;
    }
  }
  .wallet-divider {
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0 32px;
    clear: both;
    background: #e8e8e8;
  }
}
</style>
