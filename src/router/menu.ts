import buildingPage from '@/views/building-page.vue'

interface MenuItem {
  title: string;
  path?: string;
  curPath?: string;
  icon?: string;
  isActive: boolean;
  isShow?: boolean;
  i18nKey?: string;
  children?: Array<MenuItem>;
}
interface MetaData {
  title?: string;
  isShowHeader?: boolean;
  isShowSidebar?: boolean;
  isHideBreadCrumb?: boolean;
}
interface RouterItem {
  path: string;
  name: string;
  component: any;
  children?: Array<RouterItem>;
  meta?: MetaData;
}
// isHideInMenu: Boolean(true) 是否在菜单中显示
// isHideBreadCrumb: Boolean(false) 是否显示面包屑
const allMenus = [
  {
    title: '首页',
    path: 'dashboard',
    name: 'Dashboard',
    component: buildingPage,
    isHideBreadCrumb: true
  },
  {
    title: '应用网络',
    path: 'apply-network',
    children: [
      {
        title: '基础设施',
        path: 'infrastructure',
        icon: 'fa fa-server',
        children: [
          {
            title: '网络控制器',
            path: 'net-controller',
            component: buildingPage
          },
          {
            title: 'Fabric',
            path: 'fabric',
            component: buildingPage,
            children: [
              {
                title: '新建Fabric',
                path: 'add',
                component: buildingPage,
                isHideInMenu: true
              }
            ]
          },
          {
            title: '设备',
            path: 'device',
            component: buildingPage
          },
          {
            title: 'DPI库',
            path: 'dpi',
            component: buildingPage
          }
        ]
      },
      {
        title: '参数',
        path: 'parameters',
        icon: 'fa fa-cogs',
        component: buildingPage
      }
    ]
  },
  {
    title: '安全服务',
    path: 'app',
    children: [
      {
        title: '租户',
        path: 'tenants',
        icon: 'fa fa-users',
        children: [
          {
            title: '全部租户',
            path: 'all',
            i18nKey: 'tenantAll',
            component: buildingPage
          }
        ]
      },
      {
        title: '资源',
        path: 'resources',
        icon: 'fa fa-joomla',
        children: [
          {
            title: '服务资源',
            path: 'service',
            i18nKey: 'resourceService',
            component: buildingPage
          }
        ]
      },
      {
        title: '服务',
        path: 'services',
        icon: 'fa fa-th-large',
        children: [
          {
            title: '防火墙',
            path: 'firewall',
            component: buildingPage
          }
        ]
      }
    ]
  },
  {
    title: '保障',
    path: 'assurance',
    children: [
      {
        title: '概览',
        path: 'overview',
        icon: 'fa fa-dashboard',
        component: buildingPage
      },
      {
        title: '控制器信息',
        path: 'controller-info',
        icon: 'fa fa-info-circle',
        component: buildingPage
      },
      {
        title: '日志信息',
        path: 'system-log',
        icon: 'fa fa-bell',
        component: buildingPage
      }
    ]
  },
  {
    path: 'settings',
    title: '系统设置',
    name: 'Setting',
    isHideInMenu: true,
    component: buildingPage
  },
  {
    path: 'notify',
    title: '消息',
    name: 'Notify',
    isHideInMenu: true,
    component: buildingPage
  }
]
const routerList: Array<RouterItem> = []
// 过滤掉不展示的
function getMenuList (): Array<MenuItem> {
  function walkArr (curArr: Array<any>, pathPre: string) {
    const result: Array<MenuItem> = []
    for (let i = 0; i < curArr.length; i++) {
      const menuItem = curArr[i]
      const curPath = (pathPre + '/' + menuItem.path).replace(/^\/\//, '/')
      // 在菜单中隐藏
      const newItem: MenuItem = {
        title: menuItem.title,
        curPath: menuItem.path,
        path: curPath,
        icon: menuItem.icon,
        isActive: false,
        isShow: menuItem.isHideInMenu !== true,
        children: []
      }
      if (menuItem.i18nKey) {
        newItem.i18nKey = menuItem.i18nKey
      }
      if (menuItem.children && menuItem.children.length) {
        newItem.children = walkArr(menuItem.children, String(newItem.path))
      }
      if (newItem.children && newItem.children.length === 0) {
        delete newItem.children
      }
      if (!newItem.icon) {
        delete newItem.icon
      }
      result.push(newItem)
      // 有component,加入路由
      if (menuItem.component) {
        const newRouterItem: RouterItem = {
          path: curPath,
          name: menuItem.name || curPath.replace(/^\//, '').replace(/\//g, '_'),
          meta: {
            title: menuItem.title,
            isHideBreadCrumb: (menuItem.isHideBreadCrumb === true)
          },
          component: menuItem.component
        }
        routerList.push(newRouterItem)
      }
    }
    return result
  }
  const filteredMenus: Array<MenuItem> = walkArr(allMenus, '')
  return filteredMenus
}
const menus: Array<MenuItem> = getMenuList()
menus.forEach((item: any, idx: number) => {
  item.index = idx
})

export {
  menus,
  routerList
}
