"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProject = void 0;
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Task",
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
    ]
}, { timestamps: true, versionKey: false });
exports.UpdateProject = mongoose_1.default.model("UpdateProject", projectSchema);
//# sourceMappingURL=UpdateProject.model.js.map