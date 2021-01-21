<template>
  <div class="sc-bc-wrap">
    <ul>
      <li v-for="item in list" :key="item.curPath">{{renderTitle(item)}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    renderTitle (menu) {
      if (menu) {
        return this.$i18n.t('m.menu.' + (menu.i18nKey || menu.curPath))
      } else {
        return ''
      }
    }
  },
  computed: {
    list () {
      return this.$store.getters['menu/activeMenuItems']
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/size";
.sc-bc-wrap {
  width: 100%;
  height: $breadcrumb-height;
  & > ul {
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    font-size: 12px;
    color: #666;
    & > li {
      height: $breadcrumb-height;
      line-height: $breadcrumb-height;
      &:not(:last-child)::after {
        content: '>';
        margin: 0 3px;
      }
    }
  }
}
</style>
