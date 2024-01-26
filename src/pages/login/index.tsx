import { Input, View } from '@tarojs/components'
import { useState } from 'react'
import ThemeProvider from '@/components/ThemeProvider'
import Icon from '@/components/Icon'
import classNames from 'classnames'
import { login } from '@/services/auth'

import { useAppStore } from '@/stores/app'
import Taro from '@tarojs/taro'
import { waitFor } from '@/utils'
import SnackBar, { useSnackBarStore } from '@/components/SnackBar'
import styles from './index.module.scss'

definePageConfig({
  navigationBarTitleText: '登录'
})

const LoginInput = (props: {
  value: string
  onInput: (value: string) => void
  placeholder?: string
  isChecked?: boolean
}) => {
  const [isFocus, setIsFocus] = useState(false)
  return (
    <View
      className={classNames(
        styles.login_input_wrapper,
        isFocus && styles.focus
      )}
    >
      <Input
        className={styles.login_input}
        placeholder={props.placeholder}
        value={props.value}
        onInput={(e) => props.onInput(e.detail.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {props.isChecked && (
        <View className="rounded-full bg-success size-18 flex-center">
          <Icon name="check" size={12} color="white" />
        </View>
      )}
    </View>
  )
}
export default function Index() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const isUserNameChecked = userName !== ''
  const isPasswordChecked = password !== ''
  const setToken = useAppStore((state) => state.setToken)
  const setLogining = useAppStore((state) => state.setLogining)
  const { showSuccess, showError } = useSnackBarStore((state) => ({
    showSuccess: state.showSuccess,
    showError: state.showError
  }))

  const handleLogin = async () => {
    const { code, data, msg } = await login({ userName, password })
    if (code === 0) {
      setToken(data.token)
      setLogining(false)
      Taro.navigateBack({
        success: async () => {
          await waitFor(300)
          showSuccess('登录成功')
        }
      })
    } else {
      showError(msg)
    }
  }

  return (
    <ThemeProvider className="h-[100vh] flex flex-col">
      <View className="text-[30px] font-bold my-20 text-center">Y</View>
      <View className="text-[20px] font-bold mt-80 mb-20 text-center">
        查看世界正在发生的新鲜事
      </View>
      <LoginInput
        value={userName}
        placeholder="账号"
        onInput={setUserName}
        isChecked={isUserNameChecked}
      />
      <LoginInput
        value={password}
        placeholder="密码"
        onInput={setPassword}
        isChecked={isPasswordChecked}
      />
      <View className="mt-40 flex-center">
        <View
          className="w-80 h-40 flex-center rounded-[10px] text-white bg-black text-[20px]"
          onClick={handleLogin}
        >
          登录
        </View>
      </View>
      <SnackBar />
    </ThemeProvider>
  )
}
