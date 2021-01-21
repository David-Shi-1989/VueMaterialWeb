<template>
  <div class="sc-header">
    <div class="sc-h-l">
      <div class="h-logo">
        <img src="../../../assets/image/logo-gray.svg" height="34" />
      </div>
      <ul class="menu-list">
        <template v-for="(item, idx) in menus">
          <li :key="item.path" v-if="item.isShow"
            :class="{'active': item.isActive, 'cannot-select': true}"
            @click="onMenu1Click(idx)">{{renderTitle(item)}}</li>
        </template>
      </ul>
    </div>
    <rightButton></rightButton>
  </div>
</template>
<script>
import rightButton from './right-button'
export default {
  components: { rightButton },
  data () {
    return {
      menus: this.$store.getters['menu/headerMenus']
    }
  },
  methods: {
    onMenu1Click (idx) {
      this.$store.commit('menu/headerMenuActiveIndex', idx)
      // 默认打开首个菜单项
      const sidebar = this.$store.getters['menu/sidebarMenus']
      let nextPath = ''
      if (sidebar && sidebar.length > 0) {
        let nextMenuItem = sidebar[0]
        while (nextMenuItem.children && nextMenuItem.children.length > 0) {
          nextMenuItem = nextMenuItem.children[0]
        }
        nextPath = nextMenuItem.path
      } else if (this.menus[idx].path) {
        nextPath = this.menus[idx].path
      }
      if (nextPath) {
        this.$router.push({ path: nextPath })
      }
    },
    renderTitle (menu) {
      if (menu) {
        return this.$i18n.t('m.menu.' + (menu.i18nKey || menu.curPath))
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../style/size";
@import "../../../style/layout-color";
.sc-header {
  height: $header-height;
  background-color: $header-bg;
  display: flex;
  justify-content:space-between;
  flex-wrap: no-wrap;
  & > .sc-h-l {
    display: flex;
    & > .h-logo {
      padding: 7px 40px 10px 18px;
      width: 287px;
      max-width: 318px;
      & > img {
        vertical-align: bottom;
      }
    }
    & > ul.menu-list {
      list-style: none;
      display: flex;
      height: $header-height;
      & > li {
        height: $header-height;
        line-height: $header-height;
        color: #fff;
        opacity: .7;
        min-width: 100px;
        padding: 0 10px;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        &.active {
          opacity: 1;
          background-color: #48515c;
        }
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
