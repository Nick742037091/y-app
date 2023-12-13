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
    navigationBarTextStyle: 'white'
  },
  usingComponents: {},
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#000',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/icons/tabbar/home.svg',
        selectedIconPath: 'assets/icons/tabbar/homeActive.svg'
      },
      {
        pagePath: 'pages/search/index',
        text: '搜索',
        iconPath: 'assets/icons/tabbar/search.svg',
        selectedIconPath: 'assets/icons/tabbar/searchActive.svg'
      },
      {
        pagePath: 'pages/friends/index',
        text: '朋友',
        iconPath: 'assets/icons/tabbar/friends.svg',
        selectedIconPath: 'assets/icons/tabbar/friendsActive.svg'
      },
      {
        pagePath: 'pages/notifications/index',
        text: '通知',
        iconPath: 'assets/icons/tabbar/notifications.svg',
        selectedIconPath: 'assets/icons/tabbar/notificationsActive.svg'
      },
      {
        pagePath: 'pages/messages/index',
        text: '消息',
        iconPath: 'assets/icons/tabbar/messages.svg',
        selectedIconPath: 'assets/icons/tabbar/messagesActive.svg'
      }
    ]
  }
})
