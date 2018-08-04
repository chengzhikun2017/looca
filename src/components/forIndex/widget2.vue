<template>
  <div class="widget2">
    <div :style="`background-image: url(${src});`" alt="" class="img-container">
      <div class="cover"></div>
      <div class="title-box">
        <h2 class="title">
          {{title}}
        </h2>
      </div>
    </div>
    <!-- <img :src="src"> -->
    <p class="content">
      {{content}}
    </p>
  </div>
</template>
<script>
export default {
  name: 'widget2',
  data() {
    return {

    }
  },
  props: {
    src: {

    },
    title: {

    },
    content: {

    },
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss'>
/*@import 'styles/base.scss'*/
/*@import '../../styles/base.scss'
.test{
  color:$testColor;
}*/

</style>
<style lang='scss' scoped>
.widget2 {
  /*height: 300px;*/
  width: 100%;
  padding:20px;
}

.img-container {
  background: url(#) no-repeat center center;
  background-size: cover;
  height: 300px;
  transition: .5s;
  position: relative;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;

    .title-box:after {
      width: 60px;
    }
  }
  .cover{
    width: 100%;
    height: 100%;
    /*border:1px solid red;*/
    background: linear-gradient(to top,rgba(0,0,0,0.6) 0,rgba(0,0,0,0) 30%)
  }
}

.title,
.content {
  text-align: left;
}

.title-box {
  position: absolute;
  bottom: 10px;
  margin-left: 20px;
  margin-bottom: 20px;
  .title {
    color: #fff;
    font-size: 16px;
  }
  &:after {
    content: '';
    background: #cd2122;
    width: 30px;
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: .2s;
  }
}

</style>
