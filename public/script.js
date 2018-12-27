var side = 10;

var matrix = [];

var socket = io();
var stat = {};

var weather;

function setup() {
    frameRate(0);

    socket.on("getNewMatrix", function (mtx) {
        matrix = mtx;

        createCanvas(matrix[0].length * side + 1800, matrix.length * side);
        background('#acacac');

        socket.on("getStat", function (st) {
            stat = st;
            return stat;
        })
        socket.on("weather", function (w) {
            weather = w;
            return weather;
        })

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
                if (weather == "winter") {
                    fill("white");
                }
                else if (weather == "summer") {
                    fill("green");
                }
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
                if (weather == "winter") {
                    fill("blue");
                    rect(x * side, y * side, side, side);
                }
                else if (weather == "summer") {
                    fill("violet");
                    rect(x * side, y * side, side, side);
                }

            }
            if (matrix[y][x].index == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
    }

    statistic(stat);
}
function statistic(st) {
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
    line(matrix[0].length * side, 100, matrix[0].length * side, 400);
    line(matrix[0].length * side, 100, matrix[0].length * side, 400);
    line(matrix[0].length * side + 400, 100, matrix[0].length * side + 400, 400);
    line(matrix[0].length * side + 580, 100, matrix[0].length * side + 580, 400);

    text(weather, matrix[0].length * side + 230, 500);

    text('Born', matrix[0].length * side + 230, 90);
    text('Dead', matrix[0].length * side + 410, 90);
    text('Current', matrix[0].length * side + 590, 90);

    if (st != undefined) {
        text(str(st.grass.born), matrix[0].length * side + 230, 130);
        text(st.grassEater.born, matrix[0].length * side + 230, 180);
        text(st.predator.born, matrix[0].length * side + 230, 230);
        text(st.fly.born, matrix[0].length * side + 230, 280);
        text(st.frog.born, matrix[0].length * side + 230, 330);



        text(st.grass.dead, matrix[0].length * side + 410, 130);
        text(st.grassEater.dead, matrix[0].length * side + 410, 180);
        text(st.predator.dead, matrix[0].length * side + 410, 230);
        text(st.fly.dead, matrix[0].length * side + 410, 280);
        text(st.frog.dead, matrix[0].length * side + 410, 330);

        text(st.grass.current, matrix[0].length * side + 590, 130);
        text(st.grassEater.current, matrix[0].length * side + 590, 180);
        text(st.predator.current, matrix[0].length * side + 590, 230);
        text(st.fly.current, matrix[0].length * side + 590, 280);
        text(st.frog.current, matrix[0].length * side + 590, 330);
    }
}
