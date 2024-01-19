import { useState } from 'react'
import { useInterval } from 'ahooks'
import { Progress } from '@tarojs/components'
import { useColorPrimary } from '../ThemeProvider'

/**
 * 顶部循环进度条
 * @param props
 * loopDuration 每次循环时间
 * @returns
 */
export default function (props: { loopDuration?: number }) {
  const loopDuration =
    props.loopDuration === undefined ? 300 : props.loopDuration
  const colorPrimary = useColorPrimary()
  const [percent, setPercent] = useState(0)
  const step = 10
  useInterval(
    () => {
      let nextPrecent = percent + step
      if (percent >= 100) {
        nextPrecent = 0
      }
      setPercent(nextPrecent)
    },
    loopDuration / step,
    { immediate: true }
  )

  return (
    <Progress
      className="fixed left-0 right-0 top-0 z-[1000]"
      percent={percent}
      activeColor={colorPrimary}
      strokeWidth="4"
    />
  )
}
