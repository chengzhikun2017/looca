<template>
  <a-select style="width: 100px" v-model="symbol">
    <a-select-option v-for="item in symbols" :key="item.value" :value="item.value">
      {{item.label}}
    </a-select-option>
  </a-select>
</template>
<script>
import SYMBOLS from './../../utils/symbols.js'
const symbols = [{ label: '交易对', value: 0 },]
for(let key in SYMBOLS){
  symbols.push({ label: SYMBOLS[key], value: key },)
}
export default {
  name: 'symbolSelect',
  data() {
    return {
      symbol: 0,
      symbols,
    }
  },
  props: {
    value: {
      required: true,
    },
  },
  watch: {
    symbol(value) {
      this.$emit('input', value)
    },
    value(value) {
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
