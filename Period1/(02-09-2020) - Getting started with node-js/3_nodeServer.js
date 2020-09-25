/*
    3) Simple WEB/REST-server using functionality from 1+2

    Create a new file nodeServer.js and add the following code to the file. Start the server, and verify that you can access the root page via localhost:3000

    Add the necessary changes to complete:
    The /api/os-info endpoint
    The DOS-detection feature
*/

const osInfoImport = require('./1_SimpleOsFile');
const DOS_Detector = require('./2_dosDetector');
const http = require('http');
const dosDetector = new DOS_Detector(1000);
const server = http.createServer((req, res) => {
    if (req.url === '/api/os-info') {
        res.setHeader('Content-Type', 'application/json');
        //Print the os info
        res.write(JSON.stringify(osInfoImport))
        return res.end();
    }
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`<h2>Simple node HTTP server demo</h2>
      <p>Exposes this endpoint <code>/api/os-info</code></p>
      <p>Spam f5 and watch the dos detector in the terminal.</p>
    `);
        return res.end();
    }
});
server.on('connection', (sock) => {
    //Url added for dos detector.
    dosDetector.addUrl(sock.remoteAddress)
});
server.listen(3000);
console.log('listening on 3000');

//DosDetection.
dosDetector.on('DosDetected', (arg) => {
    console.log('dosAttack!', arg)
});
