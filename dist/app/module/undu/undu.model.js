"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalUndoModel = exports.UndoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const undoSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    taskOrProjectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    undoList: {
        type: [],
        default: [],
    },
}, { timestamps: true });
const globalUndo = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    undoList: {
        type: [],
        default: [],
    },
}, { timestamps: true });
exports.UndoModel = mongoose_1.default.model("undo", undoSchema);
exports.GlobalUndoModel = mongoose_1.default.model("globalUndo", globalUndo);
//# sourceMappingURL=undu.model.js.map