import { ListData } from '@/services/request/base/types'
import { yApi } from '@/services/request/instances/y'
import { LocationListItem } from './types'

export const getLocatinoList = (data: {
  pageNum: number
  pageSzie: number
}) => {
  return yApi.get<ListData<LocationListItem>>('/location/list', data)
}
