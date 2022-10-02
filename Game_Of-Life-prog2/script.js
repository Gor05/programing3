var socket = io()

var side = 35;




function setup() {
    createCanvas(25 * side,25 * side);

   
}

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green")
            } else if (matrix[y][x] == 2) {
                fill("yellow")
            } else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("magenta")
                
            } else if (matrix[y][x] == 5) {
                fill("blue") }
            else {
                fill("gray")
            }
            rect(x * side, y * side, side, side)
        }
    }
    socket.on('send matrix', nkarel)
    
}
function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator() {
    socket.emit("add predator")
}
function addEathelper() {
    socket.emit("add eathelper")
}
function addTerrorist() {
    socket.emit("add terrorist")
}

