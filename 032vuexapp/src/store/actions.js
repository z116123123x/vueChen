export default {
  // 異步方法，AJAX
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
}