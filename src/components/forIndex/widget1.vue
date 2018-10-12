<template>
  <div class="wedget1">
    <h2 class="title">{{title}}</h2>
    <div class="text">
      <div :style="`background-image: url(${src});`" alt="" class="icon"></div>
      <p class="content" v-html="content"></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'wedget1',
  data() {
    return {

    }
  },
  props: {
    src: {},
    title: {},
    content: {},
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>
.wedget1 {
  width: 25%;
  box-sizing: content-box;
  padding:0 10px;
  position: relative;
}

.icon {
  position: absolute;
  width: 100px;
  left: 15px;
  top: 40px;
  height: 100px;
  background: url(#) no-repeat center center;
  background-size: contain;
}
.text{
  margin-left: 120px;
  text-align: left;
}
.title {
  font-family: "Open Sans", PingFangSC, helvetica neue, hiragino sans gb, arial, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
  font-size: 22px;
  line-height: 30px;
  font-weight: 400;
  color: #545d60;
  font-style: normal;
  margin-top: 0;
  margin-bottom: 20px;
}

.subtitle {
  margin-top: 0;
  margin-bottom: 15px;
  font-family: "Open Sans", PingFangSC,helvetica neue,hiragino sans gb,arial,microsoft yahei ui,microsoft yahei,simsun,sans-serif;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  color: #777f84;
  font-style: normal;

}

</style>
