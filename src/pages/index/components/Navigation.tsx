import ImmersionTop from '@/components/ImmersionNavigation'
import { Image, Text, View } from '@fower/taro'
import SettingIcon from '@/assets/icons/index/setting.png'
import { isH5 } from '@/utils'
import { useState } from 'react'

const profile =
  'https://pubfile.bluemoon.com.cn/group1/new/scrm/961483605c85131353b062f1c8f60104.jpeg'

const SettingButton = () => {
  return (
    <View mr-10px p-10px flex>
      <Image src={SettingIcon} circle-20px />
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
const Footer = (props: { tabKey: TAB_KEY }) => {
  const dotStyle: CSSObject = {
    position: 'absolute',
    bottom: '0px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '56px',
    height: '4px',
    borderRadius: '2px',
    // TODO 主题颜色
    backgroundColor: 'rgb(29, 155, 240)'
  }
  return (
    <View flex toCenterY>
      {tabList.map((item) => (
        <View
          key={item.key}
          flex-1
          flex
          toCenter
          relative
          text-15px
          css={{ height: FOOTER_HEIGHT + 'px' }}
        >
          {item.title}
          {props.tabKey === item.key && <View css={dotStyle} />}
        </View>
      ))}
    </View>
  )
}

export default function NavigationBar() {
  const [tabKey] = useState<TAB_KEY>(0)
  return (
    <ImmersionTop
      footer={<Footer tabKey={tabKey} />}
      footerHeight={FOOTER_HEIGHT}
    >
      <Image src={profile} circle-40px ml-10px />
      <Text ml-auto mr-auto>
        Y
      </Text>
      {isH5 ? <SettingButton /> : <View circle-30px mr-10px />}
    </ImmersionTop>
  )
}
