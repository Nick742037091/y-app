import { Image, View } from '@tarojs/components'
import { isH5 } from '@/utils'
import { useUserInfoStore } from '@/stores/app'
import { useHomeStore } from '@/stores/home'
import BaseNavigationBar from '@/components/BaseNavigationBar'
import Icon from '@/components/Icon'

const avatarSize = 36

const IconWrapper = (props: { children: any }) => {
  return (
    <View
      className="flex-center mr-10"
      style={{ width: avatarSize, height: avatarSize }}
    >
      {props.children}
    </View>
  )
}

export default function NavigationBar() {
  const avatar = useUserInfoStore((state) => state.userInfo.avatar)
  const setShowMine = useHomeStore((state) => state.setShowMine)
  return (
    <BaseNavigationBar>
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
        <View className="text-[18px] ml-20 mr-auto">社群</View>
        <IconWrapper>
          <Icon name="search" size={24} />
        </IconWrapper>
        <IconWrapper>
          <Icon name="group-add" size={22} />
        </IconWrapper>
      </View>
    </BaseNavigationBar>
  )
}
