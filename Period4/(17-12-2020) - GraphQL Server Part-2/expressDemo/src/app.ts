require('dotenv').config();
import express from "express";
import path from "path";
import { ApiError } from "./errors/apiError";
//Add if needed
import { requestLogger, errorLogger } from "./middlewares/logger";
import { endpointNotFound, errorFormatter } from "./middlewares/error-handler"
var cors = require('cors')

const app = express();

app.use(express.static(path.join(process.cwd(), "public")))

//  Add if needed
app.use(requestLogger)
app.use(express.json())
app.use(cors())

//const userAPIRouter = require('./routes/userApi');
const userAPIRouter = require('./routes/userApiDB');
const gameAPIRouter = require('./routes/gameAPI');
const grapgQLRouter = require('./routes/graphQLAPI');

app.get("/api/dummy", (req, res) => {
  res.json({ msg: "Hello" })
})

app.use("/api/users", userAPIRouter);
app.use("/api/gameapi", gameAPIRouter);
app.use("/graphql", grapgQLRouter);

//  Add if needed
app.use(errorLogger)

// Error handler
app.use(endpointNotFound)
app.use(errorFormatter)


const PORT = process.env.PORT || 3333;
const server = app.listen(PORT)


console.log(`Server started, listening on port: ${PORT}`)
module.exports.server = server;


