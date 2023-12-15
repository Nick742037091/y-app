import { useState } from 'react'
import { Image, View } from '@fower/taro'
import NavigationBar, { TAB_RECOMMEND } from './components/Navigation'
import { HomeTabContext } from './context'

definePageConfig({
  navigationBarTitleText: '首页',
  navigationStyle: 'custom',
  navigationBarTextStyle: 'black'
})
const List = () =>
  Array.from({ length: 100 }).map((_, index) => (
    <View key={index}>
      列表项-{index + 1}{' '}
      <Image
        circle-40px
        src="https://pubfile.bluemoon.com.cn/group1/new/scrm/961483605c85131353b062f1c8f60104.jpeg"
      />
    </View>
  ))
export default function Index() {
  const [tab, setTab] = useState(TAB_RECOMMEND)
  return (
    <HomeTabContext.Provider value={[tab, setTab]}>
      <View>
        <NavigationBar />
        <View css={{ lineHeight: 2 }}>
          <List />
        </View>
      </View>
    </HomeTabContext.Provider>
  )
}
