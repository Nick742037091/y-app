import { DependencyList, useCallback, useEffect, useRef, useState } from 'react'
import Taro, { useReachBottom } from '@tarojs/taro'
import { useRequest } from '@/services/request/hooks'
import { NonNullableProp } from '@/utils/types'

type InfiniteScrollOptions = Pick<
  NonNullable<Parameters<typeof useRequest>[1]>,
  'onBefore' | 'onSuccess' | 'onFinally' | 'onError' | 'loadingDelay'
> & { reloadDeps?: DependencyList }
type ServiceDataType = {
  list: any[] | null
  [prop: string]: any
}

// 默认延迟显示loading，避免闪烁
const DEFAULT_LOADING_DELAY = 300

// TODO 添加loadingMore
// 利用serveice的返回值Promise<DataType<T>>可以反推导出T的类型
export default function useInfiniteScroll<T extends ServiceDataType>(
  serveice: (pageNum: number) => Promise<T>,
  options?: InfiniteScrollOptions
) {
  // 如何设置默认值list非空
  const [data, setData] = useState<NonNullableProp<T, 'list'>>()
  const [pageNum, setPageNum] = useState(1)

  const {
    loading,
    run: loadMore,
    cancel
  } = useRequest(
    async (newPageNum = 1) => {
      // 传入pageNum避免setPageNum异步更新无法获取到最新的值
      // 合并分页数据
      setPageNum(newPageNum)
      const result = await serveice(newPageNum)
      if (result.list === null) return
      // 第一页赋值，第二页以后拼接
      if (newPageNum === 1) {
        setData({ ...result, list: result.list! })
        // 第一次才需要设置total
      } else {
        const list = [...(data?.list ?? []), ...result.list]
        setData({ ...data, ...result, list })
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
        if (reloadResolve.current) {
          reloadResolve.current()
          reloadResolve.current = undefined
        }
      },
      loadingDelay: options?.loadingDelay || DEFAULT_LOADING_DELAY
    }
  )

  const reloadResolve = useRef<() => void>()
  // 添加useCallback避免闭包带来的性能损耗
  const reload = useCallback(() => {
    // 切换到第一页，先滚动到顶部再重置页数，避免触发useReachBottom
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    loadMore(1)
    // 返回promise，可用于判断请求是否结束
    return new Promise((resolve) => {
      reloadResolve.current = resolve as () => void
    })
  }, [loadMore])
  // 依赖刷新需要调用refresh，挂载之前才生效
  const isMounted = useRef(false)
  useEffect(
    () => {
      if (isMounted.current) {
        reload()
      } else {
        isMounted.current = true
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...(options?.reloadDeps ?? []), reload]
  )
  // TODO 兼容局部容器翻页
  useReachBottom(() => {
    if (loading) return
    loadMore(pageNum + 1)
  })

  return {
    data,
    pageNum,
    loading,

    setPageNum,
    reload,
    loadMore,
    mutate: setData,
    cancel
  }
}
