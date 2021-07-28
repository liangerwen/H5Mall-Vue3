import { MallResopnse } from '../config'
import service from '../service'

interface ChartItem {
  goodName: string
  goodId: string
  goodType: Array<{
    id: string
    name: string
  }>
  img: string
  price: number
  count: number
}

export interface Chart {
  shopName: string
  shopId: string
  showCoupon: boolean
  goodsList: ChartItem[]
}

export const getChart = () => {
  return service.get<void, MallResopnse<Chart[]>>('api/chart')
}
