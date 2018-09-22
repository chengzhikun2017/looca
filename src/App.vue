<template>
<a-locale-provider :locale="zh_CN">
  <div id="app">
    <div id="__test"></div>
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
</a-locale-provider>
</template>
<script>
  import zh_CN from 'vue-antd-ui/lib/locale-provider/zh_CN';
  import 'moment/locale/zh-cn';
import Log from './components/views/log.vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import router from './router/index.js'
import Loading from './components/loading.vue'
import { Message } from 'vue-antd-ui'
import Vue from 'vue'
export default {
  name: 'App',
  data() {
    return {
      name: 'App',
      zh_CN,
      setHeader: () => {
      }
    }
  },
  created() {
    this.checkSession()
    // this.$store.dispatch('wallet/getCurrency')
    // setInterval(() => {
    //   this.$store.dispatch('wallet/getCurrency')
    // },120000)
    // var winHeight = $(window).height(); //获取当前页面高度
    this.configAndroidKeyboard()
  },
  provide() {
    return {
      // appTest:this.func,
    }
  },
  computed: {
    routePath(){
      return this.$route.path
    },
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
    // path: {
    //   cached: false,
    //   get() {
    //     return this.$route.path
    //   }
    // },
    ...mapState('app', ['platform','isAndroid']),
    ...mapState('account', ['isLoged']),
  },
  watch: {
    // path(oldV, newV) {
    //   // console.log(oldV, newV)
    // },
  },
  methods: {
    configAndroidKeyboard(){
      if(!this.isAndroid){
        return
      }
      var winHeight = window.innerHeight //获取当前页面高度
      window.addEventListener('resize',()=>{
        console.log('resize')
        var currentHeight = window.innerHeight
        console.log('%c heights','color:red',winHeight,currentHeight)
        if(winHeight - currentHeight >50){
          console.log('弹出')
          vueApp.$emit("keyboard_show")
          // document.body.style.height = winHeight + 'px'
        }else{
          vueApp.$emit("keyboard_hide")
          console.log('收起')
          // document.body.style.height = '100%'
        }
      })      
    },
    test() {
      console.log('%c h','color:red',this.$store)
      // this.$router.push('/test3')
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
    ...mapActions('account', ["checkSession"]),
    ...mapMutations
  },
  components: {
    Log,
    Loading,
  },
}

</script>
<style lang="scss" scoped>
#app {
  max-width: 2000px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

.test {
  position: fixed;
  height: 50px;
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
