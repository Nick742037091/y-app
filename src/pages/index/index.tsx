import { View } from '@tarojs/components'
import { getPostList } from '@/services/post'
import { useHomeStore } from '@/stores/home'
import { useInfiniteScroll } from '@/services/request/hooks'
import { Skeleton } from '@nutui/nutui-react-taro'
import Mine from '@/components/Mine'
import { useTabItemTap } from '@tarojs/taro'

import NavigationBar from './components/Navigation'
import { PostList } from './components/PostList'
import PageInfiniteScroll from '../../components/PageInfiniteScroll'
import postListStyles from './components/PostList/index.module.scss'

const PAGE_PATH = 'pages/index/index'

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
  const { tab, showMine, setShowMine } = useHomeStore((state) => ({
    tab: state.tab,
    showMine: state.showMine,
    setShowMine: state.setShowMine
  }))
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
  useTabItemTap((item) => {
    if (item.pagePath.includes(PAGE_PATH)) {
      reload()
    }
  })
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
      <Mine visible={showMine} onClose={() => setShowMine(false)} />
    </View>
  )
}
