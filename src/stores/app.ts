import { getUserInfo } from '@/services/app'
import { UserInfo } from '@/services/app/types'
import { getCurrentPagePath } from '@/utils'
import { clearToken, getToken, setToken } from '@/storage'
import Taro from '@tarojs/taro'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

interface UserInfoState {
  token: string
  isLogin: () => boolean
  userInfo: UserInfo
  setUserInfo: (userInfo: UserInfo) => void
  queryUserInfo: () => void
  checkLogin: () => void
  navigateToLogin: () => void
  setToken: (token: string) => void
  clearToken: () => void
}

const LoginPagePath = '/pages/login/index'
export const isLoginPage = () => {
  const pagePath = getCurrentPagePath()
  return pagePath === LoginPagePath
}

export const useAppStore = create<UserInfoState>((set, get) => {
  return {
    token: getToken(),
    isLogin: () => {
      return !!get().token
    },
    userInfo: {
      id: 0,
      avatar: '',
      userName: '',
      fullName: '',
      followerNum: 0,
      followingNum: 0,
      profileBanner: '',
      description: '',
      createTime: ''
    } as UserInfo,
    setUserInfo: (userInfo: UserInfo) => {
      set({ userInfo })
    },
    queryUserInfo: async () => {
      const { code, data } = await getUserInfo()
      if (code !== 0) return
      set({ userInfo: data })
    },
    checkLogin: () => {
      if (!get().token) {
        get().navigateToLogin()
        return false
      }
      return true
    },
    navigateToLogin() {
      // 避免重复跳转登录页
      if (isLoginPage()) return
      Taro.reLaunch({
        url: LoginPagePath
      })
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
  mountStoreDevtool('App', useAppStore)
}
