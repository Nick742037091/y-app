import { View } from '@tarojs/components'
import { getPostList, likePost } from '@/services/post'
import { useHomeStore } from '@/stores/home'
import { useInfiniteScroll } from '@/services/request/hooks'
import { Skeleton } from '@nutui/nutui-react-taro'
import Mine from '@/components/Mine'
import Taro, { useTabItemTap } from '@tarojs/taro'
import AddPostButton from '@/components/AddPostButton'
import PageRoot from '@/components/PageRoot'
import { useEffect } from 'react'
import { postEvents } from '@/events/index'
import TabBar from '@/components/Tabbar'
import NavigationBar from './components/NavigationBar'
import { PostList } from './components/PostList'
import PageInfiniteScroll from '../../components/PageInfiniteScroll'
import postListStyles from './components/PostList/index.module.scss'

const PAGE_PATH = 'pages/index/index'

definePageConfig({
  navigationBarTitleText: '首页',
  navigationStyle: 'custom',
  onReachBottomDistance: 50
})

const SkeletonList = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <View key={index} className={postListStyles.post_item}>
            <Skeleton rows={3} animated avatar avatarSize="40px" />
          </View>
        )
      })}
    </>
  )
}

export default function Index() {
  const { tab } = useHomeStore((state) => ({
    tab: state.tab
  }))
  const { data, pageNum, isNoMore, loading, reload, mutate } =
    useInfiniteScroll(
      async (nextPageNum) => {
        const result = await getPostList({
          pageNum: nextPageNum,
          pageSize: 10,
          type: tab
        })
        return result.data
      },
      { reloadDeps: [tab] }
    )
  useTabItemTap((item) => {
    if (item.pagePath.includes(PAGE_PATH)) {
      reload()
    }
  })
  useEffect(() => {
    Taro.eventCenter.on(postEvents.addPost, () => reload())
    return () => {
      Taro.eventCenter.off()
    }
  }, [])

  // 点赞
  const handleLike = async (index: number) => {
    if (!data || !data?.list) return
    const newList = [...data.list]
    const item = newList[index]
    const { code } = await likePost({
      postId: item.id,
      status: !item.isLiked
    })
    if (code !== 0) return
    item.isLiked = !item.isLiked
    if (item.isLiked) {
      item.likeNum++
    } else {
      item.likeNum--
    }
    mutate({ list: newList, total: data.total })
  }
  return (
    <PageRoot>
      <NavigationBar onRefresh={reload} />
      <PageInfiniteScroll
        pageNum={pageNum}
        loading={loading}
        isNoMore={isNoMore}
        skeleton={<SkeletonList />}
        list={
          <PostList
            postList={data?.list || []}
            onLike={handleLike}
            reload={reload}
          />
        }
        onRefresh={reload}
      />
      <AddPostButton />
      <Mine />
      {/* <TabBar /> */}
    </PageRoot>
  )
}
