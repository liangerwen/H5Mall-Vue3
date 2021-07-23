import { createApp, createVNode } from 'vue'
import MallLoading from '@/components/base/Loading/index.vue'
import { Loading } from 'vant'

let instance: null | HTMLElement

export function $loading() {
  if (instance) {
    instance.style.display = 'block'
  } else {
    const loading = createVNode(MallLoading)
    instance = document.createElement('div')
    instance.style.width = '100%'
    instance.style.height = '100%'
    instance.style.position = 'fixed'
    instance.style.left = '0'
    instance.style.top = '0'
    document.body.appendChild(instance)
    createApp(loading).use(Loading).mount(instance)
  }
  return {
    el: instance,
    close: () => {
      instance && (instance.style.display = 'none')
    }
  }
}
