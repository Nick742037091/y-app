import { ListData } from '@/services/request/base/types'
import { yApi } from '@/services/request/instances/y'
import { createPostParams, PostItem, Publisher, Trending } from './types'

/** 发布帖子 */
export const addPost = (data: createPostParams) => {
  return yApi.post<PostItem>('/post', data)
}

/** 帖子点赞 */
export const likePost = (data: { postId: number; status: boolean }) => {
  return yApi.post('/post/like', data)
}

/** 浏览帖子 */
export const viewPost = (data: { postId: number }) => {
  return yApi.post('/post/view', data)
}

/**
 * 获取帖子列表
 * @param data
 */
export const getPostList = (data: {
  pageNum: number
  pageSize: number
  type: number
}) => {
  return yApi.get<ListData<PostItem>>('/post/list', data)
}

/**
 * 获取帖子详情
 * @param data
 */
export const getPostDetail = (postId: number) => {
  return yApi.get<PostItem>(`/post/${postId}`)
}

export const getNewPosterList = () => {
  return yApi.get<Publisher[]>('/post/getNewPosterList')
}

export const getTrendingList = (data: { type: number }) => {
  return yApi.get<Trending[]>('/trending/list', data)
}
