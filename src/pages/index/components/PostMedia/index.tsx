import Taro, { VideoContext } from '@tarojs/taro'
import { Image, Video, View } from '@tarojs/components'
import { PostItem } from '@/services/post/types'
import { playVideo } from '@/utils'
import IconFont from '@/components/IconFont/index'
import { useEffect, useMemo, useRef, useState } from 'react'
import { uniqueId } from 'lodash'
import styles from './index.module.scss'

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
      <IconFont name="play" size={30} color="white" />
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

export const GifPoster = (props: { gifVideo: string; poster: string }) => {
  /** 中间按钮 **/
  const [isToggled, setToggled] = useState(false)
  const centerPlayButton = (
    <View className={styles.gif_play_btn} onClick={() => setToggled(true)}>
      <IconFont name="play" size={30} color="white" />
    </View>
  )
  /** 播放状态 **/
  const [isPlaying, setIsPlaying] = useState(false)
  const togglePlay = () => {
    const nextIsPlaying = !isPlaying
    nextIsPlaying ? videoContext.current?.play() : videoContext.current?.pause()
    setIsPlaying(nextIsPlaying)
  }
  /** 底部播放按钮 **/
  const bottomPlayButton = (
    <View className={styles.gif_bottom_bar}>
      <View className={styles.gif_bottom_play_button} onClick={togglePlay}>
        <IconFont name={isPlaying ? 'pause' : 'play'} size={16} color="white" />
      </View>
      <View className={styles.gif_tag}>GIF</View>
    </View>
  )
  /* 重新render不会替换video元素
   * videoId只生成一次即可，尽管videoId变化不会导致video元素重新渲染
   */
  const videoId = useRef(`video-player-${uniqueId()}`)
  const videoContext = useRef<VideoContext | null>()
  // 是否已加载视频
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const handleLoadedMetaData = () => {
    videoContext.current = Taro.createVideoContext(videoId.current, this)
    setIsVideoLoaded(true)
    // 因autoplay需要更新播放状态
    setIsPlaying(true)
  }
  return (
    // padding-bottom控制整体宽高比
    <View className="pb-[50%] relative mt-5">
      <View className="absolute-full">
        <View className={styles.img_row + ' h-full'}>
          {/* 点击之后才加载视频，避免页面渲染时批量预加载视频 */}
          {isToggled && (
            <Video
              id={videoId.current}
              loop
              autoplay
              src={props.gifVideo}
              className={styles.gif_video + ' w-full h-full'}
              controls={false}
              showCenterPlayBtn={false}
              onLoadedMetaData={handleLoadedMetaData}
            />
          )}
          {/* 默认展示封面，视频加载之后隐藏封面 */}
          {/* TODO 可增加视频加载时的loading */}
          {isVideoLoaded || (
            <Image
              src={props.poster}
              className="absolute-full w-full h-full z-[1] bg-placeholder"
            />
          )}
          {isToggled ? bottomPlayButton : centerPlayButton}
        </View>
      </View>
    </View>
  )
}

const Media = (props: { post: PostItem; index: number }) => {
  const { post } = props
  if (post.video) {
    return <VideoPoster video={post.video} poster={post.videoPoster} />
  }
  if (post.gifVideo) {
    return <GifPoster gifVideo={post.gifVideo} poster={post.gifPoster} />
  }
  return <ImgList list={post.imgList} />
}

export default Media
