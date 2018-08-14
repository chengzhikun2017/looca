<template>
  <div class="findpwd-page">
    <SignUp :type="2"></SignUp>
  </div>
</template>
<script>
// import inputMixin from './../components/mixin/input.js'
// import inputHelper from './../utils/inputHelper.js'
// import { ValidationSet } from './../utils/inputHelper.js'
// import {mapState,mapMutations
// ,mapActions,mapGetters} from 'vuex'
import SignUp from "./../components/views/signup.vue"

export default {
  name: 'findpwd',
  data() {
    // let newInput = new inputHelper.newInput(['password','newPassword'])
    // ValidationSet.password(newInput,'password')
    // ValidationSet.password(newInput,'newPassword')
    return {
      // input: newInput,
    }
  },
  // mixins: [inputMixin],
  methods: {
    
  },
  computed: {},
  components: {
    SignUp,
  },
}

</script>
<style lang='scss' scoped>


</style>
