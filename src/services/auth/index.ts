import { requestBaseUrl } from '@/utils/config'
import { yApi } from '../request/instances/y'

export const login = (data: { userName: string; password: string }) => {
  return yApi.post<{ token: string }>('/auth/login', data, {
    baseUrl: requestBaseUrl
  })
}

export const logout = (data?: {}) => {
  return yApi.post('/auth/logout', data, {
    baseUrl: requestBaseUrl
  })
}
