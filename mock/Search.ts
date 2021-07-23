import Mock, { Random } from 'mockjs'
import { delayResponse } from './utils'

let find = Mock.mock({
  'data|8-12': [
    {
      id: Mock.Random.id(),
      title: '@ctitle(5,20)'
    }
  ]
})

let hot = Mock.mock({
  'data|8-12': [
    {
      id: Mock.Random.id(),
      title: '@ctitle(5,20)',
      hotValue: Random.integer(1000, 10000),
      img: Random.image(
        '100x100',
        Random.color(),
        '#FFF',
        'png',
        '@ctitle(3,4)'
      )
    }
  ]
})

export default [
  {
    url: '/api/search',
    method: 'get',
    rawResponse: delayResponse({ hot: hot.data, find: find.data })
  }
]
