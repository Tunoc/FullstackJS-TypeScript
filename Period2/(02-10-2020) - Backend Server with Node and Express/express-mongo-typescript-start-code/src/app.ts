require('dotenv').config();
import express from "express";
import path from "path";
import { UserFacade } from "./facades/userFacade";
const debug = require("debug")("game-case")
const app = express();
app.use(express.static('public'));
app.use(express.json())


app.get("/api/dummy", (req, res) => {
  res.json({ msg: "Hello" })
})

app.get("/api/users/:email", (req, res) => {
  res.send(UserFacade.getUser(req.params.email));
})

app.get("/api/users", (req, res) => {
  res.send(UserFacade.getAllUsers());
})

app.post("/api/users", (req, res) => {
  let { name, email, password, role } = req.body;
  if (name && email && password && role) { //Check if the values aren't null, undefined, and empty string
    if (UserFacade.addUser({ name, email, password, role })) { //duck-typing
      res.send({ msg: "User was added" })
      return;//Return here to ship the User wasn't added <- alternative 2 else clauses.
    }
  }
  res.send({ msg: "User wasn't added" })
})

app.delete("/api/users/:email", (req, res) => {
  if (UserFacade.deleteUser(req.params.email)) {
    res.send({ msg: "User was deleted" })
  } else {
    res.send({ msg: "User wasn't deleted" })
  }
})

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT)
debug(`Server started, listening on port: ${PORT}`)
//console.log(`Server started, listening on port: ${PORT}`)
module.exports.server = server;


