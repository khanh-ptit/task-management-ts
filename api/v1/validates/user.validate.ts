import { Request, Response, NextFunction } from "express"

export const register = (req: Request, res: Response, next: NextFunction): Response | void => {
    if (!req.body.fullName) {
        return res.status(400).json({
            code: 400,
            message: "Vui lòng nhập đầy đủ họ tên!"
        })
    }
    if (!req.body.email) {
        return res.status(400).json({
            code: 400,
            message: "Vui lòng nhập email!"
        })
    }
    if (!req.body.password) {
        return res.status(400).json({
            code: 400,
            message: "Vui lòng nhập mật khẩu!"
        })
    }
    next()
}