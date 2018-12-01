class Frog {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [];
        this.acted = false;
        this.energy = 100;

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
    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
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

            }
            else {
                matrix[oponentY][oponentX] = 0;
            }
        }
    }
}