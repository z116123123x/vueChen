import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import List from '../views/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 路由元信息也可以由組件的 this.$route.meta 獲取
    meta: {
      needlogin: true,
      isAuth: true,
      content: '這是首頁',
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'), // 這行代碼就是懶加載，進到路徑才載入組件
    // /* webpackChunkName: "about" */ 這行代碼表示會把 webpackChunkName 都是 about 的模塊打包到一起
    // 加載時將打包好的模塊一起加載

    // 路由獨享的守衛
    // beforeEnter (to, from, next) {
    //   // 在渲染该组件的对应路由被 confirm 前调用
    //   // 不！能！获取组件实例 `this`
    //   // 因为当守卫执行前，组件实例还没被创建
    //   console.log('------路由獨享的守衛------')
    //   let isLogin = false
    //   if (isLogin || to.path == '/login') {  
    //     next()
    //   } else {
    //     next({
    //       path: '/login'
    //     }) // 執行一次就會跳轉一次
    //   }
    // },

    // 路由元信息
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 滚动行为: 紀錄上一頁滾動到哪裡 
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // scrollBehavior 會在一進到頁面就執行
    // 如果有 <transition> 動畫過度效果，要設計時器在動畫執行完滾動
    if(savedPosition){
      setTimeout(() => {
        window.scrollTo(0,savedPosition.y)
      }, 2000);
    }
    
    // 沒有的話就可以直接 return savedPosition 回到之前紀錄的卷軸位置
    // return savedPosition
  }
})

router.beforeEach((to, from, next) => {
  // to 是要切換的路由
  // from 是正要離開的路由
  // next 是是否允許進入目標路由的函數，組件內部的路由守衛，決定要跳轉到哪裡
  console.log('--- beforeEach ---')
  console.log(to)
  // console.log(from)
  //next(false) // 不進行跳轉
  // let isLogin = true
  // if (isLogin || to.path == '/login') {  
  //   // || to.path == '/login' 如果進入的 path 是 /login 就跳轉進 /login
  //   // 如果沒有上面的或者條件， isLogin = false 會進到 else ， else 就會執行 next({path: '/login'}) 跳轉進 /login
  //   // 進到 /login 時會在執行一次 router.beforeEach 
  //   // 但此時 isLogin 還是 false ，會再次進到 else ，又會執行 next({path: '/login'}) 跳轉到 /login ，造成無限迴圈
  //   next()
  // } else {
  //   next({
  //     path: '/login'
  //   }) // 執行一次就會跳轉一次
  // }

  // 透過路由元信息判斷是否需要登入驗證(路由守衛)

  // 這邊不會造成無窮迴圈是因為用路由元信息 to.meta.requiresAuth 判斷
  // 而 to.meta.requiresAuth 是存在於上面的 /about 路由裡
  // 所以只有在跳轉到 /about 時會取得 to.meta.requiresAuth
  // 判斷 to.meta.requiresAuth 為 true 進到第一層 if
  // 執行第二層的判斷 isLogin 為 false 進到 else
  // 執行 next({path: '/login'}) 進到 /login
  // 進到 /login 時並沒有 to.meta.requiresAuth 所以在第一層判斷就進到 else
  // 執行 next()

  // let isLogin = false
  // if (to.meta.requiresAuth) {
  //   if (isLogin) {
  //     next()
  //   } else {
  //     next({ path: '/login' })
  //     console.log('進入login')
  //   }
  // } else {
  //   next()
  // }

  // 上面的邏輯簡化版
  let isLogin = false
  if (to.meta.requiresAuth && !isLogin) {
    next({ path: '/login' })
  } else {
    next()
  }



})

export default router
