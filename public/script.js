var side = 10;


 var matrix = [];
var n = 80;
var m = 80;

var NumberOfGrass = 50 * n * n / 100;
var NumberOfHerbaceous = 5 * n * n / 100;
var NumberOfPredator = 2 * n * n / 100;;
var NumberOfFly = 50;
var numberOfFrog = 10;

var score = 0;



for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
        matrix[y][x] = 0;
    }
}
console.log(matrix);


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





// var matrix = [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
//     [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ];


function setup() {



    frameRate(20);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = new Grass(x, y, 1);
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = new GrassEater(x, y, 2);
            }
            else if (matrix[y][x] == 3) {
                matrix[y][x] = new Predator(x, y, 3);
            }
            else if (matrix[y][x] == 4) {
                matrix[y][x] = new Fly(x, y, 4);
            }
            else if (matrix[y][x] == 5) {
                matrix[y][x] = new Frog(x, y, 5);
            }
        }
    }
    console.log(matrix);

}
function draw() {
    background("#acacac");

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x].index == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            if (matrix[y][x].index == 2) {
                if (matrix[y][x].infected == true) {
                    fill("violet");
                }
                else {
                    fill("yellow");
                }
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;

            }
            if (matrix[y][x].index == 3) {
                if (matrix[y][x].infected == true) {
                    fill("violet");
                }
                else {
                    fill("red");
                }
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;
            }
            if (matrix[y][x].index == 4) {
                fill("violet");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;
            }
            if (matrix[y][x].index == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;
            }
        }
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x].index == 1) {
                matrix[y][x].mul();
            }
            else if (matrix[y][x].index == 2) {
                matrix[y][x].eat();
            }
            else if (matrix[y][x].index == 3) {

                matrix[y][x].eat();
            }
            else if (matrix[y][x].index == 4) {
                matrix[y][x].infect();
            }
            else if (matrix[y][x].index == 5) {
                matrix[y][x].eat();
            }
        }
    }
}





