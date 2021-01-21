import { menus } from '@/router/menu'

const state = {
  headerMenu: {
    list: menus,
    activeIndex: -1,
    activeMenuItem: []
  },
  sidebar: {
    list: []
  },
  breadcrumb: {
    isShow: true
  }
}

const getters = {
  headerMenus: (state: any) => state.headerMenu.list,
  activeHeaderMenuItemIndex: (state: any) => state.headerMenu.activeIndex,
  activeHeaderMenuItem: (state: any) => {
    let result = null
    if (state.headerMenu.activeIndex >= 0) {
      result = state.headerMenu.list[state.headerMenu.activeIndex]
    }
    return result
  },
  sidebarMenus: (state: any) => {
    let result = null
    if (state.headerMenu.activeIndex >= 0) {
      result = state.headerMenu.list[state.headerMenu.activeIndex].children
    }
    return result
  },
  activeMenuItems: (state: any) => state.headerMenu.activeMenuItem,
  isShowBreadCrumb: (state: any) => state.breadcrumb.isShow
}
const actions = {
  // onHeaderMenuChange (store: any, headerMenuIdx: number) {
  //   if (headerMenuIdx >= 0 && headerMenuIdx < store.state.headerMenu.list.length) {
  //     store.commit('headerMenuActiveIndex', headerMenuIdx)
  //   }
  // }
}
const mutations = {
  headerMenuActiveIndex: (state: any, idx: number) => {
    if (idx >= 0 && idx < state.headerMenu.list.length) {
      state.headerMenu.activeIndex = idx
    }
  },
  updateActiveItems: (state: any, path: string) => {
    // 根据path来更新head和sidebar的active状态
    const pathArr = path.replace(/^\//, '').split('/')
    state.headerMenu.activeMenuItem.forEach((item: any) => { item.isActive = false })
    state.headerMenu.activeMenuItem = []
    let tMenuItems = state.headerMenu.list
    let searchIndex = 0
    while (pathArr.length > 0) {
      const tPath = pathArr.shift()
      const findItem = tMenuItems.find((item: any) => item.curPath === tPath)
      if (findItem) {
        state.headerMenu.activeMenuItem.push(findItem)
        if (findItem.children) {
          tMenuItems = findItem.children
        }
        if (searchIndex === 0) {
          // 更新 headerMenu.activeIndex
          state.headerMenu.activeIndex = findItem.index
        }
      } else {
        console.warn('error when match path.', path)
      }
      searchIndex++
    }
    state.headerMenu.activeMenuItem.forEach((item: any) => { item.isActive = true })
  },
  setIsShowBreadCrumb: (state: any, isShow: boolean) => {
    state.breadcrumb.isShow = isShow
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
