import { Textarea, View } from '@tarojs/components'
import ThemeProvider, { useColorPrimary } from '@/components/ThemeProvider'
import UserAvatar from '@/components/UserAvatar'
import Icon, { IconNames } from '@/components/Icon'

import NavigationBar from './components/NavigationBar'
import styles from './index.module.scss'
import { platform } from 'os'

definePageConfig({
  navigationBarTitleText: '添加帖子',
  navigationStyle: 'custom'
})

const iconList: Array<{
  icon: IconNames
  key: string
}> = [
  { icon: 'picture', key: 'picture' },
  { icon: 'gif', key: 'gif' },
  { icon: 'list', key: 'list' },
  { icon: 'schedule', key: 'schedule' },
  { icon: 'location', key: 'location' }
]
// 函数组件名称不可缺少，会导致热更新失败
export default function Index() {
  const colorPrimary = useColorPrimary()

  return (
    <ThemeProvider className={styles.post_add}>
      <NavigationBar />
      <View className="px-16">
        <View className="flex">
          <UserAvatar size={40} className="mr-10 mt-8" />
          <Textarea
            maxlength={250}
            autoHeight
            className="flex-1 py-12 text-[20px] max-h-[70vh] min-h-[40vh]"
            placeholder="有什么新鲜事？"
          />
        </View>
      </View>
      <View className="flex items-center py-4 mx-10 border-t border-line">
        {iconList.map((item) => (
          <Icon
            key={item.key}
            className="size-36 flex-center"
            name={item.icon}
            size={24}
            color={colorPrimary}
          />
        ))}

        <View className="ml-auto size-28 flex-center rounded-full border-line border">
          <Icon name="plus" size={18} color={colorPrimary} />
        </View>
      </View>
    </ThemeProvider>
  )
}
