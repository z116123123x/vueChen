import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//  一次性導入所有 Vant 插件
import Vant from 'vant';
import 'vant/lib/index.css';

//  Vue.use(Vant) 實際上是調用 Vant.install()
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
