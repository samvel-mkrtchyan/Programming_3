var side = 10;

var matrix = [];

var socket = io();

function setup() {
    frameRate(0);

    socket.on("getNewMatrix", function (mtx) {
        matrix = mtx;
        console.log(matrix);
        createCanvas(matrix[0].length * side + 1800, matrix.length * side);
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
    
    function statistic(stat) {
        line(matrix[0].length * side, 100, matrix[0].length * side + 1800, 100);
        line(matrix[0].length * side, 150, matrix[0].length * side + 1800, 150);
        line(matrix[0].length * side, 200, matrix[0].length * side + 1800, 200);
        line(matrix[0].length * side, 250, matrix[0].length * side + 1800, 250);
        line(matrix[0].length * side, 300, matrix[0].length * side + 1800, 300);
        line(matrix[0].length * side, 350, matrix[0].length * side + 1800, 350);
        line(matrix[0].length * side, 400, matrix[0].length * side + 1800, 400);

        textSize(30);
        fill("green")
        text('Grass', matrix[0].length * side + 10, 130);
        rect(matrix[0].length * side + 100, 110, 20, 20);
        fill("yellow")
        text('Grass Eater', matrix[0].length * side + 10, 180);
        rect(matrix[0].length * side + 180, 160, 20, 20);
        fill("red")
        text('Predator', matrix[0].length * side + 10, 230);
        rect(matrix[0].length * side + 130, 210, 20, 20);
        fill("pink")
        text('Fly', matrix[0].length * side + 10, 280);
        rect(matrix[0].length * side + 60, 260, 20, 20);
        fill("black")
        text('Frog', matrix[0].length * side + 10, 330);
        rect(matrix[0].length * side + 80, 310, 20, 20);

        line(matrix[0].length * side + 220, 100, matrix[0].length * side + 220, 400);

        text(stat.grass, matrix[0].length * side + 230, 130);
    }
    //
}
