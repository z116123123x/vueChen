var app = require('http').createServer(handler)
// var io = require('socket.io')(app)
// 下面兩行可以簡寫成上面
// 解決 CROS 參考下列網址
// https://stackoverflow.com/questions/24058157/socket-io-node-js-cross-origin-request-blocked
var socket = require('socket.io')
var io = socket(app, {
    cors: {
        origin: '*',
    }
});
//
var fs = require('fs')

app.listen(8000)

// 處理 web服務器 (http) 正常的請求
// fs.readFile(__dirname+'/index.html') 讀取當前資料夾的 /index.html
// res.end(data) 輸出 index.html
function handler() {
    fs.readFile(__dirname + '/index.html'),
        function (err, data) {
            if (err) {
                res.writeHead(500)
                return res.end('error loading index.html')
            }
            res.writeHead(200)
            res.end(data)
        }
}

// 實時通訊的連接
// io.on('connection',事件的回調函數) 監聽socketio的連接事件
io.on('connection', function (socket) { // 傳入 socket 套接字連接對象
    // socket.emit()，發送 { hwllo: 'world' } 數據給客戶端，發送名稱'news'
    socket.emit('news', { hwllo: 'world' })
    // 監聽客戶端發送過來的內容
    socket.on('my other event', function (data) {
        console.log(data)
    })
})



// websocket再連接實需要http通道，連接成功後就是基於tcp來通信，不是http格式了