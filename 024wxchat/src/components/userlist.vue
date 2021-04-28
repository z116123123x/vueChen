<template>
  <div class="userlist">
    <div class="nav">
      <div class="headimg" :class="{ online: islogin }">
        <img v-if="$root.me != null" :src="$root.me.headimg" alt="" />
      </div>
      <div class="title">消 息</div>
      <div class="headimg"></div>
    </div>

    <div class="users">
      <div
        @click="chooseuser(item)"
        class="useritem"
        v-for="(item, index) in friends"
        :key="index"
      >
        <div class="left" :class="{ online: item.isonline == 'true',unread:unreadlist.indexOf(item.username)!=-1}">
          <img :src="item.headimg" alt="" />
        </div>
        <div class="right">
          <span class="username">{{ item.username }}</span>
          <span class="msg"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userlist",
  methods: {},
  props: ["islogin", "users", "chooseuser","unreadlist"],
  data() {
    return {};
  },
  mounted() {
    // console.log(this.users);
    // props 傳值進來會有時間差
    // setTimeout(() => {
    //   console.log(this.users);
    // }, 100);
  },
  computed: {
    // 第一種解決 props 傳值進來會有時間差的問題，使用 while
    // friends() {
    //   while (!!this.users) {
    //     return (this.users.filter((item, index) => {
    //       return item.username != this.$root.me.username;
    //     }));
    //   }
    // },

    // 第二種解決 props 傳值進來會有時間差的問題，使用 ifelse
    // Array.filter 是數組的函數，但是 prop 的 this.users 還未傳直進來得到的會是 null，進而報錯
    // 所以在 this.users 是 null 時先返回一個空數組
    // this.users 接收到父層傳來的陣列時，因為數據改變 computed 會在執行一次 friends()
    // 因為 this.users 不等於 null 所以會執行 else 裡面的 filter
    friends() {
      if (this.users===null) {
        return [];
      } else {
        return this.users.filter((item, index) => {
          return item.username != this.$root.me.username;
        });
      }
    },
  },
};
</script>

<style scoped>
.unread{
  position: relative;
}
.unread::before{
  position: absolute;
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: red;
  bottom: 5px;
  right: 5px;
  filter: grayscale(0) !important;
}
.useritem .left {
  filter: grayscale(1);
}
.useritem .right {
  padding: 0 10px;
}
.useritem {
  display: flex;
  height: 80px;
  background: #eee;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
}
.useritem .left img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.headimg {
  filter: grayscale(1);
  width: 50px;
  height: 50px;
  margin: 0 10px;
}
.online {
  filter: grayscale(0) !important;
}
.nav {
  height: 80px;
  width: 100vw;
  background-color: skyblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav .title {
  font-weight: 900;
  font-size: 1.2rem;
}
.headimg img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
