"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.popGlobalUndoAction = exports.pushGlobalUndoAction = exports.getGlobalUndo = exports.createGlobalUndo = exports.popUndoAction = exports.pushUndoAction = exports.getUndo = exports.createUndo = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const undu_model_1 = require("./undu.model");
const sendResponse_1 = require("../../utils/sendResponse");
const TaskModel_1 = __importDefault(require("../UpdateProject/TaskModel"));
const sendNotification_1 = require("../../config/sendNotification");
const UpdateProject_model_1 = require("../UpdateProject/UpdateProject.model");
exports.createUndo = (0, catchAsync_1.default)(async (req, res) => {
    const { userId, taskOrProjectId } = req.body;
    const find = await undu_model_1.UndoModel.findOne({
        userId: userId,
        taskOrProjectId: taskOrProjectId
    });
    if (find) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: "Already Exist",
            data: find,
        });
    }
    const undo = await undu_model_1.UndoModel.create({
        userId,
        taskOrProjectId,
        undoList: [],
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Undo created successfully",
        data: undo,
    });
});
exports.getUndo = (0, catchAsync_1.default)(async (req, res) => {
    const { userId, taskOrProjectId } = req.params;
    let undo = await undu_model_1.UndoModel.findOne({ userId, taskOrProjectId });
    if (!undo) {
        undo = await undu_model_1.UndoModel.create({
            userId,
            taskOrProjectId,
            undoList: [],
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Undo fetched successfully",
        data: undo,
    });
});
exports.pushUndoAction = (0, catchAsync_1.default)(async (req, res) => {
    const { userId, taskOrProjectId, action } = req.body;
    const undo = await undu_model_1.UndoModel.findOneAndUpdate({ userId, taskOrProjectId }, {
        $setOnInsert: {
            userId,
            taskOrProjectId,
        },
        $push: { undoList: action },
    }, {
        new: true,
        upsert: true,
    });
    const findTask = await TaskModel_1.default.findById(action);
    if (findTask) {
        await (0, sendNotification_1.sendNotification)(userId, "AI Task Created ✨", `AI just created a new task for you: "${findTask.title}". Take a look!`);
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Undo action added",
        data: undo,
    });
});
exports.popUndoAction = (0, catchAsync_1.default)(async (req, res) => {
    const { userId, taskOrProjectId } = req.body;
    const undo = await undu_model_1.UndoModel.findOneAndUpdate({ userId, taskOrProjectId }, { $pop: { undoList: 1 } }, { new: true });
    if (!undo) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "Undo data not found",
            data: null,
        });
        return;
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Undo action removed",
        data: undo,
    });
});
exports.createGlobalUndo = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.body;
    const find = await undu_model_1.GlobalUndoModel.findOne({
        userId: userId
    });
    if (find) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: "Already Exist",
            data: find,
        });
    }
    const undo = await undu_model_1.GlobalUndoModel.create({
        userId,
        undoList: [],
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Undo created successfully",
        data: undo,
    });
});
exports.getGlobalUndo = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.params;
    let undo = await undu_model_1.GlobalUndoModel.findOne({ userId });
    if (!undo) {
        undo = await undu_model_1.GlobalUndoModel.create({
            userId,
            undoList: [],
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Undo fetched successfully",
        data: undo,
    });
});
exports.pushGlobalUndoAction = (0, catchAsync_1.default)(async (req, res) => {
    const { userId, action } = req.body;
    const undo = await undu_model_1.GlobalUndoModel.findOneAndUpdate({ userId }, {
        $setOnInsert: {
            userId
        },
        $push: { undoList: action },
    }, {
        new: true,
        upsert: true,
    });
    const findProject = await UpdateProject_model_1.UpdateProject.findById(action);
    if (findProject) {
        await (0, sendNotification_1.sendNotification)(userId, "AI Project Created ✨", `AI has successfully created a new project for you: "${findProject.goal}".`);
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Undo action added",
        data: undo,
    });
});
exports.popGlobalUndoAction = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.body;
    const undo = await undu_model_1.GlobalUndoModel.findOneAndUpdate({ userId }, { $pop: { undoList: 1 } }, { new: true });
    if (!undo) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "Undo data not found",
            data: null,
        });
        return;
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Undo action removed",
        data: undo,
    });
});
//# sourceMappingURL=undo.controller.js.map