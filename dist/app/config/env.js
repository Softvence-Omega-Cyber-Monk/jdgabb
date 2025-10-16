"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVers = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envChecker = () => {
    const requiredEnv = ["MONGO_URI", "PORT", "DEV_ENVIRONMENT", "GOOGLE_CLIENT_ID", "GOOGLE_CLINT_SECRATE", "GOOGLE_CALLBACK_URL", "EXPRESS_SESSION_SECRATE", "FRONTEND_URL", "JWT_ACCESS_SECRATE", "JWT_REFRESH_SECRATE"];
    requiredEnv.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Required env messing : ${key}`);
        }
    });
    return {
        MONGO_URI: process.env.MONGO_URI,
        PORT: process.env.PORT,
        DEV_ENVIRONMENT: process.env.DEV_ENVIRONMENT,
        FRONTEND_URL: process.env.FRONTEND_URL,
        PASSPORT: {
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            GOOGLE_CLINT_SECRATE: process.env.GOOGLE_CLINT_SECRATE,
            GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
            EXPRESS_SESSION_SECRATE: process.env.EXPRESS_SESSION_SECRATE,
        },
        JWT: {
            JWT_ACCESS_SECRATE: process.env.JWT_ACCESS_SECRATE,
            JWT_REFRESH_SECRATE: process.env.JWT_REFRESH_SECRATE
        }
    };
};
exports.envVers = envChecker();
//# sourceMappingURL=env.js.map