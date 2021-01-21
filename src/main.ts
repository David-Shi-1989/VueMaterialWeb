import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import './script/material-import'
import './style/material-theme.scss'
import './style/common.scss'
import Vuelidate from 'vuelidate'
import UI from './components/ui/index'
import 'font-awesome/css/font-awesome.min.css'
import 'view-design/dist/styles/iview.css'
import { Dropdown, DropdownMenu, DropdownItem, Icon } from 'view-design'

Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Icon', Icon)
Vue.use(Vuelidate)
Vue.prototype.$UI = UI
Vue.config.productionTip = false

// eslint-disable-next-line
const vm = new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App)
}).$mount('#app')
