<template>
  <div class="userlist">
    <h1>用戶列表</h1>
    <ul>
      <li @click="chooseUser(userIndex)" v-for="(item, userIndex) in userlist" :key="userIndex">
        <img :src="item.headimg" alt="" />
        <h3>{{ item.username }}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "userlistcomp",
  props: ["userlist"],
  methods: {
    chooseUser(userIndex){
      this.$emit('emituser', userIndex) // emit 事件只能用小寫英文命名
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 增加 "scoped" 屬性限制 CSS 只能用在這個組件 -->
<!-- 假如不增加 "scoped" 屬性限制 CSS 則 CSS 將會變成全域的，也就是所有組件都會套用到這裡面的 CSS -->
<style scoped>
.userlist {
  width: 300px;
  height: 700px;
  background-color: rgba(135, 207, 235, 0.5);
}
.userlist li {
  display: flex;
}
.userlist li img {
  width: 80px;
  height: 80px;
}
</style>
