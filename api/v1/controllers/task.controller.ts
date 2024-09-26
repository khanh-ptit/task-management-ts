import { Request, Response } from "express"
import Task from "../models/task.model"

// [GET] /tasks/
export const index = async (req: Request, res: Response) => {
    interface Find {
        deleted: boolean,
        status?: string
    }
    
    const find: Find = {
        deleted: false
    }
    
    if (req.query.status) {
        find.status = req.query.status.toString()
    }

    const tasks = await Task.find(find)

    if (tasks.length == 0) {
        return res.json({
            code: 400, 
            message: "No tasks found."
        })
    }

    res.json({
        tasks: tasks
    })
}

// [GET] /tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        // console.log(id)
        const task = await Task.findOne({
            _id: id,
            deleted: false
        })

        res.json({
            code: 200,
            task: task
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Có lỗi xảy ra!"
        })
    }
}