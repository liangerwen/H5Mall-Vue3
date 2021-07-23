import { MallResopnse } from '../config'
import service from '../service'

export interface Hot {
  id: string
  title: string
  img: string
  hotValue: number
}

export interface Find {
  id: string
  title: string
}

export const getSearchInfo = () => {
  return service.get<void, MallResopnse<{ hot: Hot[]; find: Find[] }>>(
    'api/search'
  )
}
