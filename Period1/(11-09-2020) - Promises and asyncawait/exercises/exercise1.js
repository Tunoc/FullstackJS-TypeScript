// a)​ First implement the functionality without promises, using callbacks.

const crypto = require('crypto');

function generateHexObjects() {
    let hexObject = {
        "title": "6 Secure Randoms",
        "randoms": []
    }
    for (let index = 48; index > 0; index -= 8) {
        hexObject.randoms.push({ "length": index, "random": "" })
    }
    crypto.randomBytes(hexObject.randoms[0].length, function (err, buffer) {
        let secureHex = buffer.toString('hex');
        hexObject.randoms[0].random = secureHex;
        crypto.randomBytes(hexObject.randoms[1].length, function (err, buffer) {
            let secureHex = buffer.toString('hex');
            hexObject.randoms[1].random = secureHex;
            crypto.randomBytes(hexObject.randoms[2].length, function (err, buffer) {
                let secureHex = buffer.toString('hex');
                hexObject.randoms[2].random = secureHex;
                crypto.randomBytes(hexObject.randoms[3].length, function (err, buffer) {
                    let secureHex = buffer.toString('hex');
                    hexObject.randoms[3].random = secureHex;
                    crypto.randomBytes(hexObject.randoms[4].length, function (err, buffer) {
                        let secureHex = buffer.toString('hex');
                        hexObject.randoms[4].random = secureHex;
                        crypto.randomBytes(hexObject.randoms[5].length, function (err, buffer) {
                            let secureHex = buffer.toString('hex');
                            hexObject.randoms[5].random = secureHex;
                            console.log(hexObject)
                        });
                    });
                });
            });
        });
    });
}
// generateHexObjects();


// c) ​Refactor your solution into a module and export it
const getSecureRandomsPromise = require("./ex1-crypto-module");
// getSecureRandomsPromise([48, 40, 32, 24, 16, 8])
//     .then(result => console.log(result))


// d)​ Create a new file and test the module, like so:
//     First, using plain promises          <- Look at ex1-b and -c?
//     after that, using async/await
const getSecureRandomsAsyncAwait = require("./ex1-crypto-module-async-await.js")
// getSecureRandomsAsyncAwait([48, 40, 32, 24, 16, 8])
//     .then(result => console.log(result))


// e)  ​Implement a simple REST-endpoint that returns a JSON-object as sketched above, given this URL:api/securerandoms
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/api/securerandoms') {
        res.setHeader('Content-Type', 'application/json');
        //getSecureRandomsPromise([48, 40, 32, 24, 16, 8])
        getSecureRandomsAsyncAwait([48, 40, 32, 24, 16, 8])
            .then(a => {
                res.write(JSON.stringify(a))
            })
            .finally(() => {
                return res.end();
            }
            )
    }
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`<h2>Simple node HTTP server demo</h2>
        <p>Exposes this endpoint <code>/api/securerandoms</code></p>`);
        return res.end();
    }
});
server.listen(3000);
console.log('listening on 3000');







