"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageModel = exports.EDateFormate = exports.EfontSize = exports.Etheme = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var Etheme;
(function (Etheme) {
    Etheme["System"] = "System";
    Etheme["Light"] = "Light";
    Etheme["Dark"] = "Dark";
})(Etheme || (exports.Etheme = Etheme = {}));
;
var EfontSize;
(function (EfontSize) {
    EfontSize["Small"] = "Small";
    EfontSize["Medium"] = "Medium";
    EfontSize["Large"] = "Large";
    EfontSize["ExtraLarge"] = "Extra large";
})(EfontSize || (exports.EfontSize = EfontSize = {}));
;
var EDateFormate;
(function (EDateFormate) {
    EDateFormate["compact"] = "compact";
    EDateFormate["comfortable"] = "comfortable";
})(EDateFormate || (exports.EDateFormate = EDateFormate = {}));
const language = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user", // Reference to User model
        required: true,
    },
    uiLanguage: {
        type: String,
        default: "English"
    },
    dateformat: {
        type: String,
        enum: ["MM/ DD/ YYYY", "DD /MM / YYYY"],
        default: "MM/ DD/ YYYY"
    },
    timeFormate: {
        type: String,
        enum: ["12 hours", "24 hours"],
        default: "12 hours"
    }
}, { timestamps: true, versionKey: false });
exports.languageModel = mongoose_1.default.model("language", language);
//# sourceMappingURL=language.model.js.map