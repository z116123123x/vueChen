<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">过渡动效</router-link> |
      <router-link to="/list">滚动行为</router-link> |
    </div>
    <transition mode="out-in" enter-active-class="animate__animated animate__backInLeft" leave-active-class="animate__animated animate__backOutRight">
      <router-view />
    </transition>
  </div>
</template>

<style scoped>
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
