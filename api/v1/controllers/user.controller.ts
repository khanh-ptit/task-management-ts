import User from "../models/user.model";
import { Request, Response } from "express";
import md5 from "md5"

// [POST] /api/v1/user/register
export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        // console.log(req.body)
        const email: string = req.body.email
        const existEmail = await User.findOne({
            email: email,
            deleted: false
        })
        if (existEmail) {
            return res.status(400).json({
                code: 400,
                message: "Email đã tồn tại trong hệ thống!"
            })
        }
        req.body.password = md5(req.body.password)
        const user = new User(req.body)
        await user.save()
        return res.status(200).json({
            code: 200,
            message: "Tạo tài khoản thành công!"
        })
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Có lỗi xảy ra!"
        })
    }
}