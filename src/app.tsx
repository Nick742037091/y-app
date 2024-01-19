import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
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

  // 不要添加层级，会影响页面高度和页面切换动效
  return children
}

export default App
