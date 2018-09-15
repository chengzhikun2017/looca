<template>
  <div class="l-list-phone">
    <div class="list-box"
    v-infinite-scroll="loadmore" 
    :infinite-scroll-disabled="loading" 
    :infinite-scroll-distance="80"
    >
      <a-list :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <slot :item="item"></slot>
        </a-list-item>

        <div class="footer nomore" v-if="nomore && data.length>0" slot="footer">
          ---没有啦---
        </div>
      </a-list>
      <div v-if="loading" class="loading-container">
        <a-spin />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListPhone',
  data() {
    return {

    }
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    nomore: {
      type: Boolean,
      default: false,
    },
    loadmore:{
      type:Function,
      // required:true,
    },
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>
.l-list-phone.phone {
  .footer {
    text-align: center;
  }
}
.list-box{
  position: relative;
  padding-bottom: 30px;
}
.loading-container {
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
}

</style>
