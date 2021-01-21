import UICpn from './cpn/index'

export default {
  name: 'UI',
  loading: {
    show () {
      UICpn.showLoading()
    },
    hide () {
      UICpn.hideLoading()
    }
  },
  confirm (options?: any) {
    UICpn.showConfirm(options)
  }
}
