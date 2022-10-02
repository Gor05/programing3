var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
function matrixGenerator(matrixSize, grassCount, grEatCount, predatorCount, eathelperCount, terroristCount) {
    let matrix = [];

    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = []
        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = 0;
        }
    }

    for (let i = 0; i < grassCount; i++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        }

    }

    for (let i = 0; i < grEatCount; i++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }

    }
    for (let i = 0; i < predatorCount; i++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }

    }

    for (let i = 0; i < eathelperCount; i++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }

    }

    for (let i = 0; i < terroristCount; i++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }

    }

    return matrix;
}



 matrix = matrixGenerator(25, 15, 20, 25, 10,17);
console.log(matrix);

io.sockets.emit('send matrix',matrix)

 grassArr = []
 grassEaterArr = []
 predatorArr = []
 eathelperArr = []
 terroristArr = []


 Grass = require("./grass")
 GrassEater = require("./grassEater")
 Predator = require("./predator")
 Eathelper = require("./eathelper")
 Terrorist = require("./terrorist")


 function createObject(){
 for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y)

            grassArr.push(gr)
        } else if (matrix[y][x] == 2) {
            var grEat = new GrassEater(x, y)

            grassEaterArr.push(grEat)
        } else if (matrix[y][x] == 3) {
            var pre = new Predator(x, y)

            predatorArr.push(pre)
        }
        else if (matrix[y][x] == 4) {
           var ehelp = new eathelper(x, y)

            eathelperArr.push(ehelp)
        }
        else if (matrix[y][x] == 5) {
            var terror = new Terrorist(x, y)

            terroristArr.push(terror)
        }
    }
  }
  io.sockets.emit('send matrix',matrix)


 }

 function game(){
    for (var i in grassArr) {
      grassArr[i].mul()
  }
  
  for (let j in grassEaterArr) {
      grassEaterArr[j].mul()
      grassEaterArr[j].eat()
  }
  
  for (let j in predatorArr) {    
      predatorArr[j].mul()
      predatorArr[j].eat()    
  }   
  for (let j in eathelperArr) {
      eathelperArr[j].mul()   
      eathelperArr[j].eat()   
  }
  for (let j in terroristArr) {   
      terroristArr[j].mul()
      terroristArr[j].eat()
  }
  io.sockets.emit('send matrix',matrix)   
  }

setInterval(game,200) 
function kill() {
    grassArr = [];
    grassEaterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}


io.on('connection', function (socket) {
    createObject(matrix);
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add eathelper", addEathelper);
    socket.on("add predator", addPredator);
    socket.on("add terrorist", addTerrorist);
});
var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.Eathelper = eathelperArr.length;
    statistics.Predator = predatorArr.length;
    statistics.Terrorist = terroristArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)