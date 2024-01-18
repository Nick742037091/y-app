import Mine from '@/components/Mine'
import ThemeProvider from '@/components/ThemeProvider'
import SearchNavigationBar from '@/components/SearchNavigationBar'
import { View } from '@tarojs/components'
import { tabPageHeight } from '@/utils'

definePageConfig({
  navigationBarTitleText: '消息',
  navigationStyle: 'custom',
  onReachBottomDistance: 50
})

export default function Index() {
  return (
    <ThemeProvider>
      <View className="flex flex-col" style={{ height: tabPageHeight }}>
        <SearchNavigationBar placeholder="搜索私信" />
        <View className="flex-1 flex flex-col justify-center p-20">
          <View className="text-[30px] font-bold">欢迎来到你的收件箱!</View>
          <View className="mt-20">
            在 Y 上和别人进行私密聊天，大家互发私信，分享帖子等。
          </View>
          <View className="flex mt-20">
            <View className="px-20 py-10 bg-black text-white rounded-full">
              写一封私信
            </View>
          </View>
        </View>
        <Mine />
      </View>
    </ThemeProvider>
  )
}
