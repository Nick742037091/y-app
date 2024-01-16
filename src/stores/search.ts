import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

interface SearchState {
  tab: number
  setTab: (val: number) => void
  showMine: boolean
  setShowMine: (val: boolean) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  tab: 0,
  setTab: (val) => set({ tab: val }),
  showMine: false,
  setShowMine: (val) => set({ showMine: val })
}))
if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Search', useSearchStore)
}
