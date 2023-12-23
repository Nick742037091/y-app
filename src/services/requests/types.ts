// 请求属性
export type RequestOptions = Omit<Taro.request.Option, 'url'> & {}
// 请求方法
export type Methods = Taro.request.Option['method']
// 响应类型
export interface Response<T> {
  data: T
  msg: string
  code: number
}
// 分页请求响应数据
export interface ListData<T> {
  list: T[]
  total: number
}
