import { Image } from '@tarojs/components'
import styles from './index.module.scss'

export default function (props: { list: string[]; size: number }) {
  const size = props.size || 26
  return (
    <>
      {props.list.map((item, index) => {
        // 动态z-index控制前面头像覆盖后面
        return (
          <Image
            style={{
              zIndex: 100 - index,
              width: size,
              height: size
            }}
            src={item}
            key={index}
            className={styles.avatar}
          />
        )
      })}
    </>
  )
}
