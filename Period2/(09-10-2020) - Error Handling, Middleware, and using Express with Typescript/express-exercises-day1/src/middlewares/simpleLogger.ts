var http = require('http')
import { Response } from 'express'


// Create server
var simpleLogMiddleware = async function (req: any, res: Response, next: Function) {
    let time = new Date()
    time.setTime(time.getTime() - time.getTimezoneOffset() * 60 * 1000)
    console.log("Time:", time.toUTCString().replace(/ GMT$/, " GMT+2"), "\nRequest type:", req.method, "\nURL:", req.originalUrl)
    next()
}
export default simpleLogMiddleware