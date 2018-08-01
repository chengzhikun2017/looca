<template>
  <div class="index-page">
    <v-layer :backgroundZ="1" height="200px">
      <div> 111</div>
      <div slot="background" >
        <a-carousel :autoplay="true">
          <div>
            <h3>1</h3></div>
          <div>
            <h3>2</h3></div>
          <div>
            <h3>3</h3></div>
          <div>
            <h3>4</h3></div>
        </a-carousel>
      </div>
    </v-layer>
    <v-layer>
      2
    </v-layer>
  </div>
</template>

<script>
import layer from './../components/layout/ContentCenterFullW.vue'
export default {
  name:'index',
  data() {
    return {
      
    }
  },
  methods: {},
  computed: {},
  components: {
    'v-layer': layer,
  },
}
</script>

<style lang='scss' scoped>

</style>
