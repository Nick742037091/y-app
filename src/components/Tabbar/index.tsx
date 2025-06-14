import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import clsx from 'clsx'
import homeIcon from '@/assets/icons/tabbar/home.png'
import homeActiveIcon from '@/assets/icons/tabbar/homeActive.png'
import searchIcon from '@/assets/icons/tabbar/search.png'
import searchActiveIcon from '@/assets/icons/tabbar/searchActive.png'
import groupsIcon from '@/assets/icons/tabbar/groups.png'
import groupsActiveIcon from '@/assets/icons/tabbar/groupsActive.png'
import notificationsIcon from '@/assets/icons/tabbar/notifications.png'
import notificationsActiveIcon from '@/assets/icons/tabbar/notificationsActive.png'
import { getCurrentPagePath } from '@/utils'

const tabList = [
  {
    pagePath: '/pages/index/index',
    text: '首页',
    iconPath: homeIcon,
    selectedIconPath: homeActiveIcon
  },
  {
    pagePath: '/pages/search/index',
    text: '搜索',
    iconPath: searchIcon,
    selectedIconPath: searchActiveIcon
  },
  {
    pagePath: '/pages/groups/index',
    text: '社群',
    iconPath: groupsIcon,
    selectedIconPath: groupsActiveIcon
  },
  {
    pagePath: '/pages/notifications/index',
    text: '通知',
    iconPath: notificationsIcon,
    selectedIconPath: notificationsActiveIcon
  }
]

export default function TabBar() {
  const currentPath = getCurrentPagePath()
  const handleTabClick = (pagePath: string) => {
    if (currentPath === pagePath) return
    Taro.redirectTo({
      url: pagePath
    })
  }

  return (
    <View>
      <View className="h-[50rpx]" />
      <View
        className={clsx(
          'fixed bottom-0 left-0 right-0',
          'flex items-center box-border',
          'bg-white h-[50rpx] border-t border-[#E5E5E5]'
        )}
      >
        {tabList.map((tab) => (
          <View
            key={tab.pagePath}
            className={clsx(
              'flex-1 flex flex-col items-center justify-center',
              currentPath === tab.pagePath ? 'tab-item active' : 'tab-item'
            )}
            onClick={() => handleTabClick(tab.pagePath)}
          >
            <Image
              className="w-[20rpx] h-[20rpx] mb-[2rpx]"
              src={
                currentPath === tab.pagePath
                  ? tab.selectedIconPath
                  : tab.iconPath
              }
            />
            <Text className="text-[12rpx]">{tab.text}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
