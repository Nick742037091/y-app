import ImmersionTop from '@/components/ImmersionNavigation'
import { Image, Text, View } from '@fower/taro'
import SettingIcon from '@/assets/icons/index/setting.png'
import { isH5 } from '@/utils'

export default function NavigationBar(props: {}) {
  const profile =
    'https://pubfile.bluemoon.com.cn/group1/new/scrm/961483605c85131353b062f1c8f60104.jpeg'
  return (
    <ImmersionTop>
      <Image src={profile} circle-40px ml-10px />
      <Text ml-auto mr-auto>
        Y
      </Text>
      {isH5 ? (
        <Image src={SettingIcon} circle-30px mr-10px />
      ) : (
        <View circle-30px mr-10px />
      )}
    </ImmersionTop>
  )
}
