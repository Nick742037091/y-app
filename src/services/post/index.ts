import { ListData } from '@/services/request/base/types'
import { yApi } from '@/services/request/instances/y'
import { PostItem } from './types'

export const getPostList = (data: {
  pageNum: number
  pageSzie: number
  type: number
}) => {
  return yApi.get<ListData<PostItem>>('/post/list', data)
}
