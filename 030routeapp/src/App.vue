<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/me">個人中心</router-link> |
      <router-link to="/news">新聞</router-link> |
      <router-link to="/weather">天氣</router-link> |
      <router-link to="/bigNews">新聞2</router-link> | -->

      <router-view name="nav"></router-view>
      <router-view name="aside"></router-view>
      <router-view name="home"></router-view>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      // console.log(to)
      // console.log(from)
      // console.log('路由發生更改')
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
