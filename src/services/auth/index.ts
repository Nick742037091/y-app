import { yApi } from '../request/instances/y'

export const login = (data: { userName: string; password: string }) => {
  return yApi.post<{ token: string }>('/auth/login', data, {
    baseUrl: process.env.TARO_APP_API_HOST
  })
}

export const logout = (data?: {}) => {
  return yApi.post('/auth/logout', data, {
    baseUrl: process.env.TARO_APP_API_HOST
  })
}
