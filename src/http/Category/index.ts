import { MallResopnse } from '../config'
import service from '../service'
import { Category } from './type'
import './mock'

export const getCategory = () => {
  return service.get<void, MallResopnse<Category[]>>('api/category')
}
