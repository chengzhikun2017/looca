import inputHelper from './../../utils/inputHelper.js'
export default {
  methods: {
    validate(key) {
      return this.input.validation[key]()
    },
    clearValidation(key) {
      this.input.clearStatus(key)
    },
    validateAll(){
      return this.input.validateAll()
    },
  },
  created() {
    var inputConstructor = this.input.constructor
    var inputClass = inputHelper.newInput
    if (inputConstructor !== inputClass) {
      console.error("mixed with /input/ base component need key 'input' in data which value is instance of input class(import from inputHelper.newInput)", )
    } else {
      // console.log('you have an correct input in data')
    }
  },
  computed: {
    formData() {
      return this.input.values
    },
    validation(){
      return this.input.status
    },
    valid(){
      return this.input.valid
    },
  },
}
