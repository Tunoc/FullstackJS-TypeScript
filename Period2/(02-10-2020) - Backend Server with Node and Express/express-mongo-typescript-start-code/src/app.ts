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
  try {
    res.send(UserFacade.getUser(req.params.email));
  } catch (error) {
    debug(error);
    res.status(404).send("User not found");
    //res.sendStatus(200); // What is perfered?
  }
})

app.get("/api/users", (req, res) => {
  res.send(UserFacade.getAllUsers());
})

app.post("/api/users", (req, res) => {
  let { name, email, password, role } = req.body;
  if (name && email && password && role) { //Check if the values are truthy <- not null, not undefined, not empty string and so on.
    if (UserFacade.addUser({ name, email, password, role })) {
      res.send({ msg: "User was added" })
      //res.sendStatus(200); //This line is equivalent to res.status(200).send("OK")
    } else {
      res.sendStatus(500);
      //We couldn't add the user to our list, therfore we send a "Internal Server Error"
    }
  } else {
    res.sendStatus(400);
    //Bad request if we aren't given a json object that looks like a "IGameUser"
  }
})

app.delete("/api/users/:email", (req, res) => {
  if (UserFacade.deleteUser(req.params.email)) {
    res.send({ msg: "User was deleted" })
    //res.sendStatus(200);
  } else {
    res.sendStatus(404);
    //res.send({ msg: "User wasn't deleted" })
  }
})

// Dummy data setup - Remove later.
app.get("/api/usersDummyData", (req, res) => {
  let users = [{
    "name": "Tunoc",
    "email": "Tunoc@ApeMail.com",
    "password": "PsWStronk1",
    "role": "Admin"
  }, {
    "name": "DummyUser",
    "email": "DummyUser@ApeMail.com",
    "password": "PsWStronk2",
    "role": "User"
  }, {
    "name": "Random user",
    "email": "random@ApeMail.com",
    "password": "PsWStronk3",
    "role": "User"
  }]
  users.forEach(user => UserFacade.addUser(user));
  res.send("Dummy Data Created");
})

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT)
debug(`Server started, listening on port: ${PORT}`)
//console.log(`Server started, listening on port: ${PORT}`)
module.exports.server = server;


