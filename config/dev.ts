import type { UserConfigExport } from '@tarojs/cli'

const isH5 = process.env.TARO_ENV === 'h5'

export default {
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/dev-api': {
          target: 'https://www.nick-h.cn/yApi',
          changeOrigin: true,
          logLevel: 'debug',
          pathRewrite: {
            '/dev-api': ''
          }
        }
      }
    }
  },
  plugins: isH5 ? [] : ['@tarojs/plugin-react-devtools']
} satisfies UserConfigExport
