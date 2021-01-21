import Vue from 'vue'
import VueI18N from 'vue-i18n'
import storex from '../store'

Vue.use(VueI18N)
const lang = storex.getters['config/getLang'] || 'zh-CN'
const messages = {
  'zh-CN': require('./cn'),
  'en-US': require('./en')
}
const i18n = new VueI18N({
  locale: lang,
  messages
})
document.addEventListener('langChange', (lang: any) => {
  i18n.locale = lang.detail
})
export default i18n
