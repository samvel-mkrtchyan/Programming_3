var side = 10;

var matrix = [];

var socket = io();

function setup() {
    frameRate(0);

    socket.on("getNewMatrix", function (mtx) {
        matrix = mtx;
        console.log(matrix);
        createCanvas(matrix[0].length * side + 80, matrix.length * side);
        background('#acacac');
        redraw()

        socket.on("redraw", function (mtx) {
            matrix = mtx;
            redraw()
        });
    });

    noLoop();
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
            }
            if (matrix[y][x].index == 3) {
                if (matrix[y][x].infected == true) {
                    fill("violet");
                }
                else {
                    fill("red");
                }
                rect(x * side, y * side, side, side);
                
            }
            if (matrix[y][x].index == 4) {
                fill("violet");
                rect(x * side, y * side, side, side);
                
            }
            if (matrix[y][x].index == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
    }
}