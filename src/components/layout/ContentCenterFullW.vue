<template>
  <section class="container" :style="`height:${height}`" :class="dev!==undefined?'dev':'prod'">
    <div class="background-box"  :style="`z-index: ${backgroundZ}`">
      <div class="background" :class="backgroundClass">
        <slot name="background">

        </slot>
      </div>
    </div>
    <slot></slot>
  </section>
</template>
<script>
export default {
  name: 'ContentCenterFullW',
  data() {
    return {

    }
  },
  props: {
    height: {
      type:  String,
      default: "200px"
    },
    backgroundClass:{
      type:String,
      default:'',
    },
    backgroundZ:{
      default:-1,
      type:Number,
    },
    dev:{
      
    },
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>
.dev{
  border:1px solid red;
}
.prod{
  border:1px solid transparent;

}
.container {
  width: 1140px;
  height: 100px;
  margin: 0 auto;
  position: relative;
  /*justify-content: center;*/
  .background-box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    overflow: visible;
    align-items: center;
    z-index: -1;
  }
  .background {
    /*background: #009;*/
    height: 100%;
    width: 100vw;
    /*background: linear-gradient(to left, #fff, #00f);*/
    position: absolute;
  }
}

</style>
