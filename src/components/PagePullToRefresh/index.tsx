import { PullToRefresh } from '@nutui/nutui-react-taro'
import {
  PullDown,
  PushUp,
  RefresFinished,
  Refreshing
} from '../PageInfiniteScroll'

/**
 * 页面列表下拉刷新组件，与useRequest搭配使用
 */
export default (props: {
  skeleton?: any
  list: any
  loading: boolean
  onRefresh?: () => Promise<any>
}) => {
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
      {props.loading ? props?.skeleton : props.list}
    </PullToRefresh>
  )
}

// 默认下拉刷新高度
const DEFAULT_REFRESHING_HEIGHT = 50
