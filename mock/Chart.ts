import Mock, { Random } from 'mockjs'
import { delayResponse } from './utils'

let data = Mock.mock({
  'data|2-4': [
    {
      shopName: '@ctitle(4,10)',
      shopId: Random.guid(),
      showCoupon: Random.boolean(),
      'goodsList|2-4': [
        {
          goodName: '@ctitle(4,10)',
          goodId: Random.guid(),
          'goodType|2-4': [
            {
              id: Random.guid(),
              name: '@ctitle(4,6)'
            }
          ],
          img: Random.image(
            '100x100',
            Random.color(),
            '#FFF',
            'png',
            '@ctitle(3,4)'
          ),
          price: Random.integer(99, 1000000),
          count: Random.integer(1, 99)
        }
      ]
    }
  ]
})

export default [
  {
    url: '/api/chart',
    method: 'get',
    rawResponse: delayResponse(data.data)
  }
]
