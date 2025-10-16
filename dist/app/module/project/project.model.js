"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
    tasks: [
        {
            task: { type: String },
            subtasks: [{ type: String }],
            details: { type: String }
        }
    ],
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
exports.Project = mongoose_1.default.model("project", projectSchema);
//# sourceMappingURL=project.model.js.map