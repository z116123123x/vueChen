let socketobj={
    getsocket(server){
        // getsocket() 會將實例化的 socket.io 放到 socketobj.io
        socketobj.io=require('socket.io')(server, {cors: {origin: '*'}})
    }
}
module.exports=socketobj