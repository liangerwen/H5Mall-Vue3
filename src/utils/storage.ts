enum LocalStorageKey {
  SEARCH_HISTORY = 'MALL_SEARCH_HISTORY',
  AUTH_TOKEN = 'AUTH_TOKEN'
}

const getLocalStore = (key: LocalStorageKey) => localStorage.getItem(key)
const setLocalStore = (key: LocalStorageKey, value: string) =>
  localStorage.setItem(key, value)

//获取搜索历史
export function getSearchHistory(): string[] {
  return JSON.parse(
    getLocalStore(LocalStorageKey.SEARCH_HISTORY) || JSON.stringify([])
  )
}

//新增搜索历史
export function addSearchHistory(val: string) {
  setLocalStore(
    LocalStorageKey.SEARCH_HISTORY,
    JSON.stringify([val].concat(getSearchHistory()))
  )
}

//删除所有搜索历史
export function delAllSearchHistory() {
  setLocalStore(LocalStorageKey.SEARCH_HISTORY, JSON.stringify([]))
}

//获取token
export function getToken() {
  return getLocalStore(LocalStorageKey.AUTH_TOKEN) || ''
}
