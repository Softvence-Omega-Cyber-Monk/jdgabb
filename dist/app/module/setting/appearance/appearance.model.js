"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppearanceModel = exports.EfontDensity = exports.EfontSize = exports.Etheme = void 0;
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
var EfontDensity;
(function (EfontDensity) {
    EfontDensity["compact"] = "compact";
    EfontDensity["comfortable"] = "comfortable";
})(EfontDensity || (exports.EfontDensity = EfontDensity = {}));
const Appearance = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user", // Reference to User model
        required: true,
    },
    theme: {
        type: String,
        enum: [...Object.values(Etheme)],
        default: Etheme.System,
    },
    fontSize: {
        type: String,
        enum: [...Object.values(EfontSize)],
        default: EfontSize.Medium,
    },
    fontDensity: {
        type: String,
        enum: ["compact", "comfortable"],
        default: EfontDensity.compact,
    },
}, { timestamps: true, versionKey: false });
exports.AppearanceModel = mongoose_1.default.model("appearance", Appearance);
//# sourceMappingURL=appearance.model.js.map