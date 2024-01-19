import Icon from '@/components/Icon'
import { Swiper } from '@nutui/nutui-react-taro'
import { Image, StandardProps, View } from '@tarojs/components'
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

export const useImgList = () => {
  const [imgList, setImgList] = useState<Taro.chooseImage.ImageFile[]>([])
  const handleChooseImg = () => {
    if (imgList.length >= IMG_LENGTH_MAX) return
    Taro.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setImgList([...imgList, ...res.tempFiles].slice(0, IMG_LENGTH_MAX))
      }
    })
  }

  const handleDeleteImg = (index: number) => {
    setImgList(imgList.filter((_, i) => i !== index))
  }

  const imgElementList = imgList.length > 0 && (
    <Swiper
      className="flex-1"
      height={200}
      previousMargin="30px"
      nextMargin="30px"
    >
      {imgList.map((item, index) => {
        return (
          <Swiper.Item key={index} className="px-5 relative">
            <Image
              className="h-[200Px] w-full rounded-[16px]"
              src={item.path}
              mode="aspectFill"
            ></Image>
            <ImgIconWrapper
              className="absolute top-10 right-15"
              onClick={() => handleDeleteImg(index)}
            >
              <Icon name="close" color="white"></Icon>
            </ImgIconWrapper>
            <ImgIconWrapper className="absolute bottom-10 right-15">
              <Icon name="ellipsis-y" color="white"></Icon>
            </ImgIconWrapper>
          </Swiper.Item>
        )
      })}
    </Swiper>
  )
  return { imgList, imgElementList, handleChooseImg }
}
