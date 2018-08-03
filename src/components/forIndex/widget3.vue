<template>
  <div class="widget3">
    <div :style="`background-image: url(${src});`" alt="" class="container">
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
  height: 200px;
  width: 360px;
}

.container {
  background: url(#) no-repeat center center;
  background-size: cover;
  height: 100%;
  transition: .5s;
  position: relative;
  &:hover {
    cursor: pointer;

    .content-box:after {
      width: 200px;
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

  }
  &:after {
    content: '';
    background: #0F0;
    width: 100px;
    height: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: .5s;
  }
}

</style>
