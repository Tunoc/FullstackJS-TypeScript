import { Request, Response } from "express"
import { ApiError } from "../errors/apiError";

export const endpointNotFound = function (req: Request, res: Response, next: Function) {
    if (req.originalUrl.startsWith("/api")) {
        res.status(404).json({ code: 404, msg: "This API does not contanin this endpoint" })
    }
    next()
}

export const errorFormatter = function (err: any, req: any, res: any, next: Function) {
    if (err instanceof (ApiError)) {
        const e = <ApiError>err;
        return res.status(e.errorCode).send({ code: e.errorCode, message: e.message })
    }
    next(err)
}
