var LivingCreature = require("./class.LivingCreature");
var stat  = require("./statistic");


module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 12;
        this.directions = [];
        this.acted = false;
        this.infected = false;
        this.infectivityDuration = 20;
    };
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],


        ];
    }
    chooseCell(character, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(character, matrix);

    }
    eat(matrix) {
        var newCell = this.random(this.chooseCell(2, matrix));
        if (newCell && this.infected == false) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            stat.grassEater.current--;
            stat.grassEater.dead++;


            if (this.energy >= 16) {
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

            matrix[newY][newX] = new Predator(newX, newY, 3);
            this.energy = 10;

            stat.predator.born++;
            stat.predator.current++;

        }
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

        }
        this.energy--;
        if (this.energy <= 0) {
            this.die(matrix);
            
        }
    else this.acted = false; 
    
    }

    die(matrix) {

        matrix[this.y][this.x] = 0;
        stat.predator.current--;
        stat.predator.dead++;
    }
}



