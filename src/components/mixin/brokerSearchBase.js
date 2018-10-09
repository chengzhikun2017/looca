import helper from './../../utils/helper.js'
export default {
  data(){
    return {
      loading:false,
      savedParams:{},
    }
  },
  created(){
    if(!(this.getMethod && typeof this.getMethod === 'function')){
      console.error('need function named as "getMethod" to get list for table, computed type is prefer')
    }
  },
  methods:{
    getList(){
      let params = {
        ...this.savedParams,
        page:this.pagination.current,
        limit:this.pagination.pageSize,
      }
      this.loading = true
      this.getMethod(params)
      .then(() => {
        this.loading = false 
      })
      .finally(() => {
        this.loading = false        
      })

    },
    goPage(path){
      helper.goPage(path)
    },
    onTableChange(pagination){
      this.currentPage = pagination.current
      this.getList()
      console.log('%c pagination','color:red',pagination)
    },
    rowkey(item,index){
      return index
    },
  },
}