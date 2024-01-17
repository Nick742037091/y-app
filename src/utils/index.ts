import Taro from '@tarojs/taro'

export const isH5 = process.env.TARO_ENV === 'h5'

export const isAndroid = Taro.getSystemInfoSync().system === 'android'

export const playVideo = (url: string) => {
  Taro.navigateTo({
    url: `/media/pages/video-play/index?url=${encodeURIComponent(url)}`
  })
}

/**
 * 取整
 *
 * 大于1千，显示xx千
 * 大于1万，显示xx万
 * 大于1亿，显示xx亿
 *
 * @param num
 */
export const formatNumber = (num: number) => {
  if (num > 100000000) {
    return `${Math.floor(num / 100000000)}亿`
  } else if (num > 10000) {
    return `${Math.floor(num / 10000)}万`
  } else if (num > 1000) {
    return `${Math.floor(num / 1000)}千`
  } else {
    return num
  }
}
