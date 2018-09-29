import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import helper from '../../utils/helper.js'
import Vue from 'vue'
export default {
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
  computed:{
    ...mapState('mt4AC',['currentMt4Uid']),
    ...mapState('wallet',['money']),
  },
  methods:{
    goAction(path){
      // console.log('%c this','color:red',this)
      this.setCurrent(this.mt4.mt4Uid)
      helper.goPage(path)
    },

    goWithdraw(item){
      this.setCurrent(this.mt4.mt4Uid)
      this.$modal.confirm({
        title:"确认信息",
        style:"top: 20px;",
        onOk:this.goAction.bind(this,'/mt4_withdraw'),
        content: 
        <div>
          <p>MT4账号：<span class="mt4_withdraw-confirm-account">{this.currentMt4Uid}</span></p>
          <p class="important-info">出金至钱包余额，如需提现，请到我的钱包里申请提现</p>
        </div>,
        okText:"前往出金",
        cancelText:"取消",
      })
    },
    goRechage(item){
      this.setCurrent(this.mt4.mt4Uid)
      this.$modal.confirm({
        title:"确认信息",
        style:"top: 20px;",
        onOk:this.goAction.bind(this,'/mt4_recharge'),
        content: 
        <div>
          <p class="important-info">您将使用钱包余额入金</p>
          <p>MT4账号：<span class="mt4_recharge-confirm-account">{this.currentMt4Uid}</span></p>
          <p>钱包余额：<span class="mt4_recharge-confirm-account">${Number(this.money.balance/100).toFixed(2)}</span></p>
        </div>,
        okText:"前往入金",
        cancelText:"取消",
      })
    },
    ...mapMutations("mt4AC",["setCurrent"]),
  },
}