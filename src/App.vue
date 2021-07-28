<template>
  <div class="mall-container"
    ><router-view v-slot="{ Component }">
      <keep-alive :include="CACHE_PAGE">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'App',
    setup() {
      const CACHE_PAGE = [
        'MallHome',
        'MallCategory',
        'MallMessage',
        'MallChart',
        'MallMe',
        'MallSearchPage'
      ]
      return { CACHE_PAGE }
    }
  }
</script>

<style lang="scss" scoped></style>
