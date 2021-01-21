import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Storex from '../store'
import Index from '../views/index.vue'
import { routerList } from './menu'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Index,
    redirect: '/dashboard',
    children: routerList
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '*',
    name: '404Error',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})
function checkRouter (to: any, next: Function) {
  if (Storex.getters['config/getIsLogin']) {
    next()
  } else {
    if (to.name !== 'Login') {
      Storex.commit('config/saveLastUrl', to.path)
      next({ name: 'Login' })
    } else {
      next()
    }
  }
}
function parseMeta (to: any) {
  Storex.commit('menu/setIsShowBreadCrumb', !(typeof to.meta.isHideBreadCrumb === 'boolean' && to.meta.isHideBreadCrumb === true))
}
router.beforeEach((to, from, next) => {
  parseMeta(to)
  if (to.name === '404Error') {
    next()
  } else {
    checkRouter(to, next)
  }
})

export default router
