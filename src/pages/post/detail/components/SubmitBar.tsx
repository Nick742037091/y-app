import { View, Text } from '@tarojs/components'
import Icon from '@/components/Icon'
import { PostDetail } from '@/services/post/types'
import { LikeButton } from '@/pages/index/components/PostList'
import { addPostComment, likePost } from '@/services/post'
import { useEffect, useState } from 'react'
import { Button, TextArea } from '@nutui/nutui-react-taro'
import classNames from 'classnames'
import { ReplyTo } from '../index'

export const SubmitBar = (props: {
  post: PostDetail
  replyTo: ReplyTo | undefined
  cleareReply: () => void
  updateDetail: () => void
}) => {
  const { post, replyTo, cleareReply } = props
  useEffect(() => {
    if (replyTo) {
      setIsInputing(true)
    }
  }, [replyTo])
  const [isInputing, setIsInputing] = useState(false)
  const [content, setContent] = useState('')
  const handleLike = async () => {
    if (!post) return
    const { code } = await likePost({
      postId: post.id,
      status: !post.isLiked
    })
    if (code !== 0) return
    props.updateDetail()
  }

  const handleClickComment = () => {
    setIsInputing(true)
  }
  const normalView = (
    <View className="flex items-center">
      <View
        className={classNames(
          'rounded-[16px] bg-[#eee] flex-1 h-[32px] text-gray flex items-center ',
          'text-[13px] px-25 py-10'
        )}
        onClick={() => setIsInputing(true)}
      >
        说点什么...
      </View>
      <View className="flex w-[180px]">
        <View className="flex-1 flex flex-center" onClick={handleClickComment}>
          <Icon name="post-comment" />
          <Text className="ml-4">{post.commentNum}</Text>
        </View>
        <View className="flex-1 flex flex-center">
          <Icon name="post-share" />
          <Text className="ml-4">{post.shareNum}</Text>
        </View>
        <LikeButton post={post} onClick={handleLike} />
      </View>
    </View>
  )

  const submit = async () => {
    if (!content) return
    const { code } = await addPostComment({
      postId: post.id,
      replyToId: replyTo ? replyTo.id : null,
      parentId: replyTo ? replyTo.parentId : null,
      content,
      ImgList: []
    })
    if (code !== 0) return
    setIsInputing(false)
    setContent('')
    props.updateDetail()
  }

  const handleCancel = () => {
    setIsInputing(false)
    setContent('')
    cleareReply()
  }

  return (
    <View
      className={classNames(
        'flex flex-col p-8 border-t-[1px] border-[#efefef] border-solid'
      )}
    >
      {replyTo && (
        <View className=" text-[12px] px-16 pb-4">
          <View className="text-[#bbb]">回复 {replyTo.userName}</View>
          <View className="text-gray">{replyTo.content}</View>
        </View>
      )}
      <View className="flex flex-col">
        <View className="flex">
          <TextArea
            autoSize
            maxLength={500}
            value={content}
            onFocus={() => setIsInputing(true)}
            onChange={(e) => setContent(e)}
            className="!rounded-[16px] !bg-[#efefef] text-gray flex items-center !max-h-[60px] overflow-auto"
          />
          <View
            className={classNames(
              'flex overflow-hidden',
              isInputing ? 'w-[0px]' : 'w-[280px]'
            )}
          >
            <View
              className="flex-1 flex flex-center"
              onClick={handleClickComment}
            >
              <Icon name="post-comment" />
              <Text className="ml-4">{post.commentNum}</Text>
            </View>
            <View className="flex-1 flex flex-center">
              <Icon name="post-share" />
              <Text className="ml-4">{post.shareNum}</Text>
            </View>
            <LikeButton post={post} onClick={handleLike} />
          </View>
        </View>
        {isInputing && (
          <View className="flex justify-end mt-10">
            <Button
              disabled={!content}
              className={classNames(
                '!border-none !text-white',
                'text-[13px] px-25 py-10 rounded-[16px]',
                content ? '!bg-primary' : '!bg-[#409EFF]/50'
              )}
              onClick={submit}
            >
              发送
            </Button>
            <Button
              className="!border-[#ddd] !ml-4"
              onClick={(e) => {
                e.stopPropagation()
                handleCancel()
              }}
            >
              取消
            </Button>
          </View>
        )}
      </View>
    </View>
  )
}
