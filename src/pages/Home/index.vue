<template>
  <div class="mall-container mall-bg mall-home">
    <div class="mall-home_nav">
      <van-sticky @change="search.setBgColor"
        ><mall-search
          :background="search.isFixed ? '#e43130' : 'transparent'"
          @focus="search.handle"
        />
      </van-sticky>

      <div class="flex items-center justify-center">
        <van-swipe class="w-full" :autoplay="4000" :duration="300">
          <van-swipe-item class="px-4" v-for="(item, i) in swiper" :key="i">
            <img :src="item" alt="" class="w-full rounded-lg"
          /></van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div
      class="flex items-center justify-center px-4 mt-3"
      v-if="menuList.length"
    >
      <div class="w-full bg-white rounded-xl">
        <van-swipe class="w-full" :loop="false">
          <van-swipe-item v-for="(item, i) in menuList" :key="i">
            <div class="flex flex-wrap pt-2 pb-5">
              <a
                v-for="(nav, key) in item"
                :key="key"
                :href="nav.url"
                class="flex flex-col items-center w-1/5 py-1 text-center"
              >
                <img :src="nav.icon" alt="" class="w-3/5" />
                <span class="mt-1 text-sm">{{ nav.title }}</span>
              </a>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="flex px-4 mt-3" v-if="seckill.info.time">
      <div class="w-full p-2 bg-white rounded-xl">
        <div class="flex items-center w-full">
          <van-icon name="clock-o" class="mr-3 text-xl animate-shak"></van-icon>
          <p class="mr-2 text-sm font-medium">限时秒杀</p>
          <div class="seckill-time">{{ hours }}</div>
          <span class="seckill-colon">:</span>
          <div class="seckill-time">{{ minutes }}</div>
          <span class="seckill-colon">:</span>
          <div class="seckill-time">{{ seconds }}</div>
        </div>
        <div class="flex items-center w-full mt-2">
          <div
            class="flex-auto w-1/5 px-2"
            v-for="(item, i) in seckill.info.goodList"
            :key="i"
          >
            <img :src="item.img" class="w-full" />
            <p class="flex flex-col items-center mt-2"
              ><mall-price
                :special="false"
                :price="item.price"
                lessdot
                class="text-xs font-semibold leading-3"
              ></mall-price>
              <mall-price
                :special="false"
                :price="item.realPrice"
                old
                lessdot
                class="mt-1 text-xs leading-3"
              ></mall-price
            ></p>
          </div>
        </div>
      </div>
    </div>

    <mall-goods
      class="mt-2 mb-footer"
      v-model:loading="list.loading"
      @load="list.load"
      :finished="list.finished"
      :list="list.data"
      :type="GoodType.CARD"
      finished-text="到底了~~"
    ></mall-goods>
    <mall-back-top right="30" bottom="80" target=".mall-home"></mall-back-top>
    <mall-footer />
  </div>
</template>

<script lang="ts">
  import { ref, reactive, onActivated, computed, onDeactivated } from 'vue'
  import { GoodListItem, GoodType } from '../../components/business/Goods/type'
  import { useRouter } from 'vue-router'
  import { getNavImages, getSeckill, getMenuInfo } from '@/http/Home'
  import { HTTP_STATUS } from '@/http/config'
  import { getRecommendList } from '@/http/GoodList'
  import { parseTimeBucket, parsePercentage, parseAFew } from '@/utils/format'
  import { $loading } from '@/utils/loading'
  import { Menu, Seckill } from '@/http/Home/type'
  export default {
    name: 'MallHome',
    setup() {
      const router = useRouter()
      //搜索
      const search = reactive({
        handle: () => {
          router.push('/search')
        },
        isFixed: false,
        setBgColor: (isFixed: boolean) => {
          search.isFixed = isFixed
        }
      })
      //轮播图
      const swiper = ref([] as string[])
      //获取轮播图图片
      const getNavImgs = () => {
        return getNavImages().then((res) => {
          if (res.code === HTTP_STATUS.SUCCESS) {
            swiper.value = res.data
          }
        })
      }

      //菜单
      const menuList = ref([] as Menu[][])
      //获取菜单信息
      const getMenuList = () => {
        return getMenuInfo().then((res) => {
          if (res.code === HTTP_STATUS.SUCCESS) {
            menuList.value = []
            const _num = parseInt((res.data.length / 10).toString())
            const num = res.data.length % 10 === 0 ? _num : _num + 1
            for (let i = 0; i < num; i++) {
              menuList.value.push(res.data.slice(i * 10, i * 10 + 10))
            }
          }
        })
      }

      //限时秒杀秒杀
      const seckill = reactive({
        timer: -1,
        info: {
          time: 0,
          goodList: []
        } as Seckill
      })
      const hours = computed(() => parseTimeBucket(seckill.info.time).hours)
      const minutes = computed(() => parseTimeBucket(seckill.info.time).minutes)
      const seconds = computed(() => parseTimeBucket(seckill.info.time).seconds)
      //获取限时秒杀数据
      const getSeckillInfo = () => {
        getSeckill().then((res) => {
          if (res.code === HTTP_STATUS.SUCCESS) {
            seckill.info = res.data
          }
        })
      }
      //限时秒杀读秒
      onActivated(() => {
        seckill.timer = setInterval(() => {
          seckill.info.time--
        }, 1000)
      })
      //取消定时器与监听
      onDeactivated(() => {
        clearInterval(seckill.timer)
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
      //获取推荐商品列表
      const getRecommend = () => {
        return getRecommendList().then((res) => {
          if (res.code === HTTP_STATUS.SUCCESS) {
            res.data.forEach((i) => {
              i.evaluation = parseAFew(i.evaluation)
              i.highPraise = parsePercentage(i.highPraise)
            })
            list.data.push(...res.data)
          }
          list.loading = false
        })
      }

      //请求数据
      onActivated(async () => {
        const loading = $loading()
        await getNavImgs()
        await getMenuList()
        await getSeckillInfo()
        loading.close()
      })

      return {
        search,
        swiper,
        seckill,
        menuList,
        list,
        GoodType,
        hours,
        minutes,
        seconds
      }
    }
  }
</script>

<style lang="scss">
  .mall-home_nav {
    background: url(@/assets/img/nav_bg.jpg) no-repeat;
    background-size: 100% auto;
  }
  .seckill-time {
    width: 1rem;
    color: #fff;
    background-image: -webkit-linear-gradient(230deg, #ff6152, #fa2c19);
    background-image: linear-gradient(-140deg, #ff6152, #fa2c19);
    background-color: #fa2c19;
    border-radius: 0.2rem;
    text-align: center;
    font-weight: 400;
    font-size: 0.75rem;
    margin: 0 0.1rem;
  }
  .seckill-colon {
    color: #fa2c19;
  }
</style>
