import { useRequest } from '@/services/request/hooks'
import Mine from '@/components/Mine'
import ThemeProvider from '@/components/ThemeProvider'

import PagePullToRefresh from '@/components/PagePullToRefresh'
import { View } from '@tarojs/components'
import { Skeleton } from '@nutui/nutui-react-taro'
import { getRecommendGroupList } from '@/services/group'
import NavigationBar from './components/NavigationBar'
import GroupList from './components/GroupList'
import groupListStyles from './components/GroupList/index.module.scss'

definePageConfig({
  navigationBarTitleText: '社群',
  navigationStyle: 'custom',
  onReachBottomDistance: 50
})

const SkeletonList = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <View key={index} className={groupListStyles.trending_item}>
            <Skeleton
              rows={3}
              animated
              avatar
              avatarShape="square"
              avatarSize="32"
            />
          </View>
        )
      })}
    </>
  )
}

export default function Index() {
  const { data, loading, refreshAsync } = useRequest(async () => {
    const result = await getRecommendGroupList()
    return result.data
  })
  return (
    <ThemeProvider>
      <NavigationBar />
      <PagePullToRefresh
        loading={loading}
        skeleton={<SkeletonList />}
        list={<GroupList list={data || []} />}
        onRefresh={() => refreshAsync()}
      />
      <Mine />
    </ThemeProvider>
  )
}
