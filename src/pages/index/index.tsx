import { View } from '@fower/taro'
import { useReachBottom } from '@tarojs/taro'
import { useGetPostList } from '@/services/post'
import NavigationBar from './components/Navigation'
import { PostList } from './components/PostList'

definePageConfig({
  navigationBarTitleText: '首页',
  navigationStyle: 'custom',
  navigationBarTextStyle: 'black'
})

export default function Index() {
  const {
    pageData: postList = [],
    loading: postListLoading,
    run: getPostList
  } = useGetPostList()

  useReachBottom(() => {
    getPostList()
  })
  return (
    <View>
      <View fixed top-100px right-20px>
        当前总数{postList.length}
      </View>
      <NavigationBar />
      <View css={{ lineHeight: 2 }}>
        {postListLoading && <View textCenter>loading....</View>}
        <PostList postList={postList} />
      </View>
    </View>
  )
}
