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
          <!-- {{header}} -->
        </div>
      </MainLayout>
      <button @click="test" class="test" v-if="isTest">test</button>
      <Log v-if="isLoged!==true"></Log>
      <Loading></Loading>
    </div>
  </a-locale-provider>
</template>
<script>
import zh_CN from 'vue-antd-ui/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
// import Log from './components/views/log.vue'
const Log = () =>
  import ('./components/views/log.vue')
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
      query:{},
      zh_CN,
      setHeader: () => {}
    }
  },
  created() {
    // this.parseQuery()
    // this.addQudaoScript()
    this.setQudao(this.query.qudao)
    window.__test = this.test.bind(this)
    this.checkSession()
    this.configAndroidKeyboard()
  },
  provide() {
    return {
      // appTest:this.func,
    }
  },
  computed: {
    routePath() {
      return this.$route.path
    },
    isTest() {
      return this.$store.state.app.isTest
    },
    matched() {
      return this.$route.matched
    },
    routerMatchedComponent: {
      cached: false,
      get() {
        return this.$route.matched[0] && this.$route.matched[0].instances.default
      }
    },
    header: {
      cached: false,
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
    ...mapState('app', ['platform', 'isAndroid']),
    ...mapState('account', ['isLoged']),
  },
  watch: {
    
  },
  methods: {
    parseQuery() {
      var name, value;
      var str = location.hash;
      var num = str.indexOf("?")
      str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

      var arr = str.split("&"); //各个参数放到数组里
      for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
          name = arr[i].substring(0, num);
          value = arr[i].substr(num + 1);
          this.query[name] = value;
        }
      }
    },
    configAndroidKeyboard() {
      if (!this.isAndroid) {
        return
      }
      var winHeight = window.innerHeight //获取当前页面高度
      window.addEventListener('resize', () => {
        // console.log('resize')
        var currentHeight = window.innerHeight
        // console.log('%c heights', 'color:red', winHeight, currentHeight)
        if (winHeight - currentHeight > 50) {
          // console.log('弹出')
          vueApp.$emit("keyboard_show")
          // document.body.style.height = winHeight + 'px'
        } else {
          vueApp.$emit("keyboard_hide")
          // console.log('收起')
          // document.body.style.height = '100%'
        }
      })
    },
    addQudaoScript() {
      if(this.query.qudao == 'jYzqyi') {
        let script = document.createElement('script')
        script.src="https://s19.cnzz.com/z_stat.php?id=1275196681&web_id=1275196681"
        script.setAttribute('language','JavaScript')
        document.head.append(script)
      }
    },
    test() {
      this.getPayAccount()
      console.log('%c h', 'color:red', this.$store.state)
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
    ...mapMutations('account', ["setQudao"]),
    ...mapActions('account', ["checkSession"]),
    ...mapActions('wallet', ["getPayAccount"]),
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
