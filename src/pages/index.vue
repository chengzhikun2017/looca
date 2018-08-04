<template>
  <div class="index-page">
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
          <span>Oracle-FX • 澳瑞克<br>更懂你的外汇平台</span>
        </h1>
        <h2 class="subtitle">
          开始您与 <strong>澳瑞克</strong> 的交易旅程
        </h2>
        <div class="bttn-box">
          <a href="" class="btn signup">注册真实账户</a>
          <a href="" class="btn login">立即登录</a>
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
        <widget1 :src='itemImgs[0]' title="专业开发团队" content="耗时数年打造的Oracle-FX金牌团队，拥有顶尖的产品开发运营能力。" />
        <widget1 :src='itemImgs[1]' title="屡获外汇经纪商奖" content="Oracle-FX澳瑞克自2013年成立以来，多次获得“年度外汇经纪商“奖。" />
        <widget1 :src='itemImgs[2]' title="严格的监管" content="Oracle-FX澳瑞克荣获澳大利亚ASIC监管号402043." />
        <widget1 :src='itemImgs[3]' title="高效的客服体系" content="Oracle-FX澳瑞克客服团队5*24小时为您提供服务，更懂你的外汇平台。" />
      </div>
    </v-layer>
    <v-layer height="440px">
      <div class="description-box">
        <widget2 :src='descriptionSrcs[0]' title="Oracle-FX澳瑞克执照与监管" content="Oracle-FX澳瑞克平台执照与监管在线查询，平台拥有澳大利亚监管" />
        <widget2 :src='descriptionSrcs[1]' title="Oracle-FX澳瑞克交易产品" content="Oracle-FX澳瑞克拥有目前最全的外汇交易产品，包含外汇、黄金、白银、原油、股指等。" />
        <widget2 :src='descriptionSrcs[2]' title="Oracle-FX澳瑞克跟单社区" content="Oracle-FX澳瑞克重金打造专业外汇交易团队、大数据反向跟单信号、EA等供所有澳瑞克客户选择复制跟单。" />
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
    <v-layer height="300px">
      <div class="college-box">
        <widget3 :src="collegeSrcs[0]" title="澳瑞克商学院" :contents="['Oracle-FX澳瑞克商学院','每天都会有外汇直播哦！']" />
        <widget3 :src="collegeSrcs[1]" title="澳瑞克商学院" :contents="['Oracle-FX澳瑞克商学院','每天都会有外汇直播哦！']" />
        <widget3 :src="collegeSrcs[2]" title="澳瑞克商学院" :contents="['Oracle-FX澳瑞克商学院','每天都会有外汇直播哦！']" />
      </div>
    </v-layer>
    <v-layer height="560px" backgroundClass="bg-red">
      <!-- media report -->
      <div class="media-box">
        <h2 class="title">
          Oracle-FX澳瑞克媒体报道
        </h2>
        <widget4 width="540px" avatarPosition="bottom" :avatarSrc="mediaIcons[0]" :starNum="5" top="180px" left="0px" content="“做为专业平台的Oracle -FX开创更有效的MT4操作系统，依托广大全球会员，以对外贸易、技术转移、资本流动、提供服务、相互联系、相互依存而形成的全球范围的有机经济整体，降低投资风险，实现合力操作，公平透明合理化利润空间。" name="中华网" enName="CHINA.COM" />
        <widget4 width="240px" avatarPosition="bottom" :avatarSrc="mediaIcons[1]" :starNum="4" top="160px" left="590px" content="“Oracle-FX 集团是正规的外汇投资理财平台，为投资者提供一个长久稳定的外汇投资理财平台，投资者的资金在个人MT4账户里，可以随时申请提现。" name="搜狐财经" enName="SOHU.COM" />
        <widget4 width="240px" avatarPosition="top" :avatarSrc="mediaIcons[2]" :starNum="5" top="160px" left="890px" content="“Oracle FX 集团——这是一个创富和改变自己和家族一生的神话，你必须了解的中国金融未来20年最大趋势和未来50年中国5亿人的普通投资理财工具！" name="南方财务网" enName="SOUTHMONEY.COM" />
      </div>
    </v-layer>
    <v-layer height="200px">
      <!-- join -->
      <div class="join-sec">
        <h3 class="title">加入Oracle-FX澳瑞克</h3>
        <p class="content">更懂你的外汇平台，更专业的客户服务，期待您的加入！</p>
        <div class="bttn">在线咨询</div>
      </div>
    </v-layer>
    <v-layer height="275px" backgroundClass="bg-black">
      <!-- contacts -->
      <div class="contacts-box">
        <div class="contacts">
          <div class="links">
            <h3 class="title">相关链接</h3>
            <span class="link">执照和监管</span>
            <span class="link">联系我们</span>
            <span class="link">跟单社区</span>
            <span class="link">开户流程</span>
          </div>
          <div class="links">
            <span class="link"></span>
            <span class="link">MT4下载</span>
            <span class="link">资金安全</span>
            <span class="link">澳瑞克商学院</span>
            <span class="link">合伙人登录</span>
          </div>
          <div class="qr-code">
            <h1 class="title">二维码</h1>
            <img src="#" alt="" class="qr">
          </div>
          <div class="contact-us">
            <h4 class="title">联系我们</h4>
            <p class="tel">客服热线：400-189-0574</p>
            <!-- <p class="mail">Email: service@oracle-fx.com</p> -->
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </v-layer>
  </div>
</template>
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
  methods: {},
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
      height: 5px;
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
      background-color: #cd2122;
      color: #fff;
      margin-right: 20px;
      &:hover {
        background-color: #a41a1b;
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
    font-family: "Open Sans", PingFangSC, helvetica neue, hiragino sans gb, arial, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
    font-size: 18px;
    line-height: 32px;
    font-weight: 100;
    font-style: normal;
  }
}

.items-box {
  margin-top: 20px;
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
    color: #cd2122;
    font-size: 24px;
    margin-bottom: 20px;
    margin-top: 20px;
    /*margin-left: 20px;*/
  }
  .subtitle {
    text-align: left;
    color: #cd2122;
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
    color: #cd2122;
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
    border-color: #cd2122;
    width: 262px;
    position: absolute;
    right: 20px;
    top: 80px;
    height: 50px;
    border-radius: 3px;
    border: 2px solid #cd2122;
    color: #cd2122;
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
    .links {
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
      width: 130px;
      margin-right: 260px;
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

.bg-black {
  background: #2f2f2f;
}

.bg-red {
  background: #cd2224;
}

</style>
