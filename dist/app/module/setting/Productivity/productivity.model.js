"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductivityEnhancements = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productivitySchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user", // Reference to User model
        required: true,
    },
    google_calendar: {
        type: Boolean,
        default: false,
    },
    microsoft_outlook: {
        type: Boolean,
        default: false,
    },
    slack_integration: {
        type: Boolean,
        default: false,
    },
    notion: {
        type: Boolean,
        default: false,
    },
    trello: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false
});
exports.ProductivityEnhancements = mongoose_1.default.model("productivity", productivitySchema);
//# sourceMappingURL=productivity.model.js.map