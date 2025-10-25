"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const project_services_1 = require("./project.services");
const project_model_1 = require("./project.model");
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const openAi_1 = require("../../config/openAi");
const update_history_model_1 = require("../UpdateHistory/update.history.model");
const createProject = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const goalData = req.body.goal;
    console.log(goalData);
    const result = await project_services_1.projectServices.createProject(id, goalData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Project created success",
        data: result
    });
});
const updateProjectTitle = (0, catchAsync_1.default)(async (req, res, next) => {
    const projectId = req.params.id;
    const title = req.body.title;
    if (!title) {
        res.status(400).json({ success: false, message: "Title is required" });
    }
    ;
    const updatedProject = await project_model_1.Project.findOneAndUpdate({ _id: projectId }, { $set: { goal: title } }, { new: true, runValidators: true });
    if (!updatedProject) {
        res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({
        success: true,
        message: "Project title updated successfully",
        data: updatedProject,
    });
});
const addTask = (0, catchAsync_1.default)(async (req, res, next) => {
    const { projectId, task } = req.body;
    const result = await project_services_1.projectServices.addTask(projectId, task);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Task Added success",
        data: result
    });
});
const findSingleTask = (0, catchAsync_1.default)(async (req, res, next) => {
    const { projectId, taskId } = req.body;
    if (!projectId || !taskId) {
        throw new AppError_1.default(400, "ProjectId & task id must be required");
    }
    ;
    const result = await project_services_1.projectServices.findSingleTask(projectId, taskId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Task retrived successfully",
        data: result
    });
});
const findSingleSubtask = (0, catchAsync_1.default)(async (req, res, next) => {
    const { projectId, taskId, subTaskId } = req.body;
    if (!projectId || !taskId || !subTaskId) {
        throw new AppError_1.default(400, "ProjectId , taskId & SubtaskId is must be required");
    }
    ;
    const result = await project_services_1.projectServices.findSingleSubTask(projectId, taskId, subTaskId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Subtask Retrived successfully.",
        data: result
    });
});
const addSubTask = (0, catchAsync_1.default)(async (req, res, next) => {
    const { projectId, taskId, subtaskTitle, subTaskDueDate } = req.body;
    if (!projectId || !taskId || !subtaskTitle) {
        throw new AppError_1.default(400, "ProjectId, taskId & subtaskTitle must be required");
    }
    const result = await project_services_1.projectServices.addSubTask(projectId, taskId, subtaskTitle, subTaskDueDate);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Sub Task addess success",
        data: result
    });
});
const addDetails = (0, catchAsync_1.default)(async (req, res, next) => {
    const { projectId, taskId, detailsText } = req.body;
    const result = await project_services_1.projectServices.addOrUpdateTaskDetails(projectId, taskId, detailsText);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Task Details added success",
        data: result
    });
});
const getProject = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const result = await project_model_1.Project.findById(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Project retrived successfully",
        data: result
    });
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
const getAllProject = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await project_model_1.Project.find({});
    res.status(200).json(result);
});
const askQuestion = (0, catchAsync_1.default)(async (req, res, next) => {
    const projectId = req.params.id;
    const findUser = await project_model_1.Project.findOne({ _id: projectId });
    if (!mongoose_1.default.Types.ObjectId.isValid(projectId)) {
        throw new AppError_1.default(400, "Invalid mongoDb objectId");
    }
    update_history_model_1.UpdateChatHestory.create({ userId: findUser?.userId, isFile: false, text: "Ask" });
    // const result = await axios.post(`${envVers.AI_ROOT_URL}/projects/ask/${projectId}`);
    const result = await axios_1.default.post(`https://project-helper-ai-agent.onrender.com/projects/ask/${projectId}`);
    if (!result) {
        throw new AppError_1.default(400, "Please try again.");
    }
    const updateQuestion = await project_model_1.Project.findByIdAndUpdate(projectId, {
        $push: {
            answered_questions: {
                question: result.data.question,
                answer: null,
            },
        },
    }, { new: true });
    update_history_model_1.UpdateChatHestory.create({ userId: findUser?.userId, isFile: true, text: result.data.question });
    res.status(200).json({
        success: true,
        AiQuestion: result.data,
        storedData: updateQuestion
    });
});
const ansQuestion = (0, catchAsync_1.default)(async (req, res, next) => {
    const { projectid, questionsId, answer } = req.body;
    const updatedProject = await project_model_1.Project.findOneAndUpdate({ _id: projectid, "answered_questions._id": questionsId }, { $set: { "answered_questions.$.answer": answer } }, { new: true });
    if (!updatedProject) {
        throw new AppError_1.default(400, "Project or question not found");
    }
    ;
    await update_history_model_1.UpdateChatHestory.create({ userId: updatedProject.userId, isFile: false, text: answer });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Answer added successfully!",
        statusCode: 200,
        data: updatedProject
    });
});
const askQuestionOpenAi = (0, catchAsync_1.default)(async (req, res, next) => {
    const { prompt } = req.body;
    const result = await openAi_1.OpenAi.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system", content: "You are a helpful assistant."
            },
            {
                role: "user", content: prompt
            }
        ]
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Question ai",
        data: result.choices[0]?.message.content
    });
});
// const updateTaskStar = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { projectId, taskId, isStar, isComplite } = req.body;
//     if (!projectId || !taskId) {
//         throw new AppError(400, "Project ID and Task ID are required");
//     }
//     const updates: { isStar?: boolean; isComplite?: boolean } = {};
//     if (typeof isStar === "boolean") updates.isStar = isStar;
//     if (typeof isComplite === "boolean") updates.isComplite = isComplite;
//     if (Object.keys(updates).length === 0) {
//         throw new AppError(400, "No valid fields to update (isStar or isComplite)");
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
const updateTaskStar = (0, catchAsync_1.default)(async (req, res, next) => {
    const { projectId, taskId, isStar, isComplite, taskDueDate } = req.body;
    if (!projectId || !taskId) {
        throw new AppError_1.default(400, "Project ID and Task ID are required");
    }
    const updates = {};
    if (typeof isStar === "boolean")
        updates.isStar = isStar;
    if (typeof isComplite === "boolean")
        updates.isComplite = isComplite;
    if (taskDueDate)
        updates.taskDueDate = taskDueDate;
    if (Object.keys(updates).length === 0) {
        throw new AppError_1.default(400, "No valid fields to update (isStar, isComplite, taskDueDate)");
    }
    const result = await project_services_1.projectServices.updateTaskStar(projectId, taskId, updates);
    if (!result) {
        throw new AppError_1.default(404, "Task not found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Task updated successfully",
        data: result,
    });
});
const updateSubtaskStar = (0, catchAsync_1.default)(async (req, res, next) => {
    const { projectId, taskId, subtaskId, isStar, isComplite } = req.body;
    if (!projectId || !taskId || !subtaskId) {
        throw new AppError_1.default(400, "Project ID, Task ID, and Subtask ID are required");
    }
    const updates = {};
    if (typeof isStar === "boolean")
        updates.isStar = isStar;
    if (typeof isComplite === "boolean")
        updates.isComplite = isComplite;
    if (Object.keys(updates).length === 0) {
        throw new AppError_1.default(400, "No valid fields to update (isStar or isComplite)");
    }
    const result = await project_services_1.projectServices.updateSubtaskStar(projectId, taskId, subtaskId, updates);
    if (!result) {
        throw new AppError_1.default(404, "Subtask not found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Subtask updated successfully",
        data: result,
    });
});
const softDeleteTask = (0, catchAsync_1.default)(async (req, res, next) => {
    const { projectId, taskId } = req.params;
    if (!projectId || !taskId) {
        throw new AppError_1.default(200, "ProjectId & TaskId must be required");
    }
    ;
    const result = await project_services_1.projectServices.softDeleteTask(projectId, taskId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Task soft deketed success.",
        data: result,
    });
});
const permanentDeleteTask = (0, catchAsync_1.default)(async (req, res, next) => {
    const { projectId, taskId } = req.body;
    if (!projectId || !taskId) {
        throw new AppError_1.default(200, "ProjectId & TaskId must be required");
    }
    ;
    const result = await project_services_1.projectServices.permanentDeleteTask(projectId, taskId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Task Premanently deleted success",
        data: result,
    });
});
const permanentDeleteSubTask = (0, catchAsync_1.default)(async (req, res, next) => {
    const { projectId, taskId, subTaskId } = req.body;
    if (!projectId || !taskId || !subTaskId) {
        throw new AppError_1.default(200, "ProjectId , TaskId & subTaskId must be required");
    }
    ;
    const result = await project_services_1.projectServices.permanentDeleteSubtask(projectId, taskId, subTaskId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Task Premanently deleted success",
        data: result,
    });
});
// Replace Ai root api url
const createProjectTaskSubtaskWithAi = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const aiApiResponse = await axios_1.default.get(`https://project-helper-ai-agent.onrender.com/projects/project_tasks/${projectId}`);
        const aiData = aiApiResponse.data;
        if (!aiData || !aiData.tasks) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid AI response format" });
        }
        const project = await project_model_1.Project.findById(projectId);
        if (!project) {
            return res
                .status(404)
                .json({ success: false, message: "Project not found" });
        }
        ;
        const formattedTasks = aiData.tasks.map((task) => ({
            task: task.task,
            details: task.details || null,
            taskDueDate: task.datetime ? new Date(task.datetime) : null,
            isDeleted: false,
            isComplite: false,
            isStar: false,
            subtasks: task.subtasks?.map((sub) => ({
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
    }
    catch (error) {
        console.error("AI Integration Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack,
        });
    }
};
const createProjectWithAi = (0, catchAsync_1.default)(async (req, res, next) => {
    const prompt = req.body.prompt;
    const userId = req.body.userId;
    if (!prompt && !userId) {
        throw new AppError_1.default(200, "User id & User prompt must be required");
    }
    await update_history_model_1.UpdateChatHestory.create({ userId: userId, isFile: false, text: prompt });
    const aiResponse = await axios_1.default.post(`https://project-helper-ai-agent.onrender.com/projects/generate_title`, {
        "user_text ": prompt
    });
    const concatinateText = `Awesome! You want to *${aiResponse.data.title}*! Would you like to *add something*, have me *ask questions* about your project or *create the project and task list* right away?`;
    await update_history_model_1.UpdateChatHestory.create({ userId: userId, isFile: true, text: concatinateText });
    const createProject = await project_model_1.Project.create({ userId: userId, goal: aiResponse.data.title });
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
const getStarredTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }
        const projects = await project_model_1.Project.find({ userId }, { tasks: 1, goal: 1 });
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
        const totalStarredTasks = starredTasksSummary.reduce((acc, proj) => acc + proj.starredTasksCount, 0);
        return res.status(200).json({
            success: true,
            count: totalStarredTasks,
            tasks: starredTasksSummary
        });
    }
    catch (error) {
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
const getCompletedTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID",
            });
        }
        const project = await project_model_1.Project.findById(projectId, { tasks: 1 });
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
    }
    catch (error) {
        console.error("Error fetching completed tasks:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.projectController = {
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
    getCompletedTasks
};
//# sourceMappingURL=project.controller.js.map