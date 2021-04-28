import io from "socket.io-client";
// let socket = io.connect('http://localhost:3000/')
// 部署上服務器上就可以不給參數(網域名)，他的默認值就是服務器的網域
let socket = io.connect()
export default socket