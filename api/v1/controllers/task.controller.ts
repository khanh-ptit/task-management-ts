import { Request, Response } from "express"
import Task from "../models/task.model"
import { SortOrder } from "mongoose"
import paginationHelper from "../../../helpers/pagination"
import searchHelper from "../../../helpers/search"

// [GET] /tasks/
export const index = async (req: Request, res: Response) => {
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    }
    
    const find: Find = {
        deleted: false
    }
    
    // Filter status
    if (req.query.status) {
        find.status = req.query.status.toString()
    }
    // End filter status
    
    // Sort
    interface Sort {
        [key: string]: SortOrder
    }

    const sort: Sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toLocaleString();
        const sortValue = req.query.sortValue.toString().toLowerCase() as SortOrder
    
        sort[sortKey] = sortValue; // Gán giá trị động cho key và value trong object
    }
    // End sort

    // Pagination
    const objectPagination = paginationHelper(req.query)    
    // End pagination

    // Search
    const objectSearch = searchHelper(req.query)
    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }
    // End search

    const tasks = await Task.find(find)
        .sort(sort)
        .limit(objectPagination.limitedItem)
        .skip(objectPagination.skip)
    

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

// [PATCH] /tasks/change-status
export const changeStatus = async (req: Request, res: Response) => {
    
}