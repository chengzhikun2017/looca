`<template>
  <div class="l-loading" v-if='isLoading>0'>
    <div class="container l-position-cc">
      <a-spin size="large" tip="loading"></a-spin>
    </div>
  </div>
</template>`
import Vue from 'vue'
import { mapState } from 'vuex'
import Loading from './loading.vue'
export default {
  name: 'page-loading',
  mixins: [Loading],
  data() {
    return {

    }
  },
  methods: {},
  computed: {
    showLoading() {
      return this.isLoading <= 0 && this.pageLoading > 0
    },
    text() {
      return this.loadingText
    },
    ...mapState('feedback', ['isLoading', 'loadingText', 'pageLoading', 'pageLoadingText']),
  },
  components: {},
}
