<template>
  <div class="tutorial">
    <img class="tutorial-img" v-for="n in pages" :key="n" :src="'https://www.looco8.com/' + file + '/幻灯片' + n + '.jpg'" alt="">
  </div>
</template>
<script>
  export default {
    props: {
      file: {
        type: String,
        default: ''
      },
      pages: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
      }
    }
  }
</script>
<style lang="scss">
  .tutorial {
    &-img {
      width: 100%;
    }
  }
</style>
