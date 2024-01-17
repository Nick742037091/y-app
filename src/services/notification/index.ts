import { ListData } from '@/services/request/base/types'
import { yApi } from '@/services/request/instances/y'
import { Notification } from './types'

export const getNotificationList = (data: {
  pageNum: number
  pageSzie: number
  type: number
}) => {
  return yApi.get<ListData<Notification>>('/notification/list', data)
}
