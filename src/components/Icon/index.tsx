import { View } from '@fower/taro'
import IconFont, { IconNames } from '../Iconfont'

// TODO 如何从组件类型推导出props类型
type ViewType =
  | (import('@tarojs/components/types/View').ViewProps &
      import('@fower/atomic-props').AtomicProps &
      import('@fower/styled').InjectedProps)
  | (import('@tarojs/components/types/View').ViewProps & {
      children?: import('react').ReactNode
    } & import('@fower/atomic-props').AtomicProps &
      import('@fower/styled').InjectedProps)
export default function (
  props: {
    name: IconNames
    size?: number
    color?: string
  } & ViewType
) {
  // name、size、color是Icon组件的props，其他的是View组件的props
  const { name, size, color, ...otherProps } = props
  return (
    <View {...otherProps}>
      <IconFont name={name} size={size} color={color} />
    </View>
  )
}
