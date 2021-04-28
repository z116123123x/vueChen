<template>
  <div class="login">
    <h1>This is an Login page</h1>
    <h2>过渡动效</h2>
    <ol>
      <li>
        安裝 animate.css
        <ol>
          <li>
            animate.css官網
            <a href="https://animate.style/">https://animate.style/</a>
          </li>
          <li>yarn add animate.css</li>
        </ol>
      </li>
      <li>
        在 main.js 引入 animate.css<br />
        import 'animate.css'
      </li>
      <li>
        在 app.vue 使用 &lt;transition&gt; 做过渡动效
        <ol>
          <li>在 &lt;router-view /&gt; 外包一層 &lt;transition&gt; 標籤</li>
          <li>在 &lt;transition&gt; 加上動畫 class</li>
          <li>
            <pre>
&lt;transition mode="out-in" enter-active-class="animate__animated animate__bounceIn" leave-active-class="animate__animated animate__bounceOut"&gt;
  &lt;router-view /&gt;
&lt;/transition&gt;
            </pre>
          </li>
        </ol>
      </li>
      <li>避免兩個組件同時被重繪造成動畫跑版
        <ol>
          <li>在&lt;transition&gt; 加上 mode="out-in" <br>out-in：當前元素先進行過渡，完成之後新元素過渡進入。</li>
          <li>參考 <a href="https://cn.vuejs.org/v2/guide/transitions.html#%E8%BF%87%E6%B8%A1%E6%A8%A1%E5%BC%8F">https://cn.vuejs.org/v2/guide/transitions.html#%E8%BF%87%E6%B8%A1%E6%A8%A1%E5%BC%8F</a> </li>
        </ol>
      </li>
    </ol>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  text-align: left;
  padding: 0 20%;
}
</style>
