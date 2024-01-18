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

/*
 tab页 页面高度
 小程序：100vh为页面高度
 H5： var(--taro-tabbar-height)为tabbar高度，包含在页面高度中
      var(--taro-tabbar-height)单位为PX，在calc中无效，因此不能在css类中使用，在style中才能生效
 */
export const tabPageHeight = isH5
  ? 'calc(100vh - var(--taro-tabbar-height))'
  : '100vh'

export const createTabPageBottom = (bottom: number) => {
  return isH5 ? `calc(${bottom}px + var(--taro-tabbar-height))` : `${bottom}px`
}
