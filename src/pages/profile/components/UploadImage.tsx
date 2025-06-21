import { ArrowLeft } from '@/components/IconFont/h5'
import { View } from '@tarojs/components'
import clsx from 'clsx'
import { throttle } from 'lodash'
import { useState } from 'react'
import Cropper, { Point } from 'react-easy-crop'

export function useUploadImage() {
  const [dialogVisible, setDialogVisible] = useState(true)
  const [image, setImage] = useState<string>(
    'https://mh-aliyun-oss.bluemoon.com.cn//mh-scrm-admin/nMEKDFyhS8.png'
  )
  const [aspect, setAspect] = useState(4 / 3)
  const open = (options: { image: string; aspect: number }) => {
    setImage(options.image)
    setAspect(options.aspect)
    setDialogVisible(true)
  }
  const Dialog = () => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
      console.log(croppedArea, croppedAreaPixels)
    }
    const onCropChange = throttle((location: Point) => {
      setCrop(location)
    }, 100)
    const onZoomChange = throttle((value: number) => {
      setZoom(value)
    }, 100)
    if (!dialogVisible) return null
    return (
      <View className="fixed left-[0] right-0 top-0 bottom-0 bg-black/50 z-[100]">
        <View className="w-[90vw] h-[100vh] ml-[5vw] flex flex-col rounded-[5px] overflow-hidden">
          <View className="bg-white flex items-center px-[16px] h-[53px]">
            <View
              className="flex items-center p-[4px] mr-[10rpx] ml-[-4px]"
              onClick={() => setDialogVisible(false)}
            >
              <ArrowLeft size={20} color="#000000" />
            </View>
            <View className="ml-[20px] text-[17px] font-bold">编辑媒体</View>
            <View
              onClick={() => setDialogVisible(false)}
              className={clsx(
                'ml-auto text-[14px] bg-black text-white font-bold',
                'rounded-[20px] px-[16px] py-[6px]'
              )}
            >
              保存
            </View>
          </View>
          <View className="flex-1  relative">
            <Cropper
              // 将裁剪背景设置为灰白色
              style={{
                containerStyle: {
                  backgroundColor: '#eee'
                },
                cropAreaStyle: {
                  color: 'rgba(238, 238, 238, 0.5)'
                }
              }}
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
            />
          </View>
        </View>
      </View>
    )
  }
  return { Dialog, open }
}
