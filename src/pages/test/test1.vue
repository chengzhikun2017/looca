<template>
  <div class="test1">
    <v-layer :backgroundZ="1" height="200px">
      <div> 111</div>
      <div slot="background">
        <a-carousel :autoplay="true">
          <div>
            <h3>1</h3></div>
          <div>
            <h3>2</h3></div>
          <div>
            <h3>3</h3></div>
          <div>
            <h3>4</h3></div>
        </a-carousel>
      </div>
    </v-layer>
    <widget2 :src="src" content="hasdjoajdoiasjdoiasjdoasjdoqjweoiqwjieoqweqwio" title="湿哒哒付群群翁群翁群无大所多群去诶哦亲为将诶噢请问群殴我今儿起"></widget2>
    <widget3 :src="src" :contents="['hasdasjdoqjweoiqwjieoqweqwio','实打实阿萨德阿萨德']" title="湿哒哒付群群翁群翁群无大所多群去诶哦亲为将诶噢请问群殴我今儿起"></widget3>
    <widget4 ref="widget4" :avatarSrc="src" name="外滩" en-name="soho" :content="'hasdasjdoqjweoiqwjieoqweqwio实打实阿萨德打实阿萨德打实阿萨德打实阿萨德打实阿萨德打实阿萨德德德德阿萨德'" title="湿哒哒付群群翁群翁群无大所多群去诶哦亲为将诶噢请问群殴我今儿起"></widget4>
  </div>
</template>
<script>
import layer from './../../components/layout/ContentCenterFullW.vue'
// import widget2 from './../../components/forIndex/widget2.vue'
import widget3 from './../../components/forIndex/widget3.vue'
// const widget4 =  () => import('./../../components/forIndex/widget4.vue')
var vm
export default {
  name: 'test1',
  data() {
    return {
      headerName:'test1',
      src: require("./../../assets/WechatIMG762.jpeg")
    }
  },
  mounted() {
    // console.log('widget4', this.$refs.widget4)
    // console.log('%c widget4', 'color:red', this)
    // var i = 0
    // var Inter = setInterval((params) => {
    //   //body 
    //   if (this.$refs.widget4) {
    //     clearInterval(Inter)
        // console.log('widget4----', this.$refs.widget4)
    //   } else {
        // console.log('i', i++)
        // console.log('widget4----', this.$refs.widget4)
    //   }
    // }, 20)
    // widget4.then(resolve=>{
      // console.log('%c resolve','color:red',resolve)
    // })
  },
  methods: {
    widget4Loaded(){
      // console.log('%c this','color:red',this)
      // console.log('%c widget4---','color:red',this.$refs.widget4)
    },
  },
  created(){
    // vm = this
    this.$refs.widget4 = null
    // console.log('%c widget4---','color:red',this.$refs.widget4)
    setTimeout(()=> {
      // console.log('%c this this ','color:red',this)
    }, 2000);
  },
  computed: {
    // refs(){
    //   return this.$refs
    // },    
    widget4(){
      // console.log('comput widget4')
      return this.$refs.widget4
    },
  },
  watch: {
    widget4(value) {
      // console.log('widget4 watched', widget4)
    },
  },
  components: {
    'v-layer': layer,
    // 'widget2':widget2 ,
    'widget3': widget3,
    widget4: () =>
      import ('./../../components/forIndex/widget4.vue')
      // .then((params) => {
        // console.log('%c loaded','color:red',params)
        // console.log('%c loaded','color:red',this)
        // console.log('%c loaded','color:red',vm)
      //   vm.$nextTick(()=>{
      //   })
      //   setTimeout(function() {
      //     vm.widget4Loaded()
      //   }, 100);
      // })
  },
}

</script>
<style lang='scss' scoped>
.ant-carousel>>>.slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel>>>.slick-slide h3 {
  color: #fff;
}

</style>
<style lang="scss">
.test1 .ant-carousel .slick-slide {
  text-align: center;
  height: 200px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.test .ant-carousel {
  .slick-slide h3 {
    color: #fff;
  }
  .slick-dots {
    height: 10px;
    li {
      height: 10px;
    }
  }
}

.ant-carousel .slick-dots li button {
  height: 10px;
}

</style>
