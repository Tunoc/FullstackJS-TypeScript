const fs = require('fs');

const promiseFactory = (fileLocationString) => new Promise((resolve, reject) => {
    fs.readFile(fileLocationString, "utf8", function (err, content) {
        if (err) {
            reject(err)
            //console.log(err)
            return
        }
        resolve(content)
        //console.log(content)
    })
});

promiseFactory("Challenge1.txt")
    .then(txt => console.log(txt))
    .catch(err => console.log(err))