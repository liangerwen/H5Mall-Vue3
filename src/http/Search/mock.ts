import Mock, { Random } from 'mockjs'
import config from '../config'
import { matchUrls, responseObj } from '../utils'

Mock.mock(
  matchUrls(config.base, 'api/search'),
  'get',
  responseObj(
    Mock.mock({
      data: {
        'find|8-12': [
          {
            id: Mock.Random.id(),
            title: '@ctitle(5,20)'
          }
        ],
        'hot|8-12': [
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
      }
    })
  )
)
