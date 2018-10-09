<template>
  <a-select style="width: 100px" v-model="partnerUid">
    <a-select-option v-for="item in partnerOpts" :key="item.value" :value="item.value">
      <!-- {{item.label}}关系 -->
      {{item.label}}
    </a-select-option>
  </a-select>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'partnerUid',
  data() {
    return {
      partnerUid: '',
    }
  },
  props: {
    value: {
      required: true,
    },
  },
  methods: {
    ...mapActions('broker', ['getPartner'])
  },
  created() {
    this.getPartner()
    if (!this.value) {
      this.partnerUid = this.userId
    } else {
      this.partnerUid = Number(this.value)
    }
  },
  watch: {
    partnerUid(val) {
      this.$emit('input', val)
    },
    value(value) {
      this.partnerUid = Number(value)
    },
  },
  computed: {
    partnerOpts() {
      let arr = this.partners.map((item) => {
        return {
          label: item.name,
          value: item.partnerUid,
        }
      })
      arr.unshift({ label: "我的客户", value: this.userId })
      return arr
    },
    ...mapState('account', ['userId']),
    ...mapState('broker', ['partners'])
  },
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
