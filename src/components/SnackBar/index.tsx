import { isH5 } from '@/utils'
import { View } from '@tarojs/components'
import { create } from 'zustand'
import classNames from 'classnames'
import { PrimaryColorKey, primaryColorMap } from '../ThemeProvider'

interface SnackBarState {
  message: string
  show: boolean
  type: PrimaryColorKey
  showSnackBar: (string, type?: PrimaryColorKey, duration?: number) => void
  showSuccess: (string, duration?: number) => void
  showError: (string, duration?: number) => void
}

export const useSnackBarStore = create<SnackBarState>((set, get) => ({
  message: '',
  show: false,
  type: 'blue',
  showSnackBar: (message, type = 'blue', duration = 1500) => {
    set({ message, type, show: true })
    setTimeout(() => {
      set({ show: false })
    }, duration)
  },
  showSuccess: (message, duration) => {
    get().showSnackBar(message, 'blue', duration)
  },
  showError: (message, duration) => {
    get().showSnackBar(message, 'red', duration)
  }
}))

export const showSnackBar = useSnackBarStore.getState().showSnackBar

export const showSuccess = useSnackBarStore.getState().showSuccess

export const showError = useSnackBarStore.getState().showError

export const snackBarHeight = 40

export default function SnackBar(props: { isTabPage?: boolean }) {
  const { show, message, type } = useSnackBarStore((state) => ({
    show: state.show,
    message: state.message,
    type: state.type
  }))

  return (
    <View
      className={classNames(
        'text-white fixed left-0 right-0 flex-center z-[1000] transition-transform ease-in-out'
      )}
      style={{
        backgroundColor: primaryColorMap[type],
        height: snackBarHeight,
        bottom: props.isTabPage && isH5 ? `var(--taro-tabbar-height)` : 0,
        transitionDuration: props.isTabPage ? '600ms' : '300ms',
        transform: show ? 'translateY(0)' : 'translateY(100px)'
      }}
    >
      {message}
    </View>
  )
}
