import { GoodListItem } from '@/components/business/Goods/type'
import { MallResopnse } from '../config'
import service from '../service'
import './mock'

export const getRecommendList = () => {
  return service.get<void, MallResopnse<GoodListItem[]>>('api/recommend')
}
