import { ListData } from '@/services/requests/types'
import { yApi } from '@/services/requests/y'
import { PostItem } from './types'

export const getPostList = (data: {
  pageNum: number
  pageSzie: number
  type: number
}) => {
  return yApi.get<ListData<PostItem>>('/post/list', data)
}
