import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import helper from '../../utils/helper.js'
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
  methods:{
    goAction(path){
      this.setCurrent(this.mt4.mt4Uid)
      helper.goPage(path)
    },
    ...mapMutations("mt4AC",["setCurrent"]),
  },
}