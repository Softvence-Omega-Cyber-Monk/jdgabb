import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { projectServices } from "./project.services";
import { Project } from "./project.model";
import axios from "axios";
import { envVers } from "../../config/env";
import mongoose from "mongoose";
import AppError from "../../utils/AppError";
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

const updateProjectTitle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;
    const title = req.body.title;

    if (!title) {
        res.status(400).json({ success: false, message: "Title is required" });
    }

    const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId },
        { $set: { goal: title } },
        { new: true, runValidators: true }
    );

    if (!updatedProject) {
        res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({
        success: true,
        message: "Project title updated successfully",
        data: updatedProject,
    });
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

const findSingleTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { projectId, taskId } = req.body;

    if (!projectId || !taskId) {
        throw new AppError(400, "ProjectId & task id must be required");
    };

    const result = await projectServices.findSingleTask(projectId, taskId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Task retrived successfully",
        data: result
    })
});

const findSingleSubtask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, taskId, subTaskId } = req.body;

    if (!projectId || !taskId || !subTaskId) {
        throw new AppError(400, "ProjectId , taskId & SubtaskId is must be required")
    };

    const result = await projectServices.findSingleSubTask(projectId, taskId, subTaskId);


    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Subtask Retrived successfully.",
        data: result
    })

});

const addSubTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { projectId, taskId, subtaskTitle, subTaskDueDate } = req.body;
    if (!projectId || !taskId || !subtaskTitle) {
        throw new AppError(400, "ProjectId, taskId & subtaskTitle must be required")
    }

    const result = await projectServices.addSubTask(projectId, taskId, subtaskTitle, subTaskDueDate);

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
});

const askQuestion = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(projectId as string)) {
        throw new AppError(400, "Invalid mongoDb objectId");
    }

    const result = await axios.post(`${envVers.AI_ROOT_URL}/projects/ask/${projectId}`);

    if (!result) {
        throw new AppError(400, "Please try again.");
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
});

const askQuestionOpenAi = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { prompt } = req.body;

    const result = await OpenAi.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system", content: "You are a helpful assistant."
            },
            {
                role: "user", content: prompt
            }
        ]
    })

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Question ai",
        data: result.choices[0]?.message.content
    })
});

// const updateTaskStar = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { projectId, taskId, isStar } = req.body;

//     if (!projectId || !taskId || !isStar) {
//         throw new AppError(400, "Project ID, Task ID and isStar (boolean) are required");
//     }

//     const result = await projectServices.updateTaskStar(projectId, taskId, isStar);

//     if (!result) {
//         throw new AppError(404, "Task not found");
//     }

//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Task star status updated successfully",
//         data: result,
//     });
// });

const updateTaskStar = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, taskId, isStar, isComplite } = req.body;

    if (!projectId || !taskId) {
        throw new AppError(400, "Project ID and Task ID are required");
    }


    const updates: { isStar?: boolean; isComplite?: boolean } = {};

    if (typeof isStar === "boolean") updates.isStar = isStar;
    if (typeof isComplite === "boolean") updates.isComplite = isComplite;

    if (Object.keys(updates).length === 0) {
        throw new AppError(400, "No valid fields to update (isStar or isComplite)");
    }

    const result = await projectServices.updateTaskStar(projectId, taskId, updates);

    if (!result) {
        throw new AppError(404, "Task not found");
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Task updated successfully",
        data: result,
    });
});


// const updateSubtaskStar = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { projectId, taskId, subtaskId, isStar } = req.body;

//     if (!projectId || !taskId || !subtaskId || !isStar) {
//         throw new AppError(400, "Project ID, Task ID, Subtask ID and isStar (boolean) are required");
//     }

//     const result = await projectServices.updateSubtaskStar(projectId, taskId, subtaskId, isStar);

//     if (!result) {
//         throw new AppError(404, "Subtask not found");
//     }

//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Subtask star status updated successfully",
//         data: result,
//     });
// }
// );


const updateSubtaskStar = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, taskId, subtaskId, isStar, isComplite } = req.body;

    if (!projectId || !taskId || !subtaskId) {
        throw new AppError(400, "Project ID, Task ID, and Subtask ID are required");
    }

    const updates: { isStar?: boolean; isComplite?: boolean } = {};

    if (typeof isStar === "boolean") updates.isStar = isStar;
    if (typeof isComplite === "boolean") updates.isComplite = isComplite;

    if (Object.keys(updates).length === 0) {
        throw new AppError(400, "No valid fields to update (isStar or isComplite)");
    }

    const result = await projectServices.updateSubtaskStar(projectId, taskId, subtaskId, updates);

    if (!result) {
        throw new AppError(404, "Subtask not found");
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Subtask updated successfully",
        data: result,
    });
});

const softDeleteTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, taskId } = req.params;

    if (!projectId || !taskId) {
        throw new AppError(200, "ProjectId & TaskId must be required");
    };

    const result = await projectServices.softDeleteTask(projectId, taskId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Task soft deketed success.",
        data: result,
    });
});

const permanentDeleteTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { projectId, taskId } = req.body;

    if (!projectId || !taskId) {
        throw new AppError(200, "ProjectId & TaskId must be required");
    };

    const result = await projectServices.permanentDeleteTask(projectId, taskId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Task Premanently deleted success",
        data: result,
    });
})

const permanentDeleteSubTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { projectId, taskId, subTaskId } = req.body;

    if (!projectId || !taskId || !subTaskId) {
        throw new AppError(200, "ProjectId , TaskId & subTaskId must be required");
    };

    const result = await projectServices.permanentDeleteSubtask(projectId, taskId, subTaskId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Task Premanently deleted success",
        data: result,
    });
});


// const createProjectTaskSubtaskWithAi = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const projectId = req.params.id;
//     const aiApiResponse = await axios.get(`https://project-helper-ai-agent.onrender.com/projects/project_tasks/${projectId}`);
//     res.status(200).json({res : aiApiResponse.data});
// });




const createProjectTaskSubtaskWithAi = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const projectId = req.params.id;

        const aiApiResponse = await axios.get(
            `https://project-helper-ai-agent.onrender.com/projects/project_tasks/${projectId}`
        );
        const aiData = aiApiResponse.data;

        if (!aiData || !aiData.tasks) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid AI response format" });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res
                .status(404)
                .json({ success: false, message: "Project not found" });
        };


        const formattedTasks = aiData.tasks.map((task: any) => ({
            task: task.task,
            details: task.details || null,
            taskDueDate: task.datetime ? new Date(task.datetime) : null,
            isDeleted: false,
            isComplite: false,
            isStar: false,
            subtasks: task.subtasks?.map((sub: any) => ({
                title: sub.subtask,
                subTaskDueDate: sub.datetime ? new Date(sub.datetime) : null,
                isStar: false,
                isDeleted: false,
                isComplite: false,
            })) || [],
        }));

       
        project.tasks = formattedTasks;

     
        await project.save();


        res.status(200).json({
            success: true,
            message: "Project tasks & subtasks added successfully from AI",
            data: project,
        });
    } catch (error: any) {
        console.error("AI Integration Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack,
        });
    }
};



export const projectController = {
    createProject,
    updateProjectTitle,
    addTask,
    addSubTask,
    addDetails,
    getProject,
    askQuestion,
    getAllProject,
    ansQuestion,
    askQuestionOpenAi,
    findSingleTask,
    findSingleSubtask,
    updateTaskStar,
    updateSubtaskStar,
    softDeleteTask,
    permanentDeleteTask,
    permanentDeleteSubTask,
    createProjectTaskSubtaskWithAi
};