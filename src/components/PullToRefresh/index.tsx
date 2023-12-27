import { View, CommonEventFunction } from '@tarojs/components'
import { CSSProperties, useRef, useState } from 'react'
import { Loading, ConfigProvider } from '@nutui/nutui-react-taro'
import { colorPrimary } from '@/styles/variables'
import { throttle } from 'lodash'
import IconFont from '../Iconfont'

// 默认下拉刷新超时时间
const DEFAULT_REFRESH_TIMEOUT = 1000
// 默认下拉刷新高度
const DEFAULT_REFRESHING_HEIGHT = 50

// 页面下拉刷新组件，无需包裹Scroll-View
// FIXME 页面中间会误触发下拉刷新
export default function PullToRefresh(props: {
  children: any
  onRefresh?: () => Promise<any>
  refreshTimeout?: number
  refreshingHeight?: number
}) {
  const refreshTimeout = props.refreshTimeout ?? DEFAULT_REFRESH_TIMEOUT
  const refreshingHeight = props.refreshingHeight ?? DEFAULT_REFRESHING_HEIGHT
  const [translateY, setTranslateY] = useState(0)
  // 是否滚动到页面顶部
  const isTop = useRef(false)
  // 是否正在执行下拉
  const [isPulling, setIsPulling] = useState(false)
  // 是否正在刷新
  const [isRefreshing, setIsRefreshing] = useState(false)
  // 上一次下拉触摸点在页面的y坐标
  const touchPageY = useRef(0)

  const handleTouchStart: CommonEventFunction = (options) => {
    const touch = (options as any).touches[0] as {
      clientY: number
      pageY: number
    }
    touchPageY.current = touch.pageY
  }

  const handleTouchMove: CommonEventFunction = throttle((options) => {
    const touch = (options as any).touches[0] as {
      clientY: number
      pageY: number
    }
    if (isTop.current) {
      // 滚动到顶之后，继续下拉触发刷新
      const deltaY = touch.pageY - touchPageY.current
      if (deltaY > 0) {
        setTranslateY(deltaY)
        setIsPulling(true)
      }
    } else {
      if (touch.pageY === touch.clientY) {
        debugger
        isTop.current = true
      }
    }
  }, 30)

  const handleTouchEnd = async () => {
    // 非下拉刷新操作，不触发
    if (!isPulling) return
    setIsPulling(false)
    setIsRefreshing(true)
    // 重置为Refreshing组件高度
    setTranslateY(refreshingHeight)
    if (props.onRefresh) {
      await props.onRefresh()
    } else {
      // 没回刷新回调时定时刷新
      await new Promise((resolve) => setTimeout(resolve, refreshTimeout))
    }
    setIsRefreshing(false)
    setTranslateY(0)
    touchPageY.current = 0
  }

  const wrapperStyle: CSSProperties = {
    // 拖动过程中不要设置动效，会抖动
    transition: isPulling ? 'none' : 'transform 0.3s ease',
    transform: `translateY(${translateY}px)`
  }

  return (
    <View
      className="relative"
      style={wrapperStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {isPulling && <PullDown height={refreshingHeight} />}
      {isRefreshing && <Refreshing height={refreshingHeight} />}
      {props.children}
    </View>
  )
}

function RefreshingWrapper(props: { height: number; children: any }) {
  const height = props.height
  return (
    <View
      className="flex-center absolute left-0 right-0"
      style={{ height: height + 'px', top: `-${height}px` }}
    >
      {props.children}
    </View>
  )
}

function Refreshing(props: { height: number }) {
  return (
    <RefreshingWrapper height={props.height}>
      <ConfigProvider
        className="flex-center"
        theme={{
          nutuiLoadingIconSize: '30px',
          nutuiLoadingIconColor: colorPrimary
        }}
      >
        <Loading type="circular" />
      </ConfigProvider>
    </RefreshingWrapper>
  )
}

function PullDown(props: { height: number }) {
  return (
    <RefreshingWrapper height={props.height}>
      <IconFont name="arrow-down" size={30} color={colorPrimary} />
    </RefreshingWrapper>
  )
}
