<template>
  <div
    class="mall-backtop shadow-2xl"
    :style="{ right: right + 'px', bottom: bottom + 'px' }"
    @click="backTop"
    v-show="show"
  >
    <van-icon name="arrow-up" color="#ee0a24" />
  </div>
</template>

<script lang="ts">
  import { onActivated, onMounted, onUnmounted, ref } from 'vue'
  interface IProps {
    right: string | number | undefined
    bottom: string | number | undefined
    showHeight: string | number | undefined
    target: string | undefined
  }
  export default {
    name: 'MallBackTop',
    props: {
      right: {
        type: [String, Number],
        default: 40
      },
      bottom: {
        type: [String, Number],
        default: 40
      },
      showHeight: {
        type: [String, Number],
        default: 200
      },
      target: {
        type: String,
        require: true
      }
    },
    setup(props: IProps) {
      const timer = ref<number | null>(null)
      const scrollHeight = ref(0)
      const show = ref(false)
      const targetScroll = (e: Event) => {
        const target = e.target as HTMLElement
        show.value = target.scrollTop >= 200
      }
      onMounted(() => {
        const target = document.querySelector(props.target as string)
        if (target) {
          target.addEventListener('scroll', targetScroll)
        }
      })
      onUnmounted(() => {
        const target = document.querySelector(props.target as string)
        if (target) {
          target.removeEventListener('scroll', targetScroll)
        }
        if (timer.value) {
          clearInterval(timer.value as number)
          timer.value = null
        }
      })
      const backTop = () => {
        const target = document.querySelector(props.target as string)
        scrollHeight.value = target?.scrollTop || 0
        timer.value = setInterval(() => {
          if (target) {
            if (target.scrollTop > scrollHeight.value / 20) {
              target.scrollTop -= scrollHeight.value / 20
            } else {
              target.scrollTop = 0
              clearInterval(timer.value as number)
              timer.value = null
            }
          }
        }, 20)
      }
      onActivated(() => {
        show.value = false
      })
      return { show, backTop }
    }
  }
</script>

<style lang="scss">
  .mall-backtop {
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    position: fixed;
    right: 40px;
    bottom: 40px;
    border-radius: 50%;
    background-color: #fff;
    border: #eee 1px solid;
  }
</style>
