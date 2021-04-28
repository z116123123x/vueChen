import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import meCom from '../views/Me.vue'
import News from '../views/News.vue'
// import Weather from '../views/Weather.vue'
// import Weather from ' @ 符號是 src 的絕對路徑的縮寫 /views/Weather.vue'
import Weather from '@/views/Weather.vue'
import BigNews from '@/views/BigNews.vue'
import Video from '@/components/Video.vue'
import Text from '@/components/Text.vue'
import Image from '@/components/Image.vue'
import NavCom from '@/components/Nav.vue'
import AsideCom from '@/components/Aside.vue'
import ContentCom from '@/components/Content.vue'
import Page404 from '@/views/Page404.vue'

Vue.use(VueRouter)

const routes = [
  { // 命名视图用 components
    path: '/',
    name: 'Home',
    components: {
      nav: NavCom,
      aside: AsideCom,
      home: Home,
    }
  },
  { // 路徑 /a 會重定向到 /about
    path: '/a',
    // redirect: '/about'
    redirect(to) {
      console.log(to)
      if (to.query.go == 'about') {
        // http://localhost:8080/about?go=about
        // if (to.query.go == 'about') 會重定向到 about
        return { name: 'About' }
      } else {
        // 否則帶參數 id:'從 /a 重定向' 到 /news
        return { name: 'News', params: { id: '從 /a 重定向' } }
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/me',
    name: 'Me',
    component: meCom,
    // 別名
    // 訪問 /self 頁面一樣是到 /me，但 location.href 不會改
    alias: '/self'
  },
  {
    path: '/news/:id',
    // 透過設定 router 的 props 屬性的屬性值為 true，再由組件的 props: ['id'] 接收值
    // props: true,

    // 透過設定 router 的 props 方法回傳一個對象，對象裡是要傳進組件 props 的值，再由組件的 props: ['id','username'] 接收值
    props(route) {
      return {
        // 定義傳到組件 props 的值
        id: route.params.id,
        username: route.query.username,
      }
    },
    name: 'News',
    component: News
  },
  {
    path: '/weather/:city/:area',
    name: 'Weather',
    component: Weather
  },
  {
    // path: '/bignews/:id', 也可以帶入參數
    path: '/bignews/',
    name: 'BigNews',
    component: BigNews,
    children: [
      {
        // 当 /bignews/video 匹配成功，
        // Video 会被渲染在 BigNews 的 <router-view> 中
        path: 'video',
        component: Video
      },
      {
        path: 'text',
        component: Text
      },
      {
        path: 'image',
        component: Image
      },
    ]
  },
  // 訪問找不到相匹配路徑時會進到 path: '*'
  {
    path: '*',
    name: 'Page404',
    component: Page404
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
