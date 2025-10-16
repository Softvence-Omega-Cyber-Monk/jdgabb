"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectTaskController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const projectTask_services_1 = require("./projectTask.services");
const getPraivacy = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const result = await projectTask_services_1.projectTaskServices.findProjectTaskByUserId(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: false,
        statusCode: 200,
        message: "Praivicy setting retrived success",
        data: result
    });
});
const updatePraivicy = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await projectTask_services_1.projectTaskServices.updateProjectTaskByUserID(id, updatedData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Praivicy setting updated success",
        data: result
    });
});
exports.projectTaskController = {
    getPraivacy,
    updatePraivicy
};
//# sourceMappingURL=projectTask.controller.js.map