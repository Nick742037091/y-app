import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { TAB_KEY, TAB_RECOMMEND } from './components/Navigation'

export const HomeTabContext = createContext<
  [TAB_KEY, Dispatch<SetStateAction<TAB_KEY>>]
>([TAB_RECOMMEND, () => {}])
