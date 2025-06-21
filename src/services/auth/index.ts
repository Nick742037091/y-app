import { requestBaseUrl } from '@/utils/config'
import { yApi } from '../request/instances/y'
import { UserInfo } from '../app/types'
import { ProfileData } from './types'

export const register = (data: { userName: string; password: string }) => {
  return yApi.post<{ token: string; userInfo: UserInfo }>(
    '/user/register',
    data,
    {
      baseUrl: requestBaseUrl
    }
  )
}

export const login = (data: { userName: string; password: string }) => {
  return yApi.post<{ token: string; userInfo: UserInfo }>('/auth/login', data, {
    baseUrl: requestBaseUrl
  })
}

export const logout = (data?: {}) => {
  return yApi.post('/auth/logout', data, {
    baseUrl: requestBaseUrl
  })
}

export const getProfileData = () => {
  return yApi.get<ProfileData>(
    '/auth/getProfileData',
    {},
    {
      baseUrl: requestBaseUrl
    }
  )
}

export const updateProfile = (data: {
  userName: string
  description: string
}) => {
  return yApi.post('/auth/updateProfile', data, {
    baseUrl: requestBaseUrl
  })
}
