<template>
  <div class="state">
    <h1>訊息: {{ msg }}</h1>
    <h2>年齡: {{ age }}</h2>
    <h2>數量: {{ num }}</h2>
    <h2>顏色數量字串拼接: {{ clolrNum }}</h2>
    <h2>{{ test }}</h2>

    <input type="text" v-model="num" />
    &nbsp;&nbsp;
    <h2>使用 mapMutations 映射 Mutations 時可以在調用的時候傳入載荷（Payload）</h2>
    <input type="text" :value="num" @input="setNum($event.target.value)" />
  </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState, mapMutations } from "vuex";
console.log(" 這裡的 this 是: ", this);

export default {
  name: "State",
  props: [],
  data() {
    return {
      color: "green",
    };
  },
  // computed: {
  //   // 利用 computed 縮短名稱 方便在 template調用
  //   age(){
  //     return this.$store.state.age
  //   },
  //   msg(){
  //     return this.$store.state.msg
  //   },
  //   num:{
  //     get(){
  //     return this.$store.state.num
  //     },
  //     // v-model 會修改 $store.state 的值
  //     // 修改 $store.state 的值需要利用 store.commit 調用 store 的 mutations
  //     // 利用 computed 的 setter 調用 $store.commit
  //     set(val){
  //       console.log(val)
  //       this.$store.commit('setNum',val)
  //     },
  //   }
  // },
  // 第一種利用 mapState 映射 state 的方式
  // 這種方式不會設定 setter ，用 v-model 雙向綁定時會得到下面的錯誤
  // property "num" was assigned to but it has no setter.
  computed: {
    ...mapState(["age", "msg", "num"]),
    test(state) {
      return state.age;
    },
    clolrNum(state) {
      return this.color + state.num;
    },
  },

  // 使用 mapState 映射 state 的方式
  // 不會設定 setter ，用 v-model 雙向綁定時會得到下面的錯誤
  // property "num" was assigned to but it has no setter.
  // 改用 methods 觸發事件 調用 $store.commit 改變 store 的 state
  methods: {
    // changeValue(e) {
    //   this.$store.commit("setNum", e.target.value);
    // },
    ...mapMutations(['setNum'])
  },

  // 第二種利用 mapState 映射 state 的方式
  // computed: mapState({
  //   msg: "msg",
  //   age: (state) => {
  //     return state.age;
  //   },
  //   num: (state) => {
  //     return state.num;
  //   },
  //   // 用普通函數調用的 this 才會指向 vue 實例
  //   clolrNum(state) {
  //     return this.color + state.num;
  //   },
  //   // 下面是錯誤示範，不能使用箭頭函數，因為箭頭函數的 this 會指向父層
  //   // 也就是這個物件的上一層，就會指到 export default {} 外面， this 變成 undefined
  //   test: (state) => {
  //     console.log("---test---");
  //     console.log(this);
  //   }
  // }),

  // 第三種利用 mapState 映射 state 的方式
  // computed: {
  //   test(){
  //     return 'computed test'
  //   },
  //   // mapState 函數返回的是一個對象
  //   // 所以可以使用對象展開運算符將此對象混入到外部對像中
  //   ...mapState({
  //     msg: "msg",
  //     age: "age",
  //     num: "num",
  //     // 用普通函數調用的 this 才會指向 vue 實例
  //     clolrNum(state) {
  //       return this.color + state.num;
  //     },
  //   }),
  // },

  mounted() {
    // console.log(this);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
