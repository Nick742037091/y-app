import { useGlobalIconFont } from './components/IconFont/helper'

export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/search/index',
    'pages/friends/index',
    'pages/notifications/index',
    'pages/messages/index'
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
        pagePath: 'pages/friends/index',
        text: '朋友',
        iconPath: 'assets/icons/tabbar/friends.png',
        selectedIconPath: 'assets/icons/tabbar/friendsActive.png'
      },
      {
        pagePath: 'pages/notifications/index',
        text: '通知',
        iconPath: 'assets/icons/tabbar/notifications.png',
        selectedIconPath: 'assets/icons/tabbar/notificationsActive.png'
      },
      {
        pagePath: 'pages/messages/index',
        text: '消息',
        iconPath: 'assets/icons/tabbar/messages.png',
        selectedIconPath: 'assets/icons/tabbar/messagesActive.png'
      }
    ]
  }
})
