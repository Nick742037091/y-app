import Icon from '@/components/Icon'
import { useLoad } from '@tarojs/taro'
import { useMemo, useState } from 'react'
import { getPostDetail, likePost, viewPost } from '@/services/post'
import { useRequest } from 'taro-hooks'
import { ImgList } from '@/pages/index/components/PostMedia'
import dayjs from 'dayjs'
import PageRoot from '@/components/PageRoot'
import { useRouteParams } from '@/utils/hooks/page'

import { CommentListItem, PostDetail } from '@/services/post/types'
import { View, Text, Image } from '@tarojs/components'
import { LikeButton } from '@/pages/index/components/PostList'
import styles from './index.module.scss'

definePageConfig({
  navigationBarTitleText: '帖子'
})

const PostBottomButtons = (props: { post: PostDetail; onLike: () => void }) => {
  const { post } = props
  return (
    <View className="flex py-8 border-t-[1rpx]  border-b-[1rpx] border-[#eee] border-solid">
      <View className="flex-1 flex flex-center">
        <Icon name="post-comment" />
        <Text className="ml-4">{post.commentNum}</Text>
      </View>
      <View className="flex-1 flex flex-center">
        <Icon name="post-share" />
        <Text className="ml-4">{post.shareNum}</Text>
      </View>
      <LikeButton post={post} onClick={props.onLike} />
    </View>
  )
}

const CommentList = (props: { list: CommentListItem[] }) => {
  const { list } = props
  return (
    <View className="py-10">
      {list.map((item) => (
        <View key={item.id}>
          <View className="flex p-16">
            <Image
              src={item.user.avatar}
              className="size-36 rounded-full mr-12 bg-placeholder"
              preview="true"
              lazyLoad
            />
            <View className="flex-1">
              <View className="">{item.user.userName}</View>
              <View>
                {item.content}
                <Text className="text-gray ml-10">
                  {dayjs(item.createTime).format('MM-DD')}
                </Text>
                <Text className="text-[#777] ml-10">回复</Text>
              </View>
              <View className="w-[150px]">
                <ImgList list={item.imgList} />
              </View>
              <CommentChild commentId={item.id} list={item.children} />
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

const CommentChild = (props: {
  commentId: number
  list: CommentListItem['children']
}) => {
  const { commentId, list } = props
  const [isExpand, setIsExpand] = useState(false)
  const showList = isExpand ? list : list.slice(0, 1)
  return (
    <View>
      <View className="flex flex-col">
        {showList.map((child) => {
          const replyToUser = child.replyTo.user
          const replyUserName =
            child.replyTo.id == commentId ? '' : replyToUser.userName
          return (
            <View key={child.id}>
              <View className="flex p-12">
                <Image
                  src={child.user.avatar}
                  className="size-24 rounded-full mr-12 bg-placeholder"
                  preview="true"
                  lazyLoad
                />
                <View className="flex-1">
                  <View className="text-gray">{child.user.userName}</View>
                  <View className="flex">
                    {replyUserName && (
                      <Text className="mr-4">
                        回复<Text className="text-gray">{replyUserName}</Text>:
                      </Text>
                    )}
                    {child.content}
                    <Text className="text-gray ml-10">
                      {dayjs(child.createTime).format('MM-DD')}
                    </Text>
                    <Text className="text-[#777] ml-10">回复</Text>
                  </View>
                  <View className="w-[100px]">
                    <ImgList list={child.imgList} />
                  </View>
                </View>
              </View>
            </View>
          )
        })}
      </View>
      {list.length > 1 && !isExpand && (
        <View className="pl-[12px] ">
          <View className="flex items-center" onClick={() => setIsExpand(true)}>
            <View className="w-20 h-1 bg-[#ccc] ml-2 mr-6 !text-[10px]" />
            展开{list.length - 1}条回复
          </View>
        </View>
      )}
    </View>
  )
}

export default function Index() {
  const [postId] = useState<number>(+useRouteParams('postId'))
  const { data: postDetail, run } = useRequest(
    async () => {
      if (!postId) return null
      const result = await getPostDetail(postId)
      return result.data
    },
    { refreshDeps: [postId] }
  )

  useLoad((options) => {
    viewPost({ postId: options.postId })
  })
  const timeStr = useMemo(() => {
    if (!postDetail) return ''
    const createTime = dayjs(postDetail.createTime)
    const pre = createTime.format('a') === 'am' ? '上午' : '下午'
    return pre + createTime.format('hh:mm · YYYY年MM月DD日')
  }, [postDetail])

  const handleLike = async () => {
    if (!postDetail) return
    const { code } = await likePost({
      postId: postDetail.id,
      status: !postDetail.isLiked
    })
    if (code !== 0) return
    run()
  }
  if (!postDetail) return null
  return (
    <PageRoot>
      <View className={styles.post_item}>
        <Image
          src={postDetail.user.avatar}
          className="size-40 rounded-full mr-12 bg-placeholder"
          preview="true"
          lazyLoad
        />
        <View className="flex-1 flex flex-col">
          <View>
            <Text className="font-bold">{postDetail.user.userName}</Text>
          </View>
          <View>
            <Text className="text-gray">@{postDetail.user.fullName}</Text>
          </View>
          <Text>{postDetail.content}</Text>
          <ImgList list={postDetail.imgList} />
          <View className="mt-10 text-gray">
            {timeStr} ·{' '}
            <Text className="text-black-primary font-bold">
              {postDetail.viewNum}
            </Text>
            查看
          </View>
        </View>
      </View>
      <PostBottomButtons post={postDetail} onLike={handleLike} />
      <CommentList list={postDetail.postComments} />
    </PageRoot>
  )
}
