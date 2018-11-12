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
  computed: {

    queryPhone() {
      return this.$route.query.phone
    },
    queryPartnerUid() {
      return this.$route.query.partnerUid
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
        search: this.search,
        partnerUid: this.partnerUid,
        depth: this.depth,
        accountType: this.accountType,
        level: this.agentLevel || "",
        symbol: this.symbol&&`${this.symbol}.` || '',
        actionType: this.actionType || '',

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
