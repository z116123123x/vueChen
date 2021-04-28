export default {
  namespaced: true,
  // data
  state: {
    productNum: 10
  },
  // computed
  getters: {
    brief(state) {
      return state.productNum + '件衣服'
    }
  },
  // methods
  // 在 mutations 裡修改 state
  mutations: {
    addProductNum(state) {
      state.productNum++
    }
  },
  // 異步方法，AJAX
  actions: {
    changeProductNum(store) {
      console.log(store)
      setTimeout(() => {
        store.commit('addProductNum')
      }, 1000);
    }
  },
}