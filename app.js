var express = require('express');
var app = express();
var fs = require("fs");

var score = 0;
var weather;

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("./public"));

app.get('/', function (req, res) {
  res.redirect('index.html');
});

server.listen(3001);

var matrix = require("./Modules/matrix");
console.log(matrix);

var stat = require("./Modules/statistic")


io.on('connection', function (socket) {
  socket.emit("getNewMatrix", matrix);

  setInterval(function () {
    if (score <= 20) {
      weather = "winter";
    }
    else if (score > 20) {
      weather = "summer";
      if (score >= 40) {
        score = 0;
      }
    }
    score+=2;

    for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x].index == 1) {
          if (weather == "summer") {
            matrix[y][x].mul(matrix);
          }
        }
        else if (matrix[y][x].index == 2) {
          if (weather == "winter") {
            matrix[y][x].move(matrix);
          }
          else if (weather == "summer") {
            matrix[y][x].eat(matrix);
          }
        }
        else if (matrix[y][x].index == 3) {

          matrix[y][x].eat(matrix);
        }
        else if (matrix[y][x].index == 4) {
          if (weather == "summer") {
          matrix[y][x].infect(matrix);
        }
        }
        else if (matrix[y][x].index == 5) {
          matrix[y][x].eat(matrix);
        }
      }
    }
    socket.emit("weather", weather);

    socket.emit("redraw", matrix);

  }, time);

  setInterval(function () {

    var myJSON = JSON.stringify(stat);
    fs.writeFileSync("statistic.json", myJSON);
    socket.emit("getStat", stat);
  }, 1000);
});

var frameCount = 2;

function frameRate(fc) {
  return 1000 / fc;
}

var time = frameRate(frameCount);
