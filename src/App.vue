<template>
  <div id="app">
    <MainLayout headerType="0">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
      <div slot="header" class="head-text">
        {{header}}
        <!-- title -->
        <!-- account -->
        <!-- message -->
      </div>
    </MainLayout>
    <button @click="test" class="test" v-if="isTest">test</button>
    <Log v-if="isLoged!==true"></Log>
    <Loading ></Loading>
  </div>
</template>
<script>
import Log from './components/views/log.vue'
import { mapState, mapMutations
, mapActions, mapGetters } from 'vuex'
import router from './router/index.js'
import Loading from './components/loading.vue'
import { Message } from 'vue-antd-ui'
export default {
  name: 'App',
  data() {
    return {
      name: 'App',
      // func:()=>{
      //   console.log(this.name)
      // },
      setHeader: () => {

      }
    }
  },
  created() {
    this.checkSession()
    setInterval(() => {
      this.$store.dispatch('wallet/getCurrency')
    },120000)
    this.$store.dispatch('wallet/getPayAccount')
    // console.log('%c app created','color:red',this)
  },
  provide() {
    return {
      // appTest:this.func,
    }
  },
  computed: {
    isTest() {
      return this.$store.state.app.isTest
    },
    matched(){
      return this.$route.matched
    },
    routerMatchedComponent: {
      cached: false,
      get() {
        return this.$route.matched[0] && this.$route.matched[0].instances.default
      }
    },
    header: {
      cached:false,
      get() {
        return this.routerMatchedComponent && this.routerMatchedComponent.__header
      }
    },
    path: {
      cached: false,
      get() {
        return this.$route.path
      }
    },
    ...mapState('app', ['platform']),
    ...mapState('account', ['isLoged']),
  },
  watch: {
    path(oldV, newV) {
      console.log(oldV, newV)
    },
  },
  methods: {
    test() {
      console.log('%c h','color:red',this.$store.state)
      // this.$store.dispatch('mt4Balance/list')
      // this.$modal.info({
      //   title: 'This is a notification message',
      //   content: `<h2>hahahah</h2>`,
      //   onOk() {},
      // })
      // this.$message.info('1111')
      // this.$store.dispatch('account/')
      // this.$hideLoading()
      // console.log('%c app vue ','color:red',this)
      // console.log('%c app vue ','color:red',this.routerMatchedComponent)
    },
    ...mapActions('account', ["checkSession"])
  },
  components: {
    Log,
    Loading,
  },
}

</script>
<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.test {
  position: fixed;
  right: 140px;
  top: 40px;
  padding: 5px 10px;
  z-index: 999999;
  background: #f0f;
}

.head-text {
  text-align: left;
  padding-left: 20px;
}

</style>
<style>


</style>
