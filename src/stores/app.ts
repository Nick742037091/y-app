import { getUserInfo } from '@/services/app'
import { UserInfo } from '@/services/app/types'
import { getCurrentPagePath } from '@/utils'
import { clearToken, getToken, setToken } from '@/utils/storage'
import Taro from '@tarojs/taro'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

interface UserInfoState {
  token: string
  userInfo: UserInfo
  isLogining: boolean
  queryUserInfo: () => void
  checkLogin: () => void
  setLogining: (isLogining: boolean) => void
  navigateToLogin: () => void
  setToken: (token: string) => void
  clearToken: () => void
}

const LoginPagePath = '/pages/login/index'

export const useAppStore = create<UserInfoState>((set, get) => {
  return {
    token: getToken(),
    userInfo: {
      avatar: '',
      userName: '',
      fullName: '',
      followerNum: 0,
      followingNum: 0
    },
    isLogining: false,
    queryUserInfo: async () => {
      const { code, data } = await getUserInfo()
      if (code !== 0) return
      set({ userInfo: data })
    },
    checkLogin: () => {
      // 避免重复跳转登录页
      const pagePath = getCurrentPagePath()
      if (!pagePath || pagePath === LoginPagePath) return true
      if (get().isLogining) return true
      if (!get().token) {
        get().navigateToLogin()
        return false
      }
      return true
    },
    navigateToLogin() {
      // TODO 退出登录页需要重置
      get().setLogining(true)
      Taro.navigateTo({
        url: LoginPagePath
      })
    },
    setLogining(isLogining: boolean) {
      set({ isLogining })
    },
    setToken(token: string) {
      setToken(token)
      set({ token })
    },
    clearToken() {
      clearToken()
      set({ token: '' })
    }
  }
})

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('UserInfo', useAppStore)
}
