import { View } from '@fower/taro'
import { isH5 } from '@/utils'
import Taro from '@tarojs/taro'

/**
 * 沉浸式页面顶部
 * @param props
 * @returns
 */
const ImmersionTop = (props: {
  navigationHeight?: number
  backgroundColor?: string
  children: any
}) => {
  const statusBarHeight = isH5 ? 0 : Taro.getWindowInfo()?.statusBarHeight ?? 0
  const navigationHeight = props.navigationHeight || 50
  const backgroundColor = props.backgroundColor || 'white'
  const height = statusBarHeight + navigationHeight
  const children = props.children
  // 沉浸式导航栏高度=状态栏高度+导航栏高度
  // 设置为fixed布局，padding-top为沉浸式导航栏高度
  // 若状态栏文字颜色为白色，需要设置背景颜色
  const mainStyles: CSSObject = {
    height: height + 'px',
    backgroundColor,
    paddingTop: statusBarHeight + 'px',
    boxSizing: 'border-box',
    left: '0px',
    right: '0px',
    zIndex: 1
  }
  return (
    <>
      {/* 固定布局吸顶 */}
      <View fixed flex toCenterY css={mainStyles}>
        {children}
      </View>
      {/* 静态布局，放在文档中撑起沉浸式页面顶部高度 */}
      <View css={{ height: height + 'px' }}></View>
    </>
  )
}

export default ImmersionTop
