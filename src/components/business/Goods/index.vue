<template>
  <div class="mall-goods"
    ><van-list
      v-bind="$attrs"
      v-on="$attrs"
      v-if="type === GoodType.CARD"
      class="mb-2"
      ><div
        v-for="(item, i) in goodList"
        :key="i"
        class="flex justify-between px-2"
      >
        <template v-for="(card, key) in item" :key="key"
          ><div
            class="
              good-card-info
              flex flex-col
              bg-white
              my-1.5
              mx-1.5
              rounded-lg
              min-h-80
            "
            v-if="card"
          >
            <div class="w-full overflow-y-hidden">
              <img :src="card.img" alt="" class="w-full rounded-t-lg" />
            </div>
            <div
              class="
                w-full
                min-h-36
                p-2
                flex flex-col flex-auto
                justify-between
              "
            >
              <p class="text-gray-900 van-multi-ellipsis--l2 text-sm">
                <van-tag
                  v-if="card.tag"
                  type="danger"
                  size="medium"
                  class="mr-1 rounded"
                  >{{ card.tag }}</van-tag
                >{{ card.title }}</p
              >
              <div class="flex flex-wrap"
                ><van-tag
                  color="#f2f2f7"
                  class="mr-1 rounded-sm"
                  text-color="#999"
                  v-for="(trait, key) in card.traits"
                  :key="key"
                  >{{ trait }}</van-tag
                ></div
              >
              <p>
                <mall-price :price="card.price" special></mall-price>
              </p>
              <p class="text-gray-400 text-xs">
                {{ card.evaluation }}+评价 好评率{{ card.highPraise }}
              </p>
              <div class="w-full flex justify-between">
                <div
                  class="text-gray-400 text-sm flex items-center mall-shop-text"
                  ><p class="flex-auto van-ellipsis">{{ card.shops }} </p
                  ><van-icon name="arrow" class="w-4" />
                </div>
                <van-icon name="cart-o" size="1.33rem" color="#e4393c"
              /></div>
            </div> </div
          ><div v-else class="w-1/2 mx-1.5"></div
        ></template>
      </div>
    </van-list>
    <van-list v-bind="$attrs" v-on="$attrs" v-if="type === GoodType.LIST"
      ><div
        class="bg-white flex h-40 w-full"
        v-for="(item, i) in goodList"
        :key="i"
      >
        <img :src="item.img" alt="" class="w-36 h-36 ml-2" />
        <div
          class="
            flex flex-col
            justify-between
            px-4
            py-2
            good-list-info
            h-full
            border-b border-gray-200
          "
        >
          <p class="text-gray-900 van-multi-ellipsis--l2 text-base">
            <van-tag
              v-if="item.tag"
              type="danger"
              size="medium"
              class="mr-1 rounded text-sm"
              >{{ item.tag }}</van-tag
            >{{ item.title }}</p
          >
          <div class="flex mt-1" v-show="item.traits && item.traits.length">
            <van-tag
              color="#f2f2f7"
              class="mr-1 rounded-sm text-sm"
              text-color="#999"
              v-for="(trait, key) in item.traits"
              :key="key"
              >{{ trait }}</van-tag
            ></div
          >
          <p>
            <mall-price :price="item.price" special></mall-price>
          </p>
          <p class="text-gray-400 text-xs">
            {{ item.evaluation }}+评价 好评率{{ item.highPraise }}
          </p>
          <div class="flex justify-between w-full">
            <div class="text-gray-400 flex items-center mall-shop-text"
              ><p class="flex-auto van-ellipsis text-xs">{{ item.shops }} </p
              ><van-icon name="arrow" class="w-4 text-xs" />
            </div>
            <van-icon name="cart-o" size="1.33rem" color="#e4393c"
          /></div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
  import { computed, PropType } from 'vue'
  import { GoodListItem, GoodType } from './type'

  interface IProps {
    type: GoodType
    list: GoodListItem[]
  }

  export default {
    name: 'MallGoods',
    props: {
      type: {
        type: String as PropType<GoodType>,
        default: GoodType.LIST
      },
      list: {
        default: () => []
      }
    },
    setup(props: IProps) {
      const goodList = computed(() => {
        if (props.type === GoodType.CARD) {
          let pList = []
          for (let i = 0, len = props.list.length; i < len; i += 2) {
            pList.push([props.list[i], props.list[i + 1]])
          }
          return pList
        }
        return props.list
      })
      return {
        GoodType,
        goodList
      }
    }
  }
</script>

<style lang="scss">
  .good-list-info {
    width: calc(100% - 9.5rem);
  }
  .good-card-info {
    width: calc(50% - 0.75rem);
  }
  .mall-shop-text {
    max-width: calc(100% - 22px);
  }
</style>
