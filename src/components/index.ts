import { App } from '@vue/runtime-dom'

//基础组件
import Hr from './base/Hr/index.vue'
import Price from './base/Price/index.vue'
import Search from './base/Search/index.vue'
import BackTop from './base/BackTop/index.vue'
import Loading from './base/Loading/index.vue'
import PullRefresh from './base/PullRefresh/index.vue'

//业务组件
import Goods from './business/Goods/index.vue'
import Header from './business/Header/index.vue'
import Footer from './business//Footer/index.vue'
import FooterBar from './business//FooterBar/index.vue'
import AddressList from './business//AddressList/index.vue'
import { DefineComponent } from 'vue'

const components = {
  //基础组件
  Hr,
  Price,
  Search,
  BackTop,
  Loading,
  PullRefresh,
  //业务组件
  Goods,
  Header,
  Footer,
  FooterBar,
  AddressList
}

const install = (Vue: App): void => {
  Object.values(components).forEach((component) => {
    Vue.component(
      component.name,
      component as DefineComponent<
        Record<string, unknown>,
        Record<string, unknown>,
        any
      >
    )
  })
}

export default { install, ...components }
