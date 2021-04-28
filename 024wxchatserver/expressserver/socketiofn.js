// 每個瀏覽器執行 socket.io-client 都會有不同的 socketID
let sqlQuery = require('./modules/sql')

let socketobj = {
    getsocket(server) { // 會被 /bin/www 調用
        // getsocket() 會將實例化的 socket.io 放到 socketobj.io
        socketobj.io = require('socket.io')(server, { cors: { origin: '*' } })
        let io = socketobj.io
        io.on('connection', function (socket) {
            console.log('與 socket client 建立起連接')
            console.log(socket.id)
            // socket 監聽 login 事件
            // vue 的 chooseuser 組件會發送 login 事件跟 user 數據 socket.emit('login',user)
            socket.on('login', async function (data) {
                // console.log(data)
                let sqlstr1 = 'select * from user where isonline=? and username=?'
                let result1 = await sqlQuery(sqlstr1, ['true', data.username])
                if (result1.length > 0) {
                    // socket.to(result1[0].socketid) 發送給目前在資料庫的 socketid
                    socket.to(result1[0].socketid).emit('logout', { content: '有人登入近來，強制將你踢出!' })
                }

                // 修改數據庫登入訊息 (socketid,isonline)
                let sqlstr = 'update user set socketid=?,isonline=? where username=?'
                let result = await sqlQuery(sqlstr, [socket.id, 'true', data.username])
                socket.emit('login', {
                    state: 'ok',
                    content: '登入成功',
                })

                // 查詢所有用戶
                let sqlstr2 = 'select * from user'
                let result2 = await sqlQuery(sqlstr2)
                io.sockets.emit('users', Array.from(result2))

                // 接收其他人發給自己但還未已讀的訊息
                let sqlstr3 = 'select * from chat where `isread` = ? and `to` = ?'
                // data.username 是當前登入的人的 username，也就是找到發送給自己的消息
                let result3 = await sqlQuery(sqlstr3, ['false', data.username])
                socket.emit('unreadMsg', Array.from(result3))

                // 找到所有群組
                let sqlstr4 = 'select * from user where `isgroup` = ?'
                let result4 = await sqlQuery(sqlstr4, ['true'])
                // 一登入就調用 socket.join() 加進所有群組
                Array.from(result4).forEach((item,index)=>{
                    socket.join(item.socketid)
                })

            })

            // 監聽斷開事件
            socket.on('disconnect', async function () {
                // 用戶斷開後更新資料庫欄位 isonline 為 null，socketid 為 null
                let sqlstr = 'update user set socketid=?,isonline=? where socketid=?'
                let result = await sqlQuery(sqlstr, [null, null, socket.id])
            })

            socket.on('users', async function () {
                let sqlstr = 'select * from user'
                // 等待 mysql 獲取查詢結果
                let result = await sqlQuery(sqlstr)
                socket.emit('users', Array.from(result))
            })

            socket.on('sendMsg', async function (msg) {
                // console.log(msg)
                // 判斷收消息的人是否在線上
                let strSql = 'select * from user where username = ? and isonline = ?'
                let result = await sqlQuery(strSql, [msg.to.username, 'true'])
                if (result.length > 0) {
                    // result.length>0 如果返回結果大於零代表此人在線上，就直接發送消息
                    let toid = result[0].socketid
                    socket.to(toid).emit("accept", msg)
                    // 將聊天內容存放到數據庫
                    let strSql1 = 'insert into chat (`from`,`to`,`content`,`time`,`isread`) values (?,?,?,?,?)'
                    let arr1 = [msg.from.username, msg.to.username, msg.content, msg.time, 'true']
                    sqlQuery(strSql1, arr1)
                } else {
                    // 將聊天內容存放到數據庫
                    let strSql1 = 'insert into chat (`from`,`to`,`content`,`time`,`isread`) values (?,?,?,?,?)'
                    let arr1 = [msg.from.username, msg.to.username, msg.content, msg.time, 'false']
                    sqlQuery(strSql1, arr1)
                }
            })

            // 如果收到已讀消息，將已讀消息改為true
            socket.on('readMsg', (data) => {
                // console.log('---readMsg---')
                // console.log(data)
                let sqlStr = 'update chat  set `isread` = ? where `from` = ? and `to` = ?'
                sqlQuery(sqlStr, ['true', data.username, data.self])
            })

        })
    }
}

module.exports = socketobj