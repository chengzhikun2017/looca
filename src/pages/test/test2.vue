<template>
  <div class="test2">
    <router-link to="test1">test1</router-link>
    <Login></Login>
  </div>
</template>
<script>
import layer from './../../components/layout/ContentCenterFullW.vue'
// import widget2 from './../../components/forIndex/widget2.vue'
import widget3 from './../../components/forIndex/widget3.vue'
import Login from './../../components/views/login.vue'
const widget4 =  () => import('./../../components/forIndex/widget4.vue')
export default {
  name: 'test2',
  data() {
    return {
      src:require("./../../assets/WechatIMG762.jpeg")
    }
  },
  methods: {},
  computed: {},
  components: {
    'v-layer': layer,
    // 'widget2':widget2 ,
    'widget3':widget3 ,
    'widget4':widget4 ,
    'Login':Login ,
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






