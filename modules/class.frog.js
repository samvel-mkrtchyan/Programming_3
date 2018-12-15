var LivingCreature = require("./class.LivingCreature");

module.exports = class Frog extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.directions = [];
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
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)
    }
    eat() {
        var newCell = random(this.chooseCell(4));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;
        }
        else {
            this.move();
            this.fight();
            // if (this.sumOfFrog == 1) {
            //     matrix[this.x][this.y] = 0;
            // }
        }
    }
    move() {
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

    }
    fight() {
        var oponentCell = random(this.chooseCell(5));

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
        }
    }
}