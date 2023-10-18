import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstace } from "../models/User";

export interface AuthenticatedRequest extends Request {
    user?: UserInstace | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader) return res.status(401).json({message: 'token not finded'})

    const token = authorizationHeader.replace(/Bearer /, '')

    jwtService.verifyToken(token, async (err, decoded)=> {
        if (err || typeof decoded === 'undefined') return res.status(401).json({message: 'Invalid Token'})

        const user = await userService.findByEmail((decoded as JwtPayload).email)
        req.user = user
        next()
    })
}

export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next:NextFunction) {
    const { token } = req.query
    if (!token) return res.status(401).json({message: 'token not finded'})

    if (typeof token !== 'string') return res.status(400).json({ message: 'Token has be string.'})

    jwtService.verifyToken(token, async (err, decoded) => {
        if (err || typeof decoded === 'undefined') return res.status(401).json({message: 'Invalid Token'})

        const user = await userService.findByEmail((decoded as JwtPayload).email)
        req.user = user
        next()
    })

}