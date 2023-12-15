import { View } from '@fower/taro'
import { isH5 } from '@/utils'
import Taro, { usePageScroll } from '@tarojs/taro'
import { useState } from 'react'

const statusBarHeight = isH5 ? 0 : Taro.getWindowInfo()?.statusBarHeight ?? 0
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
}) => {
  const navigationHeight = props.navigationHeight || 50
  // 导航栏过渡动画时间，默认300ms
  const transitionTime = props.transitionTime || 300
  const totalHeight = statusBarHeight + navigationHeight
  // 若状态栏文字颜色为白色，需要设置背景颜色
  const backgroundColor = props.backgroundColor || 'white'
  const children = props.children
  // 导航栏垂直位移距离
  const [navigationTranslateY, setNavigationTranslateY] = useState(0)
  // 当前页面滚动高度
  const [scrollTop, setScrollTop] = useState(0)
  const SHOW_SCROLL_DELTA_Y = 30
  // 监听页面滚动，根据滚动距离，设置导航栏的transform: translateY()
  usePageScroll((info) => {
    const deltaY = info.scrollTop - scrollTop
    if (deltaY < -SHOW_SCROLL_DELTA_Y) {
      // 单次向上滚动距离超过30px，就显示导航栏
      setNavigationTranslateY(0)
    } else {
      // 保证位移距离在0~navigationHeight之间
      let newTranTranslateY = navigationTranslateY + deltaY
      if (newTranTranslateY < 0) {
        newTranTranslateY = 0
      } else if (newTranTranslateY > navigationHeight) {
        newTranTranslateY = navigationHeight
      }
      setNavigationTranslateY(newTranTranslateY)
    }
    setScrollTop(info.scrollTop)
  })
  // 导航栏固定布局
  const navigationStyles: CSSObject = {
    position: 'fixed',
    left: '0px',
    right: '0px',
    top: statusBarHeight + 'px',
    zIndex: 1,
    height: navigationHeight + 'px',
    // 通过transform: translateY()将导航栏移动到状态栏下方，并设置transform动画
    transform: `translateY(-${navigationTranslateY}px)`,
    transition: `transform ${transitionTime}ms ease-out`,
    display: 'flex',
    alignItems: 'center',
    backgroundColor,
    borderBottom: '1px solid #e5e5e5'
  }
  return (
    <>
      <StatusBarPosition
        height={statusBarHeight}
        backgroundColor={backgroundColor}
      />
      <View css={navigationStyles}>{children}</View>
      {/* 导航栏高度占位，置于正常文档流之中 */}
      <View css={{ height: totalHeight + 'px' }} />
    </>
  )
}

// 状态栏高度占位，固定布局，层级在导航栏之上，避免导航栏遮挡，不会覆盖系统状态信息
const StatusBarPosition = (props: {
  height: number
  backgroundColor: string
}) => {
  const style: CSSObject = {
    position: 'fixed',
    left: '0px',
    right: '0px',
    top: '0px',
    zIndex: 2,
    height: props.height + 'px',
    backgroundColor: props.backgroundColor
  }
  return <View css={style} />
}

export default ImmersionTop
