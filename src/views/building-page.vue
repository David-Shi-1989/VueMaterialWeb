<template>
  <div>
    <h3>{{pageTitle}} - 页面建设中</h3>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    pageTitle () {
      return this.$route.meta.title
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
