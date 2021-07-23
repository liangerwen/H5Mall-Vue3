import { MallResopnse } from '../config'
import service from '../service'

interface CategoryItem {
  title: string
  list: Array<{ title: string; img: string }>
}

export interface Category {
  title: string
  list: CategoryItem[]
}

export const getCategory = () => {
  return service.get<void, MallResopnse<Category[]>>('api/category')
}
