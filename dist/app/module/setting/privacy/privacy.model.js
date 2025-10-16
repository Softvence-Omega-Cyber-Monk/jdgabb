"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const privacySchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    autoDelete: {
        type: String,
        enum: ["none", "7d", "30d", "90d"],
        default: "30d",
    },
    deletionMethod: {
        type: String,
        enum: ["archive", "permanent"],
        default: "archive",
    },
    excludeFromAI: {
        type: Boolean,
        default: true,
    },
    localStorage: {
        type: Boolean,
        default: false,
    },
    cloudSync: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.PrivacyModel = mongoose_1.default.model("privacy", privacySchema);
//# sourceMappingURL=privacy.model.js.map