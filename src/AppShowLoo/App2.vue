<template>
  <div  id="app_loo_show">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'AppLooShow',
  data() {
    return {

    }
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang="scss">
#app_loo_show{
  text-align: center;
  .dev{
  border:1px solid red;
}
.prod{
  border:1px solid transparent;
}


section.container {
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

}
</style>