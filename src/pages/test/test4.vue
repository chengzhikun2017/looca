<template>
  <div class="test4">
    <MainLayout>
      test4
      <router-link to='/test5'>test5</router-link>
    </MainLayout>
  </div>
</template>

<script>
export default {
  name:'test4',
  data() {
    return {
      header:`<h2>test4</h2>`
    }
  },
  inject:{
    appTest:"appTest",
  },
  methods: {
    test(){
      // alert(this._uid)
    },
  },
  created(){
    setTimeout(()=> {
    // console.log('this',this.appTest)
    }, 1000);
      this.appTest()
    // this.appTest()
  },
  computed: {},
  components: {
  },
}
</script>

<style lang='scss' scoped>

</style>
 