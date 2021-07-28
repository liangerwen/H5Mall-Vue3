import Mock, { Random } from 'mockjs'
import config from '../config'
import { matchUrls, responseObj } from '../utils'

Mock.mock(
  matchUrls(config.base, '/api/chart'),
  'get',
  responseObj(
    Mock.mock({
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
  )
)
