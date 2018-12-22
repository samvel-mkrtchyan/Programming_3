var LivingCreature = require("./class.LivingCreature");
var stat  = require("./statistic");


module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
        this.directions = [];
        this.acted = false;
        this.infected = false;
        this.infectivityDuration = 20;
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
        return super.chooseCell(character, matrix);
    }
    move(matrix) {
        var newCell = this.random(this.chooseCell(0, matrix));
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

        }
        else this.acted = false; 

    }
    eat(matrix) {
        var newCell = this.random(this.chooseCell(1, matrix));
        if (newCell && this.infected == false) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            stat.grass.dead++;
            stat.grass.current--;
            

            if (this.energy >= 20) {
                this.mul(matrix);
            }


        }
        else {
            this.move(matrix);

            if (this.infected == true) {
                this.infectivityDuration--;
                if (this.infectivityDuration <= 0) {
                    this.infected = false;
                    this.infectivityDuration = 20;
                }

            }
        }
    }
    mul(matrix) {
        var newCell = this.random(this.chooseCell(0, matrix));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new GrassEater(newX, newY, 2);
            this.energy = 6;

            stat.grassEater.born++;
            stat.grassEater.current++;

        }
    }
    die(matrix) {
        matrix[this.y][this.x] = 0;
        stat.grassEater.current--;
        stat.grassEater.dead++;
    }

}
