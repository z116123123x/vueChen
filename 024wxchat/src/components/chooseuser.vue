<template>
  <div class="chooseuser">
    <h1>請選擇你聊天的角色</h1>
    <div class="list">
      <div class="item" @click="chooseevent(item)" v-for="(item, index) in userlist" :key="index">
        <img :src="item.headimg" alt="" />
        <span>{{ item.username }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import socket from '../socket'
export default {
  name: "chooseuser",
  props: ["userlist"],
  methods: {
    chooseevent(user){
      this.$root.me=user
      localStorage.chatme=JSON.stringify(user)
      console.log(user)
      // console.log(localStorage.chatme)
      // console.log(socket)
      socket.emit('login',user)
    }
  },
};
</script>

<style scoped>
.chooseuser {
  widows: 100vw;
  height: 100vh;
  background-color: #ddd;
}
.chooseuser h1 {
  font-size: 20px;
  text-align: center;
  padding: 20px 0;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 50%;
  height: 130px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 15px 0;
}
.item img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
</style>
