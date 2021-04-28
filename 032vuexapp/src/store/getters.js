export default {
  // computed
    reverseMsg(state) {
      return state.msg.split('').reverse().join('')
    },
    gettersMsg(state) {
      return function (val) { // 在getters 裡 return 一個函數，可以在調用的時候傳入參數
        return val + state.msg
      }
    },
  }
