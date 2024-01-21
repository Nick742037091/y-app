import { Textarea, View } from '@tarojs/components'
import ThemeProvider, { useColorPrimary } from '@/components/ThemeProvider'
import UserAvatar from '@/components/UserAvatar'
import Icon, { IconNames } from '@/components/Icon'
import { waitFor } from '@/utils'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import TopProgress from '@/components/LoopProgress'
import classNames from 'classnames'

import NavigationBar from './components/NavigationBar'
import styles from './index.module.scss'
import { IMG_LENGTH_MAX, useImgList } from './hooks/useImgList'

definePageConfig({
  navigationBarTitleText: '撰写新帖子',
  navigationStyle: 'custom'
})

const iconList: Array<{
  icon: IconNames
  key: string
}> = [
  { icon: 'picture', key: 'picture' },
  { icon: 'gif', key: 'gif' },
  { icon: 'list', key: 'list' },
  { icon: 'schedule', key: 'schedule' },
  { icon: 'location', key: 'location' }
]

// 函数组件名称不可缺少，会导致热更新失败
export default function Index() {
  const colorPrimary = useColorPrimary()
  const [postMsg, setPostMsg] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const handleSumit = async () => {
    if (!postMsg) return
    setPostLoading(true)
    await waitFor(300)
    setPostLoading(false)
    Taro.navigateBack()
  }
  const onClickItem = (key: string) => {
    switch (key) {
      case 'picture':
        handleChooseImg()
        break
      case 'gif':
        break
      case 'list':
        break
      case 'schedule':
        break
      case 'location':
        break
    }
  }
  /** 选择图片 */
  const { imgList, imgElementList, handleChooseImg } = useImgList()
  const isIconDisabled = (key: string) => {
    if (key === 'picture') {
      return imgList.length >= IMG_LENGTH_MAX
    }
    // TODO 未实现的功能暂时置灰
    return true
  }
  return (
    <ThemeProvider className={styles.post_add}>
      {postLoading && <TopProgress />}
      <NavigationBar disabled={postMsg.length === 0} onSubmit={handleSumit} />
      <View className="px-16">
        <View className="flex">
          <UserAvatar size={40} className="mr-10 mt-8" />
          <Textarea
            value={postMsg}
            onInput={(e) => setPostMsg(e.detail.value)}
            maxlength={250}
            autoHeight
            className="flex-1 py-12 text-[20px] max-h-[70vh] min-h-[100px]"
            placeholder="有什么新鲜事？"
          />
        </View>
      </View>
      {imgElementList}
      <View className="flex items-center py-4 mx-10 border-t border-line">
        {iconList.map((item) => (
          <Icon
            onClick={() => onClickItem(item.key)}
            key={item.key}
            className={classNames(
              'size-36 flex-center',
              isIconDisabled(item.key) && 'opacity-50'
            )}
            name={item.icon}
            size={24}
            color={colorPrimary}
          />
        ))}

        <View className="ml-auto size-28 flex-center rounded-full border-line border">
          <Icon name="plus" size={18} color={colorPrimary} />
        </View>
      </View>
    </ThemeProvider>
  )
}
