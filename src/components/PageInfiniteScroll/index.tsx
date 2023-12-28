import { colorPrimary } from '@/styles/variables'
import { View } from '@tarojs/components'
import { Loading, ConfigProvider } from '@nutui/nutui-react-taro'
import PullToRefresh from '../PullToRefresh'

/**
 * 页面无效循环组件，与useInfiniteScroll搭配使用
 */
export default (props: {
  skeleton: any
  list: any
  pageNum: number
  loading: boolean
  onRefresh?: () => Promise<any>
}) => {
  // 第一页加载时显示骨架图
  const showSkeleton = props.pageNum === 1 && props.loading
  const showLoading = props.pageNum > 1 && props.loading

  return (
    <PullToRefresh onRefresh={props.onRefresh}>
      {showSkeleton ? props.skeleton : props.list}
      {showLoading && <LoadMoreLoading />}
    </PullToRefresh>
  )
}

// TODO 上拉加载loading需要第二次拖动才能展示
function LoadMoreLoading() {
  return (
    <View className="flex-center p-15">
      <ConfigProvider
        theme={{
          nutuiLoadingIconSize: '30px',
          nutuiLoadingIconColor: colorPrimary
        }}
      >
        <Loading type="circular" />
      </ConfigProvider>
    </View>
  )
}
