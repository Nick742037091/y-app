import { PostItem } from '@/services/post/types'
import IconFont from '@/components/Iconfont'
import { Image, Text, View } from '@tarojs/components'
import styles from './index.module.scss'

export function PostList(props: { postList: PostItem[] }) {
  if (!props.postList) return null
  return (
    <>
      {props.postList.map((item, index) => (
        <View key={index} className={styles.post_item}>
          <Image src={item.avatar} className={styles.avatar} />
          <View className="flex-1 flex flex-column">
            <View>
              <Text style={{ fontWeight: 'bold' }}>{item.nickName}</Text>
              <Text style={{ marginLeft: '4px' }}>@{item.fullname}</Text>
            </View>
            <Text>{item.content}</Text>
            <PostBottomButtons post={item} />
          </View>
        </View>
      ))}
    </>
  )
}

const PostBottomButtons = (props: { post: PostItem }) => {
  const { post } = props
  return (
    <View className={styles.post_bottom}>
      <View className={styles.post_bottom_btn}>
        <IconFont name="post-comment" />
        <Text className={styles.text}>{post.commentNum}</Text>
      </View>
      <View className={styles.post_bottom_btn}>
        <IconFont name="post-share" />
        <Text className={styles.text}>{post.shareNum}</Text>
      </View>
      <View className={styles.post_bottom_btn}>
        <IconFont name="post-like" />
        <Text className={styles.text}>{post.likeNum}</Text>
      </View>
      <View className={styles.post_bottom_btn}>
        <IconFont name="post-view" />
        <Text className={styles.text}>{post.viewNum}</Text>
      </View>
    </View>
  )
}
