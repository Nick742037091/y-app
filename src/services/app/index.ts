import { UserInfo } from './types'
import { yApi } from '../request/instances/y'

export const getUserInfo = () => {
  return yApi.get<UserInfo>('/userInfo')
}
