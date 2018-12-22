var LivingCreature = require("./class.LivingCreature");
var stat  = require("./statistic");


module.exports = class Fly extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
        this.directions = [];
        this.acted = false;
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
        return super.chooseCell(character, matrix)


    }
    mul(matrix) {
        var newCell = this.random(this.chooseCell(0, matrix));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Fly(newX, newY, 4);
            this.energy = 6;

            stat.fly.born++;
            stat.fly.current++;

        }
    }
    move(matrix) {
        var newCell = this.random(this.chooseCell(0,matrix));
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.acted = true;


            }
            this.energy--;
            if (this.energy <= 0) {
                this.die(matrix);
            }
        else this.acted = false; 
        
        }
    }
    infect(matrix) {
        var erkusner = this.chooseCell(2, matrix);
        var ereqner = this.chooseCell(3, matrix);
        var yndhanur = erkusner.concat(ereqner);

        var newCell = this.random(yndhanur);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX].infected = true;



            this.energy++;
            if (this.energy >= 30) {
                this.mul(matrix);
            }

        }
        else {
            this.move(matrix);
        }

    }
    die(matrix) {

        matrix[this.y][this.x] = 0;
        stat.fly.dead++;
        stat.fly.current--;
    }


}