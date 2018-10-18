<template>
  <div class="index-page">
    <div class="nav-box">
      <span class="logo-box">
        <div class="logo"></div>
        <span class="name">Looco Global</span>
      </span>
      <nav class="link-box">
        <a-menu
          class="index-page-nav"
          v-model="current"
          mode="horizontal"
        >
          <a-menu-item key="mail">
            首页
          </a-menu-item>
          <a-sub-menu>
            <span slot="title">产品报价</span>
            <a-menu-item key="setting:1">交易细则</a-menu-item>
          </a-sub-menu>
          <a-sub-menu>
            <span slot="title">软件下载</span>
            <a-menu-item key="setting:1">PC</a-menu-item>
            <a-menu-item key="setting:2">苹果</a-menu-item>
            <a-menu-item key="setting:2">安卓</a-menu-item>
          </a-sub-menu>
           <a-sub-menu>
            <span slot="title">教程</span>
            <a-menu-item key="setting:1">教程文档</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="alipay">
            联系我们
          </a-menu-item>
        </a-menu>
      </nav>
    </div>
    <v-layer :height="bannerHeight">
      <div slot="background" class="banner-box">
        <a-carousel :autoplay="true">
          <div class="banner-background banner1" :style="`height:${bannerHeight}`">
          </div>
          <div class="banner-background banner2" :style="`height:${bannerHeight}`">
          </div>
        </a-carousel>
      </div>
      <div class="banner-container">
        <h1 class="title">
          <span>Looco Global • 乐恺环球<br>更懂你的外汇平台</span>
        </h1>
        <h2 class="subtitle">
          开始您与 <strong>乐恺环球</strong> 的交易旅程
        </h2>
        <div class="bttn-box">
          <a :href="`${crmDomain}/#/signup`" class="btn signup">注册真实账户</a>
          <a :href="`${crmDomain}/#/mine_real`" class="btn login">立即登录</a>
        </div>
        <p class="text">交易涉及风险，请确保您完全了解所涉及的风险</p>
      </div>
    </v-layer>
    <v-layer height="570px">
      <!-- why -->
      <div class="bubble">
        <div class="action_box-inner">
          <div class="action-text">
            <h4 class="text action_box-title" itemprop="headline">
              <span class="emphsis">
                Looco Global(乐恺环球)，更懂你的外汇平台。
              </span>
              自2013年以来，给来自30多个国家，超过百万的客户提供稳定外汇交易。
            </h4>
            <h5 class="subtitle">
              交易涉及风险，请确保您完全了解所涉及的风险
            </h5>
          </div>
          <div class="action-box">
            <a :href="`${crmDomain}/#/signup`" class="btn action_box-button-first btn-lined" target="_blank" itemprop="url">
              注册真实账户
              </a>
            <a :href="`${crmDomain}/#/mine_real`" class="btn action_box-button-second btn-fullwhite" target="_blank" itemprop="url">
              客户登录
            </a>
          </div>
        </div>
      </div>
      <div class="why-box">
        <h3 class="tbk__title" itemprop="headline">
          为什么选择Looco Global乐恺环球
        </h3>
        <h4 class="tbk__subtitle" itemprop="alternativeHeadline">
          专注于每一位客户的交易体验，一个更懂你的外汇平台。
        </h4>
      </div>
      <div class="items-box">
        <widget1 :src='itemImgs[0]' title="专业开发团队" content="耗时数年打造的Looco Global金牌团队，拥有顶尖的产品开发运营能力。" />
        <widget1 :src='itemImgs[1]' title="屡获外汇经纪商奖" content="Looco Global乐恺环球自2013年成立以来，多次获得“年度外汇经纪商“奖。" />
        <widget1 :src='itemImgs[2]' title="严格的监管" content="Looco Global乐恺环球荣获美国NFA监管." />
        <widget1 :src='itemImgs[3]' title="高效的客服体系" content="Looco Global乐恺环球客服团队5*24小时为您提供服务，更懂你的外汇平台。" />
      </div>
    </v-layer>
    <v-layer height="440px">
      <div class="description-box">
        <widget2 :src='descriptionSrcs[0]' title="Looco Global乐恺环球执照与监管" content="Looco Global乐恺环球平台执照与监管在线查询，平台拥有美国NFA监管" />
        <widget2 :src='descriptionSrcs[1]' title="Looco Global乐恺环球交易产品" content="Looco Global乐恺环球拥有目前最全的外汇交易产品，包含外汇、黄金、白银、原油、股指等。" />
        <widget2 :src='descriptionSrcs[2]' title="Looco Global乐恺环球跟单社区" content="Looco Global乐恺环球重金打造专业外汇交易团队、大数据反向跟单信号、EA等供所有乐恺环球客户选择复制跟单。" />
      </div>
      <!-- description -->
    </v-layer>
    <v-layer height="560px" :backgroundClass="'bg-grey'">
      <div class="download-page">
        <div class="text-box">
          <h3 class="title">
            MetaTrader 4（MT4）随时随地进行交易
          </h3>
          <h4 class="subtitle">
              最受欢迎的外汇交易平台
          </h4>
          <widget5 title="移动交易技术" content="通过苹果，安卓手机和平板电脑进行交易" />
          <widget5 title="强大的分析功能" content="在线报价以及带有9个周期的交互性图表允许您检查报价所有细节" />
          <widget5 title="稳定安全的交易体验" content="强大的MetaTrader 4 交易系统 保障您进行稳定安全的交易" />
        </div>
        <div class="carousel-box">
          <!-- <img src="../assets/display/set05-01.jpg" alt="" class="temp"> -->
        </div>
      </div>
      <!-- download -->
    </v-layer>
    <!-- <v-layer height="600px" dev> -->
    <!-- 一个更懂你的外汇平台 -->
    <!-- </v-layer> -->
    <v-layer height="275px">
      <!-- contacts -->
      <div class="index-footer">
        <div class="index-footer-logo">
          <a-popover>
            <template slot="content">
              <img class="index-footer-qrcode" src="@/assets/qrcode_assit.png" alt="">
              <div class="index-footer-note">Looco Global</div>
            </template>
            <div class="logo-border">
              <!-- <img src="@/assets/display/logo_red.png" alt=""> -->
              <a-icon type="wechat" />
            </div>
          </a-popover>
        </div>
        <div class="index-footer-menu" flex="main:center corss:center">
          <div class="menu-item">
            <h3>产品报价</h3>
            <a href="../assets/display/交易细则.xls" download target="_blank">交易细则</a>
          </div>
          <div class="menu-item">
            <h3>软件下载</h3>
            <p>PC</p>
            <p>苹果</p>
            <p>安卓</p>
          </div>
          <div class="menu-item">
            <h3>教程</h3>
            <p>教程文档</p>
          </div>
          <div class="menu-item">
            <h3>联系我们</h3>
            <p>客服电话：400-0577009</p>
            <p>客服QQ：83166672</p>
            <p>客服微信：LOOCO8</p>
          </div>
        </div>
        <div class="copyright">
          温馨提示及风险警告：交易存在较高风险，需先认真考虑自身经验水平和所能承担之风险。使用MT4工具进行交易，操作行为是一种自发行为，所引发的一切法律后果，由用户自行承担，请您知悉。
        </div>
      </div>
    </v-layer>
  </div>
</template>
<style lang="scss">
  .index-footer {
    &-logo {
      padding-top: 25px;
      text-align: center;
      .logo-border {
        position: relative;
        background-color: #ccc;
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
        width: 49px;
        height: 49px;
        color: white;
        font-size: 32px;
        line-height: 49px;
        &:hover {
          background-color: #00d500;
        }
      }
    }
    &-qrcode {
      width: 180px;
    }
    &-note {
      text-align: center;
    }
    &-menu {
      margin-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e0e0e0;
      text-align: left;
      .menu-item {
        margin:0 60px;
        h3 {
          margin: 0;
        }
        p {
          margin: 0;
        }
      }
    }
    .copyright {
      padding: 10px 0 25px;
      font-size: 12px;
      color: #ccc;
      text-align: center;
    }
  }
</style>
<script>
import layer from './../components/layout/ContentCenterFullW.vue'
import widget1 from './../components/forIndex/widget1.vue'
import widget2 from './../components/forIndex/widget2.vue'
import widget5 from './../components/forIndex/widget5.vue'
import widget4 from './../components/forIndex/widget4.vue'
import widget3 from './../components/forIndex/widget3.vue'
export default {
  name: 'index',
  data() {
    return {
      crmDomain:"https://crm.looco8.com",
      current: ['mail'],
      bannerHeight: "700px",
      itemImgs: [
        require("./../assets/display/set-03-01.svg"),
        require("./../assets/display/set-03-02.svg"),
        require("./../assets/display/set-03-03.svg"),
        require("./../assets/display/set-03-04.svg"),
      ],
      descriptionSrcs: [
        require("./../assets/display/set04-01.jpg"),
        require("./../assets/display/set04-02.jpg"),
        require("./../assets/display/set04-03.jpg"),
      ],
      collegeSrcs: [
        require("./../assets/display/set07-01.jpg"),
        require("./../assets/display/set07-02.jpg"),
        require("./../assets/display/set07-03.jpg"),
      ],
      mediaIcons: [
        require("./../assets/display/set06-01.jpg"),
        require("./../assets/display/set06-02.png"),
        require("./../assets/display/set06-03.jpg"),

      ],
    }
  },
  methods: {
    download (version) {
      switch(version) {
        case 'windows':
          window.open('https://download.mql5.com/cdn/web/12872/mt4/loocoglobal4setup.exe')
          break
        default:
          return
      }
    }
  },
  computed: {},
  components: {
    'v-layer': layer,
    'widget1': widget1,
    'widget2': widget2,
    'widget3': widget3,
    'widget4': widget4,
    'widget5': widget5,
  },
}

</script>
<style lang='scss' scoped>
$themeRed:#cd2122;
$themeGrey: #808080;
.nav-box{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 1140px;
  /*border:1px solid red;*/
  height: 70px;
  text-align: left;
  z-index: 2;
  /*display: flex;*/
  padding-top: 10px;
  /*justify-content: space-between;*/
  .logo-box{
    flex-grow: 0;
    display: flex;
    width: 320px;
    height: 100%;
    .logo{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background:url("../assets/display/logo_red.png") no-repeat center center;
      background-size: cover;
    }
    .name{
      font-size: 36px;
      margin-left: 10px;
      color: #fff;
      display: inline-block;
      line-height: 1.2;
    }
  }
  .link-box{
    position: absolute;
    right: 0;
    top: 14px;
    margin: 0;
    /*display: inline-block;*/
    /*border:1px solid red;*/
    width:600px;
    text-align: right;
    .nav{
      color: #f5f5f5;
      font-size: 14px;
      border-radius: 3px;
      font-family: "Montserrat", PingFangSC,helvetica neue,hiragino sans gb,arial,microsoft yahei ui,microsoft yahei,simsun,sans-serif;
      line-height: 14px;
      font-weight: 400;
      font-style: normal;
      position: relative;
      padding:8px 12px;
      display: inline-block;
      margin-left: 5px;
      transition: .2s;
      height: 32px;
      margin-top: 4px;
      &:after{
        content: "";
        opacity: 1;
        position: absolute;
        height: 1px;
        width: 7px;
        bottom: 3px;
        bottom: calc(50% - 12px);
        left: 12px;
        background-color: hsla(0,0%,100%,.4);
        -webkit-transition: opacity .2s ease-in-out;
        transition: opacity .2s ease-in-out;
      }
      &:hover{
        background-color: $themeRed;
      }
      &:hover:after{
        background-color:transparent;
      }

    }
    .active{
      background:$themeRed;
      &:after{
        background:transparent;
      }
    }
  }

}
.banner-background {
  background: url(#) no-repeat center center;
  background-size: cover;
  height: 100%;
}

.banner-container {
  margin-top: 280px;
  text-align: left;
  .title {
    color: #fff;
    font-size: 48px;
    line-height: 1.2;
    position: relative;
    &:after {
      content: "";
      height: 3px;
      width: 50px;
      position: absolute;
      background: #fff;
      bottom: -20px;
      left: 0;
    }
  }
  .subtitle {
    font-size: 28px;
    color: #fff;
    /*font-weight: 300;*/
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .text {
    color: #fff;
  }
  .bttn-box {
    height: 60px;
    .btn {
      display: inline-block;
      margin-bottom: 0;
      font-weight: normal;
      text-align: center;
      vertical-align: middle;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      background-image: none;
      border: 1px solid transparent;
      white-space: nowrap;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      border-radius: 4px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

    }
    .login {
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
      }
    }
    .signup {
      background-color: $themeRed;
      color: #fff;
      margin-right: 20px;
      &:hover {
        background-color: #a41a1b;
        // background-color: #808080;
      }
    }
  }
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
  position: relative;
  top: -24px;
  background: $themeGrey;
  display: table;
  &:after {
    position: absolute;
    content: '';
    background-color: $themeGrey;
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
    background-color: $themeGrey;
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
    font-family: "Open Sans", PingFangSC, helvetica neue, hiragino sans gb, arial, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
    font-size: 18px;
    line-height: 32px;
    font-weight: 100;
    font-style: normal;
  }
}

.items-box {
  margin-top: 36px;
  display: flex;
  /*padding:10px;*/
}

.description-box {
  display: flex;
  height: 100%;
}

.download-page {
  display: flex;
  justify-content: space-between;
  height: 400px;
  width: 100%;
  /*padding:20px;*/
  /*padding-left: 40px;*/
  margin-top: 80px;
  background: #fff;
  .title {
    font-size: 24px;
    font-weight: normal;
    text-align: left;
    color: $themeRed;
    font-size: 24px;
    margin-bottom: 20px;
    margin-top: 20px;
    /*margin-left: 20px;*/
  }
  .subtitle {
    text-align: left;
    color: $themeRed;
    font-weight: bold;
    /*margin-left: 20px;*/
    font-size: 24px;
  }
  .text-box {
    height: 100%;
    margin-left: 40px;
  }
  .carousel-box {
    width: 600px;
    height: 100%;
    background: url(./../assets/display/set05-01.jpg) no-repeat center center;
    background-size: cover;
    /*border:1px solid red;*/
    .temp {
      width: 540px;
    }
  }
}

.media-box {
  .title {
    margin-top: 40px;
    font-family: "Montserrat", PingFangSC, helvetica neue, hiragino sans gb, arial, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    font-style: normal;
    position: relative;
    line-height: 70px;
    &:after {
      content: '';
      width: 50px;
      height: 3px;
      background-color: #ccc;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
}

.college-box {
  display: flex;
  justify-content: space-around;
  padding-top: 68px;
}

.join-sec {
  padding-top: 65px;
  position: relative;
  .title {
    font-family: "Montserrat", PingFangSC, helvetica neue, hiragino sans gb, arial, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
    font-size: 24px;
    text-align: left;
    line-height: 30px;
    font-weight: 600;
    color: $themeRed;
    font-style: normal;
    padding-left: 30px;
  }
  .content {
    font-family: "Open Sans", PingFangSC, helvetica neue, hiragino sans gb, arial, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
    font-size: 20px;
    line-height: 26px;
    font-weight: 300;
    font-style: normal;
    text-align: left;
    padding-left: 30px;
  }
  .bttn {
    border-color: $themeRed;
    width: 262px;
    position: absolute;
    right: 20px;
    top: 80px;
    height: 50px;
    border-radius: 3px;
    border: 2px solid $themeRed;
    color: $themeRed;
    font-size: 19px;
    line-height: 48px;
    font-weight: bold;
    &:hover {
      cursor: pointer;
      color: #a41a1a;
      border: 2px solid #a41a1a;
    }
  }
}

.contacts-box {
  .contacts {
    margin-top: 60px;
    height: 180px;
    display: flex;
    .links, .tutorial {
      display: flex;
      flex-direction: column;
      margin-right: 160px;
      .title {
        font-size: 14px;
        color: #fff;
        text-shadow: none;
        margin: 0 0 10px;
        padding-bottom: 0;
        text-transform: none;
        text-align: left;
      }
      .link {
        color: #fff;
        display: block;
        line-height: 1.6;
        padding: 0 10px 0 0;
        margin-bottom: 4px;
        text-align: left;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .qr-code {
      text-align: right;
      width: 130px;
      .title {
        font-size: 14px;
        color: #fff;
        text-shadow: none;
        margin: 0 0 10px;
        padding-bottom: 0;
        text-transform: none;
      }
    }
    .contact-us {
      margin-right: 160px;
      .title {
        font-size: 14px;
        color: #fff;
        text-shadow: none;
        margin: 0 0 10px;
        padding-bottom: 0;
        text-transform: none;
        text-align: left;
      }
      .tel {
        font-size: 14px;
        color: #d5d5d5;
        text-shadow: none;
        margin: 0 0 10px;
        padding-bottom: 0;
        text-transform: none;
        text-align: left;
      }
    }
  }
  .footer {
    border: 0px solid #484848;
    border-bottom-width: 5px;
  }
}

</style>
<style lang="scss">
.bg-grey {
  background: #f5f5f5;
}

.bg-deepgrey {
  background: #808080;
}

.bg-black {
  background: #2f2f2f;
}

.bg-red {
  background: #cd2224;
}

</style>
<style lang="scss">
  .ant-menu-submenu {
    .ant-menu-item {
      height: 36px;
      line-height: 36px;
    }
    .ant-menu-item:hover, .ant-menu-item-active, .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-submenu-active, .ant-menu-submenu-title:hover {
      color: #cd2122;
    }
  }
  .index-page {
    &-nav {
      background: none;
      border: none;
      color: white;
      line-height: 36px !important;
      &.ant-menu-horizontal > .ant-menu-item:hover,
      &.ant-menu-horizontal > .ant-menu-submenu:hover,
      &.ant-menu-horizontal > .ant-menu-item-active,
      &.ant-menu-horizontal > .ant-menu-submenu-active,
      &.ant-menu-horizontal > .ant-menu-item-open,
      &.ant-menu-horizontal > .ant-menu-submenu-open,
      &.ant-menu-horizontal > .ant-menu-item-selected,
      &.ant-menu-horizontal > .ant-menu-submenu-selected {
        border: none;
        background: #cd2122;
        border-radius: 3px;
        color: white;
      }
      li {
        margin: 0 8px;
      }
      .ant-menu-item:hover, .ant-menu-item-active, .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-submenu-active, .ant-menu-submenu-title:hover {
          color: white;
      }
      .ant-select-selection {
        color: white;
        background: none;
        border: none;
        box-shadow: none;
        position: relative;
        &:after {
          content: "";
          opacity: 1;
          position: absolute;
          height: 1px;
          width: 7px;
          bottom: 3px;
          bottom: calc(50% - 12px);
          left: 12px;
          background-color: rgba(255, 255, 255, 0.4);
          -webkit-transition: opacity .2s ease-in-out;
          transition: opacity .2s ease-in-out;
        }
      }
    }
  }
  .qr-code {
    &-boxs {
      &-item {
        text-align: center;
        padding: 0 10px;
        color: white;
        img {
          width: 88px;
          display: block;
        }
      }
    }
  }
</style>
