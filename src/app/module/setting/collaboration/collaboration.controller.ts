import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { collabrationServices } from "./collaboration.services";

const getCollabration = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await collabrationServices.findCollabrationByUserId(id as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Collabration retrived success",
        data: result
    })
});

const updateCollabration = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updateData = req.body;

    const result = await collabrationServices.updateCollabrationByUserID(id as string, updateData);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Collabration Update success",
        data: result
    })

});

export const collaborationController = {
    getCollabration,
    updateCollabration
}