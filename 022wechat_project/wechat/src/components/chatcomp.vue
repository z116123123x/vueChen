<template>
  <div class="chat">
    <h1>{{ currentUser.username }}</h1>
    <div class="chatlist">
      <chatitemcom
        :chatlist="item"
        v-for="(item, index) in chatlist"
        :key="index"
      >
        {{ item.chatcontent }}
      </chatitemcom>
    </div>
    <chatinputcom :sentMsg="sentMsg"></chatinputcom>
  </div>
</template>

<script>
import chatinputcom from "./chatinputcom.vue";
import chatitemcom from "./chatitemcom.vue";

export default {
  name: "chatcomp",
  props: ["currentUser"],
  components: {
    chatinputcom,
    chatitemcom,
  },
  data() {
    return {
      chatlist: [
        {
          user: {
            username: "小紅",
            headimg: require("../assets/img/1.jpg"),
          },
          chatcontent: "吃了ㄇ?",
        },
      ],
    };
  },
  methods: {
    sentMsg(msg) {
      console.log(this);
      console.log(this.$root.$children[0].currentUser);
      this.chatlist.push({
        user: {
          username: "小紅",
          headimg: require("../assets/img/1.jpg"),
        },
        chatcontent: msg,
      });
      this.chatlist.push({
        user: this.$root.$children[0].currentUser,
        chatcontent: '我也愛你',
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
  width: 500px;
  height: 700px;
  border: 1px solid #ccc;
}
</style>
