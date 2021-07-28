import { HTTP_STATUS, MallResopnse } from './config'

export function responseObj<T = any>(mock: { data: T }): MallResopnse<T> {
  return {
    code: HTTP_STATUS.SUCCESS,
    msg: 'SUCCESS',
    data: mock.data
  }
}

export function matchUrls(...urls: string[]) {
  return urls.reduce((pre, cur) => {
    const u = cur.startsWith('/') ? cur.slice(1) : cur
    const uu = u.endsWith('/') ? u.slice(0, u.length - 1) : u
    return pre + (pre.length ? (uu.length ? '/' + uu : '') : uu)
  }, '')
}
