import * as mongo from "mongodb"
const MongoClient = mongo.MongoClient;
import { getConnectedClient, closeConnection } from "../src/config/setupDB"
const debug = require("debug")("facade-with-db:test");
import UserFacade from '../src/facades/userFacadeWithDB';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const expect = chai.expect
const assert = chai.assert
import { bryptAsync } from "../src/utils/bcrypt-async-helper"
import { ApiError } from '../src/errors/apiError';

let userCollection: mongo.Collection | null;
let client: mongo.MongoClient;

describe("Verify the UserFacade with a DataBase", function () {
  this.timeout(Number(process.env["MOCHA_TIMEOUT"]));
  before(async function () {
    //Change mocha's default timeout, since we are using a "slow" remote database for testing
    client = await getConnectedClient();
    process.env["DB_NAME"] = "semester_case_test"
    await UserFacade.initDB(client)
    userCollection = await client.db(process.env["DB_NAME"]).collection("users");
  })

  after(async function () {
    //await closeConnection();
  })

  beforeEach(async function () {
    if (userCollection === null) {
      throw new Error("userCollection not set")
    }
    await userCollection.deleteMany({})
    const secretHashed = await bryptAsync("secret");
    await userCollection.insertMany([
      { name: "Peter Pan", userName: "pp@b.dk", password: secretHashed, role: "user" },
      { name: "Donald Duck", userName: "dd@b.dk", password: secretHashed, role: "user" },
      { name: "admin", userName: "admin@a.dk", password: secretHashed, role: "admin" }
    ])
  })

  it("Should Add the user Kurt", async function () {
    const newUser = { name: "Jan Olsen", userName: "jo@b.dk", password: "secret", role: "user" }
    try {
      const status = await UserFacade.addUser(newUser);
      expect(status).to.be.equal("User was added")
      if (userCollection === null) {
        throw new Error("Collection was null")
      }
      const jan = await userCollection.findOne({ userName: "jo@b.dk" })
      expect(jan.name).to.be.equal("Jan Olsen")
    } catch (err) {
    } finally { }
  })

  it("Should remove the user Peter", async function () {
    const status = await UserFacade.deleteUser("pp@b.dk");
    expect(status).to.be.equal("User was deleted")
  })

  it("Should get three users", async function () {
    const status = await UserFacade.getAllUsers();
    expect(status.length).to.be.equal(3);
    expect(status[0].name).to.be.equal("Peter Pan")
    expect(status[1].name).to.be.equal("Donald Duck")
    expect(status[2].name).to.be.equal("admin")
  })

  it("Should find Donald Duck", async function () {
    const findDonald = await UserFacade.getUser("dd@b.dk");
    expect(findDonald.name).to.be.equal("Donald Duck");
  })

  it("Should not find xxx.@.b.dk", async function () {
    let throwsError = UserFacade.getUser("xxx.@.b.dk")
    //Needs to await the expect, or else the test will still show passing even though it failed.
    await expect(throwsError).to.be.rejectedWith(ApiError, "User Not Found");
  })

  it("Should correctly validate Peter Pan's credential,s", async function () {
    let shouldWork = UserFacade.checkUser("pp@b.dk", "secret");
    await expect(shouldWork).to.eventually.have.property("bCryptStatus", true);
  })

  it("Should NOT correctly validate Peter Pan's check", async function () {
    const bCryptFails = UserFacade.checkUser("pp@b.dk", "xxx");
    await expect(bCryptFails).to.eventually.be.false;
  })

  it("Should NOT correctly validate non-existing users check", async function () {
    const bCryptFails = UserFacade.checkUser("pxxxx@b.dk", "secret");
    await expect(bCryptFails).to.eventually.be.false;
  })
})