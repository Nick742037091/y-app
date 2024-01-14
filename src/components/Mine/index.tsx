import { useUserInfoStore } from '@/stores/app'
import { ActionSheet, Popup } from '@nutui/nutui-react-taro'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import { useState } from 'react'
import { useStatusBarHeight } from '@/utils/hooks/page'
import { useHomeStore } from '@/stores/home'
import styles from './index.module.scss'
import Icon, { IconNames } from '../Icon'
import { useThemeStore } from '../ThemeProvider'

const Actions = (props: { changeTheme: () => void }) => {
  const list = [
    { key: 'user', label: '个人资料', iconName: 'user' as IconNames },
    { key: 'bookmark', label: '书签', iconName: 'bookmark' as IconNames },
    { key: 'list', label: '列表', iconName: 'list' as IconNames },
    { key: 'theme', label: '主题', iconName: 'theme' as IconNames }
  ]
  const handleClick = (key: string) => {
    switch (key) {
      case 'user':
        break
      case 'bookmark':
        break
      case 'list':
        break
      case 'theme':
        props.changeTheme()
        break
      default:
        break
    }
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
  const handleSelectTheme = (item: any) => {
    setTheme(item.key)
    props?.close()
  }
  return (
    <ActionSheet
      title="选择主题颜色"
      visible={props.visible}
      options={[
        { name: '蓝色', key: 'blue' },
        { name: '绿色', key: 'green' },
        { name: '红色', key: 'red' },
        { name: '橙色', key: 'orange' }
      ]}
      onSelect={handleSelectTheme}
      onCancel={() => props?.close()}
    />
  )
}

export default function Mine(props: { visible: boolean; onClose: () => void }) {
  const setShowMine = useHomeStore((state) => state.setShowMine)
  const userInfo = useUserInfoStore((state) => state.userInfo)
  const { statusBarHeight } = useStatusBarHeight()

  const [showSelectTheme, setShowSelectTheme] = useState(false)
  const handleChangeTheme = () => {
    setShowSelectTheme(true)
    setShowMine(false)
  }
  return (
    <>
      <Popup
        lockScroll
        visible={props.visible}
        position="left"
        className="h-screen w-250 flex flex-col overflow-hidden"
        style={{ paddingTop: statusBarHeight }}
        onClose={props.onClose}
      >
        {/* lockScroll与ScrollView配合使用 */}
        <ScrollView
          scrollY
          // 设置高度，不会覆盖状态栏
          style={{ height: `calc(100vh - ${statusBarHeight}px)` }}
        >
          <View className="p-16 text-[15px]">
            <View className="flex items-center">
              <Image src={userInfo.avatar} className="size-40 rounded-full" />
              <Icon className={styles.icon_add} name="plus" />
            </View>
            <View className="font-bold text-black">{userInfo.userName}</View>
            <View className=" text-info">@{userInfo.fullName}</View>
            <View className="mt-12  text-info flex items-center">
              <View>
                <Text className="text-black mr-5">{userInfo.followingNum}</Text>
                正在关注
              </View>
              <View className="ml-20">
                <Text className="text-black mr-5">{userInfo.followerNum}</Text>
                关注者
              </View>
            </View>
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
