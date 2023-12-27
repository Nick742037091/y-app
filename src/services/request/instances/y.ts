import { createInstance } from '../base/index'

export const yApi = createInstance({
  baseUrl: 'https://mock.apifox.com/m1/3795937-0-default',
  options: {
    timeout: 10000 // 默认超时10s
  }
})
