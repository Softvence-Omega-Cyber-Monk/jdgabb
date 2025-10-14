import authRouter from "../module/auth/auth.router";
import userRouter from "../module/user/user.router";



export const moduleRoute = [
    {
        path: "/auth",
        routes: authRouter
    },
    {
        path: "/user",
        routes: userRouter
    }
];

