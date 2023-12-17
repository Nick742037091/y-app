import ImmersionTop from '@/components/ImmersionNavigation'
import Icon from '@/components/Icon/index'
import { Image, Text, View } from '@fower/taro'
import { useContext } from 'react'
import { isH5 } from '@/utils'
import { colorBlue } from '@/styles/variables'
import { HomeTabContext } from '../context'

const profile =
  'https://pubfile.bluemoon.com.cn/group1/new/scrm/961483605c85131353b062f1c8f60104.jpeg'

const SettingButton = () => {
  return (
    <View w-40px h-40px flex toCenter mr-10px p-10px>
      <Icon name="home-setting" size={20} />
    </View>
  )
}

const FOOTER_HEIGHT = 40

export type TAB_KEY = 0 | 1
export const TAB_RECOMMEND: TAB_KEY = 0
export const TAB_FOLLOWING: TAB_KEY = 1
const tabList: {
  title: string
  key: TAB_KEY
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
const Footer = () => {
  const [tabKey, setTabKey] = useContext(HomeTabContext)

  const tabIndex = tabList.findIndex((item) => item.key === tabKey)
  const dotWrapperLeft = (tabIndex / tabList.length) * 100 + '%'
  const dotWrapperWidth = 100 / tabList.length + '%'
  const dotWrapperStyle: CSSObject = {
    position: 'absolute',
    bottom: '0px',
    left: dotWrapperLeft,
    width: dotWrapperWidth,
    transition: 'left 0.3s ease'
  }
  const dotStyle: CSSObject = {
    width: '56px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: colorBlue
  }
  return (
    <View flex toCenterY relative text-15px>
      {tabList.map((item) => (
        <View
          key={item.key}
          flex-1
          flex
          toCenter
          css={{ height: FOOTER_HEIGHT + 'px' }}
          onClick={() => setTabKey(item.key)}
        >
          {item.title}
        </View>
      ))}
      {/* 不要在函数内再创建函数式组件，因为每次都会创建函数，相当于一个新的组件，不会复用元素，因此transition会失效 */}
      <View css={dotWrapperStyle} flex toCenter>
        <View css={dotStyle} />
      </View>
    </View>
  )
}

export default function NavigationBar() {
  return (
    <ImmersionTop footer={<Footer />} footerHeight={FOOTER_HEIGHT}>
      <Image src={profile} circle-40px ml-10px />
      <Text ml-auto mr-auto>
        Y
      </Text>
      {isH5 ? <SettingButton /> : <View circle-30px mr-10px />}
    </ImmersionTop>
  )
}
