export default {
  // methods
  // 在 mutations 裡修改 state
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
}