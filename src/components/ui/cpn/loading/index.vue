<template>
  <div class="sc-ui-wrap" v-if="isShow">
    <div v-if="isShowLoading" class="sc-loading-wrap showbox" style="z-index: 9990;">
      <div class="loader">
        <!-- <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
        </svg> -->
      </div>
      <p class="loader-text">
        加载中
        <span v-for="i in 3" :key="'dot'+i" :style="{visibility: (dotIndex%4>=i)?'visible':'hidden'}">.</span>
      </p>
    </div>
    <md-dialog :md-active.sync="isShowConfirmDialog">
      <md-dialog-title>{{confirmTitle}}</md-dialog-title>
      <div>
        <p>{{confirmContent}}</p>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="onCancelClick">取消</md-button>
        <md-button class="md-primary" @click="onOkClick">确认</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    onOk: {
      type: Function,
      default: null
    },
    callback: {
      type: Function,
      default: null
    },
    confirmTitle: {
      type: String,
      default: '请确认'
    },
    confirmContent: {
      type: String,
      default: '确认吗'
    }
  },
  data () {
    return {
      isShow: false,
      isShowLoading: false,
      isShowConfirmDialog: false,
      mode: '', // confirm, warning, info
      dotIndex: 0,
      dotIndexInterval: null
    }
  },
  methods: {
    onCancelClick () {
      this.isShow = false
      this.isShowConfirmDialog = false
      this.mode = ''
      if (this.callback) {
        this.callback(false)
      }
    },
    onOkClick () {
      this.isShow = false
      this.isShowConfirmDialog = false
      this.mode = ''
      if (this.callback) {
        this.callback(true)
      }
      if (this.onOk) {
        this.onOk(true)
      }
    }
  },
  computed: {
    modalWrap () {
      return [
        'sc-modal-wrap',
        'mode-' + this.mode
      ]
    },
    iconClass () {
      if (this.mode === 'confirm') {
        return 'ivu-icon ivu-icon-ios-help-circle'
      } else if (this.mode === 'error' || this.mode === 'warning' || this.mode === 'info') {
        return 'ivu-icon ivu-icon-ios-information-circle'
      } else {
        return ''
      }
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal && this.isShowLoading) {
        this.dotIndex = 0
        this.dotIndexInterval = setInterval(() => {
          this.dotIndex++
        }, 1000)
      } else {
        clearInterval(this.dotIndexInterval)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$loadingColor: #f2f2f2;
@mixin load5-frames() {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em rgba($loadingColor,1),
      1.8em -1.8em 0 0em rgba($loadingColor,0.2),
      2.5em 0em 0 0em rgba($loadingColor,0.2),
      1.75em 1.75em 0 0em rgba($loadingColor,0.2),
      0em 2.5em 0 0em rgba($loadingColor,0.2),
      -1.8em 1.8em 0 0em rgba($loadingColor,0.2),
      -2.6em 0em 0 0em rgba($loadingColor,0.5),
      -1.8em -1.8em 0 0em rgba($loadingColor,0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba($loadingColor,0.7),
      1.8em -1.8em 0 0em rgba($loadingColor,1),
      2.5em 0em 0 0em rgba($loadingColor,0.2),
      1.75em 1.75em 0 0em rgba($loadingColor,0.2),
      0em 2.5em 0 0em rgba($loadingColor,0.2),
      -1.8em 1.8em 0 0em rgba($loadingColor,0.2),
      -2.6em 0em 0 0em rgba($loadingColor,0.2),
      -1.8em -1.8em 0 0em rgba($loadingColor,0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba($loadingColor,0.5),
      1.8em -1.8em 0 0em rgba($loadingColor,0.7),
      2.5em 0em 0 0em rgba($loadingColor,1),
      1.75em 1.75em 0 0em rgba($loadingColor,0.2),
      0em 2.5em 0 0em rgba($loadingColor,0.2),
      -1.8em 1.8em 0 0em rgba($loadingColor,0.2),
      -2.6em 0em 0 0em rgba($loadingColor,0.2),
      -1.8em -1.8em 0 0em rgba($loadingColor,0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba($loadingColor,0.2),
      1.8em -1.8em 0 0em rgba($loadingColor,0.5),
      2.5em 0em 0 0em rgba($loadingColor,0.7),
      1.75em 1.75em 0 0em rgba($loadingColor,1),
      0em 2.5em 0 0em rgba($loadingColor,0.2),
      -1.8em 1.8em 0 0em rgba($loadingColor,0.2),
      -2.6em 0em 0 0em rgba($loadingColor,0.2),
      -1.8em -1.8em 0 0em rgba($loadingColor,0.2);
  }
  50% {
  box-shadow: 0em -2.6em 0em 0em rgba($loadingColor,0.2),
    1.8em -1.8em 0 0em rgba($loadingColor,0.2),
    2.5em 0em 0 0em rgba($loadingColor,0.5),
    1.75em 1.75em 0 0em rgba($loadingColor,0.7),
    0em 2.5em 0 0em rgba($loadingColor,1),
    -1.8em 1.8em 0 0em rgba($loadingColor,0.2),
    -2.6em 0em 0 0em rgba($loadingColor,0.2),
    -1.8em -1.8em 0 0em rgba($loadingColor,0.2);
  }
  62.5% {
    box-shadow:0em -2.6em 0em 0em rgba($loadingColor,0.2),
    1.8em -1.8em 0 0em rgba($loadingColor,0.2),
    2.5em 0em 0 0em rgba($loadingColor,0.2),
    1.75em 1.75em 0 0em rgba($loadingColor,0.5),
    0em 2.5em 0 0em rgba($loadingColor,0.7),
    -1.8em 1.8em 0 0em rgba($loadingColor,1),
    -2.6em 0em 0 0em rgba($loadingColor,0.2),
    -1.8em -1.8em 0 0em rgba($loadingColor,0.2);
  }
  75% {
    box-shadow:0em -2.6em 0em 0em rgba($loadingColor,0.2),
    1.8em -1.8em 0 0em rgba($loadingColor,0.2),
    2.5em 0em 0 0em rgba($loadingColor,0.2),
    1.75em 1.75em 0 0em rgba($loadingColor,0.2),
    0em 2.5em 0 0em rgba($loadingColor,0.5),
    -1.8em 1.8em 0 0em rgba($loadingColor,0.7),
    -2.6em 0em 0 0em rgba($loadingColor,1),
    -1.8em -1.8em 0 0em rgba($loadingColor,0.2);
  }
  87.5% {
    box-shadow:0em -2.6em 0em 0em rgba($loadingColor,0.2),
    1.8em -1.8em 0 0em rgba($loadingColor,0.2),
    2.5em 0em 0 0em rgba($loadingColor,0.2),
    1.75em 1.75em 0 0em rgba($loadingColor,0.2),
    0em 2.5em 0 0em rgba($loadingColor,0.2),
    -1.8em 1.8em 0 0em rgba($loadingColor,0.5),
    -2.6em 0em 0 0em rgba($loadingColor,0.7),
    -1.8em -1.8em 0 0em rgba($loadingColor,1);
  }
}
.sc-ui-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 9999;
  .showbox {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.5);
    padding-top: 15rem;
    .loader {
      margin:100px auto 50px auto;
      font-size:10px;
      width:1em;
      height:1em;
      border-radius:50%;
      position:relative;
      text-indent:-9999em;
      -webkit-animation:load5 1.1s infinite ease;
      animation:load5 1.1s infinite ease;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
    }
    .loader-text {
      text-align: center;
      color: rgba($loadingColor,.9);
    }
  }
}
.sc-modal-wrap {
  position: absolute;
  $modal-width: 21rem;
  top: 5rem;
  width: $modal-width;
  left: calc((100% - $modal-width) / 2);
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  $line-height: 2rem;
  background-color: #fff;
  box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.15);
  .sc-modal-head {
    display: flex;
    i {
      font-size: 1.4rem;
      display: block;
      width: $line-height;
      height: $line-height;
      line-height: $line-height;
    }
    p {
      font-size: 0.8rem;
      height: $line-height;
      line-height: $line-height;
    }
  }
  .sc-modal-body {
    padding-left: $line-height;
    font-size: .7rem;
    margin-bottom: .8rem;
    word-break: break-all;
  }
  .sc-modal-btn {
    display: flex;
    justify-content: flex-end;
    & > button:not(:first-child) {
      margin-left: .5rem;
    }
  }
  &.mode-confirm {
    .sc-modal-head i {
      color: var(--color-warning);
    }
  }
  &.mode-error {
    .sc-modal-head i {
      color: var(--color-error);
    }
  }
  &.mode-warning {
    .sc-modal-head i {
      color: var(--color-warning);
    }
  }
  &.mode-info {
    .sc-modal-head i {
      color: var(--color-primay);
    }
  }
}
@-webkit-keyframes load5 {@include load5-frames;}
@keyframes load5 {@include load5-frames;}
@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@-webkit-keyframes color {
  100%,
  0% {
    stroke: #d62d20;
  }

  40% {
    stroke: #0057e7;
  }

  66% {
    stroke: #008744;
  }

  80%,
  90% {
    stroke: #ffa700;
  }
}

@keyframes color {

  100%,
  0% {
    stroke: #d62d20;
  }

  40% {
    stroke: #0057e7;
  }

  66% {
    stroke: #008744;
  }

  80%,
  90% {
    stroke: #ffa700;
  }
}
</style>
