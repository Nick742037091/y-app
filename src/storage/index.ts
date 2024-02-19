import Taro, {
  getStorageSync,
  setStorageSync,
  removeStorageSync
} from '@tarojs/taro'

const STORAGE_PERP = 'y'

const createStorageKey = (key: string) => {
  return [STORAGE_PERP, process.env.TARO_APP_ENV, key].join('_')
}

// 定义持久化storage操作
const persistLocalStorage = {
  getItem: getStorageSync,
  setItem: setStorageSync,
  removeItem: removeStorageSync
}

/**
 * 创建zustand持久化的store配置
 * @param name
 * @returns
 */
export const createStorePersistOptions = (name: string) => {
  return {
    name: createStorageKey(name),
    storage: persistLocalStorage
  }
}

export const tokenKey = createStorageKey('token')

export const setToken = (token: string) => {
  Taro.setStorageSync(tokenKey, token)
}

export const getToken = () => {
  return Taro.getStorageSync(tokenKey)
}

export const clearToken = () => {
  Taro.removeStorageSync(tokenKey)
}
