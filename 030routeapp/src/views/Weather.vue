<template>
  <div class="Weather">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/me">個人中心</router-link> |
    <router-link to="/news/xxx">新聞</router-link> |
    <router-link to="/weather/北京/朝阳">天氣</router-link> |
    <router-link to="/bigNews">新聞2</router-link> |
    <h1>天氣</h1>
    <h2>城市:{{ city }} - {{ area }}</h2>
    <h3>溫度:{{ temp }}</h3>
    <h3>風向:{{ windDir }} {{ windScale }} 級</h3>
    <h4>網址 + 參數範例: http://localhost:8080/weather/北京/朝阳</h4>
    <h3>帶入參數: /北京/朝阳</h3>
    <router-link to="/about">進入 about 頁面</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Weather",
  props: [],
  data() {
    return {
      city: "",
      area: "",
      temp: "",
      windDir: "",
      windScale: "",
    };
  },
  methods: {},
  async beforeMount() {
    let key = "8871c77a5b484d77a19ad873f8ccc678";
    // promise 捕捉錯誤的寫法
    // axios
    //   .get(
    //     `https://geoapi.qweather.com/v2/city/lookup?location=${this.$route.params.city}&key=${key}`
    //   )
    //   .then(
    //     (res) => {console.log(res)},
    //     (err) => {console.log(err)}
    //   );
    try {
      const response = await axios.get(
        `https://geoapi.qweather.com/v2/city/lookup?location=${this.$route.params.city}&key=${key}`
      );
      let data = response.data;
      // console.log(data);
      this.city = this.$route.params.city;
      this.area = this.$route.params.area;
      let area = data.location.filter((item, i) => {
        return item.name == this.$route.params.area;
      });
      let areaCodename = area[0].id;
      // console.log(areaCodename);
      const response2 = await axios.get(
        `https://devapi.qweather.com/v7/weather/now?location=${areaCodename}&key=${key}`
      );
      let data2 = response2.data;
      this.temp = data2.now.temp;
      this.windDir = data2.now.windDir;
      this.windScale = data2.now.windScale;
    } catch (error) {
      console.error("error");
      console.error(error);
    }
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
