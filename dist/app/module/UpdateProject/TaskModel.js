"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Task Schema
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    compliteTarget: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed", "archived"],
        default: "pending",
    },
    isDeleted: { type: Boolean, default: false },
    isComplite: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    isStar: { type: Boolean, default: false },
    parentTaskId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Task",
        default: null,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    projectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "UpdateProject",
        required: true
    },
    subtasks: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
    sharedWith: [
        {
            userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" }
        }
    ]
}, { timestamps: true, versionKey: false });
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
//# sourceMappingURL=TaskModel.js.map