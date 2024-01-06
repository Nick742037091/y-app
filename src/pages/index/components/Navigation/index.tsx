import { CSSProperties } from 'react'
import ImmersionTop from '@/components/ImmersionNavigation'
import { Image, Text, View } from '@tarojs/components'
import IconFont from '@/components/Iconfont'
import { isH5 } from '@/utils'
import { useHomeStore, TAB, TAB_RECOMMEND, TAB_FOLLOWING } from '@/stores/home'
import { useUserInfoStore } from '@/stores/app'

const SettingBtnClassName = 'flex-center size-50 ml-10 p-10'
const SettingButton = () => {
  return (
    <View className={SettingBtnClassName}>
      <IconFont name="home-setting" size={20} />
    </View>
  )
}
const tabList: {
  title: string
  key: TAB
}[] = [
  {
    title: '为你推荐',
    key: TAB_RECOMMEND
  },
  {
    title: '正在关注',
    key: TAB_FOLLOWING
  }
]

const FOOTER_HEIGHT = 40
const Footer = () => {
  const [tab, setTab] = useHomeStore((state) => [state.tab, state.setTab])
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
          style={{ height: FOOTER_HEIGHT + 'px' }}
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

export default function NavigationBar() {
  const avatar = useUserInfoStore((state) => state.userInfo.avatar)
  const setShowMine = useHomeStore((state) => state.setShowMine)
  return (
    <ImmersionTop footer={<Footer />} footerHeight={FOOTER_HEIGHT}>
      <Image
        src={avatar}
        className="size-40 rounded-full ml-10"
        onClick={() => setShowMine(true)}
      />
      <Text className="mx-auto text-[22px]">Y</Text>
      {isH5 ? <SettingButton /> : <View className={SettingBtnClassName} />}
    </ImmersionTop>
  )
}
