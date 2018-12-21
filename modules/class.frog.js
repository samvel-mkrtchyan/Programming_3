var LivingCreature = require("./class.LivingCreature");
var stat  = require("./statistic");

module.exports = class Frog extends LivingCreature {
    constructor(x, y, index, numberOfFrog) {
        super(x, y, index);
        this.acted = false;
        this.energy = 100;
        this.sumOfFrog = numberOfFrog;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]

        ];
    }
    chooseCell(character, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(character,matrix)
    }
    eat(matrix) {
        var newCell = this.random(this.chooseCell(4,matrix));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            stat.fly.dead++;
            stat.fly.current--;

        }
        else {
            this.move(matrix);
            this.fight(matrix);
            // if (this.sumOfFrog == 1) {
            //     matrix[this.x][this.y] = 0;
            // }
        }
    }
    move(matrix) {
        if (this.acted == false) {

            var x = Math.floor(Math.random() * matrix[0].length);
            var y = Math.floor(Math.random() * matrix.length);
            while (matrix[y][x] !== 0) {
                x = Math.floor(Math.random() * matrix[0].length);
                y = Math.floor(Math.random() * matrix.length);
            }



            matrix[y][x] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            this.energy--;
            this.acted = true;

        }
        else this.acted = false; 

    }
    fight(matrix) {
        var oponentCell = this.random(this.chooseCell(5, matrix));

        if (oponentCell) {
            var oponentX = oponentCell[0];
            var oponentY = oponentCell[1];


            if (matrix[oponentY][oponentX].energy > matrix[this.y][this.x].energy) {
                matrix[this.y][this.x] = 0;
                // this.sumOfFrog--;
                // console.log(this.sumOfFrog);

            }
            else {
                matrix[oponentY][oponentX] = 0;
                // this.sumOfFrog--;
                // numberOfFrog--;

            }
            stat.frog.dead++;
            stat.frog.current--;

        }
    }
}