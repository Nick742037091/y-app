import { useAppStore } from '@/stores/app'
import { ActionSheet, Popup } from '@nutui/nutui-react-taro'
import { ScrollView, Text, View } from '@tarojs/components'
import { useState } from 'react'
import { useStatusBarHeight } from '@/utils/hooks/page'
import { useHomeStore } from '@/stores/home'
import { tabbarHeightCssVar } from '@/utils'
import Taro from '@tarojs/taro'
import { logout } from '@/services/auth'
import styles from './index.module.scss'
import Icon, { IconNames } from '../Icon'
import {
  PrimaryColorKey,
  primaryColorMap,
  useThemeStore
} from '../ThemeProvider'
import UserAvatar from '../UserAvatar'

const Actions = (props: { changeTheme: () => void }) => {
  const setShowMine = useHomeStore((state) => state.setShowMine)
  const list = [
    { key: 'user', label: '个人资料', iconName: 'user' as IconNames },
    // { key: 'bookmark', label: '书签', iconName: 'bookmark' as IconNames },
    // { key: 'list', label: '列表', iconName: 'list' as IconNames },
    { key: 'theme', label: '主题', iconName: 'theme' as IconNames }
  ]
  const isLogin = useAppStore((state) => state.isLogin)()
  if (isLogin) {
    list.push({
      key: 'logout',
      label: '退出登录',
      iconName: 'logout' as IconNames
    })
  }
  const handleClick = (key: string) => {
    switch (key) {
      case 'user':
        Taro.navigateTo({ url: '/pages/profile/index' })
        break
      case 'bookmark':
        break
      case 'list':
        break
      case 'theme':
        props.changeTheme()
        break
      case 'logout':
        handleLogout()
        setShowMine(false)
        break
      default:
        break
    }
  }

  const appStore = useAppStore()
  const handleLogout = async () => {
    const { code } = await logout()
    if (code !== 0) return
    appStore.clearToken()
    appStore.navigateToLogin()
  }

  return (
    <>
      {list.map((item, index) => {
        return (
          <View key={item.key} onClick={() => handleClick(item.key)}>
            <View className="flex items-center p-16">
              <Icon name={item.iconName} size={24} />
              <View className="ml-24 text-[20px] color-black font-bold">
                {item.label}
              </View>
            </View>
            {index === list.length - 1 && (
              <View className="bg-[#eff3f4] h-1 ml-16 mr-16" />
            )}
          </View>
        )
      })}
    </>
  )
}

/**
 * 选择主题弹窗
 */
const SelectTheme = (props: { visible: boolean; close: () => void }) => {
  // 设置主题
  const setTheme = useThemeStore((state) => state.setTheme)
  const handleSelectTheme = (key: string) => {
    setTheme(key)
    props?.close()
  }
  const options = [
    { name: '蓝色', key: 'blue' },
    { name: '绿色', key: 'green' },
    { name: '红色', key: 'red' },
    { name: '橙色', key: 'orange' },
    { name: '灰色', key: 'gray' }
  ] as { name: string; key: PrimaryColorKey }[]

  return (
    <ActionSheet
      title="选择主题颜色"
      visible={props.visible}
      onCancel={() => props?.close()}
      className="z-[2000]"
    >
      {options.map((item, index) => {
        return (
          <View
            key={index}
            className="text-white h-50 flex-center"
            style={{ backgroundColor: primaryColorMap[item.key] }}
            onClick={() => handleSelectTheme(item.key)}
          >
            {item.name}
          </View>
        )
      })}
      {/* 填充tabbar高度，避免覆盖 */}
      <View style={{ height: tabbarHeightCssVar }}></View>
    </ActionSheet>
  )
}

export default function Mine() {
  const { showMine, setShowMine } = useHomeStore((state) => ({
    showMine: state.showMine,
    setShowMine: state.setShowMine
  }))
  const userInfo = useAppStore((state) => state.userInfo)
  const { statusBarHeight } = useStatusBarHeight()

  const [showSelectTheme, setShowSelectTheme] = useState(false)
  const handleChangeTheme = () => {
    setShowSelectTheme(true)
    setShowMine(false)
  }

  const handleClickAvatar = () => {
    Taro.navigateTo({
      url: '/pages/profile/index'
    })
  }
  return (
    <>
      <Popup
        lockScroll
        visible={showMine}
        position="left"
        className="h-screen w-[250px] flex flex-col overflow-hidden"
        style={{ paddingTop: statusBarHeight }}
        onClose={() => setShowMine(false)}
      >
        {/* lockScroll与ScrollView配合使用 */}
        <ScrollView
          scrollY
          // 设置高度，不会覆盖状态栏
          style={{ height: `calc(100vh - ${statusBarHeight}px)` }}
        >
          <View className="p-16 text-[15px]">
            <View className="flex items-center">
              <UserAvatar size={40} onClick={handleClickAvatar} />
              <Icon className={styles.icon_add} name="plus" />
            </View>
            <View className="font-bold text-black mt-4 ml-6">
              {userInfo.userName}
            </View>
            {userInfo.fullName && (
              <View className="text-gray">@{userInfo.fullName}</View>
            )}
            {/* 待完成 */}
            {/* <View className="mt-12  text-gray flex items-center">
              <View>
                <Text className="text-black mr-5">{userInfo.followingNum}</Text>
                正在关注
              </View>
              <View className="ml-20">
                <Text className="text-black mr-5">{userInfo.followerNum}</Text>
                关注者
              </View>
            </View> */}
          </View>
          <Actions changeTheme={handleChangeTheme} />
        </ScrollView>
      </Popup>
      <SelectTheme
        visible={showSelectTheme}
        close={() => setShowSelectTheme(false)}
      />
    </>
  )
}
