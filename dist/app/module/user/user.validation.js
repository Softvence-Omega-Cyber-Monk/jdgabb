"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidationZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserValidationZodSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Invalid email formate" }),
    password: zod_1.default.string().min(6, { message: "Password to short. Minimun 6 character long." })
        .regex(/\d/, { message: "Password must be contain at least one number" })
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: "Password must be at last one speacil character" })
        .regex(/[A-Z]/, { message: "Password must be contain must be one uppercase chacacter" })
        .regex(/[a-z]/, { message: "Password must be contain at last one lowarcast character" })
});
//# sourceMappingURL=user.validation.js.map