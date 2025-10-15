import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { languageServices } from "./language.services";

const getLanguage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;

    const result = await languageServices.findLanguageByUserId(id as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Language retrived successfully",
        data: result
    })
});


const updateLanguage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await languageServices.updateLanguageByUserID(id as string, updatedData);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Language updated successfully",
        data: result
    })
});


export const languageController = {
    getLanguage,
    updateLanguage
}