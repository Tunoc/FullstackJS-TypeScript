const path = require('path')
require('dotenv').config({ path: path.join(process.cwd(), '.env') })
const debug = require("debug")("facade-with-db");
import IGameUser from '../interfaces/GameUser';
import { bryptAsync, bryptCheckAsync } from "../utils/bcrypt-async-helper"
import * as mongo from "mongodb"
import { getConnectedClient } from "../config/setupDB"
import { ApiError } from "../errors/apiError"



let userCollection: mongo.Collection;

export default class UserFacade {

  static async initDB(client: mongo.MongoClient) {
    const dbName = process.env.DB_NAME;
    //debug(`Database ${dbName} about to be setup: ${client}`)
    if (!dbName) {
      throw new Error("Database name not provided")
    }
    try {
      userCollection = await client.db(dbName).collection("users");
      debug(`userCollection initialized on database '${dbName}'`)
    } catch (err) {
      debug("Could not create connection", err);
    }
  }

  static async addUser(user: IGameUser): Promise<string> {
    const hash = await bryptAsync(user.password);
    let newUser = { ...user, password: hash }
    let result;
    try {//Try catch if something goes wrong in MongoDB
      result = await userCollection.insertOne(newUser);
    } catch (error) {
      throw new ApiError("Server error", 500);
    }
    if (result && result.insertedCount != 1) {
      //Check if something acctuaally was added successfully.
      throw new ApiError("Nothing was added", 500);
    }
    return "User was added";
  }

  static async deleteUser(userName: string): Promise<string> {
    let result;
    try {//Try catch if something goes wrong in MongoDB
      result = await userCollection.deleteOne(
        { userName: userName }
      );
    } catch (error) {
      throw new ApiError("Server error", 500);
    }
    if (result && result.deletedCount != 1) {
      //Check if something acctually was deleted successfully.
      throw new ApiError("Nothing was deleted", 500);
    }
    return "User was deleted";
  }

  //static async getAllUsers(): Promise<Array<IGameUser>> {
  static async getAllUsers(proj?: object): Promise<Array<any>> {
    //"?" means optional. Optional (proj: object) - getAllUsers can be called without parameters.
    let users = [];
    try {//Try catch if something goes wrong in MongoDB
      users = await userCollection.find(
        {},
        { projection: proj }
      ).toArray()
    } catch (error) {
      throw new ApiError("Server error", 500);
    }
    if (!users[0]) {//We check if our array has a index[0] - If we do, we found some users.
      //Check if we acctually found all users in the database successfully.
      throw new ApiError("No users in DB", 404);
    }
    return users;
  }

  static async getUser(userName: string, proj?: object): Promise<any> {
    let user;
    try {//Try catch if something goes wrong in MongoDB
      user = await userCollection.findOne({ userName });
    } catch (error) {
      throw new ApiError("Server error", 500);
    }
    if (!user) {
      //Check if we acctually found the user in the database successfully.
      throw new ApiError("User Not Found", 404);
    }
    return user;
  }

  static async checkUser(userName: string, password: string): Promise<object | boolean> {
    /*
    We can both return a boolean value or an object.
    if the "bryptCheckAsync" is rejected, we just return the boolean value; "false"
    */
    try {
      debug("Checking for user in DB");
      const user = await UserFacade.getUser(userName);
      debug("Found ", user);
      const status = await bryptCheckAsync(password, user.password);
      return {
        user: user,
        bCryptStatus: status
      }
    } catch (error) {
      //bcryptCheckAsync was rejected and returns value false.
      return false;
    }
  }
}

async function test() {
  const client = await getConnectedClient();
  process.env["DB_NAME"] = "semester_case_test"
  await UserFacade.initDB(client);

  await userCollection.deleteMany({})
  await UserFacade.addUser({ name: "kim-admin", userName: "kim@b.dk", password: "secret", role: "admin" })
  await UserFacade.addUser({ name: "ole", userName: "ole@b.dk", password: "secret", role: "user" })

  const all = await UserFacade.getAllUsers();
  debug(all)
  debug(all.length)

  // client.close();
  // const projection = { projection: { _id: 0, role: 0, password: 0 } }
  // const kim = await UserFacade.getUser("kim@b.dk", projection)
  // debug(kim)

  // try {
  //     let status = await UserFacade.deleteUser("kim@b.dk");
  //     debug(status)
  //     status = await UserFacade.deleteUser("xxxx@b.dk");
  //     debug("Should not get here")
  // } catch (err) {
  //     debug(err.message)
  // }

  // try {
  //     const passwordStatus = await UserFacade.checkUser("kim@b.dk", "secret");
  //     debug("Expects true: ", passwordStatus)
  // } catch (err) {
  //     debug("Should not get here 1", err)
  // }
  // try {
  //     const passwordStatus = await UserFacade.checkUser("kim@b.dk", "xxxx");
  //     debug("Should not get here ", passwordStatus)
  // } catch (err) {
  //     debug("Should get here with failded 2", err)
  // }
  // try {
  //     const passwordStatus = await UserFacade.checkUser("xxxx@b.dk", "secret");
  //     debug("Should not get here")
  // } catch (err) {
  //     debug("hould get here with failded 2", err)
  // }


}
// test();
