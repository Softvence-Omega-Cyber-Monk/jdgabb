"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVers = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envChecker = () => {
    const requiredEnv = ["MONGO_URI", "PORT", "DEV_ENVIRONMENT", "GOOGLE_CLIENT_ID", "GOOGLE_CLINT_SECRATE", "GOOGLE_CALLBACK_URL", "EXPRESS_SESSION_SECRATE", "FRONTEND_URL", "JWT_ACCESS_SECRATE", "JWT_REFRESH_SECRATE", "OPEN_AI_API_SECRATE", "AI_ROOT_URL", "FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
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
        OPEN_AI_API_SECRATE: process.env.OPEN_AI_API_SECRATE,
        AI_ROOT_URL: process.env.AI_ROOT_URL,
        PASSPORT: {
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            GOOGLE_CLINT_SECRATE: process.env.GOOGLE_CLINT_SECRATE,
            GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
            EXPRESS_SESSION_SECRATE: process.env.EXPRESS_SESSION_SECRATE,
        },
        JWT: {
            JWT_ACCESS_SECRATE: process.env.JWT_ACCESS_SECRATE,
            JWT_REFRESH_SECRATE: process.env.JWT_REFRESH_SECRATE
        },
        FIREBASE: {
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
            FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
        }
    };
};
exports.envVers = envChecker();
//# sourceMappingURL=env.js.map