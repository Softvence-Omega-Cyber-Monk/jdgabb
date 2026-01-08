import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { projectServices } from "./project.services";
import { Project } from "./project.model";
import axios from "axios";
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

    const aiResponse = await axios.post(`https://ai.gogetagenie.com/projects/generate_title`, {
        "user_text ": title
    }, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
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
        concatinateText
    });
});


const addTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, task, details, taskDueDate, isStar } = req.body;
    const result = await projectServices.addTask(projectId, { task, details, taskDueDate, isStar });
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

    const findUser = await Project.findOne({ _id: projectId });

    if (!mongoose.Types.ObjectId.isValid(projectId as string)) {
        throw new AppError(400, "Invalid mongoDb objectId");
    }

    await UpdateChatHestory.create({ userId: findUser?.userId, isFile: false, text: "Ask" });

    // const result = await axios.post(`${envVers.AI_ROOT_URL}/projects/ask/${projectId}`);
    // const result = await axios.post(`https://ai.gogetagenie.com/projects/ask/${projectId}`,
    //     {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },

    //     }
    // );
    const result = await axios({
        method: 'post',
        url: `https://ai.gogetagenie.com/projects/ask/${projectId}/`,
        headers: {
            'accept': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded', // optional
        },
        data: ''
    });

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
    const questionId = updateQuestion?.answered_questions.at(-1);
    UpdateChatHestory.create({ userId: findUser?.userId, isFile: true, text: result.data.question });

    res.status(200).json({
        success: true,
        questionId,
        storedData: updateQuestion
    })
});
const askQuestionNotHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;

    const findUser = await Project.findOne({ _id: projectId });

    if (!mongoose.Types.ObjectId.isValid(projectId as string)) {
        throw new AppError(400, "Invalid mongoDb objectId");
    };

    // const result = await axios.post(`${envVers.AI_ROOT_URL}/projects/ask/${projectId}`);
    const result = await axios.post(`https://ai.gogetagenie.com/projects/ask/${projectId}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    });

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

    const questionId = updateQuestion?.answered_questions.at(-1);

    await UpdateChatHestory.create({ userId: findUser?.userId, isFile: true, text: result.data.question });

    res.status(200).json({
        success: true,
        questionId,
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

const updateTaskDueDateController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { projectId, taskId, taskDueDate } = req.body;

        if (!projectId || !taskId) {
            throw new AppError(400, "Project ID, Task ID are required");
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
            `https://ai.gogetagenie.com/projects/project_tasks/${projectId}`
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
    const aiResponse = await axios.post(`https://ai.gogetagenie.com/projects/generate_title/`, {
        "user_text ": prompt
    }, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
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



// const updateTaskWithAi = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { taskID, project_id, prompt } = req.body;

//     if (!taskID || !project_id || !prompt) {
//         throw new AppError(400, "TaskId, ProjectId & prompt are required");
//     }

//     // API call with body
//     const result = await axios.patch(
//         `https://ai.gogetagenie.com/projects/task/${taskID}/edit`,
//         {
//             prompt,
//             project_id,
//         },
//         {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         }
//     );

//     res.status(200).json({
//         success: true,
//         message: "Task updated successfully via AI",
//         data: result.data,
//     });
// });

const updateTaskWithAi = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { taskID, project_id, prompt, userId } = req.body

    if (!taskID || !project_id || !prompt || !userId) {
        throw new AppError(400, "TaskId, ProjectId , userId & prompt are required")
    }

    await UpdateChatHestory.create({ userId: userId, isFile: false, text: prompt });

    // Step 1: Call AI API
    const aiResponse = await axios.patch(
        `https://ai.gogetagenie.com/projects/task/${taskID}/edit`,
        { prompt, project_id },
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }
    );

    const extractTaskData = (data: any): any => {
        // Check for deeply nested structure: data.data.data (the entire object)
        if (data?.data?.data && typeof data.data.data === "object" && !Array.isArray(data.data.data)) {
            return data.data.data
        };

        if (data?.data && typeof data.data === "object" && !Array.isArray(data.data)) {
            // If data.data has a 'data' property, use that
            if (data.data.data) return data.data.data
            // Otherwise use data.data directly
            return data.data
        }
        // Check for direct task object
        if (data?.task && typeof data === "object") {
            return data
        }
        // If nothing matches, return the entire data object as fallback
        if (typeof data === "object" && !Array.isArray(data)) {
            return data
        }
        return null
    }

    const updatedTaskData = extractTaskData(aiResponse.data)

    if (!updatedTaskData || typeof updatedTaskData !== "object" || Array.isArray(updatedTaskData)) {
        console.log("[v0] AI response extraction failed. Received:", JSON.stringify(aiResponse.data, null, 2))
        throw new AppError(
            500,
            `Invalid AI response format. Expected object with task fields, received: ${typeof updatedTaskData}`,
        )
    }

    const validTaskFields = ["task", "details", "taskDueDate", "isDeleted", "isComplite", "isStar", "subtasks"]
    const hasValidField = validTaskFields.some((field) => field in updatedTaskData)

    if (!hasValidField) {
        console.log("[v0] No valid task fields found in AI response:", updatedTaskData)
        throw new AppError(500, "AI response does not contain any valid task fields")
    }

    console.log("[v0] Successfully extracted task data:", updatedTaskData)

    // Step 3: Find project
    const project = await Project.findById(project_id)
    if (!project) {
        throw new AppError(404, "Project not found")
    }

    // Step 4: Find task
    const taskIndex = project.tasks.findIndex((t: any) => t._id.toString() === taskID)
    if (taskIndex === -1) {
        throw new AppError(404, "Task not found")
    }

    const taskToUpdate = project.tasks[taskIndex]
    if (!taskToUpdate) {
        throw new AppError(404, "Task not found")
    }

    // Step 5: Define valid task fields to prevent injection
    const validTaskFieldsToUse = ["task", "details", "taskDueDate", "isDeleted", "isComplite", "isStar"]
    const validSubtaskFields = ["title", "subTaskDueDate", "isStar", "isDeleted", "isComplite"]

    // Step 6: Update task fields dynamically
    for (const key in updatedTaskData) {
        const value = updatedTaskData[key]

        if (value === undefined || value === null) continue

        if (key === "subtasks" && Array.isArray(value)) {
            value.forEach((subtaskUpdate: any) => {
                // Check if subtask has a valid _id (not empty string or missing)
                const hasValidId = subtaskUpdate._id && subtaskUpdate._id.toString().trim() !== ""

                if (hasValidId) {
                    // Try to find existing subtask by _id
                    const subtaskIndex = taskToUpdate.subtasks.findIndex(
                        (st: any) => st._id?.toString() === subtaskUpdate._id?.toString(),
                    )

                    if (subtaskIndex !== -1) {
                        // Update existing subtask
                        const subtaskToUpdate = taskToUpdate.subtasks[subtaskIndex]
                        for (const stKey in subtaskUpdate) {
                            if (validSubtaskFields.includes(stKey)) {
                                const stValue = subtaskUpdate[stKey]
                                if (stValue !== undefined && stValue !== null) {
                                    (subtaskToUpdate as any).set(stKey, stValue)
                                }
                            }
                        }
                    }
                } else {
                    // New subtask - generate new ObjectId and add it
                    const newSubtask = {
                        _id: new mongoose.Types.ObjectId(),
                        title: subtaskUpdate.title || "",
                        subTaskDueDate: subtaskUpdate.subTaskDueDate || null,
                        isStar: subtaskUpdate.isStar || false,
                        isDeleted: subtaskUpdate.isDeleted || false,
                        isComplite: subtaskUpdate.isComplite || false,
                    }

                    // Validate that new subtask has at least a title
                    if (newSubtask.title.trim() !== "") {
                        taskToUpdate.subtasks.push(newSubtask)
                        console.log("[v0] Added new subtask:", newSubtask)
                    }
                }
            })
        } else if (validTaskFieldsToUse.includes(key)) {
            // Update valid task fields only
            taskToUpdate.set(key, value)
        }
    }

    // Step 7: Save project
    await project.save();

    await UpdateChatHestory.create({ userId: userId, isFile: true, text: "Your task has been successfully updated via our AI assistant! We’ve applied the latest changes you requested." });

    // Step 8: Response
    res.status(200).json({
        success: true,
        message: "Your task has been successfully updated via our AI assistant! We’ve applied the latest changes you requested.",
        data: {
            success: true,
            statusCode: 200,
            message: "",
            data: {
                updatedTask: taskToUpdate,
            },
        },
    })
});


// ------------------------------------------- Updated Word ---------------------------------------------------------------


const createFullProjectManualy = async (req: Request, res: Response) => {
    try {
        const { goal, tasks } = req.body;
        const userId = req.params.userId;
        console.log(userId);
        // Validation
        if (!userId || !goal) {
            return res.status(400).json({
                success: false,
                message: "userId and goal are required"
            });
        }

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId format"
            });
        }

        // Prepare project data with defaults
        const projectData: any = {
            userId,
            goal,
            tasks: tasks || []
        };

        // Validate tasks if provided
        if (tasks && Array.isArray(tasks)) {
            for (const task of tasks) {
                if (!task.task) {
                    return res.status(400).json({
                        success: false,
                        message: "Each task must have a 'task' field"
                    });
                }

                // Validate subtasks if provided
                if (task.subtasks && Array.isArray(task.subtasks)) {
                    for (const subtask of task.subtasks) {
                        if (!subtask.title) {
                            return res.status(400).json({
                                success: false,
                                message: "Each subtask must have a 'title' field"
                            });
                        }
                    }
                }
            }
        }

        // Create the project (answered_questions, visibility, sharedWith will use schema defaults)
        const newProject = await Project.create(projectData);

        // Populate if needed
        await newProject.populate("userId", "name email");

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: newProject
        });

    } catch (error: any) {
        console.error("Error creating project:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create project",
            error: error.message
        });
    }
};


const getAllProjectByUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id;

    const result = await Project.find({
        $or: [
            { userId: userId },
            { "sharedWith.userId": userId }
        ]
    });
    res.status(200).json(result);
});


const collabrationProjectGiveAccess = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { projectAdminUserId, projectId, projectCollabrationOwnerUserId } = req.body;

    if (!projectAdminUserId || !projectId || !projectCollabrationOwnerUserId) {
        throw new AppError(400, "projectAdminUserId , projectId and projectCollabrationOwnerUserId must be required");
    }

    const findProject = await Project.findById(projectId);

    // const checkProjectAdminOwner = findProject?.userId === projectAdminUserId;
    const checkProjectAdminOwner = findProject?.userId.equals(projectAdminUserId);


    if (!checkProjectAdminOwner) throw new AppError(403, "Access denied. Insufficient Permission.");


    const alreadyExist = await findProject?.sharedWith.some((item) => item.userId?.equals(projectCollabrationOwnerUserId));

    if (alreadyExist) throw new AppError(400, "He Already has collabration access");

    findProject?.sharedWith.push({
        userId: projectCollabrationOwnerUserId
    });

    await findProject?.save();


    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Project Collabration Successfully",
        data: null
    })

});


// const updateFullProjectAnyWhereProject = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { projectId } = req.params;
//         const { goal, tasks } = req.body;

//         // Find the project by ID
//         const project = await Project.findById(projectId);

//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' });
//         }

//         // Update the project's goal
//         if (goal !== undefined) {
//             project.goal = goal;
//         }

//         // Update tasks
//         if (tasks && Array.isArray(tasks)) {
//             tasks.forEach((taskUpdate) => {
//                 // Check if this task already exists
//                 const existingTask = project.tasks.id(taskUpdate._id);

//                 if (existingTask) {
//                     // Update existing task - শুধু যেই fields আছে সেগুলোই update হবে
//                     if (taskUpdate.task !== undefined) existingTask.task = taskUpdate.task;
//                     if (taskUpdate.details !== undefined) existingTask.details = taskUpdate.details;
//                     if (taskUpdate.taskDueDate !== undefined) existingTask.taskDueDate = taskUpdate.taskDueDate;
//                     if (taskUpdate.isDeleted !== undefined) existingTask.isDeleted = taskUpdate.isDeleted;
//                     if (taskUpdate.isComplite !== undefined) existingTask.isComplite = taskUpdate.isComplite;
//                     if (taskUpdate.isArchived !== undefined) existingTask.isArchived = taskUpdate.isArchived;
//                     if (taskUpdate.isStar !== undefined) existingTask.isStar = taskUpdate.isStar;

//                     // Update subtasks
//                     if (taskUpdate.subtasks && Array.isArray(taskUpdate.subtasks)) {
//                         taskUpdate.subtasks.forEach((subtaskUpdate: any) => {
//                             const existingSubtask = existingTask.subtasks.id(subtaskUpdate._id);

//                             if (existingSubtask) {
//                                 // Update existing subtask
//                                 if (subtaskUpdate.title !== undefined) existingSubtask.title = subtaskUpdate.title;
//                                 if (subtaskUpdate.subTaskDueDate !== undefined) existingSubtask.subTaskDueDate = subtaskUpdate.subTaskDueDate;
//                                 if (subtaskUpdate.isStar !== undefined) existingSubtask.isStar = subtaskUpdate.isStar;
//                                 if (subtaskUpdate.isDeleted !== undefined) existingSubtask.isDeleted = subtaskUpdate.isDeleted;
//                                 if (subtaskUpdate.isComplite !== undefined) existingSubtask.isComplite = subtaskUpdate.isComplite;
//                             } else {
//                                 // Add new subtask
//                                 existingTask.subtasks.push(subtaskUpdate);
//                             }
//                         });
//                     }
//                 } else {
//                     // Add new task
//                     project.tasks.push(taskUpdate);
//                 }
//             });
//         }

//         // Save the updated project
//         await project.save();

//         return res.status(200).json({ message: 'Project updated successfully', project });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'An error occurred while updating the project' });
//     }
// };


const updateFullProjectAnyWhereProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId } = req.params;
        const { goal, tasks } = req.body;

        // Find the project by ID
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Update the project's goal
        if (goal !== undefined) {
            project.goal = goal;
        }

        // Update tasks
        if (tasks && Array.isArray(tasks)) {
            tasks.forEach((taskUpdate) => {
                let existingTask = null;

                // Check if _id is a valid MongoDB ObjectID (24 hex characters)
                if (taskUpdate._id && /^[0-9a-fA-F]{24}$/.test(taskUpdate._id)) {
                    try {
                        existingTask = project.tasks.id(taskUpdate._id);
                    } catch (error) {
                        // Invalid ID, treat as new task
                        existingTask = null;
                    }
                }

                if (existingTask) {
                    // Update existing task - শুধু যেই fields আছে সেগুলোই update হবে
                    if (taskUpdate.task !== undefined) existingTask.task = taskUpdate.task;
                    if (taskUpdate.details !== undefined) existingTask.details = taskUpdate.details;
                    if (taskUpdate.taskDueDate !== undefined) existingTask.taskDueDate = taskUpdate.taskDueDate;
                    if (taskUpdate.isDeleted !== undefined) existingTask.isDeleted = taskUpdate.isDeleted;
                    if (taskUpdate.isComplite !== undefined) existingTask.isComplite = taskUpdate.isComplite;
                    if (taskUpdate.isArchived !== undefined) existingTask.isArchived = taskUpdate.isArchived;
                    if (taskUpdate.isStar !== undefined) existingTask.isStar = taskUpdate.isStar;

                    // Update subtasks
                    if (taskUpdate.subtasks && Array.isArray(taskUpdate.subtasks)) {
                        taskUpdate.subtasks.forEach((subtaskUpdate: any) => {
                            let existingSubtask = null;

                            // Check if subtask _id is valid
                            if (subtaskUpdate._id && /^[0-9a-fA-F]{24}$/.test(subtaskUpdate._id)) {
                                try {
                                    existingSubtask = existingTask.subtasks.id(subtaskUpdate._id);
                                } catch (error) {
                                    existingSubtask = null;
                                }
                            }

                            if (existingSubtask) {
                                // Update existing subtask
                                if (subtaskUpdate.title !== undefined) existingSubtask.title = subtaskUpdate.title;
                                if (subtaskUpdate.subTaskDueDate !== undefined) existingSubtask.subTaskDueDate = subtaskUpdate.subTaskDueDate;
                                if (subtaskUpdate.isStar !== undefined) existingSubtask.isStar = subtaskUpdate.isStar;
                                if (subtaskUpdate.isDeleted !== undefined) existingSubtask.isDeleted = subtaskUpdate.isDeleted;
                                if (subtaskUpdate.isComplite !== undefined) existingSubtask.isComplite = subtaskUpdate.isComplite;
                            } else {
                                // Add new subtask (MongoDB will auto-generate _id)
                                const { _id, ...subtaskWithoutId } = subtaskUpdate;
                                existingTask.subtasks.push(subtaskWithoutId);
                            }
                        });
                    }
                } else {
                    // Add new task (remove invalid _id, MongoDB will auto-generate)
                    const { _id, ...taskWithoutId } = taskUpdate;

                    // Also remove invalid _ids from subtasks
                    if (taskWithoutId.subtasks && Array.isArray(taskWithoutId.subtasks)) {
                        taskWithoutId.subtasks = taskWithoutId.subtasks.map((st: any) => {
                            const { _id, ...subtaskWithoutId } = st;
                            return subtaskWithoutId;
                        });
                    }

                    project.tasks.push(taskWithoutId);
                }
            });
        }

        // Save the updated project
        await project.save();

        return res.status(200).json({ message: 'Project updated successfully', project });
    } catch (error) {
        console.error('Update error:', error);
        return res.status(500).json({ message: 'An error occurred while updating the project' });
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
    getAllProjectByUser,
    softDeleteTask,
    permanentDeleteTask,
    permanentDeleteSubTask,
    createProjectTaskSubtaskWithAi,
    createProjectWithAi,
    getStarredTasks,
    getCompletedTasks,
    updateTaskDueDateController,
    askQuestionNotHistory,
    updateTaskWithAi,


    // Update Work

    createFullProjectManualy,
    collabrationProjectGiveAccess,
    updateFullProjectAnyWhereProject
};