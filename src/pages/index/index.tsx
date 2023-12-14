import { View } from '@fower/taro'
import NavigationBar from './components/Navigation'

definePageConfig({
  navigationBarTitleText: '首页',
  navigationStyle: 'custom',
  navigationBarTextStyle: 'black'
})
const List = () =>
  Array.from({ length: 100 }).map((_, index) => (
    <View key={index}>列表项-{index + 1}</View>
  ))
export default function Index() {
  return (
    <View>
      <NavigationBar />
      <View css={{ lineHeight: 2 }}>
        <List />
      </View>
    </View>
  )
}
