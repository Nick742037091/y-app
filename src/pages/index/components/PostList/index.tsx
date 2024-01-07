import { PostItem } from '@/services/post/types'
import IconFont from '@/components/Iconfont'
import { Image, Text, View } from '@tarojs/components'
import styles from './index.module.scss'
import ImgList from '../PostImgList'

export function PostList(props: { postList: PostItem[] }) {
  if (!props.postList) return null
  return (
    <>
      {props.postList.map((item, index) => (
        <View key={index} className={styles.post_item}>
          <Image
            src={item.avatar}
            className="size-40 rounded-full mr-12 bg-placeholder"
            preview="true"
            lazyLoad
          />
          <View className="flex-1 flex flex-col">
            <View>
              <Text className="font-bold">{item.nickName}</Text>
              <Text className="ml-4">@{item.fullname}</Text>
            </View>
            <Text>{item.content}</Text>
            <ImgList list={item.imgList} />
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
    <View className="flex">
      <View className={styles.post_bottom_btn}>
        <IconFont name="post-comment" />
        <Text className="ml-4">{post.commentNum}</Text>
      </View>
      <View className={styles.post_bottom_btn}>
        <IconFont name="post-share" />
        <Text className="ml-4">{post.shareNum}</Text>
      </View>
      <View className={styles.post_bottom_btn}>
        <IconFont name="post-like" />
        <Text className="ml-4">{post.likeNum}</Text>
      </View>
      <View className={styles.post_bottom_btn}>
        <IconFont name="post-view" />
        <Text className="ml-4">{post.viewNum}</Text>
      </View>
    </View>
  )
}
