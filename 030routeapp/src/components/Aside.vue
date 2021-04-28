<template>
  <div class="aside">
    <h1>這是側邊攔</h1>
    <h1>router-view</h1>
    <h2>
      在.vue檔寫入 router-view 標籤並命名 name 屬性後，在 router/index.js
      中的路由設定 components
    </h2>
  </div>
</template>

<script>
export default {
  name: "Aside",
  props: [],
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
