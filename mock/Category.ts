import Mock, { Random } from 'mockjs'
import { delayResponse } from './utils'
let data = Mock.mock({
  'data|10-20': [
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

export default [
  {
    url: '/api/category',
    method: 'get',
    rawResponse: delayResponse(data.data)
  }
]
