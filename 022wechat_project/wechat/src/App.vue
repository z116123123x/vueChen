<template>
  <div id="app">
    <div class="content">
      <chatcomp :currentUser="currentUser"></chatcomp>
      <userlistcomp @emituser="receiveUser" :userlist="userlist"></userlistcomp>
    </div>
  </div>
</template>

<script>
import chatcomp from "./components/chatcomp.vue";
import userlistcomp from "./components/userlistcomp.vue";

export default {
  name: "App",
  components: {
    chatcomp,
    userlistcomp,
  },
  data() {
    return {
      userlist: [
        {
          username: "小紅",
          headimg: require("./assets/img/1.jpg"), // 加載檔案要用模塊導入的方式，因為服務器的目錄及文件名會發生變動，可以在 chrome 的 devtool 中的 source 查看
        },
        {
          username: "小黃",
          headimg: require("./assets/img/2.jpg"),
        },
        {
          username: "小綠",
          headimg: require("./assets/img/3.jpg"),
        },
        {
          username: "小藍",
          headimg: require("./assets/img/4.jpg"),
        },
      ],
      currentUser: {
        username: "小紅",
        headimg: require("./assets/img/1.jpg"),
      },
    };
  },
  methods: {
    receiveUser(userIndex) {
      this.currentUser=this.userlist[userIndex]
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  width: 800px;
  height: 700px;
  margin: 100px auto;
}
</style>
