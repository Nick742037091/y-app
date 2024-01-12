import { ListData } from '@/services/request/base/types'
import { yApi } from '@/services/request/instances/y'
import { PostItem, Publisher } from './types'

export const getPostList = (data: {
  pageNum: number
  pageSzie: number
  type: number
}) => {
  return yApi.get<ListData<PostItem>>('/post/list', data)
}

export const getRecentPublisherList = () => {
  return yApi.get<Publisher[]>('/post/recentPublisherList')
}
