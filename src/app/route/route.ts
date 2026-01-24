import authRouter from "../module/auth/auth.router";
import chatbotRouter from "../module/chatbot/chatbot.route";
import homeRoute from "../module/home/home.route";
import historyRoute from "../module/hostory/history.route";
import notificationMsgRoutes from "../module/notificationMsg/notifecation.route.controller";
import PaymentRoute from "../module/payment/payment.route";
import projectRouter from "../module/project/project.route";
import ProjectChatHisotryRouter from "../module/ProjectChatHistory/ProjectChatRouter";
import archiveRouter from "../module/setting/addToArchive/addToArchive.route";
import aiChatRouter from "../module/setting/aiChat/aiChat.route";
import appearanceRouter from "../module/setting/appearance/appearance.route";
import collabrationRoute from "../module/setting/collaboration/collaboration.route";
import languageRouter from "../module/setting/language/language.route";
import notificationRouter from "../module/setting/notifications/notifications.route";
import praivicyRouter from "../module/setting/privacy/privacy.route";
import producitivyRoute from "../module/setting/Productivity/producitivy.route";
import projectTaskRouter from "../module/setting/projectTask/projectTask.route";
import globalUndoRouter from "../module/undu/global.undo.route";
import undoRouter from "../module/undu/undo.router";
import updateHistoryRoute from "../module/UpdateHistory/update.history.route";
import UpdateProjectRouter from "../module/UpdateProject/UpdateProjectRouter";
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
        path: "/project",
        routes: projectRouter
    },
    {
        path: "/home",
        routes: homeRoute
    },
    {
        path: "/ai",
        routes: chatbotRouter
    },
    {
        path: "/history",
        routes: historyRoute
    },
    {
        path: "/updateHistory",
        routes: updateHistoryRoute
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
        path: "/privacy",
        routes: praivicyRouter
    },
    {
        path: "/producitivy",
        routes: producitivyRoute
    },
    {
        path: "/projectTask",
        routes: projectTaskRouter
    },
    {
        path: "/payment",
        routes: PaymentRoute
    },
    {
        path: "/ntgMsg",
        routes: notificationMsgRoutes
    },
    {
        path: "/archive",
        routes: archiveRouter
    },
    {
        path: "/updateProject",
        routes: UpdateProjectRouter
    },
    {
        path: "/projectChatHistory",
        routes: ProjectChatHisotryRouter
    },
    {
        path: "/undo",
        routes: undoRouter
    },
    {
        path: "/global",
        routes: globalUndoRouter
    },
];

