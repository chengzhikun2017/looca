<template>
  <a-select style="width: 100px" v-model="symbol">
    <a-select-option v-for="item in symbols" :key="item.value" :value="item.value">
      {{item.label}}
    </a-select-option>
  </a-select>
</template>
<script>
export default {
  name: 'symbolSelect',
  data() {
    return {
      symbol:0 ,
      symbols:[
        { label:'交易对',value:0},
        { label:'EURUSD',value:'EURUSD'},
        { label:'AUDUSD',value:'AUDUSD'},
        { label:'USDCAD',value:'USDCAD'},
        { label:'USDJPY',value:'USDJPY'},
        { label:'EURAUD',value:'EURAUD'},
        { label:'EURJPY',value:'EURJPY'},
        { label:'GBPUSD',value:'GBPUSD'},
        { label:'CADJPY',value:'CADJPY'},
        { label:'EURGBP',value:'EURGBP'},
        { label:'NZDUSD',value:'NZDUSD'},
        { label:'USDCHF',value:'USDCHF'},
        { label:'USDSGD',value:'USDSGD'},
        { label:'AUDCHF',value:'AUDCHF'},
        { label:'AUDJPY',value:'AUDJPY'},
        { label:'EURCAD',value:'EURCAD'},
        { label:'NZDJPY',value:'NZDJPY'},
        { label:'EURCHF',value:'EURCHF'},
        { label:'AUDCAD',value:'AUDCAD'},
        { label:'CHFJPY',value:'CHFJPY'},
        { label:'CADCHF',value:'CADCHF'},
        { label:'GBPJPY',value:'GBPJPY'},
        { label:'GBPCHF',value:'GBPCHF'},
        { label:'NZDCHF',value:'NZDCHF'},
        { label:'NZDCAD',value:'NZDCAD'},
        { label:'XAGUSD',value:'XAGUSD'},
        { label:'XAUUSD',value:'XAUUSD'},
        { label:'XTIUSD',value:'XTIUSD'},
      ],
    }
  },
  props:{
    value:{
      required:true,
    },
  },
  watch: {
    symbol(value) {
      this.$emit('input', value)
    },
    value(value){
      this.symbol = value
    },
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
