import { useCallback, useEffect, useRef, useState } from 'react'
import Taro, { useReachBottom } from '@tarojs/taro'
import { useRequest } from '@/services/requests'
import { ListData } from './types'

type InfiniteScrollOptions = Parameters<typeof useRequest>[1]
// 默认延迟显示loading，避免闪烁
const DEFAULT_LOADING_DELAY = 300

// 利用serveice的返回值Promise<ListData<T>>可以反推导出T的类型
export default function useInfiniteScroll<T>(
  serveice: (pageNum: number) => Promise<ListData<T>>,
  options?: InfiniteScrollOptions
) {
  const [list, setList] = useState<T[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)

  const { loading, run: loadMore } = useRequest(
    async (newPageNum = 1) => {
      // 传入pageNum避免setPageNum异步更新无法获取到最新的值
      // 合并分页数据
      setPageNum(newPageNum)
      const result = await serveice(newPageNum)
      // 第一页赋值，第二页以后拼接
      if (newPageNum === 1) {
        setList([...result.list])
        // 第一次才需要设置total
        setTotal(result.total)
      } else {
        setList([...list, ...result.list])
      }
    },
    {
      onBefore: options?.onBefore,
      onSuccess: options?.onSuccess,
      onError: options?.onError,
      onFinally: (...params) => {
        if (options?.onFinally) {
          options.onFinally(...params)
        }
        if (refreshResolve.current) {
          refreshResolve.current()
          refreshResolve.current = undefined
        }
      },
      loadingDelay: options?.loadingDelay || DEFAULT_LOADING_DELAY
    }
  )

  const refreshResolve = useRef<() => void>()
  // 添加useCallback避免闭包带来的性能损耗
  const refresh = useCallback(() => {
    // 切换到第一页，先滚动到顶部再重置页数，避免触发useReachBottom
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    loadMore(1)
    // 返回promise，可用于判断请求是否结束
    return new Promise((resolve) => {
      refreshResolve.current = resolve as () => void
    })
  }, [loadMore])
  // 依赖刷新需要调用refresh，挂载之前才生效
  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) {
      refresh()
    } else {
      isMounted.current = true
    }
  }, [...(options?.refreshDeps ?? []), refresh])
  // TODO 兼容局部容器翻页
  useReachBottom(() => {
    loadMore(pageNum + 1)
  })

  return {
    list,
    pageNum,
    total,
    loading,

    setPageNum,
    refresh,
    loadMore
  }
}
