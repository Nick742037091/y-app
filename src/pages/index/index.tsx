import { View, Text } from '@fower/taro'

const pageClass: CSSObject = {
  fontSize: '50px'
}

definePageConfig({
  navigationBarTitleText: '首页'
})

export default function Index() {
  return (
    <View css={pageClass}>
      <Text>首页</Text>
    </View>
  )
}
