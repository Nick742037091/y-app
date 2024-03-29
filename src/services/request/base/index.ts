import Taro from '@tarojs/taro'
import { isSuccessCode } from '@/utils/index'
import { RequestOptions, Methods, Response } from './types'

type RequestInterceptor = (
  options: RequestOptions,
  url: string
) => RequestOptions

type SuccessHandler = <T>(
  result:
    | Taro.request.SuccessCallbackResult
    | Taro.uploadFile.SuccessCallbackResult,
  resolve: (value: Response<T> | PromiseLike<Response<T>>) => void,
  reject: (reason?: any) => void
) => void
type FailHandler = (
  result: TaroGeneral.CallbackResult,
  reject: (reason?: any) => void
) => void
type CompleteHandler = <T>(
  result: TaroGeneral.CallbackResult,
  resolve: (value: Response<T> | PromiseLike<Response<T>>) => void,
  reject: (reason?: any) => void
) => void

/**
 * 创建请求实例
 * @param options
 * @returns
 */
export const createInstance = (instanceOption: {
  baseUrl: string
  options: RequestOptions
  requestInterceptor?: RequestInterceptor
  success?: SuccessHandler
  fail?: FailHandler
  complete?: CompleteHandler
}) => {
  const {
    baseUrl,
    options: instanceOptions = {},
    requestInterceptor,
    success: instanceSuccess,
    fail: instanceFail,
    complete: instanceComplete
  } = instanceOption
  function request<T>(url: string, requestOptions: RequestOptions) {
    // 自定义option可在这里提取
    let mergeOptions = {
      ...instanceOptions,
      ...requestOptions
    }
    if (requestInterceptor) {
      mergeOptions = requestInterceptor(mergeOptions, url)
    }
    const { baseUrl: requestBaseUrl, ...restOptions } = mergeOptions
    return new Promise((resolve, reject) => {
      Taro.request({
        url: (requestBaseUrl || baseUrl) + url,
        ...restOptions,
        success: (result) => {
          if (instanceSuccess) {
            return instanceSuccess(result, resolve, reject)
          }
          if (isSuccessCode(result.statusCode)) {
            resolve(result.data)
          } else {
            reject(result)
          }
        },
        fail: (result) => {
          if (instanceFail) {
            return instanceFail(result, reject)
          }
          reject(result)
        },
        complete: (result) => {
          if (instanceComplete) {
            return instanceComplete(result, resolve, reject)
          }
        }
      })
    }) as Promise<Response<T>>
  }
  function uploadFile<T>(
    url: string,
    filePath: string,
    name: string,
    formData: Record<string, any>,
    requestOptions: RequestOptions
  ) {
    // 自定义option可在这里提取
    let mergeOptions = {
      ...instanceOptions,
      ...requestOptions
    }
    if (requestInterceptor) {
      mergeOptions = requestInterceptor(mergeOptions, url)
    }
    const { baseUrl: requestBaseUrl, ...restOptions } = mergeOptions
    return new Promise((resolve, reject) => {
      Taro.uploadFile({
        url: (requestBaseUrl || baseUrl) + url,
        filePath,
        name,
        formData,
        ...restOptions,
        success: (result) => {
          // 转json处理
          result.data = JSON.parse(result.data)
          if (instanceSuccess) {
            return instanceSuccess(result, resolve, reject)
          }
          if (isSuccessCode(result.statusCode)) {
            resolve(JSON.parse(result.data))
          } else {
            reject(result)
          }
        },
        fail: (result) => {
          if (instanceFail) {
            return instanceFail(result, reject)
          }
          reject(result)
        },
        complete: (result) => {
          if (instanceComplete) {
            return instanceComplete(result, resolve, reject)
          }
        }
      })
    }) as Promise<Response<T>>
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
    uploadFile,
    get: createMethod('GET'),
    post: createMethod('POST'),
    put: createMethod('PUT'),
    delete: createMethod('DELETE'),
    head: createMethod('HEAD'),
    options: createMethod('OPTIONS'),
    patch: createMethod('PATCH')
  }
}
