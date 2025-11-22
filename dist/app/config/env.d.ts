interface IEnv {
    MONGO_URI: string;
    PORT: string;
    DEV_ENVIRONMENT: string;
    FRONTEND_URL: string;
    OPEN_AI_API_SECRATE: string;
    AI_ROOT_URL: string;
    SERVER_URL: string;
    JWT: {
        JWT_ACCESS_SECRATE: string;
        JWT_REFRESH_SECRATE: string;
    };
    FIREBASE: {
        FIREBASE_PROJECT_ID: string;
        FIREBASE_CLIENT_EMAIL: string;
        FIREBASE_PRIVATE_KEY: string;
    };
    STRIPE_SECRET_KEY: string;
    STRIPT_PUBLISHABLE_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
}
export declare const envVers: IEnv;
export {};
//# sourceMappingURL=env.d.ts.map