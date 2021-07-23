<template>
  <header class="flex w-full h-header leading-header">
    <slot name="left">
      <div
        v-if="back"
        @click="goBack"
        class="flex justify-center items-center px-2"
      >
        <van-icon
          name="arrow-left"
          class="text-gray-400 text-lg font-semibold"
        />
        {{ leftText }}
      </div>
    </slot>
    <slot
      ><div class="flex-auto text-center">{{ title }}</div></slot
    >
    <slot name="right">
      <van-popover
        v-if="showMenu"
        v-model:show="showPopover"
        theme="dark"
        :actions="spareActions"
        placement="bottom-end"
        @select="handleSelect"
      >
        <template #reference>
          <div class="h-full px-2 flex justify-center items-center"
            ><van-icon name="weapp-nav" class="text-gray-400" size="20" /> </div
        ></template>
      </van-popover>
    </slot>
  </header>
</template>

<script lang="ts">
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  import { IAction, actions } from './config'

  export default {
    name: 'MallHeader',
    props: {
      title: {
        type: String,
        default: ''
      },
      showMenu: {
        type: Boolean,
        default: false
      },
      back: {
        type: Boolean,
        default: true
      },
      leftText: {
        type: String,
        default: ''
      }
    },
    setup() {
      const router = useRouter()
      const goBack = () => {
        router.go(-1)
      }
      const showPopover = ref(false)
      const spareActions = actions.filter(
        (i) =>
          i.url.replace(/\//g, '') !==
          router.currentRoute.value.path.replace(/\//g, '')
      )
      const handleSelect = (action: IAction) => {
        router.push(action.url)
      }
      return {
        goBack,
        showPopover,
        spareActions,
        handleSelect
      }
    }
  }
</script>

<style></style>
