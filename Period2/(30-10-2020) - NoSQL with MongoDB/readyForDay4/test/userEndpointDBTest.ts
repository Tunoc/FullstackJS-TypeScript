import path from "path";
require('dotenv').config({ path: path.join(process.cwd(), '.env') })
import { Server } from "http";
const debug = require("debug")("user-endpoint-test");
import fetch from "node-fetch";
import { expect } from "chai";
import { getConnectedClient } from "../src/config/setupDB"
import { bryptAsync } from "../src/utils/bcrypt-async-helper"
import UserFacade from '../src/facades/user';
import { response } from "express";


let server: Server;
const TEST_PORT = "7777"

describe("Create/Update Comments", function () {
  //Change mocha's default timeout, since we are using a "slow" remote database for testing
  this.timeout(Number(process.env["MOCHA_TIMEOUT"]));
  let URL: string;
  before(function (done) {
    process.env["PORT"] = TEST_PORT;
    process.env["SKIP_AUTHENTICATION"] = "true";
    process.env["DB_NAME"] = "semester_case_test"
    server = require("../src/app").server;
    URL = `http://localhost:${process.env.PORT}`;
    done();
  })

  beforeEach(async function () {
    //Observe, no use of facade, but operates directly on connection
    const client = await getConnectedClient();
    const db = client.db(process.env.DB_NAME)

    const usersCollection = db.collection("users")
    await usersCollection.deleteMany({})
    const secretHashed = await bryptAsync("secret");
    const status = await usersCollection.insertMany([
      { name: "Peter Pan", userName: "pp@b.dk", password: secretHashed, role: "user" },
      { name: "Donald Duck", userName: "dd@b.dk", password: secretHashed, role: "user" },
      { name: "admin", userName: "admin@a.dk", password: secretHashed, role: "admin" }
    ])
  })

  after(async function () {
    // DONT CALL THIS. Will make additonal tests fail -->server.close();
    // server.close();
  })

  it("Should get the message Hello", async function () {
    const result = await fetch(`${URL}/api/dummy`).then(response => response.json());
    expect(result.msg).to.be.equal("Hello")
  })

  it("Should get three users", async function () {
    const result = await fetch(`${URL}/api/users`).then(response => response.json());
    expect(result[0].name).to.be.equal("Peter Pan");
    expect(result[1].name).to.be.equal("Donald Duck");
    expect(result[2].name).to.be.equal("admin");
  })

  it("Should Add the user Jan Olsen", async function () {
    const newUser = { name: "Jan Olsen", userName: "jo@b.dk", password: "secret", role: "user" }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }
    const result = await fetch(`${URL}/api/users`, config).then(response => response.json());
    expect(result.status).to.be.equal("User was added")
  })

  it("Should find the user Donald Duck", async function () {
    const DonaldDuckMail = "dd@b.dk"
    const result = await fetch(`${URL}/api/users/${DonaldDuckMail}`).then(response => response.json());
    expect(result.name).to.be.equal("Donald Duck");
    expect(result.userName).to.be.equal("dd@b.dk");
  })

  it("Should not find the user xxx@b.dk", async function () {
    const NoNExistentMail = "xxx@b.dk"
    const result = await fetch(`${URL}/api/users/${NoNExistentMail}`).then(response => response.json());
    expect(result.code).to.equal(404);
    expect(result.message).to.equal("User Not Found");
  })

  it("Should Remove the user Donald Duck", async function () {
    const DonaldDuckMail = "dd@b.dk";
    const config = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    const result = await fetch(`${URL}/api/users/${DonaldDuckMail}`, config).then(response => response.json());
    expect(result.status).to.be.equal("User was deleted");
  })
})
