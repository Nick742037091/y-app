import { View, CommonEventFunction } from '@tarojs/components'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import { Loading, ConfigProvider } from '@nutui/nutui-react-taro'
import { colorPrimary } from '@/styles/variables'
import { isH5 } from '@/utils'
import throttle from 'lodash/throttle'
import IconFont from '../IconFont'

// 默认下拉刷新超时时间
const DEFAULT_REFRESH_TIMEOUT = 1000
// 默认下拉刷新高度
const DEFAULT_REFRESHING_HEIGHT = 50
// 默认触发下拉刷新距离
const DEFAULT_REFRESH_DISTANCE = 75
// 触摸移动间隔时长
const TOUCH_MOVE_WAIT = 16

// TODO 不够完善，暂时使用nutUI下拉刷新组件
// 页面下拉刷新组件，无需包裹Scroll-View
export default function PullToRefresh(props: {
  children: any
  onRefresh?: () => Promise<any>
  refreshTimeout?: number
  refreshDistance?: number
  refreshingHeight?: number
}) {
  const refreshTimeout = props.refreshTimeout ?? DEFAULT_REFRESH_TIMEOUT
  const refreshDistance = props.refreshDistance ?? DEFAULT_REFRESH_DISTANCE
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

  const handleTouchStart: CommonEventFunction = (event) => {
    // 刷新中不触发
    if (isRefreshing) return
    const touch = (event as any).touches[0] as {
      clientY: number
      pageY: number
    }
    touchPageY.current = touch.pageY
  }

  const handleTouchMove = throttle<CommonEventFunction>((event) => {
    if (isRefreshing) return
    const touch = (event as any).touches[0] as {
      clientY: number
      pageY: number
    }
    const deltaY = touch.pageY - touchPageY.current
    // 往上滚动重置下拉状态，避免触发刷新
    if (deltaY <= 0) {
      isTop.current = false
      setIsPulling(false)
      return
    }
    if (isTop.current) {
      // 滚动到顶之后，继续下拉触发刷新
      setTranslateY(deltaY)
      setIsPulling(true)
    } else {
      if (isH5) {
        // H5中页面实际上是放在滚动布局中，所以pageY和clientY一直是相等的
        // 用布局元素的top属性判断是否滚动到顶
        const rect = (wrapperRef.current as any).getClientRects()[0]
        if (rect.top === wrapperTop.current) {
          isTop.current = true
        }
      } else {
        // 小程序用距离页面顶部和距离视口顶部相等，说明滚动到顶部
        if (touch.pageY === touch.clientY) {
          isTop.current = true
        }
      }
    }
  }, TOUCH_MOVE_WAIT)

  const handleTouchEnd = async () => {
    if (isRefreshing) return
    // 非下拉刷新操作，不触发
    if (!isPulling) return
    // FIXME PullDown和Refreshing组件有时候会同时显示
    setIsPulling(false)
    setIsRefreshing(true)
    if (props.onRefresh) {
      if (translateY >= refreshDistance) {
        // 重置为Refreshing组件高度
        setTranslateY(refreshingHeight)
        await props.onRefresh()
      }
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
  const wrapperRef = useRef()
  const wrapperTop = useRef(0)
  const QUERY_WRAPPER_HEIGHT_DELAY = 30
  useEffect(() => {
    // H5缓存布局元素挂载之后距离页面顶部的距离，用于判断是否滚动到顶
    if (isH5 && wrapperRef.current) {
      // 延迟之后再查询，否则获取top可能为空
      // TODO 为何需要延迟
      setTimeout(() => {
        const rect = (wrapperRef.current as any).getClientRects()[0]
        wrapperTop.current = rect.top
      }, QUERY_WRAPPER_HEIGHT_DELAY)
    }
  }, [])

  return (
    <View
      ref={wrapperRef}
      id="refresh"
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

// 下拉刷新loading
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

// 下拉箭头
function PullDown(props: { height: number }) {
  return (
    <RefreshingWrapper height={props.height}>
      <IconFont name="arrow-down" size={30} color={colorPrimary} />
    </RefreshingWrapper>
  )
}
