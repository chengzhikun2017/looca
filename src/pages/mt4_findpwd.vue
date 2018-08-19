<template>
  <div class="mt4_findpwd-page">
    <div class="email">
      找回MT4密码，新密码通过邮件发送至{{email}}
    </div>
    <a-button type="primary" @click.native="confirm">
      发送邮件
    </a-button>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name:'mt4_findpwd',
  data() {
    return {
      
    }
  },
  methods: {
    confirm(){
      this.$modal.confirm({
        title:'找回密码',
        content:'确认发送邮件获取新密码',
        onOk:()=>{
          this.findPwd(this.currentMt4Uid)
        }
      })
    },
    ...mapActions('mt4AC',['findPwd'])
  },
  computed: {
    email(){
      return this.identity.email
    },
    ...mapState('mt4AC',['currentMt4Uid']),
    ...mapState('account',['authInfo','identity']),
  },
  components: {},
}
</script>

<style lang='scss' scoped>

</style>
