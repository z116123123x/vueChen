// http://nodejs.cn/api/http.html#http_http_createserver_options_requestlistener
// node 內建的 http.createServer()
var server = require('http').createServer() 
var socket = require('socket.io')
var io = socket(server, {
    cors: {
        origin: '*',
    }
});
// 解決 CROS 參考下列網址
// https://stackoverflow.com/questions/24058157/socket-io-node-js-cross-origin-request-blocked

server.listen(8000)

// 實時通訊的連接
// io.on('connection',事件的回調函數) 監聽socketio的連接事件
io.on('connection', function (socket) { // 傳入 socket 套接字連接對象
    // socket.emit()，發送事件名稱'news'，並夾帶 { hello: 'world' } 數據給客戶端
    socket.emit('news', { hello: 'world' })
    // 監聽客戶端發送過來的內容
    socket.on('my other event', function (data) {
        console.log(data)
    })
})

// websocket再連接時需要http通道，連接成功後就是基於tcp來通信，不是http格式了