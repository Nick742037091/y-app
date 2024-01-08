import { useUserInfoStore } from '@/stores/app'
import { Popup } from '@nutui/nutui-react-taro'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import { useStatusBarHeight } from '@/utils/hooks/page'
import IconFont, { IconNames } from '@/components/IconFont'
import styles from './index.module.scss'

const Actions = () => {
  const list = [
    { key: 'user', label: 'Profile', iconName: 'user' as IconNames },
    { key: 'list', label: 'Lists', iconName: 'list' as IconNames },
    { key: 'bookmark', label: 'BookMarks', iconName: 'bookmark' as IconNames },
    { key: 'communities', label: 'Communities', iconName: 'team' as IconNames }
  ]

  return (
    <>
      {list.map((item, index) => {
        return (
          <View key={item.key}>
            <View className="flex items-center p-16">
              <IconFont name={item.iconName} size={24} />
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

export default function Mine(props: { visible: boolean; onClose: () => void }) {
  const { statusBarHeight } = useStatusBarHeight()
  const userInfo = useUserInfoStore((state) => state.userInfo)
  return (
    <Popup
      lockScroll
      visible={props.visible}
      position="left"
      className="h-screen w-280 flex flex-col overflow-hidden"
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
            <View className={styles.icon_add}>
              <IconFont name="plus" />
            </View>
          </View>
          <View className="font-bold text-black">{userInfo.userName}</View>
          <View className=" text-info">@{userInfo.fullName}</View>
          <View className="mt-12  text-info flex items-center">
            <View>
              <Text className="text-black mr-5">{userInfo.followingNum}</Text>
              Following
            </View>
            <View className="ml-20">
              <Text className="text-black mr-5">{userInfo.followerNum}</Text>
              Followers
            </View>
          </View>
        </View>
        <Actions />
      </ScrollView>
    </Popup>
  )
}
