import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PostItem } from '@/services/post/types'
import { useStorage } from 'taro-hooks'
import IconFont from '@/components/IconFont/index'
import styles from './index.module.scss'
import { playVideo } from '@/utils'

const createImage = (
  className: string,
  url = '',
  key: string | number = '',
  previewable: boolean = true
) => {
  const hanclePreview = () =>
    previewable &&
    Taro.previewImage({
      urls: [url]
    })
  return (
    <View
      key={key}
      className={className}
      style={{ backgroundImage: `url(${url})` }}
      onClick={hanclePreview}
    />
  )
}

// TODO 用backgroundImage如何实现懒加载
// 图片列表，支持1~4张图片展示
const ImgList = (props: { list: string[] }) => {
  if (props.list.length === 0) return null
  const { list } = props
  const { length } = list
  let content: any = null
  if ([1, 2, 4].includes(length)) {
    const groups: Array<Array<string>> = []
    // 从左至右，从上至下展示，每行两张图片
    for (let i = 0; i < props.list.length; i = i + 2) {
      groups.push(props.list.slice(i, i + 2))
    }
    content = (
      <View className="flex flex-col h-full">
        {groups.map((group, groupIndex) => (
          <View key={groupIndex} className={styles.img_row}>
            {group.map((img, imgIndex) =>
              createImage(styles.img, img, imgIndex)
            )}
          </View>
        ))}
      </View>
    )
  }
  if (length === 3) {
    // 左侧一张图片
    const leftImg = props.list[0]
    // 右侧两种图片垂直展示
    const colImgs = props.list.slice(1, 3)
    content = (
      <View className={styles.img_row + ' h-full'}>
        {createImage(styles.img, leftImg)}
        <View className={styles.img_col}>
          {colImgs.map((url, index) => createImage(styles.img, url, index))}
        </View>
      </View>
    )
  }
  return (
    // padding-bottom控制整体宽高比
    <View className="pb-[56.25%] relative mt-5">
      <View className="absolute-full">{content}</View>
    </View>
  )
}

export const VideoPoster = (props: { video: string; poster: string }) => {
  const playButton = (
    <View className={styles.play_btn} onClick={() => playVideo(props.video)}>
      <IconFont name="play-fill" size={30} color="white" />
    </View>
  )
  return (
    // padding-bottom控制整体宽高比
    <View className="pb-[56.25%] relative mt-5">
      <View className="absolute-full">
        <View className={styles.img_row + ' h-full'}>
          {createImage(styles.img, props.poster, '', false)}
          {playButton}
        </View>
      </View>
    </View>
  )
}

const Media = (props: { post: PostItem }) => {
  const { post } = props
  if (post.video) {
    return <VideoPoster video={post.video} poster={post.videoPoster} />
  }
  return <ImgList list={post.imgList} />
}

export default Media
