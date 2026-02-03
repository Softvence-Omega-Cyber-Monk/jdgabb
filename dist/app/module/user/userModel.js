"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_interface_1 = require("./user.interface");
const authProviderSchema = new mongoose_1.default.Schema({
    provider: {
        type: String,
        required: true
    },
    providerId: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    _id: false
});
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    fcmToken: {
        type: String
    },
    profile: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isVerifid: {
        type: Boolean,
        default: false
    },
    subscriptionTypeDate: {
        type: Date,
        default: null
    },
    askLimite: {
        type: Number,
        default: 10
    },
    createLimite: {
        type: Number,
        default: 1
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    push: {
        type: Boolean,
        default: true
    },
    otp: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: user_interface_1.Role.USER
    },
    app_user_id: {
        type: String,
    },
    auths: [authProviderSchema]
}, {
    timestamps: true,
    versionKey: false
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt_1.default.hash(this.password, 10);
    next();
});
userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        update.password = await bcrypt_1.default.hash(update.password, 10);
        this.setUpdate(update);
    }
    next();
});
exports.User = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=userModel.js.map