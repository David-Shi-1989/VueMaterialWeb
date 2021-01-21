<template>
  <div :class="wrapClass" v-show="menus && menus.length > 0">
    <div class="s-top">
      <p>{{renderTitle($store.getters['menu/activeHeaderMenuItem'])}}</p>
      <i class="fa fa-exchange" @click="onCollapseToggle"></i>
    </div>
    <ul class="s-menu2">
      <template v-for="menu2 in menus">
        <li :key="menu2.path" v-if="menu2.isShow" :class="menu2.isActive?'active':''">
          <div :class="menu2.children?'is-parent':'is-link'" :title="renderTitle(menu2)">
            <p v-if="menu2.children">
              <i :class="menu2.icon"></i>
              <span>{{renderTitle(menu2)}}</span>
            </p>
            <!-- TODO 收起时子菜单 -->
            <router-link v-else :to="{path:menu2.path}">
              <i :class="menu2.icon"></i>
              <span>{{renderTitle(menu2)}}</span>
            </router-link>
          </div>
          <template v-if="menu2.children">
            <ul class="s-menu3">
              <template v-for="menu3 in menu2.children">
                <li :key="menu3.path" v-if="menu3.isShow" :class="menu3.isActive?'active':''" :title="renderTitle(menu3)">
                  <router-link :to="{path:menu3.path}">{{renderTitle(menu3)}}</router-link>
                </li>
              </template>
            </ul>
          </template>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isOpen: true
    }
  },
  methods: {
    onCollapseToggle () {
      this.isOpen = !this.isOpen
    },
    renderTitle (menu) {
      if (menu) {
        return this.$i18n.t('m.menu.' + (menu.i18nKey || menu.curPath))
      } else {
        return ''
      }
    }
  },
  computed: {
    wrapClass () {
      return {
        'sc-sidebar': true,
        'sc-open': this.isOpen,
        'sc-close': !this.isOpen
      }
    },
    menus () {
      return this.$store.getters['menu/sidebarMenus']
    }
  },
  watch: {
    '$route.path': {
      handler (newPath) {
        // 路由变化,更新菜单的选中状态
        this.$store.commit('menu/updateActiveItems', newPath || this.$route.path)
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/size";
@import "../../style/layout-color";
@mixin menu-normal-style () {
  color: #fff;
  opacity: .7;
  text-decoration: none;
  height: $sidebar-menu-item-height;
  line-height: $sidebar-menu-item-height;
}
@mixin menu-link-style () {
  &:hover {
    color: #fff;
    opacity: 1;
  }
}
@mixin menu-active-style () {
  background-color: #2e3540;
  opacity: 1;
  position: relative;
  & > p, & > a, & > a > i, & > p > i {
    opacity: 1;
  }
  &::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    right: 0;
    top: ($sidebar-menu-item-height - 10px) / 2;
    border-top: 5px solid transparent;
    border-right: 5px solid #fafafa;
    border-bottom: 5px solid transparent;
  }
}
.sc-sidebar {
  background-color: $sidebar-bg;
  transition: width .1s;
  &.sc-open {
    width: $sidebar-width-open;
  }
  &.sc-close {
    width: $sidebar-width-close;
    padding: 0;
    .s-top {
      & > p {
        display: none;
      }
      & > i {
        display: block;
        margin: 0 auto;
      }
    }
    .s-menu2 {
      & > li {
        & > div {
          & > p, & > a {
            & > i {
              margin: 0 auto;
            }
            & > span {
              display: none;
            }
          }
        }
        &.active > div {
          background-color: #2e3540;
        }
        .s-menu3 {
          display: none;
        }
      }
    }
  }
  .s-top {
    $topHeight: 40px;
    height: $topHeight;
    display: flex;
    justify-content: space-between;
    color: #aaa;
    padding: 0 ($sidebar-menu-item-padding-left + 5px);
    & > p {
      font-size: 15px;
      line-height: $topHeight;
    }
    & > i {
      font-size: 15px;
      line-height: $topHeight;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
  .s-menu2 {
    list-style: none;
    & > li {
      & > div {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        & > p, & > a {
          width: 100%;
          display: flex;
          font-size: 14px;
          @include menu-normal-style();
          & > i {
            display: block;
            flex-shrink: 0;
            font-size: 16px;
            width: 30px;
            text-align: center;
            margin-right: 10px;
            line-height: $sidebar-menu-item-height;
            margin-left: $sidebar-menu-item-padding-left;
            @include menu-normal-style();
          }
        }
        & > a {
          width: 100%;
          flex-shrink: 1;
          @include menu-link-style();
        }
      }
      &.active {
        div.is-link {
          @include menu-active-style();
        }
        div.is-parent {
          opacity: 1;
          & > p, & > p > i {
            opacity: 1;
          }
        }
      }
      .s-menu3 {
        list-style: none;
        flex-shrink: 0;
        width: 100%;
        & > li {
          & > p, & > a {
            font-size: 14px;
            display: block;
            padding-left: $sidebar-menu-item-padding-left + 30px + 10px;
            @include menu-normal-style();
          }
          & > a {
            width: 100%;
            @include menu-link-style();
          }
          &.active {
            @include menu-active-style();
          }
        }
      }
    }
  }
}
</style>
