<template>
  <div class="widget4">
    <div class="content-box" :style="`width:${width}`">
      {{content}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'widget4',
  data() {
    return {

    }
  },
  props: {
    width:{
      default:"300px",
    },
    avatarPosition: {

    },
    className: {

    },
    avatarSrc: {},
    starNum: {},
    content: {},
    name: {

    },
    enName: {

    },
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>
.widget4 {
  border: 1px solid red;
  display: inline-block;
  position: absolute;
  
  /*height: 400px;*/
}

.content-box {
  padding:20px 10px;
  display: inline-block;
  background: rgba(0,0,0,0.2);
  border-radius: 6px;
  text-align: left;
}

</style>
