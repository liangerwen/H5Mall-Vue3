import Mock, { Random } from 'mockjs'
import config from '../config'
import { matchUrls, responseObj } from '../utils'

Mock.mock(
  matchUrls(config.base, 'api/recommend'),
  'get',
  responseObj(
    Mock.mock({
      'data|8-12': [
        {
          title: '@ctitle(10,20)',
          tag: '@ctitle(0,5)',
          img: Random.image(
            '100x100',
            Random.color(),
            '#FFF',
            'png',
            '@ctitle(3,4)'
          ),
          'traits|0-3': ['@ctitle(2,3)'],
          shops: '@ctitle(1,20)',
          price: Random.integer(99, 1000000),
          evaluation: Random.integer(100, 5000000),
          highPraise: Random.float(0.01, 1)
        }
      ]
    })
  )
)
