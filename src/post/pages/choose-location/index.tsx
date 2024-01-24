import { useState } from 'react'
import { getLocatinoList } from '@/services/location'
import { useInfiniteScroll } from '@/services/request/hooks'
import ThemeProvider from '@/components/ThemeProvider'
import { Input, View } from '@tarojs/components'
import classNames from 'classnames'
import { LocationListItem } from '@/services/location/types'
import { postEvents } from '@/utils/events'
import Taro from '@tarojs/taro'
import Icon from '@/components/Icon'
import { colorBlackSecondary } from '@/styles/variables'
import Loading from '@/components/Loading'

import styles from './index.module.scss'

definePageConfig({
  navigationBarTitleText: '标记位置'
})

const searchBarHeight = 48

export default function Index() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [keywordFocus, setKeywordFocus] = useState(false)
  const onClearSearch = () => {
    setSearchKeyword('')
    setShowSearch(false)
    reload()
  }
  const { data, reload, reloading } = useInfiniteScroll(async (nextPageNum) => {
    setShowSearch(false)
    const result = await getLocatinoList({
      pageNum: nextPageNum,
      pageSzie: 10
    })
    return result.data
  })

  const setLocation = (location: LocationListItem) => {
    Taro.eventCenter.trigger(postEvents.setLocation, location)
    Taro.navigateBack()
  }
  let content: any = null
  if (reloading) {
    content = (
      <View className="h-[100vh] flex-center">
        <Loading />
      </View>
    )
  } else {
    if (showSearch) {
      content = (
        <View style={{ paddingTop: searchBarHeight }}>
          <View
            onClick={() => reload()}
            className={classNames(
              styles.location_item,
              'text-primary border-b border-line'
            )}
          >{`搜索"${searchKeyword}"`}</View>
        </View>
      )
    } else {
      content = (
        <View style={{ paddingTop: searchBarHeight }}>
          {data?.list.map((item, index) => {
            return (
              <View
                className={styles.location_item}
                key={index}
                onClick={() => setLocation(item)}
              >
                {item.name}
              </View>
            )
          })}
        </View>
      )
    }
  }
  return (
    <ThemeProvider>
      <View className={styles.search_bar}>
        <View
          className={classNames(styles.input, keywordFocus && styles.focus)}
        >
          <Icon name="search" color={colorBlackSecondary} size={24} />
          <Input
            className="flex-1 flex items-center"
            onFocus={() => setKeywordFocus(true)}
            onBlur={() => setKeywordFocus(false)}
            style={{ height: searchBarHeight }}
            placeholder="搜索位置"
            value={searchKeyword}
            onInput={(e) => {
              const value = e.detail.value
              setSearchKeyword(value)
              setShowSearch(!!value)
            }}
          />
          {searchKeyword && (
            <Icon
              name="close"
              color={colorBlackSecondary}
              size={24}
              onClick={() => onClearSearch()}
            />
          )}
        </View>

        {/* TODO 封装自定义button */}
        <View
          className="bg-black rounded-full px-10 h-28 flex flex-center text-white mx-4 text-[14px]"
          onClick={() => reload()}
        >
          搜索
        </View>
      </View>
      {content}
    </ThemeProvider>
  )
}
