import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import buyCar from './buyCar'

Vue.use(Vuex)

// new Vuex.Store 用於創建整個項目的數據倉庫對象，將多組件共用的數據放置到此對象裡
export default new Vuex.Store({
  // data
  state,
  // computed
  getters,
  // methods
  // 在 mutations 裡修改 state
  mutations,
  // 異步方法，AJAX
  actions,
  // 模塊
  modules: {
    buyCar
  }
})