import dayjs from 'dayjs'
import { PostItem } from '@/services/post/types'
import Icon from '@/components/Icon'
import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { colorBlackPrimary } from '@/styles/variables'
import { useRef, useState } from 'react'
import styles from './index.module.scss'
import PostMedia from '../PostMedia'

export function PostList(props: {
  postList: PostItem[]
  onLike: (index: number) => void
}) {
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
          <View className="flex-1 flex flex-col ">
            <View>
              <Text className="font-bold ">{item.userName}</Text>
              <Text className="ml-4 text-info">@{item.fullName}</Text>
              <Text className="mx-5">·</Text>
              <Text>{dayjs(item.createTime).fromNow()}</Text>
            </View>
            <Text>{item.content}</Text>
            <PostMedia post={item} index={index} />
            <PostBottomButtons post={item} onLike={() => props.onLike(index)} />
          </View>
        </View>
      ))}
    </>
  )
}

// 点赞按钮
const LikeButton = (props: { post: PostItem; onClick: () => void }) => {
  const { post } = props
  const firstShow = useRef(true)
  const iconName = post.isLiked ? 'heart-fill' : 'heart'
  const iconColor = post.isLiked ? 'rgb(249, 24, 128)' : colorBlackPrimary
  // 首次加载不显示动画
  let activeClass = ''
  if (!firstShow.current) {
    activeClass = post.isLiked ? styles.active : styles.inactive
  }
  // 数字变化添加位移动画
  const [numChange, setNumChange] = useState(false)
  const handleClick = () => {
    if (firstShow.current) {
      firstShow.current = false
    }
    props.onClick()
    setNumChange(true)
    setTimeout(() => setNumChange(false), 300)
  }
  return (
    <View className={classNames(styles.post_bottom_btn)} onClick={handleClick}>
      <View className={classNames(styles.post_icon, activeClass)}>
        <Icon name={iconName} color={iconColor} />
      </View>
      <View className="overflow-hidden">
        {/* 使用Text会导致translateY失效 */}
        <View
          className={classNames(
            styles.post_like_num,
            numChange && styles.change
          )}
          style={{ color: iconColor }}
        >
          {post.likeNum}
        </View>
      </View>
    </View>
  )
}

const PostBottomButtons = (props: { post: PostItem; onLike: () => void }) => {
  const { post } = props
  return (
    <View className="flex">
      <View className={styles.post_bottom_btn}>
        <Icon name="post-comment" />
        <Text className="ml-4">{post.commentNum}</Text>
      </View>
      <View className={styles.post_bottom_btn}>
        <Icon name="post-share" />
        <Text className="ml-4">{post.shareNum}</Text>
      </View>
      <LikeButton post={post} onClick={props.onLike} />
      <View className={styles.post_bottom_btn}>
        <Icon name="post-view" />
        <Text className="ml-4">{post.viewNum}</Text>
      </View>
    </View>
  )
}
