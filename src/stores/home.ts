import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

export type TAB = 0 | 1
export const TAB_RECOMMEND: TAB = 0
export const TAB_FOLLOWING: TAB = 1

interface TabState {
  tab: TAB
  setTab: (val: TAB) => void
  showMine: boolean
  setShowMine: (val: boolean) => void
}

export const useHomeStore = create<TabState>((set) => ({
  tab: TAB_RECOMMEND,
  setTab: (val) => set({ tab: val }),
  showMine: false,
  setShowMine: (val) => set({ showMine: val })
}))
if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Home', useHomeStore)
}
