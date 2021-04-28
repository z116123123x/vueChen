<template>
  <div class="home">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/me">個人中心</router-link> |
    <router-link to="/news/xxx">新聞</router-link> |
    <router-link to="/weather/北京/朝阳">天氣</router-link> |
    <router-link to="/bigNews">新聞2</router-link> |
    <h1>编程式的导航</h1>
    <button @click="goEvent">跳轉到新聞頁</button>
    <button @click="go">前進</button>
    <button @click="back">後退</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    // router.push 方法
    // router.push(location, onComplete?, onAbort?)
    // router.push(location, 成功的回調函數, 失敗的回調函數)

    goEvent() {
      // 通過 path 跳轉
      this.$router.push({
        path: "news/xxx", // router 資料夾下的 index.js 中設定
        query: {
          // query 會自動拼接在 url 後面
          user: "root",
          pwd: "root",
        },
      });

      // 通過 name 跳轉
      // this.$router.push(
      //   {
      //     name: "News", // router 資料夾下的 index.js 中設定
      //     params: {
      //       id: "xxx",
      //     },
      //     query: {
      //       // query 會自動拼接在 url 後面
      //       user: "root",
      //       pwd: "root",
      //     },
      //   },
      //   function() {
      //     console.log("跳轉成功");
      //   },
      //   function() {
      //     console.log("跳轉失敗");
      //   }
      // );

      // 通過 path 替換頁面 (不會記錄到 history 裡面)
      // this.$router.replace({
      //   path: "news/xxx", // router 資料夾下的 index.js 中設定
      //   query: {
      //     // query 會自動拼接在 url 後面
      //     user: "root",
      //     pwd: "root",
      //   },
      // });
    },
    go() {
      this.$router.go(1);
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
