<template>
  <div class="mall-container overflow-hidden flex flex-col">
    <mall-header back>
      <mall-search @focus="search.handle" />
    </mall-header>
    <div class="flex-auto flex border-t overflow-y-auto mb-footer">
      <van-sidebar
        v-model="active"
        class="category-sidebar h-full w-1/4 overflow-hidden"
      >
        <div class="mall-sidebar-box">
          <van-sidebar-item
            v-for="(item, i) in categoryList"
            :key="i"
            :title="item.title"
            @click="scrollToItem"
          />
        </div>
      </van-sidebar>
      <div class="category-goods w-3/4 h-full flex flex-col overflow-hidden">
        <div class="mall-category-box">
          <template v-if="categoryList[active]?.list">
            <div
              class="w-full p-2"
              v-for="(item, i) in categoryList[active].list"
              :key="i"
            >
              <p class="font-semibold mb-2">
                {{ item.title }}
              </p>
              <div class="flex w-full flex-wrap">
                <div
                  v-for="(good, index) in item.list"
                  :key="index"
                  class="w-1/3 p-2"
                >
                  <div
                    :style="`background-image:url(${good.img})`"
                    class="w-full h-0 pt-full bg-cover"
                  ></div>
                  <p class="text-center mt-1 text-sm">
                    {{ good.title }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <mall-footer class="absolute left-0 bottom-0 right-0" />
  </div>
</template>

<script lang="ts">
  import { ref, reactive, onActivated } from 'vue'
  import useTouchMove, { TouchMoveType } from '@/hooks/useTouchMove'
  import { $, setTranslateY } from '@/utils/dom'
  import { getCategory } from '@/http/Category'
  import { HTTP_STATUS } from '@/http/config'
  import { useRouter } from 'vue-router'
  import { Category } from '@/http/Category/type'
  export default {
    name: 'MallCategory',
    setup() {
      const router = useRouter()
      //搜索
      const search = reactive({
        handle: () => {
          router.push('/search')
        }
      })

      const categoryList = ref<Category[]>([])
      //获取分类列表
      const getCategoryList = () => {
        getCategory().then((res) => {
          if (res.code === HTTP_STATUS.SUCCESS) {
            categoryList.value = res.data
          }
        })
      }

      //当前点击的类别
      const active = ref(0)

      //sider添加滑动特效
      const sidebarReset = useTouchMove(
        '.mall-sidebar-box',
        '.van-sidebar',
        TouchMoveType.y,
        160
      )
      //category添加滑动特效
      const categoryset = useTouchMove(
        '.mall-category-box',
        '.category-goods',
        TouchMoveType.y,
        160
      )

      const scrollToItem = (i: number) => {
        sidebarReset()
        categoryset()
        const scrollDom = $('.mall-sidebar-box') as HTMLElement
        const boxDom = $('.van-sidebar') as HTMLElement
        const heightDiff =
          scrollDom.offsetHeight - boxDom.offsetHeight > 0
            ? scrollDom.offsetHeight - boxDom.offsetHeight
            : 0
        const scrollHeight = i * 52
        if (heightDiff < scrollHeight) {
          setTranslateY(scrollDom, -heightDiff)
        } else {
          setTranslateY(scrollDom, -i * 52)
        }
      }

      onActivated(() => {
        getCategoryList()
      })

      return { search, categoryList, active, scrollToItem }
    }
  }
</script>

<style lang="scss">
  .category-sidebar {
    background-color: var(--van-sidebar-background-color);
  }
</style>
