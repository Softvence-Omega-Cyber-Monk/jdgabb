import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { projectServices } from "./project.services";
import { Project } from "./project.model";
import { OpenAi } from "../../config/openAi";



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


const askQuestion = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { prompt } = req.body;

    const response = await OpenAi.chat.completions.create({
        model: "",
        messages: [
            { role: "system", content: "Your a helpful assistent" },
            { role: "user", content: prompt }
        ]
    });

    res.status(200).json({ message: response.choices[0]?.message.content })
})

export const projectController = {
    createProject,
    addTask,
    addSubTask,
    addDetails,
    getProject,
    askQuestion
}