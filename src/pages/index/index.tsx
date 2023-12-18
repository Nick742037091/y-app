import { useState } from 'react'
import { View } from '@fower/taro'
import { PostItem } from '@/apis/post/types'
import NavigationBar from './components/Navigation'
import { PostList } from './components/PostList'

definePageConfig({
  navigationBarTitleText: '首页',
  navigationStyle: 'custom',
  navigationBarTextStyle: 'black'
})

export default function Index() {
  const [postList, setPostList] = useState<PostItem[]>([])
  const getPostList = async () => {
    setTimeout(() => {
      const list = Array.from({ length: 20 }).map((_) => ({
        id: Math.random().toString(16).slice(2),
        nickName: 'xxxx',
        fullname: 'xxxx',
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        createtime: new Date().toISOString(),
        content: 'hello world',
        commentNum: 122,
        shareNum: 12,
        likeNum: 12,
        viewNum: 100
      }))
      setPostList(list)
    }, 1000)
  }
  getPostList()
  return (
    <View>
      <NavigationBar />
      <View css={{ lineHeight: 2 }}>
        <PostList postList={postList} />
      </View>
    </View>
  )
}
