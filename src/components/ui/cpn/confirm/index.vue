<template>
  <md-dialog :md-active.sync="isShow" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <md-dialog-title>
      <i class="fa fa-question-circle"></i>
      <p>{{title}}</p>
    </md-dialog-title>
    <div class="ui-confirm-content">
      <p>{{content}}</p>
    </div>
    <md-dialog-actions>
      <md-button class="md-primary" @click="onCancelClick">取消</md-button>
      <md-button class="md-primary" @click="onOkClick">确认</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '请确认'
    },
    content: {
      type: String,
      default: '确认吗'
    },
    onOk: {
      type: Function,
      default: null
    },
    callback: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    onCancelClick () {
      this.isShow = false
      if (this.callback) {
        this.callback(false)
      }
    },
    onOkClick () {
      this.isShow = false
      if (this.callback) {
        this.callback(true)
      }
      if (this.onOk) {
        this.onOk(true)
      }
    }
  },
  computed: {
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>
.md-dialog-title {
  display: flex;
  $lineHeight: 25px;
  & > i {
    font-size: 25px;
    color: var(--color-warning);
    display: block;
    width: $lineHeight;
    height: $lineHeight;
    margin-right: 5px;
  }
}
.ui-confirm-content {
  padding: 0 24px;
}
</style>
