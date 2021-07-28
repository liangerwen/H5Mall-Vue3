<template>
  <div class="w-full h-full bg-transparent fixed l-0 t-0 z-full">
    <div
      class="
        w-20
        h-20
        bg-black
        opacity-60
        rounded-md
        px-2
        py-3
        absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
      "
      ><van-loading type="spinner" color="white" text-color="white" vertical
        >加载中</van-loading
      ></div
    >
  </div>
</template>

<script>
  export default {
    name: 'MallLoading'
  }
</script>

<style></style>
