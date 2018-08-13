<template>
  <div class="mine-cards-vue">
    <div class="add-cards">
      <AddDC></AddDC>
    </div>
    <div class="cards-box">

    </div>
  </div>
</template>

<script>
// import 
var AddDC = () =>  import ('./../components/views/addDC.vue')
export default {
  name:'mine_cards',
  data() {
    return {
      
    }
  },
  methods: {},
  computed: {},
  components: {
    AddDC,
  },
}
</script>

<style lang='scss' scoped>

</style>
