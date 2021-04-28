<template>
  <div class="BigNews">
    <h1>BigNews</h1>
    <router-link to="/bignews/video">video</router-link> |
    <router-link to="/bignews/text">text</router-link> |
    <router-link to="/bignews/image">image</router-link> |
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "BigNews",
  props: [],
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
