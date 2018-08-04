<template>
  <div class="widget4" :style="position">
    <div class="info-box" v-if="avatarPosition==='top'">
      <div class="avatar" :style="`background-image:url(${avatarSrc})`"></div>
      <div class="info-container">
        <h3 class="name">{{name}}</h3>
        <h5 class="en-name">{{enName}}</h5>
        <div class="stars">
          <a-icon type="star" v-for='x in starNum' :key="'star_'+x" />
          <a-icon type="star-o" v-for="x in 5-starNum" :key="'star0_'+x" />
        </div>
      </div>
    </div>
    <div class="content-box" :style="`width:${width}`">
      {{content}}
      <span class="arrow" :class="`arrow-${avatarPosition}`"></span>
    </div>
    <div class="info-box" v-if="avatarPosition==='bottom'">
      <div class="avatar" :style="`background-image:url(${avatarSrc})`"></div>
      <div class="info-container">
        <h3 class="name">{{name}}</h3>
        <h5 class="en-name">{{enName}}</h5>
        <div class="stars">
          <a-icon type="star" v-for='x in starNum' :key="'star_'+x" />
          <a-icon type="star-o" v-for="x in 5-starNum" :key="'star0_'+x" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'widget4',
  data() {
    return {

    }
  },
  props: {
    width: {
      default: "300px",
    },
    avatarPosition: {
      default: "bottom"
    },
    className: {

    },
    avatarSrc: {},
    starNum: {
      default: 3,
    },
    content: {},
    name: {

    },
    enName: {

    },
    left:{
      
    },
    top:{
      
    },
    bottom:{
      
    },
    right:{
      
    },
  },
  methods: {},
  computed: {
    position(){
      var str = ''
      if(this.left){
          str+=`left:${this.left};`
      }
      if(this.top){
          str+=`top:${this.top};`
      }
      if(this.bottom){
          str+=`bottom:${this.bottom};`
      }
      if(this.right){
          str+=`right:${this.right};`
      }
      return str
    }, 
  },
  components: {},
}

</script>
<style lang='scss' scoped>
.widget4 {
  display: inline-block;
  position: absolute;

  /*height: 400px;*/
}

.info-box {
  margin: 10px 0;
  display: flex;
  .avatar {
    width: 70px;
    height: 70px;
    background: url(#) no-repeat center center;
    background-size: cover;
    background-origin: border-box;
    background-clip: content-box;
    border-radius: 50%;
    /*border:5px solid rgba(0,0,0,0.2);*/
    border: 5px solid rgba(0, 0, 0, 0.2);
  }
  .info-container {
    margin-left: 10px;
    text-align: left;
    .name {
      margin-bottom: 0;
      color: #fff;
    }
    .en-name {
      margin-bottom: 0;
      color: rgba(255, 255, 255, 0.5);
    }
  }
  color:rgba(255, 255, 255, 0.5);
}

.content-box {
  position: relative;
  padding: 20px 10px;
  display: inline-block;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  text-align: left;
  background: rgba(0, 0, 0, 0.2);
  /*border-radius: 3px;*/
  color: #fff;
  padding: 50px 25px 40px;
  font-size: 16px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.7;
  position: relative;
  .arrow {
    border: 10px solid transparent;
    width: 0px;
    height: 0px;
    position: absolute;
    left: 50px;
  }
  .arrow-top {
    border-bottom-color: rgba(0, 0, 0, 0.2);
    top: -20px;
  }
  .arrow-bottom {
    border-top-color: rgba(0, 0, 0, 0.2);
    bottom: -20px;
  }
}

</style>
