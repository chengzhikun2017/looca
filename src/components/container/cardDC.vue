<template>
  <div class="card-component" flex>
    <div class="card-logo">
      <!-- <img src="" alt=""> -->
    </div>
    <div class="card-content" flex-box="1">
      <div class="bank-name">{{info.bankName}}</div>
      <div class="card">{{info.cardNum | bankCard}}</div>
      <div class="bank-address">{{info.bankBranch || '未知'}}</div>
      <div class="card-owner">{{info.name || '未知'}}</div>
    </div>
    <span class="edit-box" @click="deleteCard">
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
    }
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
  mounted () {
    console.log(this.info)
  }
}

</script>
<style lang='scss' scoped>
.card-component {
  position: relative;
  display: block;
  margin: 8px;
  padding: 15px;
  border-radius: 3px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  .bank-name {
    font-weight: 888;
    font-size: 18px;
    margin-top: 5px;
    padding-bottom: 10px;
  }
  .card {
    font-size: 16px;
    letter-spacing: 3px;
    padding-bottom: 5px;
  }
  .bank-address {
    padding-right: 20px;
    font-size: 12px;
  }
  .card-owner {
    text-align: right;
    padding-right: 20px;
    font-size: 12px;
  }
  .edit-box{
    padding: 6px;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
