import { requestBaseUrl } from '@/utils/config'
import { UserInfo } from './types'
import { yApi } from '../request/instances/y'

export const getUserInfo = () => {
  return yApi.get<UserInfo>(
    '/auth/getUserInfo',
    {},
    { baseUrl: requestBaseUrl }
  )
}

export const uploadFile = (filePath: string, type?: string, path?: string) => {
  return yApi.uploadFile<string>(
    '/upload/file',
    filePath,
    'file',
    { type, path },
    {
      baseUrl: requestBaseUrl
    }
  )
}
