import { useGlobalIconFont } from './components/IconFont/helper'

export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/groups/index',
    'pages/search/index',
    'pages/notifications/index',
    'pages/messages/index',
    'pages/login/index',
    'pages/profile/index'
  ],
  subPackages: [
    {
      root: 'pages/post',
      pages: ['add/index', 'choose-location/index', 'detail/index']
    },
    {
      root: 'pages/media',
      pages: ['video-play/index']
    }
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Y',
    navigationBarTextStyle: 'black'
  },
  /* eslint-disable */
  usingComponents: { ...useGlobalIconFont() }
})
