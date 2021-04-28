<template>
  <div class="getter">
    <h1>reverseMsg: {{ reverseMsg }}</h1>
    <h2>gettersMsgParams: {{ gettersMsgParams }}</h2>
    <h2>num: {{ num }}</h2>
    <h2>msg: {{ msg }}</h2>
    <h2>age: {{ age }}</h2>
  </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState, mapGetters } from "vuex";

export default {
  name: "Getter",
  props: [],
  data() {
    return {};
  },
  computed: {
    gettersMsgParams(){
      // 調用 store.getters 的 gettersMsg 函數並傳入參數('傳遞參數到 getters : ')
      return this.$store.getters.gettersMsg('傳遞參數到 getters : ')
    },
    ...mapGetters(["reverseMsg", "gettersMsg"]),
    ...mapState(["num", "msg",'age']),
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
