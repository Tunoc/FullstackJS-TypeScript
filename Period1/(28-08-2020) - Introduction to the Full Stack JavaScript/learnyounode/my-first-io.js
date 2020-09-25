const fs = require('fs')

var contens = fs.readFileSync(process.argv[+2])
var lines = contens.toString().split('\n').length - 1
console.log(lines)