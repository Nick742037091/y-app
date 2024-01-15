import { getStorageSync, setStorageSync, removeStorageSync } from '@tarojs/taro'

const STORAGE_KEY_PERP = 'y_'

// 定义持久化storage操作
const persistLocalStorage = {
  getItem: getStorageSync,
  setItem: setStorageSync,
  removeItem: removeStorageSync
}

export const createPersistOptions = (name: string) => {
  return {
    name: STORAGE_KEY_PERP + name,
    storage: persistLocalStorage
  }
}
