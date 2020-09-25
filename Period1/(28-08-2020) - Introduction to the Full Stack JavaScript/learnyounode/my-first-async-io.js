const fs = require('fs')

var contens = fs.readFile(process.argv[2], function doneReading(err, fileContens) {
    var lines = fileContens.toString().split('\n').length - 1
    console.log(lines)
})
