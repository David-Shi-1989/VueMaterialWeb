import jsCookie from 'js-cookie'
const langList = [
  { key: 'zh-CN', text: '中文' },
  { key: 'en-US', text: 'English' }
]
const themeList = [
  { key: 'dark', text: '深色', color: '#292f39', i18nKey: 'themeDark' },
  { key: 'light', text: '浅色', color: '#f2f2f2', i18nKey: 'themeLight' }
]
enum loginStateEnum {
  unLogin, Login, Unknow
}
function getInitLogState (): loginStateEnum {
  if (jsCookie.get('username')) {
    return loginStateEnum.Login
  } else {
    return loginStateEnum.unLogin
  }
}
function getUserName (): string {
  return jsCookie.get('username') || ''
}
function getTheme (): string {
  return window.localStorage.getItem('theme') || themeList[0].key
}
function getLang (): string {
  return window.localStorage.getItem('lang') || langList[0].key
}
const state = {
  lang: getLang(),
  // user
  user: {
    id: '',
    name: getUserName(),
    loginState: getInitLogState(),
    lastUrl: null
  },
  // theme
  theme: {
    value: getTheme(),
    list: themeList
  }
}

const getters = {
  getLang: (state: any) => state.lang,
  getLangList: () => langList,
  getIsLogin: (state: any) => state.user.loginState === loginStateEnum.Login,
  getLoginLastUrl: (state: any) => state.user.lastUrl,
  userName: (state: any) => state.user.name,
  theme: (state: any) => state.theme.value,
  themeList: (state: any) => state.theme.list
}
const actions = {
  logout: (store: any) => {
    store.commit('clearUserInfo')
  }
}
const mutations = {
  setLang: (state: any, val: string) => {
    if (langList.some(item => item.key === val)) {
      state.lang = val
      window.localStorage.setItem('lang', val)
      document.dispatchEvent(new CustomEvent('langChange', { detail: val }))
    }
  },
  saveLastUrl: (state: any, path: string) => {
    if (path) {
      state.user.lastUrl = path
    }
  },
  clearUserInfo: (state: any) => {
    state.user.id = null
    state.user.name = null
    jsCookie.remove('username')
    window.location.hash = '#/login'
  },
  setUserInfo: (state: any, userInfo: any) => {
    state.user.id = userInfo.id
    state.user.name = userInfo.name
    if (typeof userInfo.isLogin === 'boolean') {
      if (userInfo.isLogin) {
        state.user.loginState = loginStateEnum.Login
      }
    }
    jsCookie.set('username', userInfo.name, { path: '/' })
  },
  setTheme: (state: any, val: string) => {
    if (themeList.some(item => item.key === val)) {
      state.theme.value = val
      window.localStorage.setItem('theme', val)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
