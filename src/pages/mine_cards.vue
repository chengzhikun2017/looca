<template>
  <div class="mine-cards-vue">
    <div class="add-cards" v-if="adding">
      <AddDC></AddDC>
      <span class="cancel-box" @click="cancelAdd">
        <a-icon type="close-square-o"  />
      </span>
    </div>
    <div class="cards-box" v-if="!adding">
      <Card v-for="card in listDC" :info="card" :key="card.id"></Card>
      <!-- <Card v-for="card in listDC" :info="card"></Card> -->
      <a-button type="primary" @click.native="startAdd">添加银行卡</a-button>
    </div>
  </div>
</template>
<script>
// import 
import { mapState, mapMutations
, mapActions, mapGetters } from 'vuex'
var AddDC = () =>
import ('./../components/views/addDC.vue')
var Card = () =>
import ('./../components/container/card.vue')
export default {
  name: 'mine_cards',
  data() {
    return {
      adding: false,
    }
  },
  created() {
    this.getListDC()
  },
  methods: {
    startAdd() {
      this.adding = true
    },
    cancelAdd() {
      this.adding = false
    },
    
    ...mapActions('cards', ['getListDC'])
  },
  computed: {
    ...mapState('cards',["listDC"])
  },
  components: {
    AddDC,
    Card,
  },
}

</script>
<style lang='scss' scoped>
.add-cards {
  position: relative;

  .cancel-box {
    position: absolute;
    right: -15px;
    top: -20px;
    padding:5px;
    :hover{
      cursor: pointer;
      opacity: .7;

    }
  }
}

</style>
