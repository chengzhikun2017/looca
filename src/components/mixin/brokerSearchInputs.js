import PartnerSelect from '../input/partnerUid.vue'
import AccountTypeSelect from '../input/accountTypeSelect.vue'
import DepthSelect from '../input/depthSelect.vue'
import Mt4TypeSelect from '../input/mt4TypeSelect.vue'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import {vueApp} from './../../main.js'
export default {
  data() {
    return {
      partnerUid: "",
      depth: "",
      mt4Type: "",
      accountType: "",
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

  components: {
    PartnerSelect,
    AccountTypeSelect,
    DepthSelect,
    Mt4TypeSelect,
  },
}
