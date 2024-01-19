import { getTrendingList } from '@/services/post'
import { useSearchStore } from '@/stores/search'
import { useRequest } from '@/services/request/hooks'
import Mine from '@/components/Mine'
import ThemeProvider from '@/components/ThemeProvider'

import PagePullToRefresh from '@/components/PagePullToRefresh'
import { View } from '@tarojs/components'
import { Skeleton } from '@nutui/nutui-react-taro'
import SearchNavigationBar from '@/components/SearchNavigationBar'
import TrendingList from './components/TrendingList'
import {
  NavigationFooter,
  NAV_FOOTER_HEIGHT
} from './components/NavigationFooter'
import tendingListStyles from './components/TrendingList/index.module.scss'
import AddPostButton from '@/components/AddPostButton'

definePageConfig({
  navigationBarTitleText: '搜索',
  navigationStyle: 'custom',
  onReachBottomDistance: 50
})

const SkeletonList = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <View key={index} className={tendingListStyles.trending_item}>
            <Skeleton rows={3} animated />
          </View>
        )
      })}
    </>
  )
}

// 搜索页
export default function Index() {
  const { tab } = useSearchStore((state) => ({
    tab: state.tab
  }))
  const { data, loading, refreshAsync } = useRequest(
    async () => {
      const result = await getTrendingList({ type: tab })
      return result.data
    },
    { refreshDeps: [tab] }
  )
  return (
    <ThemeProvider>
      <SearchNavigationBar
        placeholder="搜索Y"
        footer={<NavigationFooter />}
        footerHeight={NAV_FOOTER_HEIGHT}
      />
      <PagePullToRefresh
        loading={loading}
        skeleton={<SkeletonList />}
        list={<TrendingList list={data || []} />}
        onRefresh={() => refreshAsync()}
      />
      <AddPostButton />
      <Mine />
    </ThemeProvider>
  )
}
