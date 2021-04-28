<template>
  <div id="app">
    <AlertCom
      v-if="isAlert"
      :title="title"
      :content="content"
      :confirmEvent="confirmEvent"
      :cancelEvent="cancelEvent"
    />
  </div>
</template>

<script>
import AlertCom from "./components/AlertCom.vue";

export default {
  name: "App",
  data() {
    return {
      title: "跳轉頁面",
      content: "是否要跳轉至百度",
      isAlert: true,
    };
  },
  methods: {
    cancelEvent() {
      this.isAlert = false;
    },
    confirmEvent() {
      location.href = "http://www.baidu.com/";
    },
  },
  components: {
    AlertCom,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
