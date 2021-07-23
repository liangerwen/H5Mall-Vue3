<template>
  <div class="mall-container mall-bg">
    <van-sticky>
      <mall-header back title="我的Mall" showMenu class="bg-white">
      </mall-header>
    </van-sticky>
    <div
      class="flex flex-col"
      style="background-image: var(--mall-gradient-red)"
    >
      <div class="flex w-full p-4 pb-6">
        <div class="w-14 h-14 float-left">
          <img :src="user.img" alt="" class="w-full h-full rounded-1/2" />
        </div>
        <div
          class="flex justify-between h-14"
          style="max-width: calc(100% - 82px)"
        >
          <div
            class="
              flex flex-col
              justify-around
              px-3
              py-2
              text-sm text-white
              w-full
            "
          >
            <div class="flex max-w-full"
              ><p class="van-ellipsis w-full">{{ user.name }}</p>
            </div>
            <div class="flex max-w-full"
              ><p class="van-ellipsis w-full">{{ user.sign }}</p>
            </div></div
          >
          <div class="flex-1">
            <van-icon name="setting-o" size="24" color="#eee" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white h-32 rounded-lg -mt-2"></div>
    <mall-back-top right="30" bottom="130" target=".mall-chart"></mall-back-top>
    <mall-footer class="absolute left-0 bottom-0 right-0" />
  </div>
</template>

<script lang="ts">
  import { reactive } from 'vue'
  export default {
    name: 'MallMe',
    setup() {
      const user = reactive({
        id: 1,
        name: '亮尔大大van-ellipsisvan-ellipsisvan-ellipsisvan-ellipsisvan-ellipsisvan-ellipsisvan-ellipsisvan-ellipsisvan-ellipsis',
        sign: '这家伙很懒van-ellipsisvan-ellipsisvan-ellipsisvan-ellipsisvan-ellipsisvan-ellipsisvan-ellipsisvan-ellipsisvan-ellipsis',
        img: 'static/img/head.png'
      })
      return { user }
    }
  }
</script>

<style lang="scss"></style>
