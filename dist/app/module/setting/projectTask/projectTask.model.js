"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectTaskModel = exports.ErecurringTask = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var ErecurringTask;
(function (ErecurringTask) {
    ErecurringTask["Daily"] = "Daily";
    ErecurringTask["Weekly"] = "Weekly";
    ErecurringTask["CustomInterval"] = "Custom interval";
})(ErecurringTask || (exports.ErecurringTask = ErecurringTask = {}));
const projectTaskSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    defaultDueDate: {
        type: Boolean,
        default: true,
    },
    priorityLevel: {
        type: Boolean,
        default: true,
    },
    tagsLabels: {
        type: Boolean,
        default: true,
    },
    assigneeMode: {
        type: Boolean,
        default: true
    },
    recurringTask: {
        type: String,
        enum: [...Object.values(ErecurringTask)],
        default: ErecurringTask.Weekly,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.ProjectTaskModel = mongoose_1.default.model("projectTask", projectTaskSchema);
//# sourceMappingURL=projectTask.model.js.map