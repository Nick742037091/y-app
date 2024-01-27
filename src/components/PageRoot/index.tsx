import { StandardProps, View } from '@tarojs/components'
import ThemeProvider from '../ThemeProvider'
import SnackBar from '../SnackBar'

/**
 * 页面根元素
 * 1、支持主题设配置
 * 2、内嵌snackBar组件
 */
export default function PageRoot(
  props: StandardProps & { isTabPage?: boolean }
) {
  const { children, isTabPage, ...restProps } = props
  return (
    <View {...restProps}>
      <ThemeProvider>{props.children}</ThemeProvider>
      <SnackBar isTabPage={isTabPage} />
    </View>
  )
}
