import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { projectServices } from "./project.services";
import { Project } from "./project.model";
import axios from "axios";
import { envVers } from "../../config/env";
import mongoose from "mongoose";
import AppError from "../../utils/AppError";



const createProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    const goalData = req.body.goal;
    console.log(goalData);
    const result = await projectServices.createProject(id as string, goalData)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Project created success",
        data: result
    })
});

const addTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, task } = req.body;
    const result = await projectServices.addTask(projectId, task);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Task Added success",
        data: result
    });
});

const addSubTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { projectId, taskId, subTaskData } = req.body;
    const result = await projectServices.addSubTask(projectId, taskId, subTaskData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Sub Task addess success",
        data: result
    })
});

const addDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, taskId, detailsText } = req.body;
    const result = await projectServices.addOrUpdateTaskDetails(projectId, taskId, detailsText);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Task Details added success",
        data: result
    })
});

const getProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;


    const result = await Project.findById(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Project retrived successfully",
        data: result
    })
});


const getAllProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await Project.find({});
    res.status(200).json(result);
})

const askQuestion = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(projectId as string)) {
        throw new AppError(400, "Invalid mongoDb objectId");
    }

    const result = await axios.post(`${envVers.AI_ROOT_URL}/projects/ask/${projectId}`);

    if(!result){
        throw new AppError(400 , "Please try again.");
    }

    const updateQuestion = await Project.findByIdAndUpdate(
        projectId,
        {
            $push: {
                answered_questions: {
                    question: result.data.question,
                    answer: null,
                },
            },
        },
        { new: true }
    );

    res.status(200).json({
        success: true,
        AiQuestion: result.data,
        storedData: updateQuestion
    })
});

const ansQuestion = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { projectid, questionsId, answer } = req.body;

    const updatedProject = await Project.findOneAndUpdate(
        { _id: projectid, "answered_questions._id": questionsId },
        { $set: { "answered_questions.$.answer": answer } },
        { new: true }
    );

    if (!updatedProject) {
        throw new AppError(400, "Project or question not found")
    }


    sendResponse(res, {
        success: true,
        message: "Answer added successfully!",
        statusCode: 200,
        data: updatedProject
    })
})

export const projectController = {
    createProject,
    addTask,
    addSubTask,
    addDetails,
    getProject,
    askQuestion,
    getAllProject,
    ansQuestion
}