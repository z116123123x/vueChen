<template>
  <div class="action">
    <h1>Action</h1>
    <button @click="getJoke">點擊獲取笑話</button>
    <ul>
      <li v-for="(item,index) in joke" :key="index">{{index+1}}: {{item.text}}</li>
    </ul>
    <button @click="setJoke">點擊獲取笑話2</button>
    <ul>
      <li v-for="(item,index) in joke" :key="index">{{index+1}}: {{item.text}}</li>
    </ul>
  </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState, mapActions  } from 'vuex'

export default {
  name: "Action",
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapState(['joke'])
  },
  methods: {
    getJoke(){
      this.$store.dispatch('setJoke')
    },
    // 在組件中分發Action
    ...mapActions(['setJoke'])
  },
  mounted() {
    console.log(this)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
