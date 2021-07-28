import { MallResopnse } from '../config'
import service from '../service'
import './mock'
import { Menu, Seckill } from './type'

export const getNavImages = () => {
  return service.get<void, MallResopnse<string[]>>('api/home/navImages')
}

export const getSeckill = () => {
  return service.get<void, MallResopnse<Seckill>>('api/home/seckill')
}

export const getMenuInfo = () => {
  return service.get<void, MallResopnse<Menu[]>>('api/home/menu')
}
