import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { productivityServices } from "./productivity.services";

const getProducitivy = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await productivityServices.findPrivicyByUserId(id as string);

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
    const result = await productivityServices.updatePrivicyByUserID(id as string, updatedData);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Praivicy setting updated success",
        data: result
    })
});


export const productiviryController = {
    getProducitivy,
    updatePraivicy
}