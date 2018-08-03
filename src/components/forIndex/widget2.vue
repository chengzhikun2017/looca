<template>
  <div class="widget2">
    <div :style="`background-image: url(${src});`" alt="" class="container">
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
}

.container {
  background: url(#) no-repeat center center;
  background-size: cover;
  height: 300px;
  transition: .5s;
  position: relative;
  &:hover {
    cursor: pointer;

    .title-box:after {
      width: 200px;
    }
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
  .title {
    color: #fff;
  }
  &:after {
    content: '';
    background: #fff;
    width: 100px;
    height: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: .5s;
  }
}

</style>
