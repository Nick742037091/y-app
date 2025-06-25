import { ArrowLeft } from '@/components/IconFont/h5'
import { colorPrimary } from '@/styles/variables'
import { View } from '@tarojs/components'
import clsx from 'clsx'
import { throttle } from 'lodash'
import { useRef, useState } from 'react'
import Taro from '@tarojs/taro'
import Cropper, { Area, Point } from 'react-easy-crop'
import getCroppedImg from './cropImage'

// TODO 兼容小程序端
export function useUploadImage() {
  const [dialogVisible, setDialogVisible] = useState(false)
  const [image, setImage] = useState<string>('')
  const [aspect, setAspect] = useState(1)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })
  const openResolve = useRef<(File) => void>(() => {})
  const open = (options: { image: string; aspect: number }) => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: (res) => {
        setImage(res.tempFiles[0].path)
        setDialogVisible(true)
      }
    })
    setAspect(options.aspect)
    return new Promise<File>((resolve) => {
      openResolve.current = resolve
    })
  }
  const onCropComplete = (_croppedArea: Area, _croppedAreaPixels: Area) => {
    setCroppedAreaPixels(_croppedAreaPixels)
  }
  const onCropChange = throttle((location: Point) => {
    setCrop(location)
  }, 100)
  const onZoomChange = throttle((value: number) => {
    setZoom(value)
  }, 100)
  const handleSave = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels)
    if (croppedImage) {
      setDialogVisible(false)
      openResolve.current(croppedImage)
    }
  }
  const context = (
    <>
      {dialogVisible && (
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
                onClick={() => handleSave()}
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
                    color: 'rgba(238, 238, 238, 0.5)',
                    borderColor: colorPrimary,
                    borderWidth: 2
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
      )}
    </>
  )

  return { context, open }
}
