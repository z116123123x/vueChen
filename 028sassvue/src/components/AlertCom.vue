<template>
  <div class="alert">
    <div class="zhezhao">
      <div class="alertMain">
        <div class="title">溫馨提示:{{ title }}</div>
        <div class="content">
          {{ content }}
        </div>
        <div class="btnList">
          <div @click="cancelEvent" class="btn cancel">取消</div>
          <div @click="confirmEvent" class="btn confirm">確認</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: ["title", "content", "cancelEvent", "confirmEvent"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$theme-color: orange;
$default-size: 18px;
$font-color: #fff;
$zzopcity: 0.6;
@mixin fullScreen() {
  width: 100vw;
  height: 100vh;
  display: flex;
}
@mixin defaultPadding() {
  padding: 10px;
}
@mixin button($padding:20px) {
  padding: $padding;
  text-align: center;
}
.alert {
  @include fullScreen();
  .zhezhao {
    @include fullScreen();
    background: rgba(0, 0, 0, $zzopcity);
    justify-content: center;
    align-items: center;
  }
  .alertMain {
    width: 600px;
    height: 400px;
    background: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    .title {
      font-size: $default-size;
      height: 50px;
      background: $theme-color;
      color: $font-color;
      @include defaultPadding();
      text-align: left;
      line-height: 50px;
      font-weight: 900;
    }
    .content {
      @include defaultPadding();
      font-size: $default-size;
    }
    .btnList {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      width: 100%;
    }
    .btn {
      @include button();
      width: 50%;
    }
    .cancel {
      background: pink;
      color: $font-color;
    }
    .confirm {
      background: yellowgreen;
      color: $font-color;
    }
  }
}
</style>
