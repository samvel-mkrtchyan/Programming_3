var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("./public"));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

var matrix = require("./Modules/matrix");
console.log( matrix );

io.on('connection', function (socket) {
  socket.emit("getNewMatrix", matrix);

});

var frameCount = 5;

function frameRate(fc) {
  return 1000 / fc;
}

var time = frameRate(frameCount);

function draw() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x].index == 1) {
        matrix[y][x].mul( matrix );
      }
      else if (matrix[y][x].index == 2) {
        matrix[y][x].eat(matrix);
      }
      else if (matrix[y][x].index == 3) {

        matrix[y][x].eat(matrix);
      }
      else if (matrix[y][x].index == 4) {
        matrix[y][x].infect(matrix);
      }
      else if (matrix[y][x].index == 5) {
        matrix[y][x].eat(matrix);
      }
    }
  }

}

setInterval(draw, time);