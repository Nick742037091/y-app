import { isTabPage } from '@/utils'
import { View } from '@tarojs/components'
import { create } from 'zustand'

interface SnackBarState {
  message: string
  show: boolean
  showSnackBar: (string, duration?: number) => void
}

export const useSnackBarStore = create<SnackBarState>((set) => ({
  message: '',
  show: false,
  showSnackBar: (message, duration = 2000) => {
    set({ message, show: true })
    setTimeout(() => {
      set({ show: false })
    }, duration)
  }
}))

export const snackBarHeight = 40

export default function SnackBar() {
  const { show, message } = useSnackBarStore((state) => ({
    show: state.show,
    message: state.message
  }))
  const isTab = isTabPage()
  return (
    <View
      className="bg-primary text-white fixed left-0 right-0 flex-center z-[1000] transition-transform ease-in-out"
      style={{
        height: snackBarHeight,
        bottom: isTab ? `var(--taro-tabbar-height)` : 0,
        transitionDuration: isTab ? '600ms' : '300ms',
        transform: show ? 'translateY(0)' : 'translateY(100px)'
      }}
    >
      {message}
    </View>
  )
}
