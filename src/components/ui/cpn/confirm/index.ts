import Cpn from './index.vue'
import Vue from 'vue'

const defaultProps = {
  title: '请确认',
  content: '确认的内容',
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
  const confirmEl = Instance.$children[0]

  return {
    showConfirm () {
      confirmEl.isShowConfirmDialog = true
      this._showModal()
    },
    _showModal () {
      setTimeout(() => {
        confirmEl.isShow = true
      }, 100)
    }
  }
}

export default Cpn
