import plugin from 'tailwindcss/plugin'
import {
  colorPrimary,
  colorSuccess,
  colorWarning,
  colorDanger,
  colorInfo,
  colorPlaceholer
} from './src/styles/variables'
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-commonjs
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    // 100以内的单位都转成px，不要设置太多，避免Tailwind CSS IntelliSense提示缓慢，较大的值可以使用[-px]
    spacing: Array.from({ length: 101 }).reduce((map, _, index) => {
      map[index] = `${index}px`
      return map
    }, {}),
    colors: {
      // 主题颜色
      primary: colorPrimary,
      success: colorSuccess,
      warning: colorWarning,
      danger: colorDanger,
      info: colorInfo,
      placeholder: colorPlaceholer
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
