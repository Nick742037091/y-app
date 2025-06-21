import { View } from '@tarojs/components'
import { ArrowLeft } from '@nutui/icons-react-taro'
import Taro from '@tarojs/taro'

export default function BackNavigationBar(props: {
  title?: string
  height?: number
  children?: React.ReactNode
}) {
  const height = props.height || 50
  const navigateBack = () => {
    Taro.navigateBack()
  }
  return (
    <View
      className="fixed top-0 left-0 right-0 z-10 bg-white flex items-center px-[16px]"
      style={{
        height: height + 'px'
      }}
    >
      <View
        className="flex items-center p-[4px] mr-[10rpx] ml-[-4px]"
        onClick={navigateBack}
      >
        <ArrowLeft size={20} color="#000000" className="" />
      </View>
      {props.children ? (
        props.children
      ) : (
        <View className="text-[16px] font-bold">{props.title}</View>
      )}
    </View>
  )
}
