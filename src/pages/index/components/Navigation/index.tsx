import { CSSProperties } from 'react'
import ImmersionTop from '@/components/ImmersionNavigation'
import { Image, Text, View } from '@tarojs/components'
import IconFont from '@/components/Iconfont'
import { isH5 } from '@/utils'
import { useTabStore, TAB, TAB_RECOMMEND, TAB_FOLLOWING } from '@/stores/home'
import { useUserInfoStore } from '@/stores/app'
import styles from './index.module.scss'

const SettingButton = () => {
  return (
    <View className={styles.setting_btn}>
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
  const [tab, setTab] = useTabStore((state) => [state.tab, state.setTab])
  const tabIndex = tabList.findIndex((item) => item.key === tab)
  const dotWrapperLeft = (tabIndex / tabList.length) * 100 + '%'
  const dotWrapperWidth = 100 / tabList.length + '%'
  const dotWrapperStyle: CSSProperties = {
    left: dotWrapperLeft,
    width: dotWrapperWidth
  }
  return (
    <View className={styles.footer}>
      {tabList.map((item) => (
        <View
          key={item.key}
          className={styles.tab}
          style={{ height: FOOTER_HEIGHT + 'px' }}
          onClick={() => setTab(item.key)}
        >
          {item.title}
        </View>
      ))}
      {/* 不要在函数内再创建函数式组件，因为每次都会创建函数，相当于一个新的组件，不会复用元素，因此transition会失效 */}
      <View className={styles.dot_wrapper} style={dotWrapperStyle}>
        <View className={styles.dot} />
      </View>
    </View>
  )
}

export default function NavigationBar() {
  const avatar = useUserInfoStore().userInfo.avatar
  return (
    <ImmersionTop footer={<Footer />} footerHeight={FOOTER_HEIGHT}>
      <Image src={avatar} className={styles.avatar_icon} />
      <Text style={{ margin: '0 auto' }}>Y</Text>
      {isH5 ? <SettingButton /> : <View className={styles.setting} />}
    </ImmersionTop>
  )
}
