<template>
  <div>
    <input @keydown.13="childSentMsg" v-model="inputcontent" type="text" />
    <button @click="childSentMsg">送出</button>
  </div>
</template>

<script>
export default {
  name: "chatinputcom",
  data() {
    return {
      inputcontent: "",
    };
  },
  props: ["sentMsg"],
  methods: {
    childSentMsg() {
      this.sentMsg(this.inputcontent);
      this.inputcontent = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
