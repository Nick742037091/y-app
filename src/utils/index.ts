import { BaseEventOrig } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { h5RoutBaseName } from './config'

export const isH5 = process.env.TARO_ENV === 'h5'

export const isAndroid = Taro.getSystemInfoSync().system === 'android'

export const isDev = process.env.TARO_APP_ENV === 'dev'

export const playVideo = (url: string) => {
  Taro.navigateTo({
    url: `/pages/media/video-play/index?url=${encodeURIComponent(url)}`
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

// tabbar高度css变量
export const tabbarHeightCssVar = 'var(--taro-tabbar-height)'

/*
 tab页 页面高度
 小程序：100vh为页面高度
 H5： var(--taro-tabbar-height)为tabbar高度，包含在页面高度中
      var(--taro-tabbar-height)单位为PX，在calc中无效，因此不能在css类中使用，在style中才能生效
 */
export const tabPageHeight = isH5
  ? `calc(100vh - ${tabbarHeightCssVar})`
  : '100vh'

export const createTabPageBottom = (bottom: number) => {
  return isH5 ? `calc(${bottom}px + ${tabbarHeightCssVar})` : `${bottom}px`
}

/**
 * 延迟Promise函数
 * @param time 延迟时间(ms)
 * @returns
 */
export const sleep = (time: number) => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

/** 创建【防止滚动穿透】的属性，用于弹窗根布局
 - 适用于小程序，H5不会有滚动穿透问题(真机待验证)
 - 由于禁用滚动，内部滚动元素需要用scroll-view
 - 小程序调试工具对于拖动才有效，鼠标滚动无效，但不影响手机端
 */
export const createStopScrollProps = () => {
  if (isH5) return {}
  return {
    // 在事件捕获阶段禁用默认滚动，事件冒泡阶段应该是因为过于滞后，无法实现效果
    catchMove: true,
    onTouchMove: (e: BaseEventOrig) => {
      e.preventDefault()
    }
  }
}

/**
 * 获取剔除basename的当前页面路径
 * @returns
 */
export const getCurrentPagePath = () => {
  const page = Taro.getCurrentPages()[0]
  return getPagePath(page?.route || '')
}

/**
 * 获取剔除basename的页面路径
 */
export const getPagePath = (route: string) => {
  if (isH5) {
    const regx = new RegExp(`${h5RoutBaseName}(.+)`)
    const match = route.match(regx)
    if (!match) return ''
    return match[1]
  } else {
    return route
  }
}

const tabPageList = [
  '/pages/index/index',
  '/pages/search/index',
  '/pages/groups/index',
  '/pages/notifications/index',
  '/pages/messages/index'
]
export const isTabPage = () => {
  const path = getCurrentPagePath()
  return tabPageList.includes(path)
}

/**
 * 获取文件后缀
 * @param {string} imei 文件类型，如image/jpeg
 */
export const getFileExt = (imei: string) => {
  const imgMatch = /image\/(\w+)/.exec(imei)
  if (imgMatch) return imgMatch[1]
}

export const isSuccessCode = (statusCode: number) => {
  return statusCode >= 200 && statusCode < 300
}
