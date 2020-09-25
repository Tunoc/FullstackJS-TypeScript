"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//let http = require("http");
const http_1 = __importDefault(require("http"));
const node_fetch_1 = __importDefault(require("node-fetch"));
function createServer(joke) {
    http_1.default.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(joke);
        res.end();
    }).listen(8080);
}
node_fetch_1.default("http://api.icndb.com/jokes/random")
    .then(response => response.json())
    .then(data => createServer(data.value.joke));
//# sourceMappingURL=c_setup.js.map