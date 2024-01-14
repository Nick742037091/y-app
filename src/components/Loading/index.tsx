import { ConfigProvider, Loading as NutLoading } from '@nutui/nutui-react-taro'
import type { LoadingType } from '@nutui/nutui-react-taro/dist/types/packages/loading/loading.taro'
import { useColorPrimary } from '../ThemeProvider'

export default function Loading(props: {
  size?: number
  type?: LoadingType
  color?: string
  className?: string
  style?: React.CSSProperties
}) {
  const colorPrimary = useColorPrimary()
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
      style={props?.style}
    >
      <NutLoading type={type} />
    </ConfigProvider>
  )
}
