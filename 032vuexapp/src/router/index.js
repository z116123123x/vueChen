import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 創建整個項目的
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/state',
    name: 'State',
    component: () => import(/* webpackChunkName: "state" */ '../views/State.vue')
  },
  {
    path: '/getter',
    name: 'Getter',
    component: () => import(/* webpackChunkName: "getter" */ '../views/Getter.vue')
  },
  {
    path: '/action',
    name: 'Action',
    component: () => import(/* webpackChunkName: "getter" */ '../views/Action.vue')
  },
  {
    path: '/buycar',
    name: 'BuyCar',
    component: () => import(/* webpackChunkName: "getter" */ '../views/BuyCar.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
