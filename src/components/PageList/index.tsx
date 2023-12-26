import { colorPrimary } from '@/styles/variables'
import { View } from '@tarojs/components'
import { Loading, ConfigProvider } from '@nutui/nutui-react-taro'
// TODO 下拉刷新实现
// 1. PullToRefresh需要外部包裹ScrollView，由于沉浸式页面监听的是页面滚动，会影响沉浸式效果。
// 考虑在沉浸式页面监听顶部滚动，自定义下拉刷新组件样式。
// 2. enablePullDownRefresh下拉刷新样式会和沉浸式页面冲突
/**
 * 页面滚动加载组件，与useInfiniteScroll搭配使用
 */
export default (props: {
  skeleton: any
  list: any
  pageNum: number
  loading: boolean
}) => {
  // 第一页加载时显示骨架图
  const showSkeleton = props.pageNum === 1 && props.loading
  const showLoading = props.pageNum > 1 && props.loading
  return (
    <>
      {showSkeleton ? props.skeleton : props.list}
      {showLoading && (
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
      )}
    </>
  )
}
