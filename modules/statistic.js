var fs = require("fs");

var statistic = {
    "grass": grassScore = 0,
    "grassEater": grassEaterScore = 0,
    "predator": predatorScore = 0,
    "fly": flyScore = 0,
    "frog": frogScore = 0
};

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x].index == 1) {
            statistic.grass++;
        }
        if (matrix[y][x].index == 2) {
            statistic.grassEater++;

        }
        if (matrix[y][x].index == 3) {
            statistic.predator++;

        }
        if (matrix[y][x].index == 4) {
            statistic.fly++;

        }
        if (matrix[y][x].index == 5) {
            statistic.frog++;
        }
    }
}
io.on('connection', function (socket) {
    socket.emit("getStat",st);
});

function max(a,b,c,d){
    if (a>b){
        y = a; 
    }
    else{
        y = b;
    }
    if(c>y){
        y = c;  
    }
    if(d>y){
        y=d;
    }
    return y;
}



var myJSON = JSON.stringify(statistic);

function main() {
    fs.writeFileSync("statistic", myJSON);

}
main();
