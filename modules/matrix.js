var Grass = require("./class.grass");
var GrassEater = require("./class.grassEater");
var Predator = require("./class.predator");
var Fly = require("./class.fly");
var Frog = require("./class.frog");

var stat = require("./statistic")


var matrix = [];

var m = n = 80;

var NumberOfGrass = 50 * n * n / 100;
var NumberOfHerbaceous = 5 * n * n / 100;
var NumberOfPredator = 2.5 * n * n / 100;
var NumberOfFly = 50;
var numberOfFrog = 10;

var score = 0;

for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
        
        matrix[y][x] = 0;
    }
}

function createCanvas(num, ind) {
    while (score < num) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);

        if (matrix[y][x] == 0) {
            matrix[y][x] = ind;
            score++;
        }
    }
    score = 0;
}

createCanvas(NumberOfGrass, 1);
createCanvas(NumberOfHerbaceous, 2);
createCanvas(NumberOfPredator, 3);
createCanvas(NumberOfFly, 4);
createCanvas(numberOfFrog, 5);

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            matrix[y][x] = new Grass(x, y, 1);

            stat.grass.born++;
            stat.grass.current++;

        }
        else if (matrix[y][x] == 2) {
            matrix[y][x] = new GrassEater(x, y, 2);
            stat.grassEater.born++;
            stat.grassEater.current++;
        }
        else if (matrix[y][x] == 3) {
            matrix[y][x] = new Predator(x, y, 3);
            stat.predator.born++;
            stat.predator.current++;
        }
        else if (matrix[y][x] == 4) {
            matrix[y][x] = new Fly(x, y, 4);
            stat.fly.born++;
            stat.fly.current++;
        }
        else if (matrix[y][x] == 5) {
            matrix[y][x] = new Frog(x, y, 5);
            stat.frog.born++;
            stat.frog.current++;
        }
    }
}

module.exports = matrix;