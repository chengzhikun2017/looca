<template>
  <div class="mine-cards-vue">
    <div class="add-cards" v-if="adding">
      <AddDC @success="cancelAdd"></AddDC>
      <span class="cancel-box" @click="cancelAdd">
        <a-icon type="close-square-o"  />
      </span>
    </div>
    <div class="cards-box" v-if="!adding">
      <a-row>
        <a-col :xs="24" :sm="12" :md="8">
          <div class="empty-card" @click="startAdd" flex="main:center cross:center">
            + 添加银行卡
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" v-for="card in listDC" :key="card.id">
          <Card :info="card"></Card>
        </a-col>
      </a-row>
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
      adding: false
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
.cards-box {
  .empty-card {
    margin: 8px;
    height: 137px;
    border-radius: 3px;
    border: 1px dashed #ccc;
    &:hover {
      border: 1px dashed #1890ff;
      color: #1890ff;
      cursor: pointer;
    }
  }
}

</style>
