import { CSSProperties } from 'react'
import { Image, Input, ScrollView, View } from '@tarojs/components'
import { isH5 } from '@/utils'
import { useHomeStore } from '@/stores/home'
import { useSearchStore } from '@/stores/search'
import { useUserInfoStore } from '@/stores/app'
import Icon from '@/components/Icon'
import BaseNavigationBar from '@/components/BaseNavigationBar'

const avatarSize = 36
const SettingButton = () => {
  return (
    <View
      className="flex-center"
      style={{ height: avatarSize, width: avatarSize }}
    >
      <Icon name="home-setting" size={24} />
    </View>
  )
}

const SearchBar = (props: { placeholder?: string }) => {
  return (
    <View
      className="bg-[#eff3f4] rounded-full flex-1 flex items-center"
      style={{
        margin: `0 20px`
      }}
    >
      <Icon name="search" className="ml-10" size={22} />
      <Input placeholder={props.placeholder || ''} className="px-12 py-4" />
    </View>
  )
}

export default function SearchNavigationBar(props: {
  placeholder?: string
  footer?: any
  footerHeight?: any
}) {
  const avatar = useUserInfoStore((state) => state.userInfo.avatar)
  const setShowMine = useHomeStore((state) => state.setShowMine)
  return (
    <BaseNavigationBar footer={props.footer} footerHeight={props.footerHeight}>
      <View
        className="h-full flex items-center px-10"
        style={{ paddingRight: isH5 ? 10 : 0 }}
      >
        <Image
          src={avatar}
          className={`size-${avatarSize} rounded-full`}
          style={{ width: avatarSize, height: avatarSize }}
          onClick={() => setShowMine(true)}
        />
        <SearchBar placeholder={props.placeholder} />
        {/* TODO H5设置按钮放在其他地方 */}
        {isH5 ? <SettingButton /> : null}
      </View>
    </BaseNavigationBar>
  )
}
