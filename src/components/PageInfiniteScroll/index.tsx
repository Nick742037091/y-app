import { colorPrimary } from '@/styles/variables'
import { View } from '@tarojs/components'
import { PullToRefresh } from '@nutui/nutui-react-taro'
import Loading from '../Loading'
import Icon from '../Icon'

/**
 * 页面无效循环组件，与useInfiniteScroll搭配使用
 */
export default (props: {
  skeleton: any
  list: any
  pageNum: number
  loading: boolean
  isNoMore: boolean
  onRefresh?: () => Promise<any>
}) => {
  // 第一页加载时显示骨架图
  const showSkeleton = props.pageNum === 1 && props.loading
  const isNoMore = props.isNoMore
  const refreshingHeight = DEFAULT_REFRESHING_HEIGHT
  return (
    <PullToRefresh
      onRefresh={props.onRefresh}
      headHeight={refreshingHeight}
      renderIcon={(status) => {
        switch (status) {
          case 'pulling':
            return <PullDown height={refreshingHeight} />
          case 'canRelease':
            return <PushUp height={refreshingHeight} />
          case 'refreshing':
            return <Refreshing height={refreshingHeight} />
          case 'complete':
            return <RefresFinished height={refreshingHeight} />
        }
      }}
      renderText={() => null}
    >
      {showSkeleton ? props.skeleton : props.list}
      {isNoMore || <LoadMoreLoading />}
    </PullToRefresh>
  )
}

// 默认下拉刷新高度
const DEFAULT_REFRESHING_HEIGHT = 50

// 下拉箭头
function PullDown(props: { height: number }) {
  return (
    <Icon
      name="arrow-down"
      size={30}
      color={colorPrimary}
      className="flex-center"
      style={{ height: props.height }}
    />
  )
}

// 下拉返回箭头
function PushUp(props: { height: number }) {
  return (
    <View className="flex-center" style={{ height: props.height }}>
      <Icon
        name="arrow-up"
        size={30}
        color={colorPrimary}
        className="flex-center"
        style={{ height: props.height }}
      />
    </View>
  )
}

// 下拉刷新loading
function Refreshing(props: { height: number }) {
  return (
    <View className="flex-center" style={{ height: props.height }}>
      <Loading size={30} />
    </View>
  )
}

function RefresFinished(props: { height: number }) {
  return (
    <Icon
      name="check"
      size={30}
      color={colorPrimary}
      className="flex-center"
      style={{ height: props.height }}
    />
  )
}

function LoadMoreLoading() {
  return (
    <View className="flex-center p-15">
      <Loading size={30} />
    </View>
  )
}
