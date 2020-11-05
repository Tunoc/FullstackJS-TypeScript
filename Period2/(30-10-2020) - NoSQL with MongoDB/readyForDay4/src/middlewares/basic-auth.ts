var http = require('http')
var auth = require('basic-auth')
var compare = require('tsscmp')
import { Response } from "express"
import { debug } from "winston";
//import UserFacade from "../facades/user";
import UserFacadeMemory from '../facades/user';
import UserFacadeDB from '../facades/userFacadeWithDB';
let UserFacade: any;
if (process.env["USE_USER_DB_FACADE_FOR_AUTHENTICATION"]) {
  UserFacade = UserFacadeDB;
} else {
  UserFacade = UserFacadeMemory;
}


// Create server
var authMiddleware = async function (req: any, res: Response, next: Function) {
  var credentials = auth(req)
  try {
    const userCheck = await UserFacade.checkUser(credentials.name, credentials.pass);
    if (credentials && userCheck.bCryptStatus) {
      req.userName = userCheck.user.userName;
      req.role = userCheck.user.role;
      return next();
    }
  } catch (err) {
    debug("Login unsuccessful");
  }
  res.statusCode = 401
  res.setHeader('WWW-Authenticate', 'Basic realm="example"')
  res.end('Access denied')
}
export default authMiddleware
