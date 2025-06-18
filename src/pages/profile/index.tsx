import { Image, Text, View } from '@tarojs/components'
import { Invoice } from '@nutui/icons-react-taro'
import { useAppStore } from '@/stores/app'
import clsx from 'clsx'
import dayjs from 'dayjs'

export default function Profile() {
  const { userInfo } = useAppStore()
  console.log('profileBanner', userInfo.profileBanner)
  // TODO Taro 图片 mode=aspectFill变形
  return (
    <View>
      <View
        style={{
          background: `url(${userInfo.profileBanner}) no-repeat center center / cover`
        }}
        className="w-[375px] h-[125px]"
      />
      <View
        className={clsx(
          'w-[82px] h-[82px] box-content rounded-full overflow-hidden',
          'border-[4px] border-white border-solid',
          'absolute top-[84px] left-[30px]'
        )}
      >
        <Image src={userInfo.avatar} className="w-full h-full" />
      </View>
      <View className="flex flex-col px-[16px] pt-[12px]">
        <View className="flex justify-end">
          <View
            className={clsx(
              'border border-solid border-[#E5E5E5] rounded-[20px] px-[16px] py-[4px]',
              ' text-[black] text-[18px] font-bold'
            )}
          >
            编辑个人资料
          </View>
        </View>
        <View className="text-[24px] mt-[12px] font-bold">
          {userInfo.userName}
        </View>
        <View className="text-[14px] text-[#888]">@{userInfo.fullName}</View>
        <View className="mt-[16px] text-[16px]">{userInfo.description}</View>
        <View className="mt-[16px] text-[16px] flex items-center  text-[#888]">
          <Invoice size={16} color="#888" className="mr-[4px]" />
          {dayjs(userInfo.createTime).format('YYYY年M月')}加入
        </View>
        <View className="mt-[16px] text-[16px] flex items-center">
          <View className="flex items-center">
            <Text className="mr-[4px] font-bold">{userInfo.followingNum}</Text>
            正在关注
          </View>
          <View className="flex items-center ml-[20px]">
            <Text className="mr-[4px] font-bold">{userInfo.followerNum}</Text>
            关注者
          </View>
        </View>
      </View>
    </View>
  )
}
