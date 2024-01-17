import { yApi } from '@/services/request/instances/y'
import { GroupListItem } from './types'

/**
 * 查询推荐社群列表
 */
export const getRecommendGroupList = () => {
  return yApi.get<GroupListItem[]>('/group/recommendList')
}
