module.exports = {
  title: 'mkDlufop`s notes',
  description: 'Just Hack',

  // base 默认为 “/”，这表示会发布到 https://<USERNAME>.github.io/。
  // 如果要发布到 https://<USERNAME>.github.io/<REPO>/，需要设置 base 为“/<REPO>/"。
  base: "/FrontNotes/",

  themeConfig: {
    // 导航栏配置
    nav: [
      { text: 'HTML', link: '/html/' },
      { text: 'CSS', link: '/css/' },
      {
        text: 'JS',
        items: [
          { text: 'ECMAScript', link: '/js_ecmascript/' },
          { text: 'DOM', link: '/js_dom/' },
          { text: 'BOM', link: '/js_bom/' }
        ]
      },
      {
        text: 'Vue',
        items: [
          { text: 'Vue 基础', link: '/vue_base/' },
          { text: 'Vue3', link: '/vue3/' },
          { text: 'Vuex', link: '/vue_vuex/' },
          { text: 'Vue Router', link: '/vue_router/' },
          { text: 'Vue CLI', link: '/vue_cli/' },
        ]
      },
      { text: '浏览器', link: '/browser/' },
      { text: '计算机网络', link: '/computer_network/' },
      {
        text: '最佳实践',
        items: [
          { text: '用户界面优化', link: '/ui_optimize/' },
          { text: '性能优化', link: '/performance_optimize/' },
        ]
      },
      {
        text: '面试题',
        items: [
          { text: '面试题_HTML', link: '/interview_questions_HTML/' },
          { text: '面试题_CSS', link: '/interview_questions_CSS/' },
          { text: '面试题_JS', link: '/interview_questions_JS/' },
          { text: '面试题_Vue', link: '/interview_questions_Vue/' },
          { text: '面试题_计算机网络', link: '/interview_questions_network/' },
        ]
      },
      { text: 'GitHub', link: 'https://github.com/mkDlufop/FrontNotes' },
    ],
    // 侧边栏配置
    sidebar: 'auto',
  }
}
