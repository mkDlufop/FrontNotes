module.exports = {
  title: 'mkDlufop`s notes',
  description: 'Just Hack',

  // base 默认为 “/”，这表示会发布到 https://<USERNAME>.github.io/。
  // 如果要发布到 https://<USERNAME>.github.io/<REPO>/，需要设置 base 为“/<REPO>/"。
  base: "/FrontNotes/",

  themeConfig: {
    // 导航栏配置
    nav: [
      { text: 'HTML', link: '/html' },
      { text: 'CSS', link: '/css' },
      {
        text: 'JS',
        link: '/js',
        items: [
          { text: 'Group1', link: '/g1' },
          { text: 'Group2', link: '/g2' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/mkDlufop/FrontNotes' },
    ],
    // 侧边栏配置
    sidebar: [
    ]
  }
}
