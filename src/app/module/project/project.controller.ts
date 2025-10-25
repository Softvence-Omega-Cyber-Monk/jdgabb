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
import { UpdateChatHestory } from "../UpdateHistory/update.history.model";



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

    const finduser = await Project.findOne({ _id: projectId });

    if (!title) {
        res.status(400).json({ success: false, message: "Title is required" });
    };

    await UpdateChatHestory.create({ userId: finduser?.userId, isFile: false, text: title });

    const aiResponse = await axios.post(`https://project-helper-ai-agent.onrender.com/projects/generate_title`, {
        "user_text ": prompt
    });


    const concatinateText = `Alright, I’ve added *${aiResponse.data.title}*! Would you like to *add something*, have me *ask questions* about your project or *create the project and task list* right away?`

    const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId },
        { $set: { goal: aiResponse.data.title } },
        { new: true, runValidators: true }
    );

    await UpdateChatHestory.create({ userId: finduser?.userId, isFile: true, text: concatinateText });

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


// const getProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const id = req.params.id;

//     const result = await Project.findById(id);

//     if (!result) {
//         return sendResponse(res, {
//             statusCode: 404,
//             success: false,
//             message: "Project not found",
//             data: null,
//         });
//     };

//     const filteredTasks = result.tasks.filter(
//         (task: any) => task.isStar === false && task.isComplite === false
//     );

//     const projectWithFilteredTasks = {
//         ...result.toObject(),
//         tasks: filteredTasks,
//     };

//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Project retrieved successfully (filtered)",
//         data: projectWithFilteredTasks,
//     });
// });



const getAllProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await Project.find({});
    res.status(200).json(result);
});

const askQuestion = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;

    const findUser = await Project.findOne({ _id: projectId });

    if (!mongoose.Types.ObjectId.isValid(projectId as string)) {
        throw new AppError(400, "Invalid mongoDb objectId");
    }

    UpdateChatHestory.create({ userId: findUser?.userId, isFile: false, text: "Ask" });

    // const result = await axios.post(`${envVers.AI_ROOT_URL}/projects/ask/${projectId}`);
    const result = await axios.post(`https://project-helper-ai-agent.onrender.com/projects/ask/${projectId}`);

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

    UpdateChatHestory.create({ userId: findUser?.userId, isFile: true, text: result.data.question });

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
    };

    await UpdateChatHestory.create({ userId: updatedProject.userId, isFile: false, text: answer });


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


// const updateTaskStar = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { projectId, taskId, isStar, isComplite, taskDueDate } = req.body;

//     if (!projectId || !taskId) {
//         throw new AppError(400, "Project ID and Task ID are required");
//     }

//     const updates: { isStar?: boolean; isComplite?: boolean; taskDueDate?: Date | string } = {};

//     if (typeof isStar === "boolean") updates.isStar = isStar;
//     if (typeof isComplite === "boolean") updates.isComplite = isComplite;
//     if (taskDueDate) updates.taskDueDate = taskDueDate;

//     if (Object.keys(updates).length === 0) {
//         throw new AppError(400, "No valid fields to update (isStar, isComplite, taskDueDate)");
//     }

//     const result = await projectServices.updateTaskStar(projectId, taskId, updates);

//     if (!result) {
//         throw new AppError(404, "Task not found");
//     }

//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Task updated successfully",
//         data: result,
//     });
// });

const updateTaskDueDateController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, taskId, taskDueDate } = req.body;

    if (!projectId || !taskId || !taskDueDate) {
      throw new AppError(400, "Project ID, Task ID, and taskDueDate are required");
    }

    const result = await projectServices.updateTaskDueDate(projectId, taskId, taskDueDate);

    if (!result) {
      throw new AppError(404, "Task not found in the given project");
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Task due date updated successfully",
      data: result,
    });
  }
);

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
// Replace Ai root api url
const createProjectTaskSubtaskWithAi = async (req: Request, res: Response, next: NextFunction) => {
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

const createProjectWithAi = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const prompt = req.body.prompt;
    const userId = req.body.userId;

    if (!prompt && !userId) {
        throw new AppError(200, "User id & User prompt must be required");
    }
    await UpdateChatHestory.create({ userId: userId, isFile: false, text: prompt })
    const aiResponse = await axios.post(`https://project-helper-ai-agent.onrender.com/projects/generate_title`, {
        "user_text ": prompt
    });

    const concatinateText = `Awesome! You want to *${aiResponse.data.title}*! Would you like to *add something*, have me *ask questions* about your project or *create the project and task list* right away?`;
    await UpdateChatHestory.create({ userId: userId, isFile: true, text: concatinateText })

    const createProject = await Project.create({ userId: userId, goal: aiResponse.data.title });

    res.status(200).json({
        message: "Project creation successfully", data: {
            userPrompt: prompt,
            aiResponseTitle: aiResponse.data.title,
            concatinateText,
            project: createProject
        }
    });
});




// const getStarredTasks = async (req: Request, res: Response) => {
//     try {
//         const { projectId } = req.params;


//         if (!mongoose.Types.ObjectId.isValid(projectId as string)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid project ID",
//             });
//         }


//         const project = await Project.findById(projectId, {
//             tasks: 1,
//         });

//         if (!project) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Project not found",
//             });
//         };

//         const starredTasks = project.tasks.filter((task) => task.isStar === true);

//         return res.status(200).json({
//             success: true,
//             count: starredTasks.length,
//             tasks: starredTasks,
//         });

//     } catch (error) {
//         console.error("Error fetching starred tasks:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// };



const getStarredTasks = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId as string)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }

        const projects = await Project.find({ userId }, { tasks: 1, goal: 1 });

        if (!projects.length) {
            return res.status(404).json({
                success: false,
                message: "No projects found for this user",
            });
        }


        const starredTasksSummary = projects.map(project => {
            const starredTasks = project.tasks.filter(task => task.isStar);

            return {
                projectId: project._id,
                goal: project.goal,
                starredTasksCount: starredTasks.length,
                starredTasks: starredTasks
            };
        }).filter(proj => proj.starredTasksCount > 0);

        const totalStarredTasks = starredTasksSummary.reduce(
            (acc, proj) => acc + proj.starredTasksCount,
            0
        );

        return res.status(200).json({
            success: true,
            count: totalStarredTasks,
            tasks: starredTasksSummary
        });

    } catch (error) {
        console.error("Error fetching starred tasks:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};




// const getStarredTasks = async (req: Request, res: Response) => {
//     try {
//         const { projectId } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(projectId as string)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid project ID",
//             });
//         }


//         const project = await Project.findById(projectId, { tasks: 1 });

//         if (!project) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Project not found",
//             });
//         }


//         const filteredTasks = project.tasks.filter(
//             (task: any) => task.isStar === true || task.isComplite === true
//         );

//         return res.status(200).json({
//             success: true,
//             count: filteredTasks.length,
//             tasks: filteredTasks,
//         });
//     } catch (error) {
//         console.error("Error fetching starred/completed tasks:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// };


const getCompletedTasks = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId as string)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID",
            });
        }


        const project = await Project.findById(projectId, { tasks: 1 });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }


        const completedTasks = project.tasks.filter((task) => task.isComplite === true);

        return res.status(200).json({
            success: true,
            count: completedTasks.length,
            tasks: completedTasks,
        });

    } catch (error) {
        console.error("Error fetching completed tasks:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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
    createProjectTaskSubtaskWithAi,
    createProjectWithAi,
    getStarredTasks,
    getCompletedTasks,
    updateTaskDueDateController
};