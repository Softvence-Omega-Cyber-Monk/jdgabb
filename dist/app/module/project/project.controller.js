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
const openAi_1 = require("../../config/openAi");
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
const addSubTask = (0, catchAsync_1.default)(async (req, res, next) => {
    const { projectId, taskId, subTaskData } = req.body;
    const result = await project_services_1.projectServices.addSubTask(projectId, taskId, subTaskData);
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
const askQuestion = (0, catchAsync_1.default)(async (req, res, next) => {
    const { prompt } = req.body;
    const response = await openAi_1.OpenAi.chat.completions.create({
        model: "",
        messages: [
            { role: "system", content: "Your a helpful assistent" },
            { role: "user", content: prompt }
        ]
    });
    res.status(200).json({ message: response.choices[0]?.message.content });
});
exports.projectController = {
    createProject,
    addTask,
    addSubTask,
    addDetails,
    getProject,
    askQuestion
};
//# sourceMappingURL=project.controller.js.map