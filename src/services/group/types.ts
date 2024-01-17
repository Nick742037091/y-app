export interface GroupListItem {
  /**
   * 组名
   */
  groupName: string
  /**
   * 成员数量
   */
  memberNum: number
  /**
   * 成员列表
   */
  memberList: {
    avatar: string
    memberName: string
  }[]
  /**
   * 图片
   */
  pic: string
}
