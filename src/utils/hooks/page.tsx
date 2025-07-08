import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { colorWhite } from '@/styles/variables'
import { isH5 } from '../index'

export const useStatusBarHeight = (props?: {
  width?: string | number
  zIndex?: number
  backgroundColor?: string
}) => {
  const statusBarHeight = isH5 ? 0 : Taro.getWindowInfo()?.statusBarHeight ?? 0
  const statusBarPosition = (
    <View
      className="fixed top-0 left-0"
      style={{
        width: props?.width ?? '100vw',
        zIndex: props?.zIndex ?? 200,
        height: statusBarHeight,
        backgroundColor: props?.backgroundColor ?? colorWhite
      }}
    />
  )
  return {
    statusBarHeight,
    statusBarPosition
  }
}

export const useRouteParams = (key: string) => {
  const routeParams = Taro.getCurrentInstance().router?.params
  return routeParams?.[key] as string
}
