import { View } from '@tarojs/components'
import { isH5 } from '@/utils'
import BaseNavigationBar from '@/components/BaseNavigationBar'
import Icon from '@/components/Icon'
import Taro from '@tarojs/taro'

export default function NavigationBar(props: {
  disabled: boolean
  onSubmit: () => void
}) {
  return (
    <BaseNavigationBar showBorder={false}>
      <View
        className="h-full flex items-center"
        style={{ paddingRight: isH5 ? 10 : 0 }}
      >
        <View
          className="mr-auto flex-center py-6 px-8"
          onClick={() => Taro.navigateBack()}
        >
          <Icon name="arrow-left" size={20} />
        </View>
        <View className="text-primary font-bold mr-20">草稿</View>
        <View
          className="bg-primary text-white font-bold h-28 w-64 rounded-[14px] flex-center mr-10"
          style={{ opacity: props.disabled ? 0.5 : 1 }}
          onClick={props.onSubmit}
        >
          发布
        </View>
      </View>
    </BaseNavigationBar>
  )
}
