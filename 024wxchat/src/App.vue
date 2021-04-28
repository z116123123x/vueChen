<template>
  <div id="app">
    <chooseuser v-if="$root.me == null" :userlist="userlist" />
    <userlist
      v-if="$root.me != null && !ischat"
      :islogin="islogin"
      :users="users"
      :chooseuser="chooseuser"
      :unreadlist="unreadlist"
    />
    <chatuser
      v-if="ischat"
      :touser="touser"
      :closechat="closechat"
      :newmsg="newmsg"
    />
  </div>
</template>

<script>
import chooseuser from "./components/chooseuser.vue";
import userlist from "./components/userlist.vue";
import chatuser from "./components/chatuser.vue";
import axios from "axios";
import socket from "./socket";

export default {
  name: "App",

  components: {
    chooseuser,
    userlist,
    chatuser,
  },

  data() {
    return {
      userlist: [],
      islogin: false,
      users: null,
      ischat: false,
      touser: null,
      unreadlist: [],
      newmsg: null,
    };
  },

  async beforeMount() {
    // let res = await axios.get("http://localhost:3000/api/userlist");
    // 部屬上服務器就可以不用網域名，直接到 /api/userlist 取得資料
    let res = await axios.get("/api/userlist");
    let data = res.data;
    data.forEach((item, index) => {
      item.headimg = require("" + item.headimg);
    });
    // console.log(data);
    this.userlist = data;

    let path = "./assets/img/1.jpeg";
    // console.log(require(path)); //  "Error: Cannot find module './assets/img/1.jpeg'"
    // 原本 require(圖片路徑) 在編譯打包後應該要會產生一個新的路徑
    // 但是 require(path) 這裡的 path 是變數不是字串，node 會認為我們要引入一個模塊
    // 所以要在 require 傳入字串，而不是變數
    // require(''+path) 可以以這種方式將變數轉為字串
    // console.log(require("" + path));

    // console.log(res.data)
    // this.userlist=res.data
  },

  mounted() {
    // socket.on("login", function(data) {
    // 一般函數的 this 是依據現在的區域來綁定，
    // 所以一般函數的 this 綁定到 socket
    socket.on("login", (data) => {
      // 箭頭函數的 this 是依據語彙環境的父層區域（parent scope）來綁定，
      // 所以箭頭函數的 this 綁定到 App VueComponent
      // 因為要修改 VueComponent 的 data 所以使用箭頭函數
      // console.log(this);
      // console.log(socket);
      console.log("client login");
      if (data.state == "ok") {
        this.islogin = true;
      }

      // 發送 users 事件，socket server 監聽到 users 事件會執行 sql ，撈出 user table 在發送 users 事件
      // 在下方位置再寫一個 socket.on("users") 監聽 socket server 發送的 users 事件
      socket.emit("users");
    });

    // 監聽登出事件
    socket.on("logout", (data) => {
      // console.log(data);
      this.islogin = false;
      // 斷開連接
      socket.disconnect();
    });

    // 監聽斷開連接事件
    socket.on("disconnect", (data) => {
      console.log("斷開連接");
    });

    socket.on("users", (data) => {
      data.forEach((item, index) => {
        item.headimg = require("" + item.headimg);
      });
      this.users = data;
      // console.log(data)
    });

    socket.on("unreadMsg", (data) => {
      console.log(data);
      data.forEach((item, index) => {
        // 收到的 data 會是從 DB 撈出來的未讀消息，isread = false and to = this.$root.username
        // content: "01310933"
        // from: "小黃" // 誰發的消息
        // id: 7
        // isread: "false" // 未讀
        // time: 1612099997587
        // to: "小紅" // 給自己的
        // 這會發現裡面沒有頭像的圖片路徑，所以這邊要做替換，把上面的 from / to 替換成有頭像的對象
        // computed 方法將 this.usersObj 把 this.users 轉換成對象
        item.from = this.usersObj[item.from];
        item.to = this.usersObj[item.to];

        // 設置未讀紅點，將未讀消息的 from (誰傳給我的)，放進 unreadlist
        // 將 unreadlist 傳到子組件 userlist 後，判斷誰在 unreadlist 裡，就給他添加紅點
        this.unreadlist.push(item.from.username);

        // 將聊天的內容分別添加到本地的存儲
        // 先解析本地存儲再添加
        // chat-user-自己-發的消息的人
        let strkey =
          "chat-user-" + this.$root.me.username + "-" + item.from.username;
        localStorage[strkey] = localStorage[strkey]
          ? localStorage[strkey]
          : "[]";
        // JSON.parse(本地存儲) 得到陣列
        let newArr = JSON.parse(localStorage[strkey]);
        // 再將未讀的 item 添加進陣列
        newArr.push(item);
        // 再將添加完的陣列儲存在本地存儲
        localStorage[strkey] = JSON.stringify(newArr);
      });
    });

    socket.on("accept", (msg) => {
      // 要用箭頭函數才能指到父層 (vue 實例) 的 this
      console.log("------accept-----");
      console.log(msg);

      if (
        // 判斷是否進入聊天頁面(chatuser組件)，將 this.chooseuser() 方法傳到 userlist 子組件
        // 點擊 userlist 子組件裡的頭像會調用 this.chooseuser() 方法，修改數據 this.ischat = true
        // this.chooseuser() 方法，也會將 this.touser.username = userlist 子組件裡被點擊的頭像
        // msg.from.username 是後端 socket 中 from 誰的 username
        // msg.from.username == this.touser.username ， msg 來源跟我現在聊天的人是同一個人
        // 判斷兩人是否都在線上
        (this.ischat == true && msg.from.username == this.touser.username) || // 或者

        // msg.to(其他人發送到的).username(房間名稱)，其他人將訊息發送到的房間名稱
        // this.touser.username 我們進入的房間名稱
        // 判斷發訊息的人跟我是不是在同一個房間
        // --------------------------------------------------------------
        // msg.to.isgroup == "true" 判斷後端傳來的 msg 是發送到房間還是個人
        // --------------------------------------------------------------
        // 如果我們跟發訊息的人在同一房間就執行 this.newmsg = msg
        (msg.to.username == this.touser.username && msg.to.isgroup == "true")
      ) {
        console.log("兩人都進入聊天");
        console.log("---msg---");
        console.log(msg);
        console.log("---this.touser---");
        console.log(this.touser);
        this.newmsg = msg;
      } else {
        console.log("只有對方進入聊天");
        let strkey =
          "chat-user-" + this.$root.me.username + "-" + msg.from.username;
        localStorage[strkey] = localStorage[strkey]
          ? localStorage[strkey]
          : "[]";
        // JSON.parse(本地存儲) 得到陣列
        let newArr = JSON.parse(localStorage[strkey]);
        newArr.push(msg);
        localStorage[strkey] = JSON.stringify(newArr);
        this.unreadlist.push(msg.from.username);
      }
    });
  },

  methods: {
    chooseuser(user) {
      this.touser = user;
      this.ischat = true;
      let index = this.unreadlist.indexOf(user.username);
      this.unreadlist.splice(index, 1);
    },
    closechat() {
      this.ischat = false;
    },
  },

  computed: {
    usersObj() {
      let obj = {};
      this.users.forEach((item, index) => {
        obj[item.username] = item;
      });
      return obj;
    },
  },
};
</script>

<style>
/* init css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
