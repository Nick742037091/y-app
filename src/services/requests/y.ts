import { createInstance } from './base'

export const yApi = createInstance(
  'http://127.0.0.1:4523/m1/3795937-0-default',
  {
    // 默认手动启动
    manual: true,
    // 默认10s超时
    timeout: 10000
  }
)
