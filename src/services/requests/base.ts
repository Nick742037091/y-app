import Taro from '@tarojs/taro'
import { RequestOptions, Methods, Response } from './types'

type SuccessHandler = Taro.request.Option['success']
type FailHandler = Taro.request.Option['fail']
type CompleteHandler = Taro.request.Option['complete']

/**
 * 创建请求实例
 * @param options
 * @returns
 */
export const createInstance = (instanceOption: {
  baseUrl: string
  options: RequestOptions
  success?: SuccessHandler
  fail?: FailHandler
  complete?: CompleteHandler
}) => {
  const {
    baseUrl,
    options: instanceOptions = {},
    success: instanceSuccess,
    fail: instanceFail,
    complete: instanceComplete
  } = instanceOption
  function request<T>(url: string, requestOptions: RequestOptions) {
    // 自定义option可在这里提取
    const { ...restOptions } = {
      ...instanceOptions,
      ...requestOptions
    }
    return new Promise((resolve, reject) => {
      Taro.request<Response<T>>({
        url: baseUrl + url,
        ...restOptions,
        success: (result) => {
          if (instanceSuccess) {
            return instanceSuccess(result)
          }
          if (result.statusCode === 200) {
            resolve(result.data.data)
          } else {
            reject(result)
          }
        },
        fail: (result) => {
          if (instanceFail) {
            return instanceFail(result)
          }
          reject(result)
        },
        complete: (result) => {
          if (instanceComplete) {
            return instanceComplete(result)
          }
        }
      })
    }) as Promise<T>
  }
  const createMethod = (method: Methods) => {
    return function <T>(
      url: string,
      requestData: Taro.request.Option['data'] = {},
      options: RequestOptions = {}
    ) {
      return request<T>(url, {
        method,
        data: requestData,
        ...options
      })
    }
  }
  return {
    request,
    get: createMethod('GET'),
    post: createMethod('POST'),
    put: createMethod('PUT'),
    delete: createMethod('DELETE'),
    head: createMethod('HEAD'),
    options: createMethod('OPTIONS'),
    patch: createMethod('PATCH')
  }
}
