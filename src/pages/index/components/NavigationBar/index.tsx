import { CSSProperties, useState } from 'react'
import BaseNavigationBar from '@/components/BaseNavigationBar'
import { View } from '@tarojs/components'
import { isH5 } from '@/utils'
import { useHomeStore, TAB, TAB_RECOMMEND, TAB_FOLLOWING } from '@/stores/home'
import { getNewPosterList } from '@/services/post'
import UserAvatar from '@/components/UserAvatar'
import CascadeAvatars from '@/components/CascadeAvatars/index'
import { useRequest } from 'taro-hooks'
import Taro, { usePageScroll } from '@tarojs/taro'
import Icon from '@/components/Icon'
import { colorBlackPrimary, colorBlackSecondary } from '@/styles/variables'
import { useAppStore } from '@/stores/app'
import styles from './index.module.scss'

const avatarSize = 36

/**
 * 滚动到顶组件
 */
const ScrollToTop = (props: { onClick: () => void }) => {
  const [scrollTop, setScrollTop] = useState(0)
  usePageScroll((options) => {
    setScrollTop(options.scrollTop)
  })
  const appStore = useAppStore()
  const { data } = useRequest(
    async () => {
      if (!appStore.isLogin()) return []
      const result = await getNewPosterList()
      return result.code === 0 ? result.data : []
    }
    // 5秒刷新一次
    // { pollingInterval: 5000 }
  )
  // 滚动到顶不显示
  if (scrollTop === 0 || !data || data?.length === 0) return null
  let wrapperHeight = 32
  let wrapperBottom = 40
  if (!isH5) {
    const menuButtonRect = Taro.getMenuButtonBoundingClientRect()
    const statusBarHeight = Taro.getWindowInfo()?.statusBarHeight ?? 0
    wrapperHeight = menuButtonRect.height
    wrapperBottom = menuButtonRect.bottom - statusBarHeight
  }
  return (
    <View
      className={styles.recent_publish}
      style={{
        left: isH5 ? '50%' : '30%',
        height: wrapperHeight,
        bottom: -wrapperBottom
      }}
      onClick={props.onClick}
    >
      <Icon className="mr-4" name="arrow-up" color="white" size={20} />
      <CascadeAvatars
        list={(data || []).map((item) => item.avatar)}
        size={26}
      />
      <View className="ml-6 flex-shrink-0 flex w-45">已发布</View>
    </View>
  )
}
const tabList = [
  {
    title: '为你推荐',
    key: TAB_RECOMMEND
  },
  {
    title: '正在关注',
    key: TAB_FOLLOWING
  }
] as Array<{ title: string; key: TAB }>

const FOOTER_HEIGHT = 40
const Footer = (props: { onRefresh: () => void }) => {
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
          style={{
            height: FOOTER_HEIGHT,
            color: item.key === tab ? colorBlackPrimary : colorBlackSecondary,
            fontWeight: item.key === tab ? 'bold' : 'normal'
          }}
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
      <ScrollToTop onClick={props.onRefresh} />
    </View>
  )
}

export default function NavigationBar(props: { onRefresh: () => void }) {
  const setShowMine = useHomeStore((state) => state.setShowMine)
  // TODO tarbar待开发
  return (
    <BaseNavigationBar
      // footer={<Footer onRefresh={props.onRefresh} />}
      // footerHeight={FOOTER_HEIGHT}
      title="Y"
    >
      <View className="h-full flex items-center px-10">
        <UserAvatar size={avatarSize} onClick={() => setShowMine(true)} />
        {/* TODO H5设置按钮放在其他地方 */}
        {/* {isH5 ? <SettingButton /> : null} */}
      </View>
    </BaseNavigationBar>
  )
}
