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
  const backgroundColor = props.backgroundColor || 'rgba(255,255,255)'
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
  // const navigationOpacity = (totalHeight - navigationTranslateY) / totalHeight
  // 监听页面滚动，根据滚动距离，设置导航栏的transform: translateY()
  usePageScroll((info) => {
    const deltaY = info.scrollTop - scrollTop.current
    if (deltaY > 0) {
      // 向下滚动，逐渐隐藏导航栏，位移距离不能大于导航栏高度，避免回显动效过快
      // 可能在页面中间显示导航栏，所以不能设置为scrollTop
      setNavigationTranslateY(
        Math.min(navigationTranslateY + deltaY, navigationHeight + footerHeight)
      )
    } else {
      // 向上滚动
      if (scrollTop.current > totalHeight) {
        // 当前滚动距离超过导航栏高度，快速滚动才会显示导航栏
        if (deltaY < -SHOW_SCROLL_DELTA_Y) {
          // 单次向上滚动距离超过30px，就显示导航栏
          setNavigationTranslateY(0)
        }
      } else {
        // 未回显完整导航栏时，逐渐展示导航栏，因为滚动到顶，设置为scrollTop即可
        if (navigationTranslateY > 0) {
          setNavigationTranslateY(info.scrollTop)
        }
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
    // TODO 由于需要展示最近发布组件，不能设置透明，后续看一下是否能分别控制透明度
    // 最小透明度不为零，避免滚动过快，瞬间透明不可见
    // opacity: Math.min(navigationOpacity + 0.2, 1),

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

export default ImmersionTop
