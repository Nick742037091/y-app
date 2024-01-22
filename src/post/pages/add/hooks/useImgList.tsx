import Icon from '@/components/Icon'
import {
  Image,
  StandardProps,
  View,
  Swiper,
  SwiperItem,
  ITouchEvent
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { useState } from 'react'

export const IMG_LENGTH_MAX = 4

const ImgIconWrapper = (props: StandardProps) => {
  const { children, className, ...rest } = props
  return (
    <View
      className={classNames(
        'size-30 bg-black rounded-full flex-center',
        props.className
      )}
      {...rest}
    >
      {props.children}
    </View>
  )
}

/** 图片类型
 * delete 控制删除动效-缩放
 */
type ImgFile = Taro.chooseImage.ImageFile & { delete: boolean }
export const useImgList = () => {
  const [imgList, setImgList] = useState<ImgFile[]>([])
  const handleChooseImg = () => {
    if (imgList.length >= IMG_LENGTH_MAX) return
    Taro.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const selectList = res.tempFiles.map((item) => {
          return {
            ...item,
            delete: false
          } as ImgFile
        })
        setImgList([...imgList, ...selectList].slice(0, IMG_LENGTH_MAX))
      }
    })
  }

  const handleDeleteImg = (e: ITouchEvent, index: number) => {
    e.stopPropagation()
    const nextImgList = [...imgList]
    nextImgList[index].delete = true
    setImgList(nextImgList)
    setTimeout(() => {
      setImgList(nextImgList.filter((_, i) => i !== index))
    }, 300)
  }

  const srcList = imgList.map((item) => item.path)
  const imgElementList = srcList.length > 0 && (
    <Swiper previousMargin="20px" nextMargin="20px" className="h-[200px] mt-20">
      {imgList.map((item, index) => {
        return (
          <SwiperItem
            key={item.path}
            onClick={() =>
              Taro.previewImage({ urls: srcList, current: item.path })
            }
          >
            <View
              className="h-full w-full transition-transform duration-300 origin-center"
              style={{
                paddingLeft: index == 0 ? '0' : '10px',
                paddingRight: index == imgList.length - 1 ? '0' : '10px',
                transform: item.delete ? 'scale(0)' : 'none'
              }}
            >
              <Image
                className="h-full w-full rounded-[16px]"
                src={item.path}
                mode="aspectFill"
              />
              <ImgIconWrapper
                className="absolute top-8 right-16"
                onClick={(e) => handleDeleteImg(e, index)}
              >
                <Icon name="close" color="white"></Icon>
              </ImgIconWrapper>
              {/* TODO编辑图片 */}
              {/* <ImgIconWrapper className="absolute bottom-8 right-16">
                <Icon name="ellipsis-y" color="white"></Icon>
              </ImgIconWrapper> */}
            </View>
          </SwiperItem>
        )
      })}
    </Swiper>
  )
  return { imgList, imgElementList, handleChooseImg }
}
