<template>
  <div class="flex flex-col w-full h-full">
    <mall-header showMenu>
      <mall-search
        v-model="search.value"
        @update:model-value="search.change"
        autofocus
      />
      <template #right
        ><van-button
          class="w-16 px-4 m-2 ml-0"
          round
          size="small"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          @click="search.search"
        >
          搜索
        </van-button>
      </template>
    </mall-header>
    <div class="flex flex-col flex-auto p-4 overflow-y-auto mall-bg">
      <div class="flex flex-col" v-if="history.list.length">
        <div class="flex justify-between">
          <h4 class="font-semibold">搜索历史</h4
          ><van-icon
            name="delete-o"
            size="1.5rem"
            class="text-gray-300"
            @click="history.delAllHistory"
          />
        </div>
        <div class="flex flex-wrap mt-2">
          <span
            class="
              px-2
              py-1
              m-1
              text-sm
              bg-white
              border border-gray-100
              rounded-2xl
              van-ellipsis
            "
            v-for="(item, i) in history.list"
            :key="i"
            >{{ item }}</span
          >
        </div>
      </div>
      <div class="flex flex-col mt-2">
        <div class="flex items-center">
          <h4
            :class="{
              'font-semibold border-rb-red relative':
                searchRecommend.tab === TabType.FIND
            }"
            @click="searchRecommend.tab = TabType.FIND"
            >搜索发现</h4
          >
          <div class="w-1 mx-4 transform bg-gray-200 h-2/5 scale-x-25"></div>
          <h4
            :class="{
              'font-semibold border-rb-red relative':
                searchRecommend.tab === TabType.HOT
            }"
            @click="searchRecommend.tab = TabType.HOT"
            >热搜榜</h4
          >
        </div>
        <div
          v-if="searchRecommend.tab === TabType.FIND"
          class="flex flex-wrap mt-2"
        >
          <p
            v-for="(item, i) in searchRecommend.findList"
            :key="i"
            class="w-1/2 pr-2 mb-2 text-sm van-ellipsis"
            >{{ item.title }}</p
          >
        </div>
        <div
          v-if="searchRecommend.tab === TabType.HOT"
          class="flex flex-col mt-2"
        >
          <div
            v-for="(item, i) in searchRecommend.hotList"
            :key="i"
            class="relative flex w-full m-1 h-14"
          >
            <img :src="item.img" alt="" class="rounded-lg w-14 h-14" />
            <i
              :class="{
                'absolute top-0 left-0 rounded-tl rounded-tr-md rounded-br-none rounded-bl-md leading-4 text-center w-4 h-4 text-white text-sm font-semibold': true,
                'bg-gray-300': i > 2,
                'bg-red-500': i === 0,
                'bg-pink-500': i === 1,
                'bg-yellow-400': i === 2
              }"
              >{{ i + 1 }}</i
            >
            <div
              class="flex flex-col justify-center flex-auto h-full ml-2"
              style="width: calc(100% - 4rem)"
            >
              <div class="flex w-full"
                ><p class="mb-1 text-sm van-ellipsis">{{ item.title }}</p
                ><span
                  v-if="i < 3"
                  class="
                    px-1
                    pt-0.5
                    bg-red-100
                    text-red-500
                    font-semibold
                    rounded
                    text-xs text-center
                    ml-2
                    block
                    h-5
                  "
                  >热</span
                ></div
              >
              <p class="text-xs text-gray-400">人气值 {{ item.hotValue }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { onActivated, reactive } from 'vue'
  import {
    getSearchHistory,
    addSearchHistory,
    delAllSearchHistory
  } from '@/utils/storage'
  import { Dialog } from 'vant'
  import { getSearchInfo } from '@/http/Search'
  import { HTTP_STATUS } from '@/http/config'
  import { Find, Hot } from '@/http/Search/type'
  export default {
    name: 'MallSearchPage',
    setup() {
      enum TabType {
        FIND = 'FIND',
        HOT = 'HOT'
      }
      const searchRecommend = reactive({
        tab: TabType.FIND,
        findList: [] as Find[],
        hotList: [] as Hot[]
      })

      const getSearchRecommend = () => {
        getSearchInfo().then((res) => {
          if (res.code === HTTP_STATUS.SUCCESS) {
            const { hot, find } = res.data
            searchRecommend.findList = find || []
            searchRecommend.hotList = hot || []
          }
        })
      }

      const history = reactive({
        list: getSearchHistory(),
        delAllHistory: () => {
          Dialog.confirm({
            message: '确定要清空吗？',
            showCancelButton: true
          }).then(() => {
            delAllSearchHistory()
            history.list = getSearchHistory()
          })
        }
      })
      const search = reactive({
        value: '',
        change: (val: string) => {
          // eslint-disable-next-line
          console.log(val)
        },
        search: () => {
          addSearchHistory(search.value)
          history.list = getSearchHistory()
          search.value = ''
        }
      })

      onActivated(() => {
        getSearchRecommend()
      })
      return { history, search, TabType, searchRecommend }
    }
  }
</script>

<style lang="scss">
  .border-rb-red::after {
    content: '';
    position: absolute;
    right: -0.2rem;
    bottom: -0.3rem;
    display: block;
    width: 1rem;
    height: 1.5rem;
    border: 3px solid red;
    border-radius: 50%;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-color: transparent;
    transform: rotate(-60deg);
  }
</style>
