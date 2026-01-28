"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleTask = exports.getTaskFlagList = exports.projectDelete = exports.projectGoalUpdate = exports.getTaskParentChainController = exports.getSingleUserAllProject = exports.getTaskWithChildren = exports.getTaskTree = exports.getAllParentTasks = exports.deleteTaskController = exports.updateTaskController = exports.createTaskOrSubtaskController = exports.createTaskController = exports.getProjectController = exports.createProjectController = void 0;
const UpdateProject_model_1 = require("./UpdateProject.model");
const TaskModel_1 = __importDefault(require("./TaskModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const AppError_1 = __importDefault(require("../../utils/AppError"));
// Helper function to save tasks and their subtasks recursively
// Recursive save function
const saveTaskWithSubtasks = async (taskData, userId, projectId, parentTaskId = null) => {
    const { title, description, status, subtasks } = taskData;
    // 1️⃣ Create task
    const task = new TaskModel_1.default({
        title,
        description: description || null,
        status: status || "pending",
        userId, // ✅ userId
        projectId, // ✅ projectId
        parentTaskId, // ✅ parentTaskId if any
        subtasks: [],
    });
    const savedTask = await task.save();
    // 2️⃣ Save subtasks recursively
    if (Array.isArray(subtasks) && subtasks.length > 0) {
        for (const subtaskData of subtasks) {
            const savedSubtask = await saveTaskWithSubtasks(subtaskData, userId, projectId, // pass projectId recursively
            savedTask._id);
            savedTask.subtasks.push(savedSubtask._id);
        }
        await savedTask.save();
    }
    return savedTask;
};
const createProjectController = async (req, res) => {
    try {
        const { userId, goal, tasks, visibility } = req.body;
        if (!userId || !goal) {
            return res.status(400).json({
                success: false,
                message: "User ID and Goal are required!",
            });
        }
        // 🔹 Create project first
        const project = new UpdateProject_model_1.UpdateProject({
            userId,
            goal,
            visibility: visibility || "private",
            tasks: [],
            sharedWith: [],
        });
        const savedProject = await project.save();
        const savedTasks = [];
        // 🔹 Save only root tasks
        if (Array.isArray(tasks)) {
            for (const taskData of tasks) {
                const savedTask = await saveTaskWithSubtasks(taskData, userId, savedProject._id // ✅ pass projectId
                );
                savedTasks.push(savedTask._id);
            }
        }
        // 🔹 Update project.tasks with root task IDs
        savedProject.tasks = savedTasks;
        await savedProject.save();
        return res.status(201).json({
            success: true,
            message: "Project created successfully!",
            project: savedProject,
        });
    }
    catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};
exports.createProjectController = createProjectController;
const getTaskWithSubtasks = async (taskId) => {
    const task = await TaskModel_1.default.findById(taskId).populate('subtasks');
    if (task.subtasks.length > 0) {
        task.subtasks = await Promise.all(task.subtasks.map(async (subtask) => {
            return await getTaskWithSubtasks(subtask._id);
        }));
    }
    return task;
};
const getProjectController = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await UpdateProject_model_1.UpdateProject.findById(projectId).populate('tasks');
        if (!project) {
            return res.status(404).json({ message: 'Project not found!' });
        }
        const tasksWithSubtasks = await Promise.all(project.tasks.map(async (task) => {
            return await getTaskWithSubtasks(task._id);
        }));
        // Attach tasks with nested subtasks to the project
        project.tasks = tasksWithSubtasks;
        // Return the project with all tasks and subtasks
        res.status(200).json({
            message: 'Project fetched successfully!',
            project,
        });
    }
    catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};
exports.getProjectController = getProjectController;
const createTaskController = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, parentTaskId, userId, isStar } = req.body;
        if (!title || !userId) {
            return res.status(400).json({ message: 'Title and userId are required!' });
        }
        const newTask = new TaskModel_1.default({
            title,
            description,
            parentTaskId: parentTaskId || null,
            userId: userId,
            projectId: projectId,
            isStar: isStar
        });
        const savedTask = await newTask.save();
        const project = await UpdateProject_model_1.UpdateProject.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found!' });
        }
        project.tasks.push(savedTask._id);
        await project.save();
        res.status(201).json({
            message: 'Task created successfully under the project!',
            task: savedTask,
            project,
        });
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};
exports.createTaskController = createTaskController;
const createTaskOrSubtaskController = async (req, res) => {
    try {
        const { parentTaskId, title, description, compliteTarget, userId, projectId } = req.body;
        if (!title || !userId || !projectId) {
            return res.status(400).json({ message: 'Title, userId and projectId are required!' });
        }
        const newTask = new TaskModel_1.default({
            title,
            description,
            compliteTarget,
            parentTaskId: parentTaskId || null,
            userId: userId,
            projectId: projectId
        });
        const savedTask = await newTask.save();
        if (parentTaskId) {
            const parentTask = await TaskModel_1.default.findById(parentTaskId);
            if (!parentTask) {
                return res.status(404).json({ message: 'Parent task not found!' });
            }
            parentTask.subtasks.push(savedTask._id);
            await parentTask.save();
        }
        res.status(201).json({
            message: parentTaskId ? 'Subtask created successfully!' : 'Task created successfully!',
            task: savedTask,
            parentTaskId: parentTaskId ? parentTaskId : null,
        });
    }
    catch (error) {
        console.error('Error creating task/subtask:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};
exports.createTaskOrSubtaskController = createTaskOrSubtaskController;
const updateTaskController = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updateFields = req.body;
        const task = await TaskModel_1.default.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }
        Object.keys(updateFields).forEach((key) => {
            if (updateFields[key] === "" || updateFields[key] === null || updateFields[key] === undefined) {
                delete updateFields[key];
            }
        });
        if (Object.keys(updateFields).length > 0) {
            const updatedTask = await TaskModel_1.default.findByIdAndUpdate(taskId, updateFields, { new: true });
            res.status(200).json({
                message: 'Task updated successfully!',
                task: updatedTask,
            });
        }
        else {
            res.status(400).json({ message: 'No valid fields to update!' });
        }
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};
exports.updateTaskController = updateTaskController;
const deleteTaskController = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await TaskModel_1.default.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }
        if (task.parentTaskId) {
            const parentTask = await TaskModel_1.default.findById(task.parentTaskId);
            if (parentTask) {
                parentTask.subtasks = parentTask.subtasks.filter((subtaskId) => subtaskId.toString() !== taskId);
                await parentTask.save();
            }
        }
        await TaskModel_1.default.deleteOne({ _id: taskId });
        res.status(200).json({
            message: 'Task deleted successfully!',
        });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};
exports.deleteTaskController = deleteTaskController;
const getAllParentTasks = async (req, res) => {
    try {
        const { taskId, projectId } = req.params;
        // Find the requested task
        let requestedTask = await TaskModel_1.default.findById(taskId).lean();
        if (!requestedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        ;
        let projectgoal;
        if (projectId) {
            const findProject = await UpdateProject_model_1.UpdateProject.findById(projectId);
            projectgoal = findProject?.goal;
        }
        const parentTasks = [];
        let currentTask = requestedTask;
        // Traverse up the parent chain
        while (currentTask?.parentTaskId) {
            const parentTask = await TaskModel_1.default.findById(currentTask.parentTaskId).lean();
            if (!parentTask)
                break;
            // Add parent to the beginning of array
            parentTasks.unshift({
                _id: parentTask._id,
                title: parentTask.title,
                description: parentTask.description,
                status: parentTask.status,
                compliteTarget: parentTask.compliteTarget,
                isDeleted: parentTask.isDeleted,
                isComplite: parentTask.isComplite,
                isArchived: parentTask.isArchived,
                isStar: parentTask.isStar,
                parentTaskId: parentTask.parentTaskId,
                createdAt: parentTask.createdAt,
                updatedAt: parentTask.updatedAt,
            });
            currentTask = parentTask;
        }
        return res.status(200).json({
            success: true,
            count: parentTasks.length,
            data: parentTasks,
            projectgoal,
            requestedTask: {
                _id: requestedTask._id,
                title: requestedTask.title,
                description: requestedTask.description,
                status: requestedTask.status,
                parentTaskId: requestedTask.parentTaskId,
            },
        });
    }
    catch (error) {
        console.error("Error retrieving parent tasks:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve parent tasks",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAllParentTasks = getAllParentTasks;
const buildTaskTree = async (taskId) => {
    const task = await TaskModel_1.default.findById(taskId).lean();
    if (!task)
        return null;
    // প্রতিটি subtask এর জন্য recursive call
    const children = [];
    const seen = new Set(); // ডুপ্লিকেট আটকানোর জন্য
    for (const subId of task.subtasks || []) {
        if (seen.has(subId.toString()))
            continue; // skip duplicate
        seen.add(subId.toString());
        const childTree = await buildTaskTree(subId.toString());
        if (childTree)
            children.push(childTree);
    }
    return {
        _id: task._id,
        title: task.title,
        subtasks: children
    };
};
const getTaskTree = async (req, res) => {
    try {
        const { taskId } = req.params;
        const tree = await buildTaskTree(taskId);
        if (!tree) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: tree,
        });
    }
    catch (error) {
        console.error("Error retrieving task tree:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve task tree",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getTaskTree = getTaskTree;
const getTaskWithChildren = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await TaskModel_1.default.findById(taskId)
            .populate({
            path: "subtasks"
        });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        res.status(200).json({
            success: true,
            data: task, // ✅ task + its direct children only
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getTaskWithChildren = getTaskWithChildren;
exports.getSingleUserAllProject = (0, catchAsync_1.default)(async (req, res, next) => {
    const { userId } = req.params;
    const findProject = await UpdateProject_model_1.UpdateProject.find({
        $or: [
            { userId: userId },
            { "sharedWith.userId": userId }
        ]
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "All Project Retrived Successfully",
        data: findProject
    });
});
const getTaskParentChainController = async (req, res) => {
    try {
        const { taskId } = req.params;
        if (!taskId)
            throw new AppError_1.default(404, "Task ID Must be required");
        if (!mongoose_1.default.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: "Invalid taskId" });
        }
        const task = await TaskModel_1.default.findById(taskId).select("parentTaskId projectId");
        if (!task) {
            throw new AppError_1.default(404, "Task Not Found");
        }
        ;
        const findProject = await UpdateProject_model_1.UpdateProject.findById(task?.projectId);
        // if (!findProject) throw new AppError(404, "Project Not Found");
        // ✅ If no parent → breadcrumbs = null
        if (!task.parentTaskId) {
            return res.status(200).json({
                success: true,
                projectId: task.projectId || null,
                projectName: findProject?.goal,
                breadcrumbs: null,
            });
        }
        // ✅ If parent exists → build chain
        const breadcrumbs = [];
        let currentTask = await TaskModel_1.default.findById(task.parentTaskId).select("_id title description parentTaskId");
        while (currentTask) {
            breadcrumbs.unshift({
                taskId: currentTask._id.toString(),
                title: currentTask.title,
                description: currentTask.description,
            });
            if (!currentTask.parentTaskId)
                break;
            currentTask = await TaskModel_1.default.findById(currentTask.parentTaskId).select("_id title description parentTaskId");
        }
        return res.status(200).json({
            success: true,
            projectId: task.projectId || null,
            projectName: findProject?.goal,
            breadcrumbs,
        });
    }
    catch (error) {
        console.error("Error fetching parent chain:", error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
};
exports.getTaskParentChainController = getTaskParentChainController;
exports.projectGoalUpdate = (0, catchAsync_1.default)(async (req, res, next) => {
    const projectId = req.params.projectId;
    if (!projectId)
        throw new Error("Project Id Must Be Required");
    const result = await UpdateProject_model_1.UpdateProject.findByIdAndUpdate(projectId, {
        goal: req.body.goal
    }, {
        new: true
    });
    if (!result)
        throw new Error("Project Not Found");
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Project Updated Successfully",
        statusCode: 200,
        data: result
    });
});
async function deleteTaskAndSubtasks(taskId) {
    const task = await TaskModel_1.default.findById(taskId);
    if (!task)
        return;
    if (task.subtasks && task.subtasks.length > 0) {
        for (const subtaskId of task.subtasks) {
            await deleteTaskAndSubtasks(subtaskId.toString());
        }
    }
    await TaskModel_1.default.findByIdAndDelete(taskId);
}
exports.projectDelete = (0, catchAsync_1.default)(async (req, res, next) => {
    const projectId = req.params.projectId;
    if (!projectId)
        throw new Error("Project Id Must Be Required");
    const project = await UpdateProject_model_1.UpdateProject.findById(projectId);
    if (!project)
        throw new Error("Project Not Found");
    const tasks = await TaskModel_1.default.find({ projectId });
    for (const task of tasks) {
        await deleteTaskAndSubtasks(task._id.toString());
    }
    await UpdateProject_model_1.UpdateProject.findByIdAndDelete(projectId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Project and all associated tasks deleted successfully",
        data: null
    });
});
exports.getTaskFlagList = (0, catchAsync_1.default)(async (req, res, next) => {
    const { userId } = req.params;
    const { flag } = req.query;
    if (!userId) {
        throw new Error("User Id is required");
    }
    const validFlags = ["isDeleted", "isArchived", "isComplite", "isStar"];
    if (!flag || !validFlags.includes(flag.toString())) {
        throw new Error("Invalid flag. Must be one of isDeleted, isArchived, isComplite, isStar");
    }
    const tasks = await TaskModel_1.default.find({
        [flag.toString()]: true,
        $or: [
            { userId: userId },
            { "sharedWith.userId": userId }
        ]
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: `Tasks filtered by ${flag} successfully`,
        data: tasks
    });
});
exports.getSingleTask = (0, catchAsync_1.default)(async (req, res, next) => {
    const { taskId } = req.params;
    const findTask = await TaskModel_1.default.findById(taskId);
    if (!findTask)
        throw new Error("Task Not Found");
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Task Retrived Successfully",
        data: findTask
    });
});
//# sourceMappingURL=UpdateProjectController.js.map