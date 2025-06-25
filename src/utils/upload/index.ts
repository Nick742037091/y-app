import COS from 'cos-js-sdk-v5'
import { md5 } from 'js-md5'
import { readFile } from '@/utils'
import { qcloudCredential } from '@/services/app'

export const initCos = async () => {
  const { code, data } = await qcloudCredential()
  if (code !== 0) throw new Error('获取腾讯云临时密钥失败')
  return new COS({
    SecretId: data.credentials.tmpSecretId,
    SecretKey: data.credentials.tmpSecretKey,
    SecurityToken: data.credentials.sessionToken,
    StartTime: data.startTime, // 建议传入服务端时间，可避免客户端时间不准导致的签名错误
    ExpiredTime: data.expiredTime // 临时密钥过期时间
  })
}

export const upload = async (
  file: File | null,
  path: string,
  options?: Omit<COS.UploadFileParams, 'Bucket' | 'Region' | 'Key' | 'Body'>
) => {
  if (!file) return
  const cos = await initCos()
  if (!cos) return
  const app = process.env.TARO_APP_NAME!
  const env = process.env.TARO_APP_ENV!
  const bucket = process.env.TARO_APP_UPLOAD_BUCKET!
  const region = process.env.TARO_APP_UPLOAD_REGION!
  const ext = file?.name?.split('.').pop()?.toLowerCase() || 'jpg'
  const fileData = await readFile(file)
  const key = md5(fileData)
  console.log(key)
  const result = await cos.uploadFile({
    Bucket: bucket,
    Region: region,
    Key: `${app}/${env}/${path}/${key}.${ext}`,
    Body: file,
    SliceSize: 1024 * 1024 * 10,
    AsyncLimit: 6,
    ...options
  })
  return 'https://' + result.Location
}
