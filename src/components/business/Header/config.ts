export const actions = [
  { text: '首页', icon: 'wap-home-o', url: '/home' },
  { text: '分类搜索', icon: 'search', url: '/category' },
  { text: '消息', icon: 'comment-o', url: '/message' },
  { text: '购物车', icon: 'shopping-cart-o', url: '/chart' },
  { text: '我的', icon: 'contact', url: '/me' },
  { text: '浏览记录', icon: 'clock-o', url: '/me/cookies' }
]

export interface IAction {
  text: string
  icon: string
  url: string
}
