import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { setConfig } from '@fower/core'

setConfig({ unit: 'px', fontSize: '14px' })

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App
