import Taro from '@tarojs/taro'

export const isH5 = process.env.TARO_ENV === 'h5'

export const isAndroid = Taro.getSystemInfoSync().system === 'android'

export const playVideo = (url: string) => {
  Taro.navigateTo({
    url: `/media/pages/video-play/index?url=${encodeURIComponent(url)}`
  })
}
