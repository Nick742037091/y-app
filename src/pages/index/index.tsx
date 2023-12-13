import { View } from '@fower/taro'
import NavigationBar from './components/Navigation'

definePageConfig({
  navigationBarTitleText: '首页',
  navigationStyle: 'custom',
  navigationBarTextStyle: 'black'
})

export default function Index() {
  return (
    <View>
      <NavigationBar />
      <View css={{ height: '5000px' }}></View>
    </View>
  )
}
