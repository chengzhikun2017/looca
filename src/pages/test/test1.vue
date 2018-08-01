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
  </div>
</template>
<script>
import layer from './../../components/layout/ContentCenterFullW.vue'
export default {
  name: 'test1',
  data() {
    return {

    }
  },
  methods: {},
  computed: {},
  components: {
    'v-layer': layer,
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






