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
  id: string
  nickName: string
  fullname: string
  avatar: string
  createTime: string
  content: string
  commentNum: number
  shareNum: number
  favoriteNum: number
  viewNum: number
  imgList: string[]
  video: string
  videoPoster: string
  gifVideo: string
  gifPoster: string
  gifWidth: number
  gifHeight: number
  isFavorited: boolean
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
