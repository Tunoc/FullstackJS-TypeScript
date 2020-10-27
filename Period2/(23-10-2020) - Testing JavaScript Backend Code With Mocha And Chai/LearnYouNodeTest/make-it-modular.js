var filterFn = require('./mymodule.js')
var dir = process.argv[2]
var filterStr = process.argv[3]

filterFn(dir, filterStr, function (err, list) {
    if (err)
        return console.error('There was an error:', err)

    list.forEach(function (file) {
        console.log(file)
    })
})

// https://docs.google.com/document/d/1v7WIZo9mVbYVyb1UuflszaykDnxQ2ex-LSHzrjZjp34/edit#
// Still need to do testing async code - Part a