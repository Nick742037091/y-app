import { CSSProperties, useState } from 'react'
import BaseNavigationBar from '@/components/BaseNavigationBar'
import { Image, View } from '@tarojs/components'
import { isH5 } from '@/utils'
import { useHomeStore } from '@/stores/home'
import { useNotificationStore } from '@/stores/notification'
import { useUserInfoStore } from '@/stores/app'
import Icon from '@/components/Icon'

const avatarSize = 36
const SettingButton = () => {
  return (
    <View
      className="flex-center ml-auto"
      style={{ height: avatarSize, width: avatarSize }}
    >
      <Icon name="home-setting" size={24} />
    </View>
  )
}

const tabList = [
  {
    title: '全部',
    key: 0
  },
  {
    title: '已认证',
    key: 1
  },
  {
    title: '提及',
    key: 2
  }
]

const FOOTER_HEIGHT = 40
const Footer = (props: { onRefresh: () => void }) => {
  const [tab, setTab] = useNotificationStore((state) => [
    state.tab,
    state.setTab
  ])
  const tabIndex = tabList.findIndex((item) => item.key === tab)
  const dotWrapperLeft = (tabIndex / tabList.length) * 100 + '%'
  const dotWrapperWidth = 100 / tabList.length + '%'
  const dotWrapperStyle: CSSProperties = {
    left: dotWrapperLeft,
    width: dotWrapperWidth
  }
  return (
    <View className="flex-center relative text-[15px]">
      {tabList.map((item) => (
        <View
          key={item.key}
          className="flex-1 flex-center"
          style={{ height: FOOTER_HEIGHT }}
          onClick={() => setTab(item.key)}
        >
          {item.title}
        </View>
      ))}
      {/* 不要在函数内再创建函数式组件，因为每次都会创建函数，相当于一个新的组件，不会复用元素，因此transition会失效 */}
      <View
        className="flex-center absolute bottom-0 transition-[left_0.3s_ease]"
        style={dotWrapperStyle}
      >
        <View className="w-56 h-4 rounded-[2px] bg-primary" />
      </View>
    </View>
  )
}

export default function NavigationBar(props: { onRefresh: () => void }) {
  const avatar = useUserInfoStore((state) => state.userInfo.avatar)
  const setShowMine = useHomeStore((state) => state.setShowMine)
  return (
    <BaseNavigationBar
      footer={<Footer onRefresh={props.onRefresh} />}
      footerHeight={FOOTER_HEIGHT}
      title="通知"
    >
      <View className="h-full flex items-center px-10">
        <Image
          src={avatar}
          className="rounded-full"
          // tailwind类不要使用动态值
          style={{ width: avatarSize, height: avatarSize }}
          onClick={() => setShowMine(true)}
        />
        {/* TODO H5设置按钮放在其他地方 */}
        {isH5 ? <SettingButton /> : null}
      </View>
    </BaseNavigationBar>
  )
}