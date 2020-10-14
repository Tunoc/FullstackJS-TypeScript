require('dotenv').config();
import express from "express";
import path from "path";
//import basicLog from "./middlewares/simpleLogger";
import logger from "./middlewares/logger"
//import CORS from "./middlewares/my-cors";
var cors = require('cors')
import { endpointNotFound, errorFormatter } from "./middlewares/error-handler"


const app = express();

app.use(express.static(path.join(process.cwd(), "public")))
app.use(express.json())
let userAPIRouter = require('./routes/userApi');

//app.use(basicLog)
app.use(logger.exWinstonLog);
//app.use(CORS)
app.use(cors())

app.use("/api/users", userAPIRouter);

app.get("/api/dummy", (req, res) => {
  res.json({ msg: "Hello" })
})

//Error handlers
app.use(endpointNotFound)
app.use(errorFormatter)

app.use(logger.exWinstonLogError);

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT)
console.log(`Server started, listening on port: ${PORT}`)
module.exports.server = server;


