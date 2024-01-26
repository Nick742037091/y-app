import { Image, View } from '@tarojs/components'
import { useInfiniteScroll } from '@/services/request/hooks'
import { Skeleton } from '@nutui/nutui-react-taro'
import Mine from '@/components/Mine'
import { useTabItemTap } from '@tarojs/taro'
import ThemeProvider from '@/components/ThemeProvider'
import { getNotificationList } from '@/services/notification/index'
import type { Notification } from '@/services/notification/types'
import { useNotificationStore } from '@/stores/notification'
import dayjs from 'dayjs'

import NavigationBar from './components/NavigationBar'
import PageInfiniteScroll from '../../components/PageInfiniteScroll'
import notificationStyles from './index.module.scss'
import AddPostButton from '@/components/AddPostButton'
import SnackBar from '@/components/SnackBar'

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
          <View key={index} className={notificationStyles.notification}>
            <Skeleton rows={2} animated avatar avatarSize="40px" />
          </View>
        )
      })}
    </>
  )
}

const NotificationList = (props: { list: Notification[] }) => {
  return (
    <>
      {props.list.map((item, index) => {
        return (
          <View key={index} className={notificationStyles.notification}>
            <Image src={item.avatar} className="size-40 rounded-full" />
            <View className="ml-10">
              <View className="text-black-secondary">
                {dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')}
              </View>
              <View className="mt-4">{item.content}</View>
            </View>
          </View>
        )
      })}
    </>
  )
}

export default function Index() {
  const { tab } = useNotificationStore((state) => ({
    tab: state.tab
  }))
  const { data, pageNum, isNoMore, loading, reload } = useInfiniteScroll(
    async (nextPageNum) => {
      const result = await getNotificationList({
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
    <ThemeProvider>
      <NavigationBar onRefresh={reload} />
      <PageInfiniteScroll
        pageNum={pageNum}
        loading={loading}
        isNoMore={isNoMore}
        skeleton={<SkeletonList />}
        list={<NotificationList list={data?.list || []} />}
        onRefresh={reload}
      />
      <AddPostButton />
      <Mine />
      <SnackBar isTabPage />
    </ThemeProvider>
  )
}
