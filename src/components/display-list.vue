<template>
  <ul :class="wrapClass">
    <template v-for="(item,idx) in value">
      <li :key="'detail_'+idx">
        <p class="dl-title">{{item.title}}</p>
        <p class="dl-text">{{item.text}}</p>
      </li>
    </template>
  </ul>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    fontSize: {
      type: String,
      default: 'default',
      validator: val => ['small', 'default', 'large'].includes(val)
    },
    hasColon: {
      type: Boolean,
      default: true
    },
    isTitleFixWidth: {
      type: Boolean,
      default: true
    },
    titleWidth: {
      type: Number,
      default: 120
    }
  },
  data () {
    return {
    }
  },
  computed: {
    wrapClass () {
      const obj = {
        'cpn-dl': true,
        'has-colon': this.hasColon,
        'title-fix-width': this.isTitleFixWidth
      }
      obj['fs-' + this.fontSize] = true
      return obj
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin fontSize () {
  &.fs-small {
    font-size: 12px;
  }
  &.fs-default {
    font-size: 13px;
  }
  &.fs-large {
    font-size: 15px;
  }
};
@mixin hasColon () {
  &.has-colon .dl-title::after {
    content: ":";
    margin: 0 3px;
  }
}
@mixin titleWidth () {
  &.title-fix-width .dl-title {
    width: 120px;
  }
}
.cpn-dl {
  list-style: none;
  @include fontSize();
  @include hasColon();
  @include titleWidth();
  & > li {
    display: flex;
    & > p {
      &.dl-title {
        color: var(--color-text-subColor);
      }
      &.dl-text {
        color: var(--color-text-content);
      }
    }
  }
}
</style>
