<template>
  <div class="l-date-range">
    <div class="mobile-date-box">
      <label>
        开始时间：
      </label>
      <a-date-picker @change="onStartChange" v-model="startDate" placeholder="请选择开始日期" />
    </div>
    <div class="mobile-date-box">
      <label>
        结束时间：
      </label>
      <a-date-picker @change="onEndChange" v-model="endDate" placeholder="请选择结束日期" />
    </div>
  </div>
</template>
<script>
import { format as FORMAT } from "./../../utils/time.js"
export default {
  name: 'DateRange',
  data() {
    return {
      startDate: null,
      endDate: null,
    }
  },
  methods: {
    onChange() {
      let dates = [this.startDate, this.endDate]
      let strs = [this.startStr,this.endStr]
      this.$emit('dateRangeChange', dates, strs)
    },
    onStartChange(date) {
      if (this.endDate) {
        let isValid = this.startDate.isBefore(this.endDate)
        if (!isValid) {
          this.endDate = window.moment(this.startDate)
        }
      }
      this.onChange()
    },
    onEndChange(date) {
      if (this.startDate) {
        let isValid = this.startDate.isBefore(this.endDate)
        if (!isValid) {
          this.startDate = window.moment(this.endDate)
        }
      }
      this.onChange()
    },
    initDate(){
      if(this.defaultValue){
        this.startDate = this.defaultValue[0]
        this.endDate= this.defaultValue[1]
      }
    },
  },

  created(){
    this.initDate()
  },
  props:{
    defaultValue: {
      type:Array,
    },
  },
  computed: {
    startStr(){
      if(this.startDate) {
        return this.startDate.format(FORMAT.day)
      }else {
        return ''
      }
    },
    endStr(){
      if(this.endDate) {
        return this.endDate.format(FORMAT.day)
      }else {
        return ''
      }
    },
  },
  components: {},
}

</script>
<style lang='scss' scoped>
.l-date-range {
  .ant-calendar-picker {
    width: 70%;
  }
  .mobile-date-box {
    margin:10px 0;
    label {
      width: 30%;
    }
  }
}

</style>
