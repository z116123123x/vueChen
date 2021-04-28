<template>
  <div class="chatuser">
    <div class="header">
      <span @click="closechat" class="back">&lt;</span>
      <div>{{ touser.username }}</div>
    </div>
    <!-- ref 屬性可以將元素放進 vue 實例 -->
    <div class="chatlist" ref="chatbox">
      <div
        class="chatItem"
        v-for="(item, index) in chatlist"
        :key="index"
        :class="{ self: $root.me.username == item.from.username }"
      >
        <div class="header">
          <img :src="item.from.headimg" alt="" />
        </div>
        <div class="chatContent">
          {{ item.content }}
        </div>
      </div>
    </div>
    <div class="inputcom">
      <input type="text" v-model="inputData" @keydown.enter="sendEvent" />
      <button @click="sendEvent">發送</button>
    </div>
  </div>
</template>

<script>
import socket from "../socket";
export default {
  name: "chatuser",
  data() {
    return {
      chatlist: [],
      inputData: "",
    };
  },
  props: ["touser", "closechat", "newmsg"],
  methods: {
    sendEvent() {
      let msg = {
        from: this.$root.me,
        to: this.touser,
        content: this.inputData,
        time: new Date().getTime(),
      };
      // 發送到服務端
      socket.emit("sendMsg", msg);
      this.chatlist.push(msg);
      this.saveStorage();
    },
    // 保存聊天紀錄到本地
    saveStorage() {
      let strkey =
        "chat-user-" + this.$root.me.username + "-" + this.touser.username;
      localStorage[strkey] = JSON.stringify(this.chatlist);
    },
    getStorage() {
      let strkey =
        "chat-user-" + this.$root.me.username + "-" + this.touser.username;
      // console.log(this.$root.me.username)
      // console.log(this.touser.username)
      // 還沒聊天過的話 localStorage 會是空的，就設置一個空數組
      // 為什麼是空數組? 因為 localStorage 只能放 JSON 格式的數據
      // https://stackoverflow.com/questions/46613243/uncaught-syntaxerror-unexpected-token-u-in-json-at-position-0
      // console.log(strkey)
      // 也可以用三元運算符設置空數組 localStorage[strkey] = localStorage[strkey]? localStorage[strkey]: "[]";
      if (localStorage[strkey] != undefined) {
        this.chatlist = JSON.parse(localStorage[strkey]);
      } else {
        localStorage[strkey] = JSON.stringify([]);
        this.chatlist = JSON.parse(localStorage[strkey]);
      }
      // console.log(this.chatlist);
    },
    toBottom() {
      // template 裡的 ref 屬性可以將元素放進 vue 實例
      let chatbox = this.$refs.chatbox;
      chatbox.scrollTop = chatbox.scrollHeight - chatbox.clientHeight;
    },
  },
  beforeMount() {
    this.getStorage();
    socket.emit("readMsg", {
      self: this.$root.me.username,
      username: this.touser.username,
    });
    // console.log(this.$root.me)
    // console.log(this)
  },
  mounted() {
    this.toBottom();
  },
  watch: {
    newmsg(val){ // 監測 prop newmsg 的變化，如果有變化就調用此函數
      this.chatlist.push(val)
      this.saveStorage()
    }
  },
  updated() {
    this.toBottom();
  },
};
</script>

<style scoped>
.chatItem {
  display: flex;
  margin: 5px 10px;
}

.chatItem.self {
  flex-direction: row-reverse;
  justify-content: flex-start;
}

.chatItem .header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.chatItem .chatContent {
  background: #bbb;
  border-radius: 5px;
  padding: 8px 10px;
  color: #fff;
  margin: 0 0px 0 20px;
  line-height: 34px;
  position: relative;
}

.chatItem.self .chatContent {
  margin: 0 20px 0 0px;
}

.chatItem .chatContent::before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  border-right: 10px solid #bbb;
  border-top: 10px solid transparent;
  border-bottom: 5px solid transparent;
  top: 20px;
  left: -10px;
}

.chatItem.self .chatContent::before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  border-left: 10px solid #bbb;
  border-top: 10px solid transparent;
  border-bottom: 5px solid transparent;
  top: 20px;
  right: -10px;
  left: initial;
  border-right: initial;
}

.chatuser {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #efefef;
}

.chatuser .back {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  top: 0px;
  left: 0px;
  position: absolute;
}

.chatuser > .header {
  font-size: 18px;
  font-weight: 900;
  background-color: skyblue;
  height: 40px;
  text-align: center;
  line-height: 40px;
}

.chatuser > .header {
  position: relative;
}

.chatlist {
  flex: 1;
  overflow: scroll;
}
.inputcom {
  height: 50px;
  display: flex;
  background: #eee;
  justify-content: space-around;
}
.inputcom input {
  width: 270px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  margin: 0 5px;
}
.inputcom button {
  width: 80px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #ccc;
  margin: 0 5px;
}
</style>
