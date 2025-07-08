import { useLoad } from '@tarojs/taro'
import { useMemo, useState } from 'react'
import { getPostDetail, viewPost } from '@/services/post'
import { CommentListItem } from '@/services/post/types'
import { useRequest } from 'taro-hooks'
import { ImgList } from '@/pages/index/components/PostMedia'
import dayjs from 'dayjs'
import PageRoot from '@/components/PageRoot'
import { useRouteParams } from '@/utils/hooks/page'

import { View, Text, Image } from '@tarojs/components'
import { SubmitBar } from './components/SubmitBar'

definePageConfig({
  navigationBarTitleText: '帖子'
})

export interface ReplyTo {
  id: number
  parentId: number | null
  userName: string
  content: string
}

const CommentList = (props: {
  list: CommentListItem[]
  reply: (replyTo: ReplyTo) => void
}) => {
  const { list, reply } = props
  const handleReply = (item: CommentListItem) => {
    reply({
      id: item.id,
      parentId: item.id,
      userName: item.user.userName,
      content: item.content
    })
  }
  return (
    <View className="py-10">
      {list.map((item) => (
        <View key={item.id}>
          <View className="flex px-16 py-6">
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
                <Text
                  className="text-[#777] ml-10"
                  onClick={() => handleReply(item)}
                >
                  回复
                </Text>
              </View>
              <View className="w-[150px] mb-4">
                <ImgList list={item.imgList} />
              </View>
              <CommentChild
                commentId={item.id}
                list={item.children}
                reply={reply}
              />
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
  reply: (replyTo: ReplyTo) => void
}) => {
  const { commentId, list, reply } = props
  const [isExpand, setIsExpand] = useState(false)
  const showList = isExpand ? list : list.slice(0, 1)
  const handleReply = (item: CommentListItem['children'][0]) => {
    reply({
      id: item.id,
      parentId: commentId,
      userName: item.user.userName,
      content: item.content
    })
  }
  return (
    <View>
      <View className="flex flex-col">
        {showList.map((child) => {
          const replyToUser = child.replyTo.user
          const replyUserName =
            child.replyTo.id == commentId ? '' : replyToUser.userName
          return (
            <View key={child.id}>
              <View className="flex px-8 py-6">
                <Image
                  src={child.user.avatar}
                  className="size-24 rounded-full mr-12 bg-placeholder"
                  preview="true"
                  lazyLoad
                />
                <View className="flex-1">
                  <View className="text-gray">{child.user.userName}</View>
                  <View className="flex flex-wrap break-all">
                    {replyUserName && (
                      <Text className="mr-4">
                        回复<Text className="text-gray">{replyUserName}</Text>:
                      </Text>
                    )}
                    <Text className="mr-10">{child.content}</Text>
                    <Text className="text-gray">
                      {dayjs(child.createTime).format('MM-DD')}
                    </Text>
                    <Text
                      className="text-[#777] ml-10"
                      onClick={() => handleReply(child)}
                    >
                      回复
                    </Text>
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
  const [replyTo, setReplyTo] = useState<ReplyTo>()
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

  if (!postDetail) return null
  return (
    <PageRoot>
      <View className="h-[100vh] flex flex-col">
        <View className="flex-1 flex flex-col overflow-auto">
          <View className="flex text-[15px] pt-20 pb-8 px-16 border-b-[1rpx] border-[#eee] border-solid">
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
                <Text className="text-black-primary font-bold mr-4">
                  {postDetail.viewNum}
                </Text>
                查看
              </View>
            </View>
          </View>
          <CommentList list={postDetail.postComments} reply={setReplyTo} />
        </View>
        <SubmitBar
          replyTo={replyTo}
          post={postDetail}
          updateDetail={run}
          cleareReply={() => setReplyTo(undefined)}
        />
      </View>
    </PageRoot>
  )
}
