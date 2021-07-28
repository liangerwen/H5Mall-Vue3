<template>
  <div class="mall-container mall-chart mall-bg">
    <van-sticky>
      <mall-header back title="购物车" showMenu class="bg-white"> </mall-header>
    </van-sticky>
    <div
      :class="{
        'h-header flex bg-white px-2': true,
        'justify-end': chart.chartEditable
      }"
      ><div v-if="chart.chartEditable">
        <div
          class="text-sm w-12 leading-header text-center"
          @click="chart.chartEditable = false"
          >完成</div
        >
      </div>
      <template v-else
        ><p
          class="text-sm leading-header px-4 van-ellipsis"
          @click="chart.showAddressList = true"
          ><van-icon
            name="location-o"
            class="mr-1"
          />昆山市昆山市昆山市昆山市昆山市昆山市昆山市昆山市昆山市昆山市昆山市昆山市昆山市昆山市昆山市昆山市昆山市</p
        >
        <i class="block w-1 transform scale-y-25 bg-gray-300 mr-2"></i>
        <div>
          <div
            class="text-sm w-12 leading-header text-center"
            @click="chart.chartEditable = true"
            >管理</div
          >
        </div>
      </template>
    </div>
    <mall-pull-refresh
      v-model="refresh.loading"
      @refresh="refresh.handle"
      class="flex-auto mb-2header"
    >
      <div class="flex-auto w-full" id="mall-chart-scroll">
        <div
          class="flex justify-center items-center chart-list"
          v-if="chart.list.length === 0"
        >
          <div class="flex flex-col items-center">
            <img src="@/assets/img/no-goods.png" class="w-28 h-28 mb-4" />
            <p>购物车空空如也，去逛逛吧~</p>
          </div>
        </div>
        <div class="flex flex-col chart-list" v-else>
          <div
            class="flex flex-col m-2 bg-white rounded-lg"
            v-for="(chart, i) in chart.list"
            :key="i"
          >
            <div class="flex pt-3 px-3 pb-1"
              ><div class="w-6 flex justify-center items-center mr-4"
                ><van-checkbox
                  v-model="chart.checkAll"
                  checked-color="#e4393c"
                ></van-checkbox></div
              ><div class="flex-auto flex items-center">
                <van-icon
                  name="shop"
                  color="#e4393c"
                  size="1.6rem"
                  class="mr-2" /><span class="text-sm font-bold">{{
                  chart.shopName
                }}</span
                ><van-icon name="arrow" /></div
              ><div v-if="chart.showCoupon" class="text-sm">领券</div></div
            >
            <template v-for="(good, key) in chart.goodsList" :key="key">
              <van-swipe-cell right-width="120">
                <div class="w-full px-3 py-2">
                  <div class="float-left w-34 flex mr-3">
                    <div class="w-6 flex justify-center items-center mr-4"
                      ><van-checkbox
                        v-model="good.checked"
                        checked-color="#e4393c"
                      ></van-checkbox
                    ></div>
                    <img :src="good.img" alt="" class="w-24 h-24 rounded-2xl" />
                  </div>
                  <div class="flex flex-col h-24 justify-between">
                    <div>
                      <p class="text-sm font-semibold van-ellipsis">{{
                        good.goodName
                      }}</p>
                      <div class="flex"
                        ><div
                          class="
                            pr-2.5
                            flex
                            items-center
                            text-sm text-gray-400
                            rounded
                            my-1
                            py-1
                            px-2
                            bg-gray-100
                            max-w-full
                          "
                          ><p class="flex-auto van-ellipsis">{{
                            good.goodType.map((i) => i.name).join(';')
                          }}</p>
                          <van-icon name="arrow-down" class="w-4 ml-1" /></div
                      ></div>
                    </div>

                    <div class="felx">
                      <mall-price :price="good.price" special></mall-price>
                      <van-stepper class="float-right" v-model="good.count" />
                    </div>
                  </div>
                </div>
                <template #right>
                  <van-button
                    class="h-full"
                    square
                    type="warning"
                    text="收藏"
                  />
                  <van-button class="h-full" square type="danger" text="删除" />
                </template>
              </van-swipe-cell>
            </template>
          </div>
        </div>
        <div class="flex flex-col">
          <mall-hr
            title="可能你还想要"
            background-color="rgba(243, 244, 246)"
          ></mall-hr>
          <mall-goods
            v-model:loading="list.loading"
            @load="list.load"
            :finished="list.finished"
            :list="list.data"
            :type="list.type"
            finished-text="到底了~~"
          ></mall-goods>
        </div>
      </div>
    </mall-pull-refresh>
    <van-popup v-model:show="chart.showAddressList" position="bottom" round>
      <mall-address-list></mall-address-list>
    </van-popup>
    <div
      class="
        absolute
        h-footer
        bottom-footer
        left-0
        h-14
        w-full
        bg-white
        opacity-95
        flex
        items-center
        z-10
      "
      v-if="chart.list.length > 0"
    >
      <mall-footer-bar
        :type="chart.chartEditable ? IType.EDIT : IType.BALANCE"
        :button-text="`去结算(${chart.count})件`"
        :price="chart.price"
        v-model="chart.checkAll"
      ></mall-footer-bar>
    </div>
    <mall-back-top right="30" bottom="130" target=".mall-chart"></mall-back-top>
    <mall-footer class="absolute left-0 bottom-0 right-0" />
  </div>
</template>

<script lang="ts">
  import { onActivated, reactive } from 'vue'
  import { GoodListItem, GoodType } from '@/components/business/Goods/type'
  import { IType } from '@/components/business/FooterBar/index.vue'
  import { Chart, getChart } from '@/http/Chart'
  import { getRecommendList } from '@/http/GoodList'
  import { HTTP_STATUS } from '@/http/config'
  import { parseAFew, parsePercentage } from '@/utils/format'
  import { $loading } from '@/utils/loading'
  export default {
    name: 'MallChart',
    setup() {
      //上拉刷新
      const refresh = reactive({
        loading: false,
        handle: () => {
          getChartList()
        }
      })

      //推荐商品列表
      const list = reactive({
        data: [] as GoodListItem[],
        loading: false,
        finished: false,
        type: GoodType.CARD,
        load: () => {
          getRecommend()
        }
      })

      //购物车
      const chart = reactive({
        chartEditable: false,
        showAddressList: false,
        list: [] as Chart[],
        checkAll: false,
        price: 0,
        count: 0
      })

      //获取购物车列表
      const getChartList = () => {
        return getChart().then((res) => {
          if (res.code === HTTP_STATUS.SUCCESS) {
            chart.list = res.data
          }
          refresh.loading = false
        })
      }

      //获取推荐商品列表
      const getRecommend = () => {
        getRecommendList().then((res) => {
          if (res.code === HTTP_STATUS.SUCCESS) {
            res.data.forEach((i) => {
              i.evaluation = parseAFew(i.evaluation)
              i.highPraise = parsePercentage(i.highPraise)
            })
            list.data.push(...res.data)
          }
          list.loading = false
          if (list.data.length >= 80) list.finished = true
        })
      }

      onActivated(async () => {
        const loading = $loading()
        await getChartList()
        loading.close()
      })
      return { refresh, list, GoodType, chart, IType }
    }
  }
</script>

<style lang="scss">
  .chart-list {
    min-height: 260px;
  }
</style>
