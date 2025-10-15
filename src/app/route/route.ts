import authRouter from "../module/auth/auth.router";
import aiChatRouter from "../module/setting/aiChat/aiChat.route";
import appearanceRouter from "../module/setting/appearance/appearance.route";
import collabrationRoute from "../module/setting/collaboration/collaboration.route";
import languageRouter from "../module/setting/language/language.route";
import notificationRouter from "../module/setting/notifications/notifications.route";
import praivicyRouter from "../module/setting/privacy/privacy.route";
import producitivyRoute from "../module/setting/Productivity/producitivy.route";
import projectTaskRouter from "../module/setting/projectTask/projectTask.route";
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
    },
    {
        path: "/language",
        routes: languageRouter
    },
    {
        path: "/notification",
        routes: notificationRouter
    },
    {
        path : "/privacy",
        routes : praivicyRouter
    },
    {
        path : "/producitivy",
        routes : producitivyRoute
    },
    {
        path : "/projectTask",
        routes : projectTaskRouter
    }
];

