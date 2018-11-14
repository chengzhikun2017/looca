import PartnerSelect from '../input/partnerUid.vue'
import AccountTypeSelect from '../input/accountTypeSelect.vue'
import DepthSelect from '../input/depthSelect.vue'
import Mt4TypeSelect from '../input/mt4TypeSelect.vue'
import AgentLevelSelect from '../input/agentLevelSelect.vue'
import SymbolSelect from '../input/symbolSelect.vue'
import ActionTypeSelect from '../input/actionTypeSelect.vue'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import {vueApp} from './../../main.js'
export default {
  data() {
    return {
      partnerInfo:{},
      partnerUid: "",
      depth: "",
      mt4Type: "",
      accountType: "",
      agentLevel:"",
      symbol:'',
      actionType:'',

      savedParams:{},
      currentPage:1,      
    }
  },
  created() {
    if(this.isFromUserPage){
      this.search = this.queryPhone
      let {depth,isRoot,isLeaf,key,partnerUid,childUid,title}=this._query
      this.partnerInfo = {
        depth,isRoot,isLeaf,key,partnerUid,childUid,title
      }
    }
  },
  computed: {
    _query(){
      return this.$route.query
    },
    isFromUserPage(){
      return this.$route.query.from_user == 1
    },
    queryPhone() {
      return this.$route.query.phone
    },
    ...mapState('broker',['partnersGot']),
  },
  beforeRouteEnter(to, from,next){
    if(vueApp.$store.state.broker.partnersGot){
      next()
    }else{
      vueApp.$bus.on('partners_got',() => {
        next() 
      })
    }
  },
  methods: {
    beforeSearchList(){
      let params = {
        // search: this.search,
        // partnerUid: this.partnerUid,
        partnerUid: this.partnerInfo.partnerUid,
        childUid:this.partnerInfo.childUid || '',
        depth: this.partnerInfo.depth,
        accountType: this.accountType,
        level: this.agentLevel || "",
        symbol: this.symbol&&`${this.symbol}.` || '',
        actionType: this.actionType || '',
        mt4AccountType: this.mt4Type,
        st: this.startDate,
        et: this.endDate,
        search: this.search,
      }
      this.currentPage = 1
      this.savedParams = params
      console.log('%c params','color:red',params)
      return params
    },
  },
  components: {
    PartnerSelect,
    AccountTypeSelect,
    DepthSelect,
    SymbolSelect,
    ActionTypeSelect,
    Mt4TypeSelect,
    AgentLevelSelect,
  },
}
