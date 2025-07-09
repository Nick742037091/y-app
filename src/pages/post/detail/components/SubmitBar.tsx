import { View, Text } from '@tarojs/components'
import Icon from '@/components/Icon'
import { PostDetail } from '@/services/post/types'
import { LikeButton } from '@/pages/index/components/PostList'
import { addPostComment, likePost } from '@/services/post'
import { useEffect, useState } from 'react'
import { Button, TextArea, Image } from '@nutui/nutui-react-taro'
import { Image as ImageIcon, MaskClose } from '@nutui/icons-react-taro'
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { upload } from '@/utils/upload'
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
  const [img, setImg] = useState<Taro.chooseImage.ImageFile>()
  const handleChooseImg = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setImg(res.tempFiles[0])
      }
    })
  }
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

  const uploadImg = async () => {
    if (!img) return null
    const url = await upload(img.originalFileObj!, 'post')
    if (!url) return null
    return url
  }

  const submit = async () => {
    if (!content) return
    const uploadImgUrl = await uploadImg()
    const { code } = await addPostComment({
      postId: post.id,
      replyToId: replyTo ? replyTo.id : null,
      parentId: replyTo ? replyTo.parentId : null,
      content,
      imgList: uploadImgUrl ? [uploadImgUrl] : []
    })
    if (code !== 0) return
    setIsInputing(false)
    setContent('')
    cleareReply()
    setImg(undefined)
    props.updateDetail()
  }

  const handleCancel = () => {
    setIsInputing(false)
    setContent('')
    cleareReply()
  }

  const handleClearImg = () => {
    setImg(undefined)
  }
  const handlePreviewImg = () => {
    if (!img) return
    Taro.previewImage({
      urls: [img.path]
    })
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
              'flex overflow-hidden transition-all duration-150 ease-linear',
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
        <View className="overflow-hidden">
          <View
            className={classNames(
              'flex items-center box-border transition-all duration-150 ease-linear',
              isInputing ? 'h-[42px]' : 'h-0'
            )}
          >
            <View
              className="p-0 ml-10 mr-auto flex flex-center"
              onClick={handleChooseImg}
            >
              <ImageIcon size={18} className="" />
            </View>
            <Button
              disabled={!content}
              className={classNames(
                '!border-none !text-white',
                'text-[13px] px-25 py-10 rounded-[16px]',
                content ? '!bg-primary' : '!bg-primary opacity-50 '
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
        </View>
        {img && (
          <View className="flex">
            <View className="ml-6 rounded-[2px] relative">
              <MaskClose
                size={20}
                className="!absolute top-[-10px] right-[-10px] z-10"
                onClick={handleClearImg}
              />
              <Image
                src={img.path}
                className="size-[40px]"
                mode="aspectFill"
                onClick={handlePreviewImg}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
