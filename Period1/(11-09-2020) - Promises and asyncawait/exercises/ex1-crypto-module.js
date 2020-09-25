const crypto = require('crypto');

//generateHexObjects()
// b)​ Use Promises to solve the problem.Hints:
//     1)Create a function ​makeSecureRandom(size)​ that returns a promise, using the callback baseddesign,
//     provided by the ​randomBytes(..)​ method.
//     2)Since the result from one calculation does not influence the next (only order matters), 
//     usePromise.all(..) ​to execute the operations in parallel.
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

module.exports = function getSecureRandoms(values) {
    let promises = [];
    values.forEach(element => {
        let tmp = makeSecureRandom(element);
        promises.push(tmp);
    });
    return Promise.all(promises)
        .then(result => {
            return {
                "title": "6 Secure Randoms",
                "randoms": result
            }
        })
}
