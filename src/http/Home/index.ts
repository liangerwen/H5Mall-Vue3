import { MallResopnse } from '../config'
import service from '../service'

export interface Seckill {
  goodList: Array<{
    price: number
    realPrice: number
    img: string
  }>
  time: number
}

export interface Menu {
  icon: string
  title: string
  url: string
}

export const getNavImages = () => {
  return service.get<void, MallResopnse<string[]>>('api/home/navImages')
}

export const getSeckill = () => {
  return service.get<void, MallResopnse<Seckill>>('api/home/seckill')
}

export const getMenuInfo = () => {
  return service.get<void, MallResopnse<Menu[]>>('api/home/menu')
}
