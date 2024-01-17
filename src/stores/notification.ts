import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

interface NotificationState {
  tab: number
  setTab: (val: number) => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  tab: 0,
  setTab: (val) => set({ tab: val })
}))
if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Notification', useNotificationStore)
}
