<template>
  <div class="tutorial">
    <img class="tutorial-img" v-for="n in pages" :key="n" :src="'https://looco-1251098434.file.myqcloud.com/' + file + '/' + file + '.' + getNumber(n) + '.jpeg'" alt="">
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
    },
    methods: {
      getNumber (num) {
        if (num < 10) return '00' + num
        else if (num < 100) return '0' + num
        else return num
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
