import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import '@/styles/main.scss'
import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { useUserInfoStore } from './stores/app'

// 中文化
dayjs.locale('zh-cn')
// 添加相对时间插件
dayjs.extend(relativeTime)

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    useUserInfoStore.getState().queryUserInfo()
  })

  // children 是将要会渲染的页面
  return children
}

export default App
