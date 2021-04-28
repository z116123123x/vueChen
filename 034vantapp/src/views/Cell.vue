<template>
  <div class="cellpage">
    支付
    <van-cell-group>
      <van-cell :border="false" title="支付" icon="refund-o" is-link to="/about" />
      <van-cell title="支付" icon="refund-o" is-link to="/about" />
      
      <van-cell  icon="refund-o" to="/about">
          <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">支付</span>
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="phone-o" color="#1989fa" size="1.5rem" info="99" />
        </template>
      </van-cell>

      <van-cell  icon="refund-o" to="/about">
          <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">支付</span>
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="phone-o" dot />
        </template>
      </van-cell>

    </van-cell-group>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Cell",
  components: {},
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.cellpage {
  width: 100vw;
  height: 100vh;
  background: #efefef;
}
</style>
