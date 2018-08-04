<template>
  <div class="widget3">
    <div :style="`background-image: url(${src});`" alt="" class="img-container">
      <div class="title-box">
        <h2 class="title">
          {{title}}
        </h2>
      </div>
      <div class="content-box">
        <p class="content" v-for="content in contents">
          {{content}}
        </p>
      </div>
    </div>
    <!-- <img :src="src"> -->
  </div>
</template>
<script>
export default {
  name: 'widget3',
  data() {
    return {

    }
  },
  props: {
    src: {

    },
    title: {

    },
    contents: {

    },
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>
.widget3 {
  height: 175px;
  width: 360px;
}

.img-container {
  padding:20px;
  background: url(#) no-repeat center center;
  background-size: cover;
  height: 100%;
  transition: .2s;
  position: relative;
  &:hover {
    cursor: pointer;
    .content-box:after {
      width: 100px;
    }
  }
}

.title,
.content {
  text-align: left;
}

.title-box {
  /*position: absolute;*/
  bottom: 10px;
  margin-left: 20px;
  .title {
    color: #fff;
  }
}

.content-box{
  margin-left: 20px;
  position: relative;
  .content{
    color:#fff;
    margin: 0;
  }
  &:after {
    content: '';
    background: #fff;
    width: 50px;
    height: 3px;
    position: absolute;
    bottom: -20px;
    left: 0;
    transition: .2s;
  }
}

</style>
