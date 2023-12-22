import { yApi } from '@/services/requests/y'
import { PostItem } from './types'

export const useGetPostList = () => {
  return yApi.useGet<PostItem>(
    '/post/list',
    {},
    { manual: false, paginated: true }
  )
}
