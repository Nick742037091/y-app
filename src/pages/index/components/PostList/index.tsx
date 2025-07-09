import dayjs from 'dayjs'
import { PostListItem } from '@/services/post/types'
import Icon from '@/components/Icon'
import { ITouchEvent, Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { colorBlackPrimary } from '@/styles/variables'
import Taro from '@tarojs/taro'
import { useRef, useState } from 'react'
import { More, Del } from '@nutui/icons-react-taro'
import { useAppStore } from '@/stores/app'
import { Popup } from '@nutui/nutui-react-taro'
import { deletePost } from '@/services/post'
import { showSnackBar } from '@/components/SnackBar'
import styles from './index.module.scss'
import PostMedia from '../PostMedia'

const usePostPopup = ({ reload }: { reload: () => void }) => {
  const [postId, setPostId] = useState(0)
  const [popupVisible, setPopupVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const handleDelete = async () => {
    const { code } = await deletePost(postId)
    if (code === 0) {
      showSnackBar('删除成功')
      reload()
    }
    setConfirmVisible(false)
    setPopupVisible(false)
  }
  const popupContext = (
    <>
      <Popup
        round
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
      >
        <View className="w-[320px] p-28">
          <View className="font-bold text-[18px]">删除帖子？</View>
          <View className="text-[#888] text-[16px] mt-4">
            此操作不可撤消，并且将从你的个人资料、关注你的任何账号的时间线以及搜索结果中移除。
          </View>
          <View
            className={classNames(
              'bg-red w-[264px] h-[44px] text-[14px] text-white rounded-[22px]',
              'flex flex-center ml-auto mt-16 active:bg-red/50'
            )}
            onClick={handleDelete}
          >
            删除
          </View>
          <View
            className={classNames(
              'w-[264px] h-[44px] text-[14px] rounded-[22px] active:bg-[#F7F7F7]',
              'flex flex-center ml-auto mt-16 border-[1px] border-[#888] border-solid'
            )}
            onClick={() => {
              setConfirmVisible(false)
            }}
          >
            取消
          </View>
        </View>
      </Popup>
      <Popup
        position="bottom"
        round={false}
        visible={popupVisible}
        onClose={() => {
          setPopupVisible(false)
        }}
        style={{ minHeight: '0%' }}
      >
        <View className="pt-20 px-20 text-[14px] flex flex-col">
          <View
            className={classNames(
              'flex items-center text-red py-10 active:bg-[#F7F7F7] px-4'
            )}
            onClick={() => {
              setConfirmVisible(true)
              setPopupVisible(false)
            }}
          >
            <Del className="mr-10" />
            删除
          </View>
          <View
            className={classNames(
              'h-[44px] text-[14px] rounded-[22px]',
              'flex flex-center mt-16 mb-16 border-[1px] border-[#888] border-solid'
            )}
            onClick={() => {
              setPopupVisible(false)
            }}
          >
            取消
          </View>
        </View>
      </Popup>
    </>
  )
  const openPopup = (options: { id: number }) => {
    setPostId(options.id)
    setPopupVisible(true)
  }

  return {
    openPopup,
    popupContext
  }
}

export function PostList(props: {
  postList: PostListItem[]
  onLike: (index: number) => void
  reload: () => void
}) {
  const userInfo = useAppStore((state) => state.userInfo)
  const { openPopup, popupContext } = usePostPopup({ reload: props.reload })
  if (!props.postList) return null

  const handleClickPost = (item: PostListItem) => {
    Taro.navigateTo({
      url: `/pages/post/detail/index?postId=${item.id}`
    })
  }
  return (
    <>
      {popupContext}
      {props.postList.map((item, index) => (
        <View
          key={index}
          className={styles.post_item}
          onClick={() => handleClickPost(item)}
        >
          <Image
            src={item.user.avatar}
            className="size-40 rounded-full mr-12 bg-placeholder"
            preview="true"
            lazyLoad
          />
          <View className="flex-1 flex flex-col ">
            <View className="flex items-center">
              <Text className="font-bold">{item.user.userName}</Text>
              {item.user.id === userInfo.id && (
                <View
                  className="ml-auto"
                  onClick={(e) => {
                    e.stopPropagation()
                    openPopup({ id: item.id })
                  }}
                >
                  <More />
                </View>
              )}
            </View>
            <View>
              <Text className="text-gray">@{item.user.fullName}</Text>
              <Text className="mx-5">·</Text>
              <Text>{dayjs(item.createTime).fromNow()}</Text>
            </View>
            <Text>{item.content}</Text>
            <PostMedia post={item} />
            <PostBottomButtons post={item} onLike={() => props.onLike(index)} />
          </View>
        </View>
      ))}
    </>
  )
}

// 点赞按钮
export const LikeButton = (props: {
  post: PostListItem
  onClick: () => void
}) => {
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
  const handleClick = (event: ITouchEvent) => {
    event.stopPropagation()
    if (firstShow.current) {
      firstShow.current = false
    }
    props.onClick()
    setNumChange(true)
    setTimeout(() => setNumChange(false), 300)
  }
  return (
    <View className="flex-1 flex flex-center" onClick={handleClick}>
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

export const PostBottomButtons = (props: {
  post: PostListItem
  onLike: () => void
}) => {
  const { post } = props
  return (
    <View className="flex mt-8">
      <View className="flex-1 flex flex-center">
        <Icon name="post-comment" />
        <Text className="ml-4">{post.commentNum}</Text>
      </View>
      <View className="flex-1 flex flex-center">
        <Icon name="post-share" />
        <Text className="ml-4">{post.shareNum}</Text>
      </View>
      <LikeButton post={post} onClick={() => props.onLike()} />
      <View className="flex-1 flex flex-center">
        <Icon name="post-view" />
        <Text className="ml-4">{post.viewNum}</Text>
      </View>
    </View>
  )
}
