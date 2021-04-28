// new Vuex.Store 用於創建整個項目的數據倉庫對象，將多組件共用的數據放置到此對象裡
export default {
  // data
  state: {
    num: 0,
    msg: '這是 Vuex.Store 的 state.msg',
    age: 33,
    joke: null
  },
  // computed
  getters: {
    reverseMsg(state) {
      return state.msg.split('').reverse().join('')
    },
    gettersMsg(state) {
      return function (val) { // 在getters 裡 return 一個函數，可以在調用的時候傳入參數
        return val + state.msg
      }
    },
  },
  // methods
  // 在 mutations 裡修改 state
  mutations: {
    // mutations 裡的方法會預設傳入 state 作為形參
    addNum(state) {
      state.num += 2
    },
    // 調用 $store.commit 時傳入 value 參數
    addNum2(state, value) {
      state.num += value
    },
    // 調用 $store.commit 時傳入 value 參數
    setNum(state, value) {
      state.num = value
    },
    setJoke(state, value) {
      state.joke = value
    }
  },
  // 異步方法，AJAX
  actions: {
    // 默認參數 store
    setJoke(store) {
      let url = 'https://api.apiopen.top/getJoke?page=1&count=2&type=text'
      fetch(url).then(res => res.json()).then(res => {
        console.log(res)
        console.log(store)
        // 使用 store.commit 調用 mutations 的 setJoke 將 res.result 放進 state 的 joke
        store.commit('setJoke', res.result)
      })
    }
  },
}