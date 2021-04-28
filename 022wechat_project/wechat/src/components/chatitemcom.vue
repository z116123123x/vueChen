<template>
  <div class="chatItem">
    <img :style="headimgstyle" :src="chatlist.user.headimg" />
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "chatitemcom",
  props: ['chatlist'],
  data(){
    return{
      headimgstyle:{
        width:'60px',
        height:'60px',
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatItem{
  display: flex;
}
</style>
