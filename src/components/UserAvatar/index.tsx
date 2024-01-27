import { useAppStore } from '@/stores/app'
import { Image, View } from '@tarojs/components'
import classNames from 'classnames'

export default function (props: {
  size?: number
  onClick?: () => void
  className?: string
}) {
  const avatar = useAppStore((state) => state.userInfo.avatar)
  const userName = useAppStore((state) => state.userInfo.userName) || ''
  const size = props.size || 24
  // tailwind类不要使用动态值
  return avatar ? (
    <Image
      src={avatar}
      className={classNames('rounded-full bg-placeholder', props.className)}
      style={{ width: size, height: size }}
      onClick={props.onClick}
    />
  ) : (
    <View
      className={classNames(
        'rounded-full bg-placeholder text-black flex-center',
        props.className
      )}
      style={{ width: size, height: size, fontSize: Math.max(size / 2, 18) }}
      onClick={props.onClick}
    >
      {userName ? userName[0].toUpperCase() : ''}
    </View>
  )
}
