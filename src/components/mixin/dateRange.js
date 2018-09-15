import time from './../../utils/time.js'
const defaultStart = moment().add(-71, 'day')
const defaultEnd = moment()
const FORMAT = time.format.day
export default {
  data(){
    return{
      startDate:defaultStart.format(FORMAT),
      endDate:defaultEnd.format(FORMAT),
      defaultStart,
      defaultEnd,
    }
  },
  methods:{
    onDateRangeChange(date, dateString) {
      this.startDate = dateString[0]
      this.endDate = dateString[1]
    },
  },
}