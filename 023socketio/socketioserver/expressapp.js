var app = require('express')()
var server = require('http').Server(app)
// 在 server 後實例化 socket.io
var io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
var fs = require('fs')

server.listen(8000)
// app.listen(8000) will not work 

// http://127.0.0.1:8000/ 才看的到 index.html
// 客戶端 io.connect('http://localhost:8000') 是看不到 index.html 的
// 因為客戶端本身的端口不是 8000，只是在 io 連接8000
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
})

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

// websocket再連接實需要http通道，連接成功後就是基於tcp來通信，不是http格式了