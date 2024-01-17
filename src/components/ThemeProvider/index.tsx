import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { persist } from 'zustand/middleware'

import { View } from '@tarojs/components'
import { createPersistOptions } from '@/utils/storage'

export default function ThemeProvider(props: { children }) {
  const colorPrimary = useColorPrimary()
  const style = `--color-primary: ${colorPrimary}`
  return <View style={style}>{props.children}</View>
}

export const primaryColorMap = {
  blue: '#409eff',
  green: '#67C23A',
  red: '#F56C6C',
  orange: '#E6A23C'
}

interface ThemeState {
  theme: string
  setTheme: (val: string) => void
}
export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: 'blue',
      setTheme: (val) => set({ theme: val })
    }),
    createPersistOptions('theme')
  )
)
if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('theme', useThemeStore)
}

/**
 * 获取主题颜色，用于无法使用css变量的场景，如Icon组件使用的backgroundImage在小程序中无法使用css变量
 */
export const useColorPrimary = () => {
  const theme = useThemeStore((state) => state.theme)
  return primaryColorMap[theme]
}