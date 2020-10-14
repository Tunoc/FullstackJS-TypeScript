import { Response } from 'express'

var CORSMiddleware = async function (req: any, res: Response, next: Function) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
}
export default CORSMiddleware