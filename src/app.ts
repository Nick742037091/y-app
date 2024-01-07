import '@/styles/main.scss'
import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { useUserInfoStore } from './stores/app'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    useUserInfoStore.getState().queryUserInfo()
  })

  // children 是将要会渲染的页面
  return children
}

export default App
