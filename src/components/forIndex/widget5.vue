<template>
  <div class="widget5">
    <div class="icon">
    </div>
    <div class="text-box">
      <h3 class="title">{{title}}</h3>
      <p class="content">{{content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'widget5',
  data() {
    return {
      
    }
  },
  props:{
    iconSrc:{
      
    },
    title:{
      
    },
    content:{
      
    },
  },
  methods: {},
  computed: {},
  components: {},
}
</script>

<style lang='scss' scoped>
.widget5{
  display: flex;;
  .icon{
    width: 60px;
    height: 60px;
    background: url("../../assets/display/ok3.png") no-repeat center center;
    background-size: 60% 60%;
  }
  .text-box{
    text-align: left;
    /*border:1px solid red;*/
    .title{
      margin: 0 ;
      margin-top:10px;
    }
    .content{

    }
  }
}
</style>
