//longest path algorithm


var timesFunction = function(callback) {
    if (typeof callback !== "function" ) {
      throw new TypeError("Callback is not a function");
    } else if( isNaN(parseInt(Number(this.valueOf()))) ) {
      throw new TypeError("Object is not a valid number");
    }
    for (var i = 0; i < Number(this.valueOf()); i++) {
      callback(i);
    }
};
  
String.prototype.times = timesFunction;

var map = []
var forward = "N"
var start = document.getElementsByName("user")[0].parentNode.id.split(":")
var currentPos = { xx: parseInt(start[0]), yy: parseInt(start[1]) }
var path = []
var escapePoints = []
"15".times((row) => {
    map.push([])
    "15".times((cell) => {
        if (document.getElementById(cell + ":" + row).childNodes.length == 0) {
            map[row].push({
                xx: cell,
                yy: row,
                visited: false
            })
        } else {
            map[row].push('obj')
        }
    })
})

function canIturnRight() {
    switch (forward) {
        case "N": 
            return canIgoTo("E")
        case "E":
            return canIgoTo("S")
        case "S":
            return canIgoTo("W")
        case "W":
            return canIgoTo("N")
    }
}

function canIturnLeft() {
    switch (forward) {
        case "N": 
            return canIgoTo("W")
        case "E":
            return canIgoTo("N")
        case "S":
            return canIgoTo("E")
        case "W":
            return canIgoTo("S")
    }
}

function turnRight() {
    switch (forward) {
        case "N": 
            forward = "E"
            break
        case "E":
            forward = "S"
            break
        case "S":
            forward = "W"
            break
        case "W":
            forward = "N"
            break
    }
}

function turnLeft() {
    switch (forward) {
        case "N": 
            forward = "W"
            break
        case "E":
            forward = "N"
            break
        case "S":
            forward = "E"
            break
        case "W":
            forward = "S"
            break
    }
}

function canIgoTo(direction, from) {
    if (from) var start = from; else var start = currentPos
    switch (direction) {
        case "N":
            if (start.yy > 0 && map[start.yy-1][start.xx] != "obj" && !map[start.yy-1][start.xx].visited) return true
            break
        case "E":
            if (start.xx < 14 && map[start.yy][start.xx + 1] != "obj" && !map[start.yy][start.xx + 1].visited) return true
            break
        case "S":
            if (start.yy < 14 && map[start.yy+1][start.xx] != "obj" && !map[start.yy+1][start.xx].visited) return true
            break
        case "W":
            if (start.xx > 0 && map[start.yy][start.xx - 1] != "obj" && !map[start.yy][start.xx - 1].visited) return true
            break
    }
    return false
}

function moveForward() {
    switch (forward) {
        case "N": 
            currentPos.yy--
            break
        case "E":
            currentPos.xx++
            break
        case "S":
            currentPos.yy++
            break
        case "W":
            currentPos.xx--
            break
    }
    path.push(new point(currentPos.xx, currentPos.yy))
    map[currentPos.yy][currentPos.xx].visited = true
}

function mainFunc() {
    if (canIturnRight()) {
        if (canIturnLeft() || canIgoTo(forward)) {
            escapePoints.push({
                xx: currentPos.xx,
                yy: currentPos.yy
            })
        }
        turnRight()
        moveForward()
    } else if(canIgoTo(forward)) {
        if (canIturnLeft()) {
            escapePoints.push({
                xx: currentPos.xx,
                yy: currentPos.yy
            })
        }
        moveForward()
    } else if(canIturnLeft()) {
        turnLeft()
        moveForward()
    } else {
        var escapePoint
        while (escapePoints.length != 0) {
            escapePoint = escapePoints.pop()
            if (["W", "N", "E", "S"].some(element => {
                if (canIgoTo(element, escapePoint)) {
                    forward = element
                    console.log(escapePoint)
                    var escapePath = getPath(currentPos.xx, currentPos.yy, escapePoint.xx, escapePoint.yy)
                    console.log(escapePath)
                    path = path.concat(escapePath)
                    currentPos = {
                        xx: escapePoint.xx,
                        yy: escapePoint.yy
                    }
                    return true
                } else return false
            })) break
        }
    }
}