var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


///
app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('./public/index.html');
});
///
///
io.on('connection', function (socket) {
  socket.on("", function (data) { });
      /////
  socket.emit("", data);
      /////
});
////

app.listen(3000, function(){
  console.log("Server started");
});

