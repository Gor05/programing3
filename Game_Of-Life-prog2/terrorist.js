let LivingCreature = require('./LivingCreature')


module.exports = class Terrorist extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 8;
        this.multiply = 0
        this.directions = [];
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

    chooseCell(ups) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == ups) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var emptyCell = this.chooseCell(0);
        var newCell  =    emptyCell[Math.floor(Math.random() * emptyCell.length)];


        
        if (newCell && this.multiply >= 6) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var terror = new Terrorist(newX, newY);
            terroristArr.push(terror);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCell = this.chooseCell(0)
        var newCell  =    emptyCell[Math.floor(Math.random() * emptyCell.length)];

        if (newCell && this.energy >= 0) {
            console.log(newCell)
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCell = this.chooseCell(4)
        var newCell  =    emptyCell[Math.floor(Math.random() * emptyCell.length)];


        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in eathelperArr) {
                if (newX == eathelperArr[i].x && newY == eathelperArr[i].y) {
                    eathelperArr.splice(i, 1)
                    break;
                }
            }
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in terroristArr) {
            if (this.x == terroristArr[i].x && this.y == terroristArr[i].y) {
                terroristArr.splice(i, 1);
                break;
            }
        }
    }
}