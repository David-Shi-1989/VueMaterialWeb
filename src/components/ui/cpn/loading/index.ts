import Cpn from './index.vue'
import Vue from 'vue'

const defaultProps = {
  title: '',
  content: '',
  callback: null,
  onOk: null
};
(Cpn as any).newInstance = (properties: any) => {
  const _props = Object.assign({}, defaultProps, properties)

  const Instance = new Vue({
    data: _props,
    render (h) {
      return h(Cpn, {
        props: {
          title: this.title,
          content: this.content,
          callback: this.callback,
          onOk: this.onOk
        }
      })
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const loadingEl = Instance.$children[0]

  return {
    showConfirm () {
      loadingEl.isShowConfirmDialog = true
      this._showModal()
    },
    showLoading () {
      loadingEl.isShowLoading = true
      this._showModal()
    },
    hideLoading () {
      this._hideModal()
    },
    _showModal () {
      setTimeout(() => {
        loadingEl.isShow = true
      }, 100)
    },
    _hideModal () {
      loadingEl.isShowLoading = false
      setTimeout(() => {
        if (!loadingEl.mode) {
          loadingEl.isShow = false
        }
      }, 100)
    }
  }
}

export default Cpn
