<template>
  <div class="container v-mt4-sync-fail">

    <a-alert type="warning" v-if="success" showIcon>
      <p slot="message">
        由于网络延迟导致数据未完全同步，您可以稍后
        <a class="link-btn" href="javascript:void(0)"  @click="refresh" >
          刷新
        </a>
        重试或者前往MT4客户端查看
      </p>
      <!-- <p slot="description">
        <span>

        </span>
        <a-button type="primary" size="small" :icon="icon" @click="refresh">
          刷新
        </a-button>
      </p> -->
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
<style lang="scss">
.v-mt4-sync-fail{
  .ant-alert-message{
    p{
      margin-bottom: 0;
    }
  }
}
</style>
