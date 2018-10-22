<template>
  <div class="clock">
    <span class="clock-item clock-hour">{{hour}}时</span>
    <span class="clock-item clock-minute">{{minute}}分</span>
    <span class="clock-item clock-second">{{second}}秒</span>
  </div>
</template>
<script>
// class Clock {
//   constructor (seconds, hour, minute, second) {
//     if (seconds !== 0) {
//       // 以秒表时间计数
//       this.time = seconds
//       this.hour = Number.parseInt(seconds / 3600)
//       this.minute =  Number.parseInt((seconds % 3600) / 60)
//       this.second = Number.parseInt(seconds % 60)
//     } else if (hour && minute && second){
//       this.hour = hour
//       this.minute = minute
//       this.second = second
//       this.time = hour * 3600 + minute * 60 + second
//     }
//     this.intervalClock = null
//     this.finish = false
//   }
//   start () {
//     this.intervalClock = setInterval(() => {
//       // console.log('hello world', this.time, this.hour, this.minute, this.second)
//       if (this.time === 0) {
//         this.stop()
//         this.finish = true
//         return
//       }
//       this.time--
//       // deal clock
//       if (this.second !== 0) {
//         this.second--
//       } else if (this.minute !== 0) {
//         this.minute--
//         this.second = 59
//       } else {
//         this.hour--
//         this.minute = 59
//         this.second = 59
//       }
//     }, 1000)
//   }
//   stop () {
//     clearInterval(this.intervalClock)
//   }
// }
// 传入一个时间，触发计数器
export default {
  props: {
    // hour: {
    //   type: Number,
    //   default: 0
    // },
    // minute: {
    //   type: Number,
    //   default: 0
    // },
    // second: {
    //   type: Number,
    //   default: 0
    // },
    // seconds: {
    //   type: Number,
    //   default: 0
    // }
  },
  data () {
    return {
      countDown:0,
      countDownTimer: null,
      // clock: new Clock(110),
    }
  },
  watch: {
    // 'clock.finish' (newVal) {
    //   if (newVal) {
    //     this.clock.finish = false
    //     this.$emit('finish')
    //   }
    // }
  },
  computed:{
    hour(){
      return Math.floor(this.countDown/3600)
    },
    minute(){
      return Math.floor(this.countDown/60)%60
    },
    second(){
      return Math.floor(this.countDown%60)
    },
  },
  created () {
    this.setCountDown(100)
    // this.clock = new Clock(this.seconds, this.hour, this.minute, this.second)
    // this.clock.start()
  },
  methods:{
    startCountdown(){
      this.countDownTimer = setInterval(() => {
        this.countDown-- 
        if(this.countDown<=0){
          this.stop()
          this.$emit('finish')
        }
      },1000)
    },
    setCountDown(seconds) {
      this.stop()
      this.countDown = Math.floor(seconds)
      this.startCountdown()
    },
    stop(){
      clearInterval(this.countDownTimer)
    }
  },
  beforeDestroy () {
    this.stop()
  }
}
</script>
<style lang="scss">
  .clock {
    display: inline-block;
    &-item {
      display: inline-block;
      padding:3px 8px;
      margin-right: 10px;
      border-radius: 5px;
      line-height: 1;
      font-weight: 700;
      color: white;
      background: #52c41a;
    }
  }
</style>

