const crypto = require('crypto');

// d)​ Create a new file and test the module, like so:
//     First, using plain promises          <- Look at ex1-b and -c
//     after that, using async/await
function makeSecureRandom(size) {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(size, function (err, buffer) {
            if (err) {
                reject(err);
            } else {
                resolve({ "length": size, "random": buffer.toString('hex') });
            }
        });
    });
}

module.exports = async function getSecureRandoms(values) {
    let promises = [];
    values.forEach(element => {
        let tmp = makeSecureRandom(element)
        promises.push(tmp);
    });
    return hexObject = {
        "title": "6 Secure Randoms",
        "randoms": await Promise.all(promises)
    };
}
