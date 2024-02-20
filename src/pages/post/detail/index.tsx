import { Image, Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useMemo, useState } from 'react'
import { getPostDetail, viewPost } from '@/services/post'
import { useRequest } from 'taro-hooks'
import PostMedia from '@/pages/index/components/PostMedia'
import dayjs from 'dayjs'
import PageRoot from '@/components/PageRoot'

import styles from './index.module.scss'

definePageConfig({
  navigationBarTitleText: '帖子'
})

export default function Index() {
  const [postId, setPostId] = useState<number>()
  const { data: postDetail, loading } = useRequest(
    async () => {
      if (!postId) return null
      const result = await getPostDetail(postId)
      return result.data
    },
    { refreshDeps: [postId] }
  )

  useLoad((options) => {
    setPostId(options.postId)
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
      <View className={styles.post_item}>
        <Image
          src={postDetail.avatar}
          className="size-40 rounded-full mr-12 bg-placeholder"
          preview="true"
          lazyLoad
        />
        <View className="flex-1 flex flex-col">
          <View>
            <Text className="font-bold">{postDetail.userName}</Text>
          </View>
          <View>
            <Text className="text-gray">@{postDetail.fullName}</Text>
          </View>
          <Text>{postDetail.content}</Text>
          <PostMedia post={postDetail} />
          <View className="mt-10 text-gray">
            {timeStr} ·{' '}
            <Text className="text-black-primary font-bold">
              {postDetail.viewNum}
            </Text>{' '}
            查看
          </View>
        </View>
      </View>
    </PageRoot>
  )
}
