import PartnerSelect from '../input/partnerUid.vue'
import AccountTypeSelect from '../input/accountTypeSelect.vue'
import DepthSelect from '../input/depthSelect.vue'
import Mt4TypeSelect from '../input/mt4TypeSelect.vue'
export default {
  data(){
    return{
      partnerUid:"",
      depth:"",
      mt4Type:"",
      accountType:"",
    }
  },
  components:{
    PartnerSelect,
    AccountTypeSelect,
    DepthSelect,
    Mt4TypeSelect,
  },
}