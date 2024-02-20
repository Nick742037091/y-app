export type createPostParams = {
  content: string
  imgList?: string[]
  video?: string
  videoPoster?: string
  gifVideo?: string
  gifPoster?: string
  gifWidth?: number
  gifHeight?: number
}

export type PostItem = {
  id: number
  userName: string
  fullName: string
  avatar: string
  createTime: string
  content: string
  commentNum: number
  shareNum: number
  likeNum: number
  viewNum: number
  imgList: string[]
  video: string
  videoPoster: string
  gifVideo: string
  gifPoster: string
  gifWidth: number
  gifHeight: number
  isLiked: boolean
}

export type Publisher = {
  avatar: string
}

export interface Trending {
  /**
   * 关键字
   */
  keyword: string
  /**
   * 帖子数量
   */
  postNums: number
  /**
   * 来源
   */
  source: string
}
