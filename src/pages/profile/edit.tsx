import { Image, View } from '@tarojs/components'
import { useAppStore } from '@/stores/app'
import clsx from 'clsx'
import PageRoot from '@/components/PageRoot'
import BackNavigationBar from '@/components/BackNavigationBar'
import { useState } from 'react'
import { updateProfile } from '@/services/auth'
import Taro from '@tarojs/taro'
import { sleep } from '@/utils'
import { ProfileInput } from './components/ProfileInput'
import { useUploadImage } from './components/UploadImage'

export default function Profile() {
  const { userInfo, queryUserInfo } = useAppStore()
  const { Dialog, open } = useUploadImage()
  const [name, setName] = useState(userInfo.userName || '')
  const [description, setDescription] = useState(userInfo.description || '')
  const handleSave = async () => {
    await updateProfile({ userName: name, description })
    Taro.showToast({
      title: '保存成功',
      icon: 'success'
    })
    await sleep(1000)
    queryUserInfo()
    Taro.navigateBack()
  }
  return (
    <PageRoot>
      <BackNavigationBar height={53}>
        <View className="ml-[20px] text-[17px] font-bold">编辑个人资料</View>
        <View
          onClick={handleSave}
          className={clsx(
            'ml-auto text-[14px] bg-black text-white font-bold',
            'rounded-[20px] px-[16px] py-[6px]'
          )}
        >
          保存
        </View>
      </BackNavigationBar>
      <View className="relative mt-[53px] flex flex-col">
        <Image
          src={userInfo.profileBanner}
          className="w-[375px] h-[125px] mb-[50px]"
          mode="aspectFill"
        />
        <View
          className={clsx(
            'w-[82px] h-[82px] box-content rounded-full overflow-hidden',
            'border-[4px] border-white border-solid',
            'absolute top-[84px] left-[12px]'
          )}
        >
          <Image src={userInfo.avatar} className="w-full h-full" />
        </View>
        <ProfileInput
          title="全名"
          value={name}
          onChange={setName}
          maxlength={50}
          row={1}
          requiredText="姓名不能留空"
        />
        <ProfileInput
          title="简介"
          value={description}
          onChange={setDescription}
          maxlength={160}
          row={3}
        />
      </View>
      <Dialog />
    </PageRoot>
  )
}
