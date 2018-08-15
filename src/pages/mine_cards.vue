<template>
  <div class="mine-cards-vue">
    <div class="add-cards" v-if="adding">
      <AddDC @success="cancelAdd"></AddDC>
      <span class="cancel-box" @click="cancelAdd">
        <a-icon type="close-square-o"  />
      </span>
    </div>
    <div class="cards-box" v-if="!adding">
      <Card v-for="card in listDC" :info="card" :key="card.id" :editing="editing"></Card>
      <!-- <Card v-for="card in listDC" :info="card"></Card> -->
      <a-button type="primary" @click.native="startAdd"  v-if="!editing">添加银行卡</a-button>
      <a-button  @click.native="editing=true" v-if="!editing&&cardsLength>0">编辑</a-button>
      <a-button type="primary" @click.native="editing=false" v-if="editing">完成</a-button>
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
import ('./../components/container/cardDC.vue')
export default {
  name: 'mine_cards',
  data() {
    return {
      adding: false,
      editing:false,
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
      console.log('cancel')
      this.adding = false
    },
    
    ...mapActions('cards', ['getListDC'])
  },
  computed: {
    cardsLength(){
      let len = this.listDC.length
      if(len<=0){
        this.editing = false
      }
      return len
    },
    ...mapState('cards',["listDC"])
  },
  watch:{
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
