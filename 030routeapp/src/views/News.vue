<template>
  <div class="News">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/me">個人中心</router-link> |
    <router-link to="/news/xxx">新聞</router-link> |
    <router-link to="/weather/北京/朝阳">天氣</router-link> |
    <router-link to="/bigNews">新聞2</router-link> |
    <h2>新聞內容頁面:{{ this.$route.params.id }}</h2>
    <h2>新聞內容頁面:{{ id }}{{ username }}</h2>
    <h3>帶入參數: /xxx</h3>
  </div>
</template>

<script>
export default {
  name: "News",
  props: ["id", "username"],
  methods: {},
  mounted() {
    console.log(this);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
