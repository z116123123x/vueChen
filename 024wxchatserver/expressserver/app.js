var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sqlQuery = require('./modules/sql');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/api/userlist', async function (req, res) {
  let sqlStr = "select * from user where isgroup is null"
  let result = await sqlQuery(sqlStr)
  res.append('Access-Control-Allow-Origin','*')
  res.append('Access-Control-Allow-Content-Type','*')
  res.json(Array.from(result))
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// socket
// 為什麼這裡要延遲100毫秒
// 因為 "start": "node ./bin/www" 主要是運行 www 文件
// www 文件中可以發現 app.js 早就被運行了，但是 socket.io 還未被視實例化，所以找不到 socket.io
// 所以這邊先將 socket.io 延遲100毫秒

// 不延遲調用 socketobj.io 的話就會出現以下錯誤
// io 是 undefined
// C:\Users\z1161\Desktop\VueChen\023socketio\expressserver\app.js
// io.on('connection', function (socket) { 
// TypeError: Cannot read property 'on' of undefined

// setTimeout(() => {
//   let socketobj = require('./socketiofn')
//   let io = socketobj.io
//   io.on('connection', function (socket) { // 傳入 socket 套接字連接對象
//     // socket.emit()，發送 { hello: 'world' } 數據給客戶端，發送名稱'news'
//     socket.emit('news', { hello: 'world', where: 'from express' })
//     // 監聽客戶端發送過來的內容
//     socket.on('my other event', function (data) {
//       console.log(data)
//     })
//   })
// }, 100);

module.exports = app;
