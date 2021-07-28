import { MallResopnse } from '../config'
import service from '../service'
import { Chart } from './type'
import './mock'

export const getChart = () => {
  return service.get<void, MallResopnse<Chart[]>>('api/chart')
}
