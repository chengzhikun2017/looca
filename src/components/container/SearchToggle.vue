<template>
  <div>
    <div class="l-search-box phone" :class="show?'show':'hide'">
      <div class="container">
        <slot></slot>
        <div class="btn-box">
          <a-button @click="onCancel">取消</a-button>
          <a-button type="primary" @click="onOk">确认</a-button>
        </div>
      </div>
      <div class="search-toggle " @click="toggle">
        <a-icon type="filter" v-if="!show" />
        <a-icon type="up-square-o" v-if="show" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchToggle',
  data() {
    return {
      show: false
    }
  },
  props:{
  },
  methods: {
    onCancel(){
      this.show = false
      this.$emit('cancel')
    },
    onOk(){
      this.show = false
      this.$emit('ok')
    },
    toggle() {
      this.show = !this.show;
    },
  },
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>
.l-search-box {
  position: relative;

  overflow: visible;
  height: 30px;
  .search-toggle {
    /*border: 1px solid red;*/
    padding: 3px;
    display: inline-block;
    position: absolute;
    right: 0;
    z-index: 2;
    top: 0;
    line-height: 1;
  }
  .container {
    width: 100%;
    overflow: visible;
    position: absolute;
    top: 0;
    border: 1px solid #ccc;
    z-index: 2;
    background: #fff;
    padding: 10px;
    .btn-box {
      margin-top: 15px;
      padding-right: 20px;
      text-align: right;
    }
  }
}

.l-search-box.show {}

.l-search-box.hide {
  height: 30px;
  .container {
    display: none;
  }
}

</style>
