export const h5RoutBaseName = '/y-app'

// h5本地开发使用代理basUrl
export const requestBaseUrl =
  process.env.TARO_ENV === 'h5' && process.env.TARO_APP_ENV === 'dev'
    ? process.env.TARO_APP_PROXY_BASE_URL
    : process.env.TARO_APP_BASE_URL
