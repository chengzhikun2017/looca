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
    <Log></Log>
  </div>
</template>

<script>
import Log from './components/views/log.vue'
import {mapState,mapMuations,mapActions,mapGetters} from 'vuex'
import router from './router/index.js'
export default {
  name: 'App',
  data(){
    return {
      name:'App',
      func:()=>{
        console.log(this.name)
      },
      setHeader:()=>{

      }
    }
  },
  created(){
    // console.log('%c app created','color:red',this)
  },
  provide(){
    return{
      appTest:this.func,
    }
  },
  computed:{
    header(){
      
    },
    isTest(){
      return true
    },
    routerMatchedComponent:{
      cached:false,
      get(){
        return this.$route.matched[0]&&this.$route.matched[0].instances.default
      }
    },
    header(){
      return this.routerMatchedComponent&&this.routerMatchedComponent.$data.header
    },
    path:{
      cached:false,
      get(){
        return this.$route.path
      }
    },
    ...mapState('app',['platform'])
  },
  watch:{
    path(oldV,newV){
      console.log(oldV,newV)
    },
  },
  methods:{
    test(){
      console.log('%c app vue ','color:red',this)
      console.log('%c app vue ','color:red',this.routerMatchedComponent)
    }
  },
  components:{
    Log,
  },
}
</script>

<style lang="scss" scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.test{
  position: absolute;
  right: 40px;
  top: 0; 
  padding:5px 10px;
  z-index: 999999;
}
.head-text{
  text-align: left;
  padding-left: 20px;

}
</style>
<style >
  @import "./styles/main.scss"
</style>