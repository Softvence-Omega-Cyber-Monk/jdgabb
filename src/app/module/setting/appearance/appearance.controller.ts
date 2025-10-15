import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { apperanceServices } from "./appearance.services";
import { sendResponse } from "../../../utils/sendResponse";

const getAppearanceByuUserId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await apperanceServices.findAppearanceByUserId(id as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Appearance get successfuly",
        data: result
    })
});


const updateAppearanceByUserID = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updateData = req.body;

    console.log(id)

    const result = await apperanceServices.updateAppearanceByUserID(id as string, updateData);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Appearance updated successfuly",
        data: result
    })
})


export const appearanceController = {
    getAppearanceByuUserId,
    updateAppearanceByUserID
}