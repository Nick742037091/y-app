import { View } from '@tarojs/components'
import { isH5 } from '@/utils'
import { useHomeStore } from '@/stores/home'
import BaseNavigationBar from '@/components/BaseNavigationBar'
import Icon from '@/components/Icon'
import UserAvatar from '@/components/UserAvatar'

export default function NavigationBar() {
  const setShowMine = useHomeStore((state) => state.setShowMine)
  const avatarSize = 36
  const iconClass = `size-${avatarSize} mr-10 flex-center`
  return (
    <BaseNavigationBar>
      <View
        className="h-full flex items-center px-10"
        style={{ paddingRight: isH5 ? 10 : 0 }}
      >
        <UserAvatar size={avatarSize} onClick={() => setShowMine(true)} />
        <View className="text-[18px] ml-20 mr-auto">社群</View>
        <Icon name="search" size={24} className={iconClass} />
        <Icon name="group-add" size={22} className={iconClass} />
      </View>
    </BaseNavigationBar>
  )
}
