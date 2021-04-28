import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 實例 app 對象中配置 store ( 數據倉庫 ) 對象
new Vue({
  router, // 相當於 router: router， es6 解構寫法: 如果屬性與屬性值名稱相同可以只寫 router
  store,
  render: h => h(App)
}).$mount('#app')
