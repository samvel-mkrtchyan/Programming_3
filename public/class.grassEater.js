class GrassEater extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index);
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
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        var newCell = random(this.chooseCell(0));
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
                this.die();
            }
        }

    }
    eat() {
        var newCell = random(this.chooseCell(1));
        if (newCell && this.infected == false) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.energy++;
            if (this.energy >= 20) {
                this.mul();
            }

        }
        else {
            this.move();
            if (this.infected == true) {
                this.infectivityDuration--;
                if (this.infectivityDuration <= 0) {
                    this.infected = false;
                    this.infectivityDuration = 20;
                }

            }
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new GrassEater(newX, newY, 2);
            this.energy = 6;

        }
    }
    die() {
        matrix[this.y][this.x] = 0;

    }

}
