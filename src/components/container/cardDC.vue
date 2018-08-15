<template>
  <div class="card-component ":class="editing?'editing':''">
    <p class="bank-name">{{info.bankName}}</p>
    <p class="card">{{info.cardNum | bankCard}}</p>
    <span class="edit-box" v-if="editing" @click="deleteCard">
      <a-icon type="delete" />
    </span>
  </div>
</template>
<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name: 'cardContainer',
  data() {
    return {

    }
  },
  props: {
    info: {
      required: true,
    },
    editing:{
      default:false,
      type:Boolean,
    },
  },
  methods: {
    deleteCard(){
      this.delDC(this.info.cardNum)
      // .then(() => {
      //   this.$message.info('删除成功') 
      // })
    },
    ...mapActions('cards',['delDC'])
  },
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>
.card-component {
  position: relative;

  .bank-name {
    margin-bottom: 0;
  }
  .card {
    margin-bottom: 0;
  }
  margin-bottom: 20px;
  .edit-box{
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    &:hover{
      cursor: pointer;
    }
  }
}
.editing{
  padding-left: 30px;
}
</style>
