<template>
  <div class="card-component">
    <p class="bank-name">{{info.bankName}}</p>
    <p class="card">{{info.cardNo | bankCard}}</p>
  </div>
</template>
<script>
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
  },
  methods: {},
  computed: {},
  components: {},
}

</script>
<style lang='scss' scoped>
.card-component {
  .bank-name {
    margin-bottom: 0;
  }
  .card {
    margin-bottom: 0;
  }
  margin-bottom: 20px;
}

</style>
