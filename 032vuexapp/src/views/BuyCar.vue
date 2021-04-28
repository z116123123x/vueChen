<template>
  <div class="buycar">
    <h1>buycar</h1>
    <h2>{{ buyCar.productNum }}</h2>
    <h2>{{ brief }}</h2>
    <button @click="addProductNum">Mutations: addProductNum</button>
    <button @click="changeProductNum">Actions: changeProductNum</button>
    <br />
    <br />
    <h2>Vuex 映射函數 + 命名空間</h2>
    <h3 style="text-align:left;">
      there are two ways you can to it
      <br />
      <br />
      first way do this
      <br />
      <br />
      computed: { ...mapGetters('scoreBoard',['score']) }
      <br />
      <br />
      buy this upper method you have said that scoreBoard is the module then
      what following in the array are getters that you have in the module
      another way is this one
      <br />
      <br />
      <pre>
computed: {
  ...mapGetters({
    score: 'scoreBoard/score'
  })
}
      </pre>
      <br />
      <br />
      I think there are understandable
      <br />
    </h3>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "BuyCar",
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapState(["buyCar"]),
    // ...mapGetters(["buyCar/brief"]),
    ...mapGetters("buyCar", ["brief"]),
    // ...mapGetters({brief:"buyCar/brief"}),
  },
  methods: {
    // 使用命名空間要在映射函數裡傳入物件參數 mapMutations({ 自定義函數名稱:'命名空間/Mutations' })
    // ...mapMutations({ addProductNum: "buyCar/addProductNum" }),
    ...mapMutations("buyCar", ["addProductNum"]),
    // ...mapActions({ changeProductNum: "buyCar/changeProductNum" }),
    ...mapActions("buyCar", ["changeProductNum"]),
  },
  mounted() {
    console.log(this);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
