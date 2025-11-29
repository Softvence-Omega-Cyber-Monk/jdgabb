import { Request, Response } from "express";
import AppError from "../../../utils/AppError";

const addToArchive = (req: Request, res: Response) => {
    try {
        const taskId = req.body.taskId;



    } catch (error) {
        throw new AppError(400, "Archive not added");
    }
}