import { View } from '@tarojs/components'
import { getPostList } from '@/services/post'
import { useTabStore } from '@/stores/home'
import { useInfiniteScroll } from '@/services/request/hooks'
import { Skeleton } from '@nutui/nutui-react-taro'

import NavigationBar from './components/Navigation'
import { PostList } from './components/PostList'
import PageInfiniteScroll from '../../components/PageInfiniteScroll'
import postListStyles from './components/PostList/index.module.scss'

definePageConfig({
  navigationBarTitleText: '首页',
  navigationStyle: 'custom',
  onReachBottomDistance: 50
})

const PostListSkeleton = () => {
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

// 首页
export default function Index() {
  const tab = useTabStore().tab
  const { data, pageNum, isNoMore, loading, reload } = useInfiniteScroll(
    async (nextPageNum) => {
      const result = await getPostList({
        pageNum: nextPageNum,
        pageSzie: 10,
        type: tab
      })
      return result.data
    },
    { reloadDeps: [tab] }
  )
  return (
    <View>
      <NavigationBar />
      <PageInfiniteScroll
        pageNum={pageNum}
        loading={loading}
        isNoMore={isNoMore}
        skeleton={<PostListSkeleton />}
        list={<PostList postList={data?.list || []} />}
        onRefresh={reload}
      />
    </View>
  )
}
