import { Image, View } from '@tarojs/components'
import { useAppStore } from '@/stores/app'
import clsx from 'clsx'
import PageRoot from '@/components/PageRoot'
import BackNavigationBar from '@/components/BackNavigationBar'
import { useState } from 'react'
import { updateProfile } from '@/services/auth'
import Taro from '@tarojs/taro'
import { sleep } from '@/utils'
import { Photograph } from '@nutui/icons-react-taro'
import { upload } from '@/utils/upload'
import { ProfileInput } from './components/ProfileInput'
import { useUploadImage } from './components/UploadImage'

export default function Profile() {
  const { userInfo, queryUserInfo } = useAppStore()
  const { context: uploadImageContext, open: openUploadImage } =
    useUploadImage()
  const [name, setName] = useState(userInfo.userName || '')
  const [description, setDescription] = useState(userInfo.description || '')
  const [profileBanner, setProfileBanner] = useState(
    userInfo.profileBanner || ''
  )
  const [profileBannerFile, setProfileBannerFile] = useState<File | null>(null)
  const [avatar, setAvatar] = useState(userInfo.avatar || '')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const handleSave = async () => {
    const profileBannerPromise = profileBannerFile
      ? upload(profileBannerFile, 'profile')
      : Promise.resolve(profileBanner)
    const avatarPromise = avatarFile
      ? upload(avatarFile, 'profile')
      : Promise.resolve(avatar)
    // 并发上传图片
    const promises = await Promise.all([profileBannerPromise, avatarPromise])
    await updateProfile({
      userName: name,
      description,
      profileBanner: promises[0],
      avatar: promises[1]
    })
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
        <View className="relative mb-[50px] flex flex-col">
          <Image
            src={profileBanner}
            className="w-[375px] h-[125px]"
            mode="aspectFill"
          />
          <View
            className={clsx(
              'absolute-center w-[45px] h-[45px] bg-black/50 rounded-full ',
              'flex flex-center z-[10]'
            )}
          >
            <Photograph
              size={18}
              color="#fff"
              onClick={async () => {
                const image = await openUploadImage({
                  image: profileBanner,
                  aspect: 375 / 125
                })
                if (image) {
                  setProfileBanner(URL.createObjectURL(image))
                  setProfileBannerFile(image)
                }
              }}
            />
          </View>
          <View className="absolute-full bg-black/30 z-[1]"></View>
        </View>

        <View
          className={clsx(
            'w-[82px] h-[82px] box-content rounded-full overflow-hidden',
            'border-[4px] border-white border-solid',
            'absolute top-[84px] left-[12px] z-[1]'
          )}
        >
          <Image src={avatar} className="w-full h-full" />
          <View className={clsx('absolute-full bg-black/30 z-[1]')} />
          <View
            className={clsx(
              'absolute-center w-[45px] h-[45px] bg-black/50 rounded-full ',
              'flex flex-center z-[10]'
            )}
          >
            <Photograph
              size={18}
              color="#fff"
              onClick={async () => {
                const image = await openUploadImage({
                  image: avatar,
                  aspect: 82 / 82
                })
                if (image) {
                  setAvatar(URL.createObjectURL(image))
                  setAvatarFile(image)
                }
              }}
            />
          </View>
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
      {uploadImageContext}
    </PageRoot>
  )
}
