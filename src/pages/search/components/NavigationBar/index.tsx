import { CSSProperties } from 'react'
import { Image, Input, ScrollView, View } from '@tarojs/components'
import { isH5 } from '@/utils'
import { useSearchStore } from '@/stores/search'
import { useUserInfoStore } from '@/stores/app'
import Icon from '@/components/Icon'
import BaseNavigationBar from '@/components/BaseNavigationBar'

const avatarSize = 36
const SettingButton = () => {
  return (
    <View className={`flex-center size-${avatarSize}`}>
      <Icon name="home-setting" size={24} />
    </View>
  )
}

const tabList = [
  {
    title: '为你推荐',
    key: 0
  },
  {
    title: '趋势',
    key: 1
  },
  {
    title: '新闻',
    key: 2
  },
  {
    title: '体育',
    key: 3
  },
  {
    title: '娱乐',
    key: 4
  }
]

const FOOTER_HEIGHT = 40
const TAB_WIDTH = 80
const Footer = () => {
  const [tab, setTab] = useSearchStore((state) => [state.tab, state.setTab])
  const tabIndex = tabList.findIndex((item) => item.key === tab)
  const dotWrapperLeft = tabIndex * TAB_WIDTH
  const dotWrapperStyle: CSSProperties = {
    left: dotWrapperLeft,
    width: TAB_WIDTH
  }
  return (
    <ScrollView
      className="text-[15px]"
      scrollX
      enhanced
      showScrollbar={false}
      scrollLeft={dotWrapperLeft}
    >
      <View className="flex items-center relative">
        {tabList.map((item) => (
          <View
            key={item.key}
            className="flex-shrink-0 flex-center"
            style={{ height: FOOTER_HEIGHT, width: TAB_WIDTH }}
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
    </ScrollView>
  )
}

const SearchBar = () => {
  return (
    <View
      className="bg-[#eff3f4] rounded-full flex-1 flex items-center"
      style={{
        margin: `0 20px`
      }}
    >
      <Icon name="search" className="ml-10" size={22} />
      <Input placeholder="搜索Y" className="px-12 py-4" />
    </View>
  )
}

export default function NavigationBar() {
  const avatar = useUserInfoStore((state) => state.userInfo.avatar)
  const setShowMine = useSearchStore((state) => state.setShowMine)
  return (
    <BaseNavigationBar footer={<Footer />} footerHeight={FOOTER_HEIGHT}>
      <View
        className="h-full flex items-center px-10"
        style={{ paddingRight: isH5 ? 10 : 0 }}
      >
        <Image
          src={avatar}
          className={`size-${avatarSize} rounded-full`}
          onClick={() => setShowMine(true)}
        />
        <SearchBar />
        {isH5 ? <SettingButton /> : null}
      </View>
    </BaseNavigationBar>
  )
}
