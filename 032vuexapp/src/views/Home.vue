<template>
  <div class="home">
    <h1>點擊數量: {{ count }}</h1>
    <button @click="addEvent">添加點擊數</button>
    <hr>
    <h1>vuex 的方式</h1>
    <h1>點擊數量: {{ $store.state.num }}</h1>
    <button @click="addNum">添加點擊數 addNum</button>
    <button @click="addNum2(10)">添加點擊數 addNum2</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations } from 'vuex'

export default {
  name: "Home",
  components: {},
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    addEvent() {
      this.count++;
    },
    // emitAction(){
    //   // 修改 store 的 state 要透過 this.$store.commit( store 的 mutations 裡修改 state 的函數 )
    //   // 可以從 chrome 的 devTool 中的 vue 看到修改的 state 的 mutations 中的函數，和被修改的 state
    //   this.$store.commit('addNum')
    // },
    ...mapMutations(['addNum','addNum2'])
  },
  mounted() {
    console.log(this)
  },
};
</script>
