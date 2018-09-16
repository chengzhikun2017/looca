<template>
  <div>
    <p>页面不翼而飞</p>
    <a-button @click="back">返回上一页</a-button>
  </div>
</template>

<script>
import helper from '@/utils/helper.js'
export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  methods:{
    back(){
      helper.goPage(-1)
    },
  },
  events: {},
  components: {},
  created(){
    // this.hgjAlert({
    //   title:"返回首页",
    //   options:[
    //   {
    //     text:'确定',
    //     callback:()=>{
    //       helper.goPage('/cards')
    //     },
    //   }
    //   ],
    // })
  },
}
</script>

<style>

</style>
