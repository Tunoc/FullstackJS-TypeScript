//let http = require("http");
import http from "http";
import fetch from "node-fetch";

function createServer(joke: string) {
    http.createServer(function (req: any, res: any) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(joke);
        res.end();
    }).listen(8080);
}

fetch("http://api.icndb.com/jokes/random")
    .then(response => response.json())
    .then(data => createServer(data.value.joke));