import { useSearchStore } from '@/stores/search'
import { colorBlackPrimary, colorBlackSecondary } from '@/styles/variables'
import { ScrollView, View } from '@tarojs/components'
import { CSSProperties } from 'react'

const tabList = [
  {
    title: '为你推荐',
    key: 0
  },
  {
    title: '趋势',
    key: 1
  },
  {
    title: '新闻',
    key: 2
  },
  {
    title: '体育',
    key: 3
  },
  {
    title: '娱乐',
    key: 4
  }
]

export const NAV_FOOTER_HEIGHT = 40
const TAB_WIDTH = 80
export const NavigationFooter = () => {
  const [tab, setTab] = useSearchStore((state) => [state.tab, state.setTab])
  const tabIndex = tabList.findIndex((item) => item.key === tab)
  const dotWrapperLeft = tabIndex * TAB_WIDTH
  const dotWrapperStyle: CSSProperties = {
    left: dotWrapperLeft,
    width: TAB_WIDTH
  }
  return (
    <ScrollView
      className="text-[15px]"
      scrollX
      enhanced
      showScrollbar={false}
      scrollLeft={dotWrapperLeft}
    >
      <View className="flex items-center relative">
        {tabList.map((item) => (
          <View
            key={item.key}
            className="flex-shrink-0 flex-center"
            style={{
              height: NAV_FOOTER_HEIGHT,
              width: TAB_WIDTH,
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
      </View>
    </ScrollView>
  )
}
