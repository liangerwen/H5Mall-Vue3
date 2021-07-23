import Mock, { Random } from 'mockjs'
import { delayResponse } from './utils'

let nav = Mock.mock({
  'data|5': [
    Random.image('800x400', Random.color(), '#FFF', 'png', '@ctitle(3,4)')
  ]
})

let seckills = Mock.mock({
  data: {
    'goodList|5': [
      {
        img: Random.image(
          '100x100',
          Random.color(),
          '#FFF',
          'png',
          '@ctitle(3,4)'
        ),
        price: 99900,
        realPrice: 129900
      }
    ],
    time: Random.integer(1, 3600 * 24)
  }
})

let menu = Mock.mock({
  'data|20': [
    {
      icon: Random.image(
        '100x100',
        Random.color(),
        '#FFF',
        'png',
        '@ctitle(2,4)'
      ),
      title: '@ctitle(2,4)',
      url: Random.image(
        '100x100',
        Random.color(),
        '#FFF',
        'png',
        '@ctitle(2,4)'
      )
    }
  ]
})

export default [
  {
    url: '/api/home/navImages',
    method: 'get',
    rawResponse: delayResponse(nav.data)
  },
  {
    url: '/api/home/seckill',
    method: 'get',
    rawResponse: delayResponse(seckills.data)
  },
  {
    url: '/api/home/menu',
    method: 'get',
    rawResponse: delayResponse(menu.data)
  }
]
