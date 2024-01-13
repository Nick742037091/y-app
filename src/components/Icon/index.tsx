import { ITouchEvent, View } from '@tarojs/components'
import IconFont, { IconNames, IconProps } from '../IconFont'

export type { IconNames, IconProps }

export default function Icon(
  props: {
    className?: string
    onClick?: (event: ITouchEvent) => void
  } & IconProps
) {
  const { className, ...restProps } = props
  return (
    <View className={className} onClick={props.onClick}>
      <IconFont {...restProps} />
    </View>
  )
}
