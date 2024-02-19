import { useAppStore } from '@/stores/app'
import { getToken } from '@/utils/storage'
import { isSuccessCode } from '@/utils/index'
import { createInstance } from '../base/index'

export const yApi = createInstance({
  baseUrl: 'https://mock.apifox.com/m1/3795937-0-default',
  options: {
    timeout: 10000 // 默认超时10s
  },
  requestInterceptor: (options, url) => {
    const token = getToken()
    if (token) {
      options.header = options.header || {}
      options.header.Authorization = `Bearer ${token}`
    }
    return options
  },
  success: (result, resolve, reject) => {
    if (isSuccessCode(result.statusCode)) {
      resolve(result.data)
    } else if (result.statusCode === 401) {
      // 无token或token失效
      useAppStore.getState().clearToken()
      useAppStore.getState().navigateToLogin()
      resolve(result.data)
    } else {
      reject(result)
    }
  }
})
