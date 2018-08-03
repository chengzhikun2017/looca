<template>
  <div class="index-page">
    <v-layer :backgroundZ="1" :height="bannerHeight">
      <div slot="background" class="banner-box">
        <a-carousel :autoplay="true">
          <div class="banner-background banner1" :style="`height:${bannerHeight}`">
          </div>
          <div class="banner-background banner2" :style="`height:${bannerHeight}`">
          </div>
        </a-carousel>
      </div>
    </v-layer>
    <v-layer height="570px" >
      <!-- why -->
      <div class="bubble">
        <div class="action_box-inner">
          <div class="action-text">
            <h4 class="text action_box-title" itemprop="headline">
              <span class="emphsis">
                Oracle-FX(澳瑞克)，更懂你的外汇平台。
              </span>
              自2013年以来，给来自30多个国家，超过百万的客户提供稳定外汇交易。
            </h4>
            <h5 class="subtitle">
              交易涉及风险，请确保您完全了解所涉及的风险
            </h5>
          </div>
          <div class="action-box">
            <a href="#" class="btn action_box-button-first btn-lined" target="_blank" itemprop="url">
              注册真实账户 
              </a>
            <a href="#" class="btn action_box-button-second btn-fullwhite" target="_blank" itemprop="url"> 
              客户登录
            </a>
          </div>
        </div>
      </div>
      <div class="why-box">
        <h3 class="tbk__title" itemprop="headline">
          为什么选择Oracle-FX澳瑞克
        </h3>
        <h4 class="tbk__subtitle" itemprop="alternativeHeadline">
          专注于每一位客户的交易体验，一个更懂你的外汇平台。
        </h4>
      </div>
      <div class="items-box">
        <widget1 :src='itemImgs[0]' 
          title="专业开发团队"
          content="耗时数年打造的Oracle-FX金牌团队，拥有顶尖的产品开发运营能力。"
        />
        <widget1 :src='itemImgs[0]' 
          title="专业开发团队"
          content="耗时数年打造的Oracle-FX金牌团队，拥有顶尖的产品开发运营能力。"
        />
        <widget1 :src='itemImgs[0]' 
          title="专业开发团队"
          content="耗时数年打造的Oracle-FX金牌团队，拥有顶尖的产品开发运营能力。"
        />
        <widget1 :src='itemImgs[0]' 
          title="专业开发团队"
          content="耗时数年打造的Oracle-FX金牌团队，拥有顶尖的产品开发运营能力。"
        />
      </div>
    </v-layer>
    <v-layer height="400px" dev>

      <!-- description -->
    </v-layer>
    <v-layer height="560px" dev>
      <!-- download -->
    </v-layer>
    <v-layer height="600px" dev>
      <!-- 一个更懂你的外汇平台 -->
    </v-layer>
    <v-layer height="300px" dev>
      <!-- 商学院 。。。。 -->
    </v-layer>
    <v-layer height="760px" dev>
      <!-- media report -->
    </v-layer>
    <v-layer height="200px" dev>
      <!-- join -->
    </v-layer>
    <v-layer height="375px" dev>
      <!-- contacts -->
    </v-layer>
  </div>
</template>
<script>
import layer from './../components/layout/ContentCenterFullW.vue'
import widget1 from './../components/forIndex/widget1.vue'
import widget2 from './../components/forIndex/widget2.vue'
export default {
  name: 'index',
  data() {
    return {
      bannerHeight: "700px",
      itemImgs:[
      require("./../assets/display/set-03-01.svg"),
      ],
    }
  },
  methods: {},
  computed: {},
  components: {
    'v-layer': layer,
    'widget1': widget1,
    'widget2': widget2,
  },
}

</script>
<style lang='scss' scoped>
.banner-background {
  background: url(#) no-repeat center center;
  background-size: cover;
  height: 100%;
}

.banner1 {
  background-image: url("./../assets/display/banner_1.jpg");
}

.banner2 {
  background-image: url("./../assets/display/banner_2.jpg");
}

.banner-box {
  height: 100%;
}

.bubble {
  color: #fff;
  border-radius: 6px;
  z-index: 1;
  width: 100%;
  height: 200px;
  border: 1px solid red;
  position: relative;
  top: -24px;
  background: #cd2122;
  display: table;
  &:after {
    position: absolute;
    content: '';
    background-color: #CD2122;
    width: 30px;
    height: 32px;
    display: block;
    bottom: -6px;
    left: 20%;
    border-radius: 4px;
    -webkit-transform: skewY(35deg);
    -ms-transform: skewY(35deg);
    transform: skewY(35deg);
    border-top: 0;
  }
  &:before {
    position: absolute;
    content: '';
    background-color: #CD2122;
    /*border:1px solid red;*/
    top: -6px;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    -webkit-transform: skewY(1.5deg);
    -ms-transform: skewY(1.5deg);
    transform: skewY(1.5deg);
    border-radius: 6px;
    transform-origin: right top;
  }
}

.action_box-inner {
  color: #fff;
  position: relative;
  padding: 35px;
  border-radius: 6px;
  z-index: 1;
  h4,
  h5,
  span {
    color: #fff;
  }
  display: flex;
  .action-text {

    text-align: left;
    width: 766px;
    color: #fff;
    font-size: 24px;
    line-height: 33.6px;
    font-weight: normal;
    .subtitle {
      font-size: 14px;
      opacity: .4;
    }
    .emphsis {
      font-weight: 600;
    }
  }
  .action-box {
    padding-left: 30px;
    .btn {
      display: inline-block;
      margin-bottom: 0;
      font-weight: normal;
      text-align: center;
      vertical-align: middle;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      white-space: nowrap;
      font-size: 14px;
      line-height: 1.42857143;
      border-radius: 4px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      margin-left: 5px;
      margin-right: 5px;
      background: none;
      color: #fff;
      text-shadow: none;
      padding: 7px 20px;
      line-height: 1.6;
      box-shadow: none;
      font-size: 14px;
      font-weight: 700;
      border-radius: 3px;
      border: 2px solid #fff;
      -webkit-transition: all .1s ease-in-out;
      transition: all .1s ease-in-out;
      &:hover {
        border-color: hsla(0, 0%, 100%, .7);
        color: #fff;
        text-decoration: none;
      }
    }
    .btn.btn-fullwhite {
      background-color: #fff;
      color: #242424;
      &:hover {
        color: #353535;
        background-color: hsla(0, 0%, 100%, .85);
      }
    }
  }
}

.why-box {
  margin-top: 64px;
  .tbk__title {
    font-family: "Montserrat", PingFangSC, helvetica neue, hiragino sans gb, arial, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
    font-size: 44px;
    line-height: 44px;
    font-weight: 700;
    color: #c8c8c8;
    font-style: normal;
    margin-bottom: 10px;
  }
  .tbk__subtitle {
    font-family: "Open Sans", PingFangSC,helvetica neue,hiragino sans gb,arial,microsoft yahei ui,microsoft yahei,simsun,sans-serif;
    font-size: 18px;
    line-height: 32px;
    font-weight: 100;
    font-style: normal;
  }
}
.items-box{
  margin-top: 20px;
  display: flex;
  /*padding:10px;*/
}
</style>
<style lang="scss">


</style>
