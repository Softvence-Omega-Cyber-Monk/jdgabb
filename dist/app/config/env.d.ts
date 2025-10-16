interface IEnv {
    MONGO_URI: string;
    PORT: string;
    DEV_ENVIRONMENT: string;
    FRONTEND_URL: string;
    PASSPORT: {
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLINT_SECRATE: string;
        GOOGLE_CALLBACK_URL: string;
        EXPRESS_SESSION_SECRATE: string;
    };
    JWT: {
        JWT_ACCESS_SECRATE: string;
        JWT_REFRESH_SECRATE: string;
    };
}
export declare const envVers: IEnv;
export {};
//# sourceMappingURL=env.d.ts.map