import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { projectTaskServices } from "./projectTask.services";

const getPraivacy = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await projectTaskServices.findProjectTaskByUserId(id as string);

    sendResponse(res, {
        success: false,
        statusCode: 200,
        message: "Praivicy setting retrived success",
        data: result
    })

});

const updatePraivicy = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await projectTaskServices.updateProjectTaskByUserID(id as string, updatedData);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Praivicy setting updated success",
        data: result
    })
});

export const projectTaskController = {
    getPraivacy,
    updatePraivicy
};