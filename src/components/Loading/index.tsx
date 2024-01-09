import { colorPrimary } from '@/styles/variables'
import { ConfigProvider, Loading as NutLoading } from '@nutui/nutui-react-taro'
import type { LoadingType } from '@nutui/nutui-react-taro/dist/types/packages/loading/loading.taro'

export default function Loading(props: {
  size?: number
  type?: LoadingType
  color?: string
  className?: string
}) {
  const size = props?.size || 40
  const color = props?.color || colorPrimary
  const type = props?.type || 'circular'
  return (
    <ConfigProvider
      className={props?.className}
      theme={{
        nutuiLoadingIconSize: `${size}px`,
        nutuiLoadingIconColor: color
      }}
    >
      <NutLoading type={type} />
    </ConfigProvider>
  )
}
