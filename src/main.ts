import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import Mall from '@/components'

createApp(App).use(Vant).use(Mall).use(router).use(store).mount('#app')
