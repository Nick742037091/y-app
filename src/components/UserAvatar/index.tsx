import { useUserInfoStore } from '@/stores/app'
import { Image } from '@tarojs/components'
import classNames from 'classnames'

export default function (props: {
  size?: number
  onClick?: () => void
  className?: string
}) {
  const avatar = useUserInfoStore((state) => state.userInfo.avatar)
  const size = props.size || 24
  // tailwind类不要使用动态值
  return (
    <Image
      src={avatar}
      className={classNames('rounded-full', props.className)}
      style={{ width: size, height: size }}
      onClick={props.onClick}
    />
  )
}
