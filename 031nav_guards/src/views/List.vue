<template>
  <div class="list">
    <ul>
      <li v-for="(item,index) in arr" :key="index">列表{{index}}</li>
    </ul>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  text-align: left;
  padding: 0 20%;
}
</style>

<script>
let arr=[]
arr.length=100
export default {
  name: "List",
  props: [],
  data() {
    return {
      arr
    }
  },
};
</script>
