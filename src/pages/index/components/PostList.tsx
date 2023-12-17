import { PostItem } from '@/apis/post/types'
import Icon from '@/components/Icon'
import { Image, Text, View } from '@fower/taro'

const PostBottomButtons = (props: { post: PostItem }) => {
  const { post } = props
  const buttonStyle: CSSObject = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0'
  }
  return (
    <View flex>
      <View css={buttonStyle}>
        <Icon name="post-comment" />
        <Text ml-4px>{post.commentNum}</Text>
      </View>
      <View css={buttonStyle}>
        <Icon name="post-share" />
        <Text ml-4px>{post.shareNum}</Text>
      </View>
      <View css={buttonStyle}>
        <Icon name="post-like" />
        <Text ml-4px>{post.likeNum}</Text>
      </View>
      <View css={buttonStyle}>
        <Icon name="post-view" />
        <Text ml-4px>{post.viewNum}</Text>
      </View>
    </View>
  )
}

export function PostList(props: { postList: PostItem[] }) {
  const postItemStyle: CSSObject = {
    padding: '12px 16px',
    borderTop: '1px solid #eee',
    ':last-child': {
      borderBottom: '1px solid #eee'
    }
  }
  return props.postList.map((item, index) => (
    <View key={index} css={postItemStyle} flex text-15px>
      <Image src={item.avatar} circle-40px mr-12px />
      <View flex column flex-1>
        <View>
          <Text fontBold>{item.nickName}</Text>
          <Text ml-4px>@{item.fullname}</Text>
        </View>
        <Text>{item.content}</Text>
        <PostBottomButtons post={item} />
      </View>
    </View>
  ))
}
