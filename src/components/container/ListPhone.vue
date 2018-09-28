<template>
  <div class="l-list-phone">
    <div class="list-box" v-infinite-scroll="loadList" :infinite-scroll-disabled="loading" :infinite-scroll-distance="80">
      <a-list :dataSource="data"  :locale="locale">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <slot :item="item"></slot>
        </a-list-item>
        <div class="footer nomore" v-if="loadParams.nomore && data.length>0" slot="footer">
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
function initLoadParams() {
  // return {
  //   limit: 10,
  //   page: 0,
  //   nomore: false,
  //   loading: false,
  // }
  this.limit = 10
  this.page = 0
  this.nomore = false
  this.loading = false
}
export default {
  name: 'ListPhone',
  data() {
    return {
      loadParams: new initLoadParams(),
      lastQueryParams: {},
      data: [],
      once: 0,
    }
  },
  props: {
    getFunc: {
      type: Function,
      required: true,
    },
    params: {
      type: Object,
      required: true,
    },
    newList: {
      type: Array,
      required: true,
      default: () => []
    },
    total: {
      type: Number,
      required: true,
      default: 0
    },
  },
  methods: {
    reset() {
      this.data = []
      this.loadParams = new initLoadParams()
    },
    saveParams() {
      console.log('%c params', 'color:red', this.params)
      this.lastQueryParams = {
        ...this.params,
      }
    },
    reLoad() {
      this.reset()
      this.saveParams()
      this.loadList()
    },
    loadList() {
      console.log('%c load load load', 'color:red', )
      if (this.once === 0) {
        this.once++
          this.reLoad()
        return
      }
      if (this.loadParams.nomore === true) {
        return
      }
      this.loadParams.loading = true
      this.loadParams.page++
        this.getFunc({
          ...this.loadParams,
          ...this.lastQueryParams,
        })
        .then(this.addNewList)
        .finally(() => {
          this.loadParams.loading = false
        })
    },
    addNewList() {
      this.$nextTick(() => {
        // 存在newList找不到的情况
        if (this.newList) {
          this.newList.forEach((item) => {
            //可能要nextTick
            this.data.push(item)
          })
          if (this.data.length >= this.total) {
            this.loadParams.nomore = true
          }
        }
      })
    },

  },
  watch:{
    loading(value){
      if(value){
        this.$emit("loadStart")
      }else{
        this.$emit("loadStop")
      }
    },
  },
  computed: {
    locale(){
      return {
        emptyText:this.emptyText,
      }
    },
    emptyText(){
      if(this.data.length === 0){
        if(this.loading){
          return "加载中..."
        }
        return "暂无数据"
      }
    },
    loading() {
      return this.loadParams.loading
    },
  },
  components: {},
}

</script>
<style lang='scss' scoped>
.l-list-phone {
  .footer {
    text-align: center;
  }
}

.list-box {
  position: relative;
  /*padding-bottom: 30px;*/
}

.loading-container {
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
}

</style>
