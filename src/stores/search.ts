import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

interface SearchState {
  tab: number
  setTab: (val: number) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  tab: 0,
  setTab: (val) => set({ tab: val })
}))
if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Search', useSearchStore)
}
