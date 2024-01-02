import { getUserInfo } from '@/services/app'
import { UserInfo } from '@/services/app/types'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

interface UserInfoState {
  userInfo: UserInfo
  queryUserInfo: () => void
}

export const useUserInfoStore = create<UserInfoState>((set) => ({
  userInfo: {
    avatar: '',
    userName: '',
    fullName: '',
    followerNum: 0,
    followingNum: 0
  },
  queryUserInfo: async () => {
    const { code, data } = await getUserInfo()
    if (code !== 0) return
    set({ userInfo: data })
  }
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('UserInfo', useUserInfoStore)
}
