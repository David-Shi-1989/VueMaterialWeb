import Loading from './loading/index'
import Confirm from './confirm/index'

let loadingInstance: any
let confirmInstance: any
function getLoadingInstance (options: any) {
  if (loadingInstance) {
    return loadingInstance
  } else {
    loadingInstance = (Loading as any).newInstance(options)
    return loadingInstance
  }
}
function getConfirmInstance (options: any) {
  if (confirmInstance) {
    return confirmInstance
  } else {
    confirmInstance = (Confirm as any).newInstance(options)
    return confirmInstance
  }
}
// loading
function _showLoading (options: any) {
  const instance = getLoadingInstance(options)
  instance.showLoading(options)
}
function _hideLoading () {
  const instance = getLoadingInstance({})
  instance.hideLoading()
}
function _showConfirm (options: any) {
  const instance = getConfirmInstance(options)
  instance.showConfirm(options)
}
export default {
  name: 'Loading',
  showLoading (options?: any) {
    return _showLoading(options)
  },
  hideLoading () {
    return _hideLoading()
  },
  showConfirm (options?: any) {
    return _showConfirm(options)
  }
}
