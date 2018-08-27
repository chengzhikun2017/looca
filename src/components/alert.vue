<template>
  <a-alert :type="type" class="l_alert">
    <div name="message" slot="message" flex>
       <a-icon class="l_alert-icon" :class="type" v-if="showIcon" :type="IconType" flex-box="0" />
       <div class="l_alert-title" flex-box="1">
         <div class="l_alert-title-head">{{title}}</div>
         <div class="l_alert-title-content">{{message}}</div>
       </div>
    </div>
    <slot name="description" slot="description"></slot>
  </a-alert>
</template>
<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'info'
      },
      title: {
        type: String,
        default: 'Title'
      },
      message: {
        type: String,
        default: 'Message'
      },
      showIcon: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      IconType() {
        switch(this.type) {
          case 'info':
          return 'info-circle-o'
          case 'warning':
          return 'exclamation-circle-o'
          case 'success':
          return 'check-circle-o'
          case 'error':
          return 'close-circle-o'
        }
      }
    },
    data() {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  $prefix: "l_alert";
  .#{$prefix} {
    .#{$prefix}-icon {
      line-height: 1.25;
      font-size: 20px;
      padding-right: 12px;
      &.info {
        color: #1890ff;
      }
      &.warning {
        color: #faad14;
      }
      &.success {
        color: #52c41a;
      }
      &.error {
        color: #f5222d;
      }
    }
    .#{$prefix}-title {
      .#{$prefix}-title-head {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
      }
      .#{$prefix}-title-content {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
</style>
