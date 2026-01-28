import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { GlobalUndoModel, UndoModel } from "./undu.model";
import { sendResponse } from "../../utils/sendResponse";
import Task from "../UpdateProject/TaskModel";
import { sendNotification } from "../../config/sendNotification";
import { UpdateProject } from "../UpdateProject/UpdateProject.model";

export const createUndo = catchAsync(async (req: Request, res: Response) => {
    const { userId, taskOrProjectId } = req.body;

    const find = await UndoModel.findOne({
        userId: userId,
        taskOrProjectId: taskOrProjectId
    });

    if (find) {
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Already Exist",
            data: find,
        });
    }

    const undo = await UndoModel.create({
        userId,
        taskOrProjectId,
        undoList: [],
    });

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Undo created successfully",
        data: undo,
    });
});

export const getUndo = catchAsync(async (req: Request, res: Response) => {
    const { userId, taskOrProjectId } = req.params;

    let undo = await UndoModel.findOne({ userId, taskOrProjectId });


    if (!undo) {
        undo = await UndoModel.create({
            userId,
            taskOrProjectId,
            undoList: [],
        });
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Undo fetched successfully",
        data: undo,
    });
});

export const pushUndoAction = catchAsync(async (req: Request, res: Response) => {
    const { userId, taskOrProjectId, action } = req.body;

    const undo = await UndoModel.findOneAndUpdate(
        { userId, taskOrProjectId },
        {
            $setOnInsert: {
                userId,
                taskOrProjectId,
            },
            $push: { undoList: action },
        },
        {
            new: true,
            upsert: true,
        }
    );


    const findTask = await Task.findById(action);


    if (findTask) {
        await sendNotification(
            userId,
            "AI Task Created ✨",
            `AI just created a new task for you: "${findTask.title}". Take a look!`
        );
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Undo action added",
        data: undo,
    });
});

export const popUndoAction = catchAsync(async (req: Request, res: Response) => {
    const { userId, taskOrProjectId } = req.body;

    const undo = await UndoModel.findOneAndUpdate(
        { userId, taskOrProjectId },
        { $pop: { undoList: 1 } },
        { new: true }
    );

    if (!undo) {
        sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "Undo data not found",
            data: null,
        });
        return;
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Undo action removed",
        data: undo,
    });
});



export const createGlobalUndo = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.body;

    const find = await GlobalUndoModel.findOne({
        userId: userId
    });

    if (find) {
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Already Exist",
            data: find,
        });
    }

    const undo = await GlobalUndoModel.create({
        userId,
        undoList: [],
    });

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Undo created successfully",
        data: undo,
    });
});


export const getGlobalUndo = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;

    let undo = await GlobalUndoModel.findOne({ userId });


    if (!undo) {
        undo = await GlobalUndoModel.create({
            userId,
            undoList: [],
        });
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Undo fetched successfully",
        data: undo,
    });
});



export const pushGlobalUndoAction = catchAsync(async (req: Request, res: Response) => {
    const { userId, action } = req.body;

    const undo = await GlobalUndoModel.findOneAndUpdate(
        { userId },
        {
            $setOnInsert: {
                userId
            },
            $push: { undoList: action },
        },
        {
            new: true,
            upsert: true,
        }
    );

    const findProject = await UpdateProject.findById(action);

    if (findProject) {
        await sendNotification(
            userId,
            "AI Project Created ✨",
            `AI has successfully created a new project for you: "${findProject.goal}".`
        );
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Undo action added",
        data: undo,
    });
});


export const popGlobalUndoAction = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.body;

    const undo = await GlobalUndoModel.findOneAndUpdate(
        { userId },
        { $pop: { undoList: 1 } },
        { new: true }
    );

    if (!undo) {
        sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "Undo data not found",
            data: null,
        });
        return;
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Undo action removed",
        data: undo,
    });
});
