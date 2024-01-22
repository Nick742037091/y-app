import { useGlobalIconFont } from './components/IconFont/helper'

export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/search/index',
    'pages/groups/index',
    'pages/notifications/index',
    'pages/messages/index'
  ],
  subPackages: [
    {
      root: 'post',
      pages: ['pages/add/index', 'pages/choose-location/index']
    },
    {
      root: 'media',
      pages: ['pages/video-play/index']
    }
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Y',
    navigationBarTextStyle: 'black'
  },
  /* eslint-disable */
  usingComponents: { ...useGlobalIconFont() },
  tabBar: {
    color: '#000000',
    selectedColor: '#000',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/icons/tabbar/home.png',
        selectedIconPath: 'assets/icons/tabbar/homeActive.png'
      },
      {
        pagePath: 'pages/search/index',
        text: '搜索',
        iconPath: 'assets/icons/tabbar/search.png',
        selectedIconPath: 'assets/icons/tabbar/searchActive.png'
      },
      {
        pagePath: 'pages/groups/index',
        text: '社群',
        iconPath: 'assets/icons/tabbar/groups.png',
        selectedIconPath: 'assets/icons/tabbar/groupsActive.png'
      },
      {
        pagePath: 'pages/notifications/index',
        text: '通知',
        iconPath: 'assets/icons/tabbar/notifications.png',
        selectedIconPath: 'assets/icons/tabbar/notificationsActive.png'
      },
      {
        pagePath: 'pages/messages/index',
        text: '私信',
        iconPath: 'assets/icons/tabbar/messages.png',
        selectedIconPath: 'assets/icons/tabbar/messagesActive.png'
      }
    ]
  }
})
