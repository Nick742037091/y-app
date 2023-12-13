import type { UserConfigExport } from '@tarojs/cli'

const isH5 = process.env.TARO_ENV === 'h5'

export default {
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {},
  plugins: isH5 ? [] : ['@tarojs/plugin-react-devtools']
} satisfies UserConfigExport
