import { useAppStore } from '@/stores/app'
import { Image } from '@tarojs/components'
import classNames from 'classnames'

export default function (props: {
  size?: number
  onClick?: () => void
  className?: string
}) {
  const avatar =
    useAppStore((state) => state.userInfo.avatar) ||
    'https://pubfile.bluemoon.com.cn/group1/new/scrm/961483605c85131353b062f1c8f60104.jpeg'
  const size = props.size || 24
  // tailwind类不要使用动态值
  return (
    <Image
      src={avatar}
      className={classNames('rounded-full bg-placeholder', props.className)}
      style={{ width: size, height: size }}
      onClick={props.onClick}
    />
  )
}
