<template>
  <div>
    <div @click.stop="" class="l-search-box phone" :class="show?'show':'hide'">
      <div class="container">
        <slot></slot>
        <div class="btn-box">
          <a-button @click="onCancel">取消</a-button>
          <a-button type="primary" @click="onOk">确认</a-button>
        </div>
      </div>
      <div class="search-toggle " @click="toggle">
        <span class="text">
          {{show?"取消":"筛选"}}
        </span>
        <a-icon type="filter" v-if="!show" />
        <a-icon type="close-square-o" v-if="show" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchToggle',
  data() {
    return {
      show: false,
    }
  },
  props: {},

  methods: {
    onCancel() {
      this.show = false
      this.$emit('cancel')
    },
    onOk() {
      this.show = false
      this.$emit('ok')
    },
    toggle() {
      this.show = !this.show;
    },
    hide() {
      this.show = false
    },
    onBodyClick(e){
      let isDropdownList = /ant-select-dropdown/.test(e.path[3].className)
      let isCalendar = /ant-calendar/.test(e.path[5].className)
      if (isDropdownList || isCalendar) {
        return
      }
      this.hide()
    },
  },
  mounted() {
    this.l$event.on('body_click', this.onBodyClick)
    // console.log('%c this.l$event.off','color:red',this.l$event.off)
  },
  beforeDestroy() {
    this.l$event.removeListener('body_click', this.onBodyClick)
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
    right: 5px;
    top: 5px;
    z-index: 2;
    line-height: 1;
    font-size: 14px;
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
