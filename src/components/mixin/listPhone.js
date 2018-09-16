const ListPhone = () =>
  import ('./../container/ListPhone')
const SearchToggle = () =>
  import ('./../container/SearchToggle')
export default {
  data() {
    class defaultParamsPhone {
      constructor() {
        this.limit = 10
        this.page = 0
        this.nomore = false
      }
    }
    return {
      defaultParamsPhone,
      paramsPhone: new defaultParamsPhone,
      listData: []
    }
  },
  methods: {
    resetPhoneList() {
      this.listData = []
      this.paramsPhone = new this.defaultParamsPhone
    },
    searchPhoneList() {
      this.resetPhoneList()
      this.getListPhone()
    },
  },
  components: {
    ListPhone,
    SearchToggle,
  },
}
