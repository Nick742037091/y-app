import { View } from '@tarojs/components'
import { useStatusBarHeight } from '@/utils/hooks/page'
import { usePageScroll } from '@tarojs/taro'
import { CSSProperties, useRef, useState } from 'react'
import styles from './index.module.scss'

/**
 * 沉浸式页面顶部
 * @param props
 * @returns
 */
const ImmersionTop = (props: {
  navigationHeight?: number
  backgroundColor?: string
  transitionTime?: number
  children: any
  footer?: any
  footerHeight?: number
}) => {
  // 若状态栏文字颜色为白色，需要设置背景颜色，透明度用于实现玻璃效果，
  const backgroundColor = props.backgroundColor || 'rgba(255,255,255,0.85)'
  const { statusBarHeight, statusBarPosition } = useStatusBarHeight({
    backgroundColor
  })

  const navigationHeight = props.navigationHeight || 50
  const footerHeight = props.footerHeight || 0
  // 导航栏过渡动画时间，默认300ms
  const transitionTime = props.transitionTime || 300
  const totalHeight = statusBarHeight + navigationHeight + footerHeight

  const children = props.children
  const footer = props.footer

  // 导航栏垂直位移距离
  const [navigationTranslateY, setNavigationTranslateY] = useState(0)
  // 当前页面滚动高度
  const scrollTop = useRef(0)
  const SHOW_SCROLL_DELTA_Y = 30
  // 导航栏透明度
  const navigationOpacity =
    (navigationHeight - navigationTranslateY) / navigationHeight
  // 监听页面滚动，根据滚动距离，设置导航栏的transform: translateY()
  usePageScroll((info) => {
    const deltaY = info.scrollTop - scrollTop.current
    if (deltaY > 0) {
      // 向下滚动，逐渐隐藏导航栏，位移距离不能大于导航栏高度
      setNavigationTranslateY(
        Math.min(navigationTranslateY + deltaY, navigationHeight)
      )
    } else {
      // 向上滚动
      if (scrollTop.current > navigationHeight) {
        // 当前滚动距离超过导航栏高度，快速滚动才会显示导航栏
        if (deltaY < -SHOW_SCROLL_DELTA_Y) {
          // 单次向上滚动距离超过30px，就显示导航栏
          setNavigationTranslateY(0)
        }
      } else {
        // 滚动到顶部，逐渐显示导航栏，位移距离不能小于0
        setNavigationTranslateY(Math.min(navigationTranslateY + deltaY, 0))
      }
    }
    scrollTop.current = info.scrollTop
  })
  // 导航栏固定布局
  const navigationStyles: CSSProperties = {
    top: statusBarHeight + 'px',
    height: navigationHeight + footerHeight + 'px',
    // 通过transform: translateY()将导航栏移动到状态栏下方，并设置transform动画
    transform: `translateY(-${navigationTranslateY}px)`,
    opacity: navigationOpacity,
    transition: `all ${transitionTime}ms ease-out`,
    backgroundColor
  }
  return (
    <>
      {statusBarPosition}
      <View className={styles.navigation} style={navigationStyles}>
        <View
          className="flex-center"
          style={{ height: navigationHeight + 'px' }}
        >
          {children}
        </View>
        {footer}
      </View>
      {/* 导航栏高度占位，置于正常文档流之中 */}
      <View style={{ height: totalHeight + 'px' }} />
    </>
  )
}

// 状态栏高度占位，固定布局，层级在导航栏之上，避免导航栏遮挡，不会覆盖系统状态信息
const StatusBarPosition = (props: {
  height: number
  backgroundColor: string
}) => {
  const style: CSSProperties = {
    height: props.height + 'px',
    backgroundColor: props.backgroundColor
  }
  return <View className="fixed left-0 right-0 top-0 z-[2]" style={style} />
}

export default ImmersionTop
