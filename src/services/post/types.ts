export interface createPostParams {
  content: string
  imgList?: string[]
  video?: string
  videoPoster?: string
  gifVideo?: string
  gifPoster?: string
  gifWidth?: number
  gifHeight?: number
}

export interface PostListItem {
  id: number
  user: {
    id: number
    userName: string
    fullName: string
    avatar: string
  }
  createTime: string
  content: string
  likeNum: number
  viewNum: number
  shareNum: number
  commentNum: number
  imgList: string[]
  isLiked: boolean
}

export interface ReplyTo {
  id: number
  user: {
    id: number
    userName: string
    fullName: string
    avatar: string
  }
}

export interface CommentChild {
  id: number
  content: string
  createTime: string
  imgList: string[]
  user: {
    id: number
    userName: string
    fullName: string
    avatar: string
  }
  replyTo: {
    id: number
    user: {
      id: number
      userName: string
      fullName: string
      avatar: string
    }
  }
  parentId: number
}

export interface CommentListItem {
  id: number
  content: string
  createTime: string
  imgList: string[]
  children: CommentChild[]
  user: {
    id: number
    userName: string
    fullName: string
    avatar: string
  }
}

export interface PostDetail {
  id: number
  user: {
    id: number
    userName: string
    fullName: string
    avatar: string
  }
  createTime: string
  content: string
  commentNum: number
  shareNum: number
  likeNum: number
  viewNum: number
  imgList: string[]
  isLiked: boolean
  postComments: CommentListItem[]
}

export interface Publisher {
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
