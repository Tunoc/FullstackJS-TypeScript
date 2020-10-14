import { Request, Response } from "express"
import { ApiError } from "../errors/apiError";

export const endpointNotFound = function (req: Request, res: Response, next: Function) {
    if (req.originalUrl.startsWith("/api")) {
        console.log("API ERROR")
        throw new ApiError("No endpoint located at: " + req.originalUrl, 404)
    }
    next()
}

export const errorFormatter = function (err: Error, req: Request, res: Response, next: Function) {
    if (err instanceof ApiError) {
        res.status(Number(err.errorCode)).json({ code: err.errorCode, message: err.message })
        //We write Number on the err.errorCode, because it by deafult always is 500. - We get an error for the response because it could be undefined?
        //Do not return from here, else we won't log the error in error.log
    }
    next(err)
}
