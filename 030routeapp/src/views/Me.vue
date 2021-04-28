<template>
  <div class="me">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/me">個人中心</router-link> |
    <router-link to="/news/xxx">新聞</router-link> |
    <router-link to="/weather/北京/朝阳">天氣</router-link> |
    <router-link to="/bigNews">新聞2</router-link> |
    <h2>個人中心</h2>
    <button @click="goAbout">goAbout</button>
  </div>
</template>

<script>
export default {
  name: "Me",
  props: [],
  methods: {
    goAbout(event) {
      console.log(this.$router);
      this.$router.push({
        path: "/about",
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
