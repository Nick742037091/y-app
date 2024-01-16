import { ListData } from '@/services/request/base/types'
import { yApi } from '@/services/request/instances/y'
import { PostItem, Publisher, Trending } from './types'

export const getPostList = (data: {
  pageNum: number
  pageSzie: number
  type: number
}) => {
  return yApi.get<ListData<PostItem>>('/post/list', data)
}

export const getNewPosterList = () => {
  return yApi.get<Publisher[]>('/post/getNewPosterList')
}

export const getTrendingList = (data: { type: number }) => {
  return yApi.get<Trending[]>('/trending/list', data)
}
