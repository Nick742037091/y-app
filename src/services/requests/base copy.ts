import Taro, { RequestTask } from '@tarojs/taro'
import { MutableRefObject, useEffect, useRef, useState } from 'react'

// SetState类型
type SetState<T> = ReturnType<typeof useState<T>>[1]
// 任务Ref类型
type TaskRef<T> = MutableRefObject<RequestTask<Response<T>> | null | undefined>
// 请求属性
type RequestOptions = Omit<Taro.request.Option, 'url'> & {
  manual?: boolean // 手动启动
  paginated?: boolean // 是否分页
}
// 请求方法
type Methods = Taro.request.Option['method']
// 响应类型
interface Response<T> {
  data: T
  msg: string
  code: number
}
interface PageData<T> {
  list: T[]
  total: number
}

// 请求成功回调函数
type SuccessHandler = <T>(options: {
  result: Taro.request.SuccessCallbackResult<Response<T>>
  setData: SetState<T>
  setError: SetState<boolean>
  setLoading: SetState<boolean>
  task: TaskRef<T>
  run: () => void
}) => void
// 请求失败回调函数
type FailHandler = <T>(options: {
  result: TaroGeneral.CallbackResult
  setData: SetState<T>
  setError: SetState<boolean>
  setLoading: SetState<boolean>
  task: TaskRef<T>
  run: () => void
}) => void

// 参考 https://ahooks.js.org/zh-CN/hooks/use-request/index
// TODO 自动请求/手动请求
// TODO 轮询
// TODO 防抖
// TODO 节流
// TODO 屏幕聚焦重新请求
// TODO 错误重试
// TODO loading delay
// TODO SWR(stale-while-revalidate)
// TODO 缓存
/**
 * 创建请求实例
 * @param options
 * @returns
 */
export const createInstance = (
  baseUrl: string,
  instanceOptions: RequestOptions = {},
  successHandler?: SuccessHandler,
  failHandler?: FailHandler
) => {
  const useRequest = <T>(url: string, requestOptions: RequestOptions) => {
    const { manual, paginated, ...restOptions } = {
      ...instanceOptions,
      ...requestOptions
    }
    const task = useRef<null | RequestTask<Response<T>>>()
    // 请求状态
    const [loading, setLoading] = useState(false)
    // 请求错误
    const [error, setError] = useState<boolean>()
    // 请求数据
    const [data, setData] = useState<T>()
    // 请求数据
    const [pageData, setPageData] = useState<T[]>([])
    // 数据总数
    const [dataTotal, setDataTotal] = useState<number>(0)
    // 当前页数
    // TODO 自动修改当前页数
    const [pageNum, setPageNum] = useState<number>(0)
    // 每页数量
    // TODO 修改每页数量
    const [pageSie, setPageSize] = useState<number>(10)
    // TODO 添加页数和每页数量到请求参数中

    const run = () => {
      setLoading(true)
      // 请求任务，可用于停止任务
      const newTask = Taro.request<Response<T>>({
        url: baseUrl + url,
        ...restOptions,
        success(result) {
          if (!successHandler) {
            if (result.statusCode === 200) {
              const resultData = result.data.data
              if (paginated) {
                const list = (resultData as PageData<T>).list
                const total = (resultData as PageData<T>).total
                setPageData([...pageData, ...list])
                setDataTotal(total)
              } else {
                setData(data)
              }
            } else {
              setError(true)
            }
          } else {
            successHandler<T>({
              result,
              setData,
              setError,
              setLoading,
              task,
              run
            })
          }
        },
        fail(result) {
          if (!failHandler) {
          } else {
            failHandler<T>({ result, setData, setError, setLoading, task, run })
          }
        },
        complete() {
          setLoading(false)
        }
      })
      task.current = newTask
    }

    useEffect(() => {
      manual || run()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])
    return {
      requestTask: task,
      loading,
      error,
      data,
      pageData,
      dataTotal,
      pageNum,
      pageSie,
      run
    }
  }
  const createUseMethod = (method: Methods) => {
    return <T>(
      url: string,
      requestData: Taro.request.Option['data'] = {},
      options: RequestOptions = {}
    ) => {
      return useRequest<T>(url, {
        method,
        data: requestData,
        ...options
      })
    }
  }
  return {
    useRequest,
    useGet: createUseMethod('GET'),
    usePost: createUseMethod('POST'),
    usePut: createUseMethod('PUT'),
    useDelete: createUseMethod('DELETE'),
    useHead: createUseMethod('HEAD'),
    useOptions: createUseMethod('OPTIONS'),
    usePatch: createUseMethod('PATCH')
  }
}
