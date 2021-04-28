// 每個瀏覽器執行 socket.io-client 都會有不同的 socketID

let socketobj = {
    getsocket(server) { // 會被 /bin/www 調用
        // getsocket() 會將實例化的 socket.io 放到 socketobj.io
        socketobj.io = require('socket.io')(server, { cors: { origin: '*' } })
        let io = socketobj.io
        io.on('connection', function (socket) { // 傳入 socket 套接字連接對象，默認命名空間'/'
            // 此處的 socket 是某個瀏覽器與服務器的連接對象

            // io.sockets 給所有客戶端
            // io.sockets.emit 發送廣播事件
            // 廣播客戶端ID: socket.id
            io.sockets.emit('addUser', {
                id: socket.id,
                content: '新用戶加入'
            })

            // socket.emit()，發送 { hello: 'world' } 數據給客戶端，發送名稱'news'
            socket.emit('news', { hello: 'world', where: 'from express' })

            // 監聽客戶端發送過來的內容
            socket.on('my other event', function (data) { // 監聽客戶端'my other event'事件
                console.log(socket.id)
                console.log(data)
                // 發送給客戶端'server study'事件
                socket.emit('server study', { content: '伺服器回應: 學習前端' })
            })

            // 實現用戶間傳遞消息
            // 先監聽客戶端'sendtoserver'事件，拿到客戶端要發送的接收者ID
            // 監聽到客戶端發送'sendtoserver'事件，就執行socket.to(接收者ID).emit('senttoclient',data)向接收者ID傳遞data
            // 在客戶端監聽'senttoclient'事件，獲取數據
            // 我們希望拿到的數據要有發送者及接收者的ID
            // 類似: 
            // data={
            //     to:'接收者ID',
            // }

            // 監聽客戶端'sendtoserver'事件，監聽到就觸發socket.to(接收者id).emit('senttoclient', data)
            socket.on('sendtoserver', function (data) { // 監聽客戶端'sendtoserver'事件
                // socket.to(接收者id)，這個方法可以將數據發送給接收者
                socket.to(data.to).emit('senttoclient', data)
                // 在客戶端監聽'senttoclient'發送事件
            })

            // 群聊功能
            // 創建房間
            socket.on('addroom', function (data) { // 監聽客戶端'addroom'事件
                // 客戶端發來的 data: {room:'qunliao'}
                socket.join(data.room)
                console.log('io.sockets.adapter.rooms',io.sockets.adapter.rooms); // 可以看到被創建的房間
            })
            // 監聽群聊事件，監聽到後再將數據發送到房間
            socket.on('sendmsgtoroom', function (data) { // 監聽客戶端'sendmsgtoroom'事件
                console.log('sendmsgtoroom data:',data)
                // 發送'qunliao'事件給房間其他人，不包括自己
                socket.to(data.room).emit('qunliao',data)
            })
        })

        let qq = io.of('/qq')
        qq.on('connection', function (socket) {
            qq.emit('news', { content: 'qq命名空間發送的數據' })
        })

        let wx = io.of('/wx')
        wx.on('connection', function () {
            wx.emit('news', { content: 'wx命名空間發送的數據' })
        })

    }
}

module.exports = socketobj