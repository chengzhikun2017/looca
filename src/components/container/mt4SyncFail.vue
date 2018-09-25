<template>
  <div class="container">
    <a-alert message="同步失败" type="warning" v-if="success" showIcon>
      <p slot="description">
        <span>
          最新数据同步失败，如需查看最新数据，请稍后点击刷新尝试，或者前往MT4客户端查看
        </span>
        <a-button type="primary" size="small" :icon="icon" @click="refresh">
          刷新
      </a-button>
      </p>
    </a-alert>
  </div>
</template>
<script>
export default {
  name: 'mt4SyncFail',
  data() {
    return {
      loading: false,
      icon: '',
    }
  },
  props: {
    success: {
      default: false,
      type: Boolean,
    },
    reSyncFunc: {
      required: true,
      type: Function,
    },
  },
  methods: {
    refresh() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.reSyncFunc()
        .then(() => {
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  watch: {
    loading(value) {
      if (value) {
        this.icon = 'loading'
      } else {
        setTimeout(() => {
          this.icon = ''
        }, 200);
      }
    },
  },
  computed: {

  },
  components: {},
}

</script>
<style lang='scss' scoped>
span {
  margin-right: 10px;
}
.container{
  margin-bottom: 10px;
}
</style>
