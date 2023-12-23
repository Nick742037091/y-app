import { useEffect } from 'react'
import { View } from '@fower/taro'
import { getPostList } from '@/services/post'
import { useTabStore } from '@/stores/home'
import { useInfiniteScroll } from '@/services/requests'
import { Cell, Skeleton } from '@nutui/nutui-react-taro'

import NavigationBar from './components/Navigation'
import { PostList } from './components/PostList'
import PageList from './components/PageList'

definePageConfig({
  navigationBarTitleText: '首页',
  navigationStyle: 'custom'
})

const PostListSkeleton = () => {
  return Array.from({ length: 10 }).map((_, index) => {
    return (
      <Cell key={index}>
        <Skeleton rows={3} animated avatar avatarSize="40px" />
      </Cell>
    )
  })
}

// 首页
// TODO 下拉刷新
export default function Index() {
  const tab = useTabStore((state) => state.tab)
  const { list, pageNum, loading } = useInfiniteScroll(
    (nextPageNum) => {
      return getPostList({ pageNum: nextPageNum, pageSzie: 10, type: tab })
    },
    { refreshDeps: [tab] }
  )
  return (
    <View>
      <NavigationBar />
      <PageList
        pageNum={pageNum}
        loading={loading}
        skeleton={<PostListSkeleton />}
        list={<PostList postList={list ?? []} />}
      />
    </View>
  )
}
