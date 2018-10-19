import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import helper from '../../utils/helper.js'
import TimeUtil from '../../utils/time.js'
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
    viewVIP(mt4) {
      console.log('%c mt4','color:red',mt4)
      let st = TimeUtil.getTimeString(mt4.vipSt,0,11)
      let et = TimeUtil.getTimeString(mt4.vipEt,0,11)
      let status
      switch(mt4.vipNewestStatus){
        // 0正常，1，2
        case 0: status = '正常';break;
        case 1: status = '失效';break;
        case 2: status = '余额不足';break;
      }
      this.$modal.info({
          title:"VIP账号 "+mt4.mt4Uid,
          style:"top: 60px;",
          // onOk:this.goAction.bind(this,'/mt4_withdraw'),
          content: 
          <div>
            <div>VIP等级：{mt4.vipLevel}</div>
            <div>VIP时间：{st} 0点 ~ {et} 0点</div>
            <div>VIP状态：{status}</div>
            <div>已返还手续费：${Number(mt4.vipReturnFee/100).toFixed(2)}</div>
          </div>,
          okText:"关闭",
          // cancelText:"取消",
      })
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