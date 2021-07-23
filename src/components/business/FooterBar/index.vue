<template>
  <van-submit-bar
    v-if="type === IType.BALANCE"
    class="relative"
    v-bind="$attrs"
    v-on="$attrs"
  >
    <van-checkbox
      checked-color="#e4393c"
      @update:model-value="$attrs['onUpdate:modelValue']"
      :model-value="$attrs['modelValue']"
      >全选</van-checkbox
    >
  </van-submit-bar>

  <div
    v-if="type === IType.EDIT"
    class="w-full flex justify-between items-center px-4"
  >
    <van-checkbox
      class="text-sm"
      checked-color="#e4393c"
      @update:model-value="$attrs['onUpdate:modelValue']"
      :model-value="$attrs['modelValue']"
      >全选</van-checkbox
    >
    <div
      ><van-button
        class="px-5 mr-2"
        plain
        type="warning"
        round
        @click="$attrs['onCollectClick']"
        size="small"
        >收 藏</van-button
      >
      <van-button
        class="px-5"
        plain
        type="danger"
        round
        @click="$attrs['onDeleteClick']"
        size="small"
        >删 除</van-button
      >
    </div>
  </div>
  <van-action-bar class="absolute" v-if="type === IType.SHOP">
    <van-action-bar-icon icon="chat-o" text="客服" />
    <van-action-bar-icon icon="cart-o" text="购物车" />
    <van-action-bar-icon icon="shop-o" text="店铺" />
    <van-action-bar-button type="warning" text="加入购物车" />
    <van-action-bar-button type="danger" text="立即购买" />
  </van-action-bar>
</template>

<script lang="ts">
  import { PropType } from 'vue'

  export enum IType {
    BALANCE = 'balance',
    EDIT = 'edit',
    SHOP = 'shop'
  }

  export default {
    name: 'MallFooterBar',
    props: {
      type: {
        type: String as PropType<IType>,
        default: IType.BALANCE
      }
    },
    setup() {
      return { IType }
    }
  }
</script>

<style></style>
