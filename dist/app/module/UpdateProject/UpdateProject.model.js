"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProject = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Subtask schema - initially without recursive reference
const subtaskSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    subTaskDueDate: { type: Date, default: null },
    isStar: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isComplite: { type: Boolean, default: false },
    subtasks: [] // Initially empty
}, { _id: true });
// NOW add the recursive reference - this allows INFINITE nesting
subtaskSchema.add({
    subtasks: [subtaskSchema] // subtask -> subtask -> subtask -> ... (unlimited)
});
// Task schema
const taskSchema = new mongoose_1.default.Schema({
    task: { type: String, required: true },
    details: { type: String, default: null },
    taskDueDate: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    isComplite: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    isStar: { type: Boolean, default: false },
    subtasks: [subtaskSchema]
}, { _id: true });
// Project schema
const projectSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    goal: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [taskSchema],
    answered_questions: [
        {
            question: { type: String },
            answer: { type: String },
        }
    ],
    visibility: {
        type: String,
        enum: ["private", "restricted"],
        default: "private",
    },
    sharedWith: [
        {
            userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" },
            role: {
                type: String,
                enum: ["viewer"],
                default: "viewer",
            }
        }
    ],
    linkAccess: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, versionKey: false });
exports.UpdateProject = mongoose_1.default.model("UpdateProject", projectSchema);
//# sourceMappingURL=UpdateProject.model.js.map