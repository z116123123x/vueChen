<template>
  <div class="home">
    <div>
      <h3>van-button 是組件名稱， type="xxx" 是 props</h3>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <van-button color="linear-gradient(to top, #ff6034, #ee0a24)">
        渐变色按钮
      </van-button>
      <van-button type="primary" block>块级元素</van-button>
    </div>
    <HelloWorld aa="test aa prop" />
    <h3>在 js 在 require rocket.png 在通過 v-bind 放到 van-button</h3>
    <van-button :icon="rocket" type="info">
      按钮
    </van-button>
    <br>
    <br>
    <h3>沒有使用 v-bind 會出現下面的錯誤</h3>
    <h3>Invalid prop: type check failed for prop "round". Expected Boolean, got String with value "true".</h3>
    <h3>因為他將 round="true" 中的 true 視為字串</h3>
    <h3>要把 true 視為布林直要加上 v-bind</h3>
    
    <van-button type="primary" :round="true" to="/about">跳轉至 about</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: { HelloWorld },
  data() {
    return {
      rocket: require("" + "../assets/img/rocket.png"),
    };
  },
};
</script>
