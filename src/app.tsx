import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useUserInfoStore } from './stores/app'
import './app.scss'

// 中文化
dayjs.locale('zh-cn')
// 添加相对时间插件
dayjs.extend(relativeTime)

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    useUserInfoStore.getState().queryUserInfo()
  })

  // children 是将要会渲染的页面
  // 需要设置高度100%，否则首页会被tabbar覆盖
  return <View className="h-full">{children}</View>
}

export default App