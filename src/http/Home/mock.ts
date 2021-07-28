import Mock, { Random } from 'mockjs'
import config from '../config'
import { matchUrls, responseObj } from '../utils'

Mock.mock(
  matchUrls(config.base, 'api/home/navImages'),
  'get',
  responseObj(
    Mock.mock({
      'data|5': [
        Random.image('800x400', Random.color(), '#FFF', 'png', '@ctitle(3,4)')
      ]
    })
  )
)

Mock.mock(
  matchUrls(config.base, 'api/home/seckill'),
  'get',
  responseObj(
    Mock.mock({
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
  )
)

Mock.mock(
  matchUrls(config.base, 'api/home/menu'),
  'get',
  responseObj(
    Mock.mock({
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
  )
)
