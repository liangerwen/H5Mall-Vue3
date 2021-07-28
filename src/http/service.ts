import { getToken } from '@/utils/storage'
import axios from 'axios'
import config from './config'
import Mock from 'mockjs'

Mock.setup({ timeout: 1000 })

const service = axios.create({
  baseURL: config.base,
  timeout: 30000
})

service.interceptors.request.use(
  (config) => {
    getToken() && (config.headers.Authorization = getToken())
    return config
  },
  (err) => Promise.reject(err)
)

service.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line
      console.log(`err${err}`)
    }
    return Promise.reject(err)
  }
)

export default service
