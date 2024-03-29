import plugin from 'tailwindcss/plugin'
import {
  colorPrimary,
  colorGreen,
  colorOrange,
  colorRed,
  colorGray,
  colorPlaceholer,
  colorWhite,
  colorBlack,
  colorBlackPrimary,
  colorBlackNormal,
  colorBlackSecondary,
  colorLine
} from './src/styles/variables'
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-commonjs
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    // 1000以内的单位都转成px，不要设置太多，避免Tailwind CSS IntelliSense提示缓慢，较大的值可以使用[-px]
    spacing: Array.from({ length: 100 }).reduce((map, _, index) => {
      map[index] = `${index}px`
      return map
    }, {}),
    colors: {
      // 主题颜色
      primary: colorPrimary,
      green: colorGreen,
      orange: colorOrange,
      red: colorRed,
      gray: colorGray,
      black: colorBlack,
      white: colorWhite,
      'black-primary': colorBlackPrimary,
      'black-secondary': colorBlackSecondary,
      'black-normal': colorBlackNormal,
      placeholder: colorPlaceholer,
      line: colorLine
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
        },
        '.absolute-full': {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        '.absolute-center': {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        },
        '.fixed-center': {
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }
      })
    })
  ],
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发多端，你应该使用 process.env.TARO_ENV 环境变量来控制它
    preflight: process.env.TARO_ENV === 'h5'
  }
}
