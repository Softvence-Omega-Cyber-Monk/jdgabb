"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const env_1 = require("./env");
const transport = nodemailer_1.default.createTransport({
    secure: true,
    host: env_1.envVers.NODEMAILER.SMTP_HOST,
    port: 465,
    auth: {
        user: env_1.envVers.NODEMAILER.SMTP_USER,
        pass: env_1.envVers.NODEMAILER.SMTP_PASS,
    }
});
const sendEmail = async ({ to, subject, text }) => {
    try {
        const info = await transport.sendMail({
            from: env_1.envVers.NODEMAILER.SMTP_FORM,
            to,
            subject,
            text,
        });
        console.log(`✅ Email sent to ${to} : ${info.messageId}`);
    }
    catch (error) {
        console.error("❌ Email Error:", error);
        throw new AppError_1.default(400, "Email send failed.");
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map