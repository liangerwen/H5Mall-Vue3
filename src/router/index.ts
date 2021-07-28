import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home/index.vue'
import Category from '@/pages/Category/index.vue'
import Message from '@/pages/Message/index.vue'
import Chart from '@/pages/Chart/index.vue'
import Me from '@/pages/Me/index.vue'
import Search from '@/pages/Search/index.vue'

export default createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login/index.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/Register/index.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
