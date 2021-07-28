import { MallResopnse } from '../config'
import service from '../service'
import { Find, Hot } from './type'
import './mock'

export const getSearchInfo = () => {
  return service.get<void, MallResopnse<{ hot: Hot[]; find: Find[] }>>(
    'api/search'
  )
}
