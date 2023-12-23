import { createInstance } from './base'

export const yApi = createInstance({
  baseUrl: 'http://127.0.0.1:4523/m1/3795937-0-default',
  options: {
    timeout: 10000 // 默认超时10s
  }
})
