import dotEnv from "dotenv";

dotEnv.config();

interface IEnv {
    MONGO_URI: string,
    PORT: string,
    DEV_ENVIRONMENT: string,
    FRONTEND_URL: string,
    OPEN_AI_API_SECRATE: string,
    AI_ROOT_URL: string;
    PASSPORT: {
        GOOGLE_CLIENT_ID: string,
        GOOGLE_CLINT_SECRATE: string,
        GOOGLE_CALLBACK_URL: string,
        EXPRESS_SESSION_SECRATE: string
    },
    JWT: {
        JWT_ACCESS_SECRATE: string,
        JWT_REFRESH_SECRATE: string
    }
}

const envChecker = (): IEnv => {
    const requiredEnv: string[] = ["MONGO_URI", "PORT", "DEV_ENVIRONMENT", "GOOGLE_CLIENT_ID", "GOOGLE_CLINT_SECRATE", "GOOGLE_CALLBACK_URL", "EXPRESS_SESSION_SECRATE", "FRONTEND_URL", "JWT_ACCESS_SECRATE", "JWT_REFRESH_SECRATE", "OPEN_AI_API_SECRATE", "AI_ROOT_URL"];

    requiredEnv.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Required env messing : ${key}`);
        }
    })

    return {
        MONGO_URI: process.env.MONGO_URI as string,
        PORT: process.env.PORT as string,
        DEV_ENVIRONMENT: process.env.DEV_ENVIRONMENT as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        OPEN_AI_API_SECRATE: process.env.OPEN_AI_API_SECRATE as string,
        AI_ROOT_URL: process.env.AI_ROOT_URL as string,
        PASSPORT: {
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
            GOOGLE_CLINT_SECRATE: process.env.GOOGLE_CLINT_SECRATE as string,
            GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
            EXPRESS_SESSION_SECRATE: process.env.EXPRESS_SESSION_SECRATE as string,
        },
        JWT: {
            JWT_ACCESS_SECRATE: process.env.JWT_ACCESS_SECRATE as string,
            JWT_REFRESH_SECRATE: process.env.JWT_REFRESH_SECRATE as string
        }
    }
};

export const envVers = envChecker();
