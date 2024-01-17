import { Trending } from '@/services/post/types'
import { View } from '@tarojs/components'
import styles from './index.module.scss'

export default function (props: { list: Trending[] }) {
  return (
    <View className="flex flex-col">
      {props.list.map((item, index) => (
        <View key={index} className={styles.trending_item}>
          <View>{item.source}的趋势</View>
          <View className="text-[18px] font-bold mt-4">{item.keyword}</View>
          <View className="mt-4">{item.postNums}帖子</View>
        </View>
      ))}
    </View>
  )
}
