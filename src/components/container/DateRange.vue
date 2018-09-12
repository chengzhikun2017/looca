<template>
  <div>
    <div class="mobile-date-box">
      开始时间：
      <a-date-picker @change="onStartChange" placeholder="请选择开始日期"/>
    </div>
    <div class="mobile-date-box">
      结束时间：
      <a-date-picker @change="onEndChange" placeholder="请选择结束日期"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DateRange',
  data() {
    return {

    }
  },
  methods: {
    onStartChange(e){
      
    },
    onEndChange(e){
      
    },
  },
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
