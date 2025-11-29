"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../utils/AppError"));
const addToArchive = (req, res) => {
    try {
        const taskId = req.body.taskId;
    }
    catch (error) {
        throw new AppError_1.default(400, "Archive not added");
    }
};
//# sourceMappingURL=addToArchive.controller.js.map