class Fly extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index);
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
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)

        
    }
    mul() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Fly(newX, newY, 4);
            this.energy = 6;

        }
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
    infect() {
        var erkusner = this.chooseCell(2);
        var ereqner = this.chooseCell(3);
        var yndhanur = erkusner.concat(ereqner);

        var newCell = random(yndhanur);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX].infected = true;



            this.energy++;
            if (this.energy >= 30) {
                this.mul();
            }

        }
        else {
            this.move();
        }

    }
    die() {

        matrix[this.y][this.x] = 0;
    }


}