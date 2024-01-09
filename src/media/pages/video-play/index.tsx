import Loading from '@/components/Loading'
import { Video, View } from '@tarojs/components'
import Taro, { VideoContext, useLoad } from '@tarojs/taro'
import { useRef, useState } from 'react'

export default function Index() {
  const [src, setSrc] = useState('')
  const [loading, setLoading] = useState(true)

  let videoContext = useRef<VideoContext | null>()
  useLoad((option) => {
    setSrc(decodeURIComponent(option.url))
    videoContext.current = Taro.createVideoContext('video-player', this)
  })
  const handleLoadedMetaData = () => {
    setLoading(false)
  }
  return (
    <View className="bg-black absolute-full">
      <Video
        id="video-player"
        src={src}
        direction={90}
        className="h-[100vh] w-[100vw]"
        style={{ opacity: loading ? 0 : 1 }}
        onLoadedMetaData={handleLoadedMetaData}
        autoplay
      />
      {loading && <Loading className="absolute-center z-[1]" />}
    </View>
  )
}
