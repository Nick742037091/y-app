import { useState } from 'react'
import { Text, View } from '@tarojs/components'
import classnames from 'classnames'
import { createTabPageBottom } from '@/utils'
import Taro, { usePageScroll } from '@tarojs/taro'
import Icon, { IconNames } from '../Icon'
import styles from './index.module.scss'
import { useColorPrimary } from '../ThemeProvider'

export default function () {
  const colorPrimary = useColorPrimary()
  const [showButtons, setShowButtons] = useState(false)
  const handleClickAdd = () => {
    if (!showButtons) {
      setShowButtons(true)
    } else {
      setShowButtons(false)
      Taro.navigateTo({
        url: '/post/pages/add/index'
      })
    }
  }
  const actionList = [
    { key: 'live', label: '开始直播', icon: 'video' },
    { key: 'space', label: '空间', icon: 'audio' },
    { key: 'picture', label: '照片', icon: 'picture' }
  ] as { key: string; label: string; icon: IconNames }[]

  // 向上滚动显示发帖按钮
  const [showAddButton, setShowAddButton] = useState(true)
  const [scrollTop, setScrollTop] = useState(0)
  usePageScroll((event) => {
    setShowAddButton(event.scrollTop < scrollTop)
    setScrollTop(event.scrollTop)
  })
  return (
    <>
      {showButtons && (
        <View
          className="fixed left-0 right-0 top-0 bottom-0 bg-white bg-opacity-95 z-[599]"
          onClick={() => setShowButtons(false)}
        />
      )}

      <View
        className={styles.btn_list}
        style={{ bottom: createTabPageBottom(100) }}
      >
        {actionList.map((action) => {
          return (
            <View className="flex items-center" key={action.key}>
              {showButtons && (
                <Text className={styles.btn_title}>{action.label}</Text>
              )}
              <View
                className={classnames(
                  styles.btn_icon,
                  showButtons || styles.hidden
                )}
              >
                <Icon name={action.icon} size={22} color={colorPrimary} />
              </View>
            </View>
          )
        })}
      </View>
      {showButtons && (
        <Text
          className="fixed right-[80px] z-[600] text-[18px]"
          style={{ bottom: createTabPageBottom(50) }}
        >
          发帖
        </Text>
      )}
      <View
        onClick={handleClickAdd}
        className={classnames(
          styles.add_btn,
          showButtons ? styles.rotate : '',
          showAddButton ? '' : styles.hidden
        )}
        style={{ bottom: createTabPageBottom(20) }}
      >
        <Icon
          name={showButtons ? 'add-post' : 'plus'}
          size={24}
          color="white"
          className={classnames(showButtons ? 'rotate-[-90deg]' : '')}
        />
      </View>
    </>
  )
}
