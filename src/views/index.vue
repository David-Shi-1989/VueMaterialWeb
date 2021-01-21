<template>
  <div class="main-wrap">
    <Header id="header"></Header>
    <div id="main-mid" :class="mainMidClass">
      <Sidebar id="sidebar"></Sidebar>
      <div id="content_wrap">
        <BreadCrumb v-if="$store.getters['menu/isShowBreadCrumb']"></BreadCrumb>
        <router-view id="content"/>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/layout/header/index'
import Sidebar from '@/components/layout/sidebar'
import BreadCrumb from '@/components/layout/breadcrumb'
export default {
  components: { Header, Sidebar, BreadCrumb },
  data () {
    return {
    }
  },
  computed: {
    mainMidClass () {
      return {
        'no-breadcrumb': !this.$store.getters['menu/isShowBreadCrumb']
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../style/size";
@import "../style/layout-color";
.main-wrap {
  display: flex;
  flex-wrap: wrap;
  #header {
    width: 100%;
    flex-shrink: 0;
  }
  #main-mid {
    $paddingGap: 16px;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: calc(100% - #{$header-height});
    #sidebar {
      flex-shrink: 0;
      height: 100%;
    }
    #content_wrap {
      flex-shrink: 1;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 $paddingGap;
      #content {
        height: calc(100% - #{$breadcrumb-height} - #{$paddingGap});
        background-color: #fff;
        padding: 20px;
        box-shadow: $content-box-shadow;
      }
    }
    &.no-breadcrumb {
      #content_wrap {
        padding: $paddingGap;
        #content {
          height: 100%;
        }
      }
    }
  }
}
</style>
