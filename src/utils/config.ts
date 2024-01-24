import { isDev, isH5 } from '.'

// h5本地开发使用代理basUrl
export const baseUrl =
  isH5 && isDev
    ? process.env.TARO_APP_PROXY_BASE_URL
    : process.env.TARO_APP_BASE_URL
