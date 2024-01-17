import Taro from '@tarojs/taro'
import { isH5 } from '@/utils'
import { Text, View } from '@tarojs/components'
import ImmersionTop from '../ImmersionNavigation'

export default function (props: {
  footer?: any
  footerHeight?: number
  children?: any
  title?: string
  titleSize?: number
}) {
  let navigationHeight = 50
  let paddingRight = 0
  if (!isH5) {
    const menuButtonRect = Taro.getMenuButtonBoundingClientRect()
    const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight || 0
    const screenWidth = Taro.getSystemInfoSync().screenWidth || 0
    navigationHeight =
      (menuButtonRect.top - statusBarHeight) * 2 + menuButtonRect.height
    paddingRight = screenWidth - menuButtonRect.left
  }

  return (
    <ImmersionTop
      navigationHeight={navigationHeight}
      footer={props.footer}
      footerHeight={props.footerHeight}
    >
      <View className="w-full h-full relative" style={{ paddingRight }}>
        {props.children}
        {/* 标题绝对布局居中，兼容小程序 */}
        <Text
          className="absolute-center"
          style={{ fontSize: props.titleSize || 20 }}
        >
          {props.title}
        </Text>
      </View>
    </ImmersionTop>
  )
}
