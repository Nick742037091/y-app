import plugin from 'tailwindcss/plugin'
import { colorPrimary } from './src/styles/variables'
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-commonjs
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    // 1000以内的单位都转成px
    spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
      map[index] = `${index}px`
      return map
    }, {}),
    colors: {
      // 主题样式
      primary: colorPrimary
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      // 添加在配置里面才有提示，样式表@layer component里面添加的没有
      addComponents({
        '.flex-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      })
    })
  ],
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发多端，你应该使用 process.env.TARO_ENV 环境变量来控制它
    preflight: process.env.TARO_ENV === 'h5'
  }
}
