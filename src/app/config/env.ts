import dotEnv from "dotenv";

dotEnv.config();

interface IEnv {
    MONGO_URI: string,
    PORT: string,
    DEV_ENVIRONMENT: string,
    FRONTEND_URL: string,
    OPEN_AI_API_SECRATE: string,
    AI_ROOT_URL: string;
    SERVER_URL: string;
    PADDLE_API_KEY: string;
    PADDLE_VENDOR_ID: string;
    PADDLE_ENVIRONMENT: string;
    PASSPORT: {
        GOOGLE_CLIENT_ID: string,
        GOOGLE_CLINT_SECRATE: string,
        GOOGLE_CALLBACK_URL: string,
        EXPRESS_SESSION_SECRATE: string
    },
    JWT: {
        JWT_ACCESS_SECRATE: string,
        JWT_REFRESH_SECRATE: string
    },
    FIREBASE: {
        FIREBASE_PROJECT_ID: string,
        FIREBASE_CLIENT_EMAIL: string,
        FIREBASE_PRIVATE_KEY: string
    },
    STRIPE_SECRET_KEY: string,
    STRIPT_PUBLISHABLE_KEY: string,
    STRIPE_WEBHOOK_SECRET: string
}

const envChecker = (): IEnv => {
    const requiredEnv: string[] = ["MONGO_URI", "PORT", "DEV_ENVIRONMENT", "GOOGLE_CLIENT_ID", "GOOGLE_CLINT_SECRATE", "GOOGLE_CALLBACK_URL", "EXPRESS_SESSION_SECRATE", "FRONTEND_URL", "JWT_ACCESS_SECRATE", "JWT_REFRESH_SECRATE", "OPEN_AI_API_SECRATE", "AI_ROOT_URL", "FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "STRIPT_PUBLISHABLE_KEY", "SERVER_URL", "PADDLE_API_KEY", "PADDLE_VENDOR_ID", "PADDLE_ENVIRONMENT"];

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
        SERVER_URL: process.env.SERVER_URL as string,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET as string,
        STRIPT_PUBLISHABLE_KEY: process.env.STRIPT_PUBLISHABLE_KEY as string,
        PADDLE_API_KEY: process.env.PADDLE_API_KEY as string,
        PADDLE_VENDOR_ID: process.env.PADDLE_VENDOR_ID as string,
        PADDLE_ENVIRONMENT: process.env.PADDLE_ENVIRONMENT as string,
        PASSPORT: {
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
            GOOGLE_CLINT_SECRATE: process.env.GOOGLE_CLINT_SECRATE as string,
            GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
            EXPRESS_SESSION_SECRATE: process.env.EXPRESS_SESSION_SECRATE as string,
        },
        JWT: {
            JWT_ACCESS_SECRATE: process.env.JWT_ACCESS_SECRATE as string,
            JWT_REFRESH_SECRATE: process.env.JWT_REFRESH_SECRATE as string
        },
        FIREBASE: {
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID as string,
            FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL as string,
            FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY as string,
        }
    }
};

export const envVers = envChecker();
