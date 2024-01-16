import { Trending } from '@/services/post/types'
import { View } from '@tarojs/components'
import styles from './index.module.scss'

export default function (props: { list: Trending[] }) {
  return (
    <>
      {props.list.map((item, index) => (
        <View key={index} className={styles.trending_item}>
          <View className="source">
            {index + 1} · {item.source}的趋势
          </View>
          <View className="text-[18px] font-bold">{item.keyword}</View>
          <View className="content">{item.postNums}帖子</View>
        </View>
      ))}
    </>
  )
}
