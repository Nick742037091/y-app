import { Image, Text, View } from '@tarojs/components'
import { Invoice } from '@nutui/icons-react-taro'
import { useAppStore } from '@/stores/app'
import clsx from 'clsx'
import dayjs from 'dayjs'
import PageRoot from '@/components/PageRoot'
import BackNavigationBar from '@/components/BackNavigationBar'
import { ProfileData } from '@/services/auth/types'
import { getProfileData } from '@/services/auth'
import { useState, useEffect } from 'react'

export default function Profile() {
  const { userInfo } = useAppStore()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  useEffect(() => {
    const fetchProfileData = async () => {
      const res = await getProfileData()
      setProfileData(res.data)
    }
    fetchProfileData()
  }, [])
  return (
    <PageRoot>
      <BackNavigationBar height={53}>
        <View className="flex flex-col ml-[20px]">
          <View className="text-[14px] font-bold">{userInfo.fullName}</View>
          <View className="text-[13px] text-[#888]">
            {profileData?.postNum}帖子
          </View>
        </View>
      </BackNavigationBar>
      <Image
        src={userInfo.profileBanner}
        className="w-[375px] h-[125px]"
        mode="aspectFill"
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
          {userInfo.fullName}
        </View>
        <View className="text-[14px] text-[#888]">@{userInfo.userName}</View>
        <View className="mt-[16px] text-[16px]">{userInfo.description}</View>
        <View className="mt-[16px] text-[16px] flex items-center  text-[#888]">
          <Invoice size={16} color="#000000" className="mr-[4px]" />
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
    </PageRoot>
  )
}
