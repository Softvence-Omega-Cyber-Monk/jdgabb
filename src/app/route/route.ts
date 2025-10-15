import authRouter from "../module/auth/auth.router";
import aiChatRouter from "../module/setting/aiChat/aiChat.route";
import appearanceRouter from "../module/setting/appearance/appearance.route";
import collabrationRoute from "../module/setting/collaboration/collaboration.route";
import userRouter from "../module/user/user.router";



export const moduleRoute = [
    {
        path: "/auth",
        routes: authRouter
    },
    {
        path: "/user",
        routes: userRouter
    },
    {
        path: "/appearance",
        routes: appearanceRouter
    },
    {
        path: "/aiChat",
        routes: aiChatRouter
    },
    {
        path: "/collabration",
        routes: collabrationRoute
    }
];

