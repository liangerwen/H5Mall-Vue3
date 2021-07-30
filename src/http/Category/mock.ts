import Mock, { Random } from 'mockjs'
import config from '../config'
import { matchUrls, responseObj } from '../utils'

Mock.mock(
  matchUrls(config.base, 'api/category'),
  'get',
  responseObj(
    Mock.mock({
      'data|20-25': [
        {
          title: '@ctitle(2,4)',
          'list|5-10': [
            {
              title: '@ctitle(4,5)',
              'list|10-20': [
                {
                  title: '@ctitle(4,5)',
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
          ]
        }
      ]
    })
  )
)
