<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/cell">Cell</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
*{
  margin:0;
  padding:0;
}
</style>
