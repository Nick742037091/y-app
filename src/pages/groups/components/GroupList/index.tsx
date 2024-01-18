import { GroupListItem } from '@/services/group/types'
import CascadeAvatars from '@/components/CascadeAvatars'
import { Image, View } from '@tarojs/components'
import styles from './index.module.scss'

export default function (props: { list: GroupListItem[] }) {
  return (
    <View className="p-10">
      <View className="font-bold text-[18px] pb-4">发现新的社群</View>
      <View className="flex flex-col">
        {props.list.map((item, index) => (
          <View key={index} className={styles.group_item}>
            <Image
              src={item.pic}
              className="size-[100px] rounded-[8px] mr-10"
            />
            <View className="flex flex-col">
              <View className="font-bold text-[16px]">{item.groupName}</View>
              <View className="bold my-6">{item.memberNum} 成员</View>
              <View className="flex">
                <CascadeAvatars
                  list={item.memberList.map((member) => member.avatar)}
                  size={26}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
