import { yApi } from '../request/instances/y'
import { UserInfo } from '../app/types'
import { ProfileData } from './types'

export const register = (data: { userName: string; password: string }) => {
  return yApi.post<{ token: string; userInfo: UserInfo }>(
    '/user/register',
    data
  )
}

export const login = (data: { userName: string; password: string }) => {
  return yApi.post<{ token: string; userInfo: UserInfo }>('/auth/login', data)
}

export const logout = (data?: {}) => {
  return yApi.post('/auth/logout', data)
}

export const getProfileData = () => {
  return yApi.get<ProfileData>('/auth/getProfileData')
}

export const updateProfile = (data: {
  userName: string
  description: string
  profileBanner?: string
  avatar?: string
}) => {
  return yApi.post('/auth/updateProfile', data)
}
