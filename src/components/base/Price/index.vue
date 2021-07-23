<template>
  <span v-if="old" class="text-gray-400 line-through text-xs mall-price"
    >￥{{ showPrice }}</span
  >
  <span v-else :style="`color:${color};`" class="text-xs mall-price">
    <span>￥</span>
    <span :class="{ 'text-lg': special }">{{
      showPrice.toString().split('.')[0]
    }}</span>
    <span v-if="showPrice.toString().split('.')[1]"
      >.{{ showPrice.toString().split('.')[1] }}</span
    >
  </span>
</template>

<script>
  import { computed } from '@vue/runtime-core'
  export default {
    name: 'MallPrice',
    props: {
      price: {
        type: [Number, String],
        require: true
      },
      old: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: '#e4393c'
      },
      special: {
        type: Boolean,
        default: false
      },
      lessdot: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const showPrice = computed(() => {
        if (props.lessdot) {
          return props.price % 100 === 0
            ? props.price / 100
            : props.price % 10 === 0
            ? (props.price / 100).toFixed(1)
            : (props.price / 100).toFixed(2)
        } else return (props.price / 100).toFixed(2)
      })
      return { showPrice }
    }
  }
</script>

<style>
  .mall-price {
    font-family: var(--van-submit-bar-price-font-family);
  }
</style>
