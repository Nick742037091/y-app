import { View } from '@tarojs/components'
import { getPostList } from '@/services/post'
import { useHomeStore } from '@/stores/home'
import { useInfiniteScroll } from '@/services/request/hooks'
import { Skeleton } from '@nutui/nutui-react-taro'
import Mine from '@/components/Mine'
import { useTabItemTap } from '@tarojs/taro'
import ThemeProvider from '@/components/ThemeProvider'
import AddPostButton from '@/components/AddPostButton'
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

  // 收藏
  // TODO 本地模拟，未请求接口
  const handleFavorite = (index: number) => {
    if (!data || !data?.list) return
    const newList = [...data.list]
    const item = newList[index]
    item.isFavorited = !item.isFavorited
    if (item.isFavorited) {
      item.favoriteNum++
    } else {
      item.favoriteNum--
    }
    mutate({ list: newList, total: data.total })
  }
  return (
    <ThemeProvider>
      <NavigationBar onRefresh={reload} />
      <PageInfiniteScroll
        pageNum={pageNum}
        loading={loading}
        isNoMore={isNoMore}
        skeleton={<SkeletonList />}
        list={
          <PostList postList={data?.list || []} onFavorite={handleFavorite} />
        }
        onRefresh={reload}
      />
      <AddPostButton />
      <Mine />
    </ThemeProvider>
  )
}
