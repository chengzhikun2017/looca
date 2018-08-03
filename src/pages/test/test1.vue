<template>
  <div class="test">
    <v-layer :backgroundZ="1" height="200px">
      <div> 111</div>
      <div slot="background" >
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
    <widget4 :avatarSrc="src" :content="'hasdasjdoqjweoiqwjieoqweqwio实打实阿萨德打实阿萨德打实阿萨德打实阿萨德打实阿萨德打实阿萨德德德德阿萨德'" title="湿哒哒付群群翁群翁群无大所多群去诶哦亲为将诶噢请问群殴我今儿起"></widget4>
  </div>
</template>
<script>
import layer from './../../components/layout/ContentCenterFullW.vue'
import widget2 from './../../components/forIndex/widget2.vue'
import widget3 from './../../components/forIndex/widget3.vue'
import widget4 from './../../components/forIndex/widget4.vue'
export default {
  name: 'test1',
  data() {
    return {
      src:require("./../../assets/WechatIMG762.jpeg")
    }
  },
  methods: {},
  computed: {},
  components: {
    'v-layer': layer,
    'widget2':widget2 ,
    'widget3':widget3 ,
    'widget4':widget4 ,
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
.test .ant-carousel .slick-slide {
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
  .slick-dots{
    height: 10px;
    li{
      height: 10px;
    }
  }

}
.ant-carousel .slick-dots li button{
  height: 10px;
}
</style>






