"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRoute = void 0;
const auth_router_1 = __importDefault(require("../module/auth/auth.router"));
const chatbot_route_1 = __importDefault(require("../module/chatbot/chatbot.route"));
const home_route_1 = __importDefault(require("../module/home/home.route"));
const history_route_1 = __importDefault(require("../module/hostory/history.route"));
const notifecation_route_controller_1 = __importDefault(require("../module/notificationMsg/notifecation.route.controller"));
const paddle_payment_router_1 = __importDefault(require("../module/paddlePayment/paddle.payment.router"));
const payment_route_1 = __importDefault(require("../module/payment/payment.route"));
const project_route_1 = __importDefault(require("../module/project/project.route"));
const aiChat_route_1 = __importDefault(require("../module/setting/aiChat/aiChat.route"));
const appearance_route_1 = __importDefault(require("../module/setting/appearance/appearance.route"));
const collaboration_route_1 = __importDefault(require("../module/setting/collaboration/collaboration.route"));
const language_route_1 = __importDefault(require("../module/setting/language/language.route"));
const notifications_route_1 = __importDefault(require("../module/setting/notifications/notifications.route"));
const privacy_route_1 = __importDefault(require("../module/setting/privacy/privacy.route"));
const producitivy_route_1 = __importDefault(require("../module/setting/Productivity/producitivy.route"));
const projectTask_route_1 = __importDefault(require("../module/setting/projectTask/projectTask.route"));
const update_history_route_1 = __importDefault(require("../module/UpdateHistory/update.history.route"));
const user_router_1 = __importDefault(require("../module/user/user.router"));
exports.moduleRoute = [
    {
        path: "/auth",
        routes: auth_router_1.default
    },
    {
        path: "/user",
        routes: user_router_1.default
    },
    {
        path: "/project",
        routes: project_route_1.default
    },
    {
        path: "/home",
        routes: home_route_1.default
    },
    {
        path: "/ai",
        routes: chatbot_route_1.default
    },
    {
        path: "/history",
        routes: history_route_1.default
    },
    {
        path: "/updateHistory",
        routes: update_history_route_1.default
    },
    // Setting Releted Api Endpoients
    {
        path: "/appearance",
        routes: appearance_route_1.default
    },
    {
        path: "/aiChat",
        routes: aiChat_route_1.default
    },
    {
        path: "/collabration",
        routes: collaboration_route_1.default
    },
    {
        path: "/language",
        routes: language_route_1.default
    },
    {
        path: "/notification",
        routes: notifications_route_1.default
    },
    {
        path: "/privacy",
        routes: privacy_route_1.default
    },
    {
        path: "/producitivy",
        routes: producitivy_route_1.default
    },
    {
        path: "/projectTask",
        routes: projectTask_route_1.default
    },
    {
        path: "/payment",
        routes: payment_route_1.default
    },
    {
        path: "/ntgMsg",
        routes: notifecation_route_controller_1.default
    },
    {
        path: "/paddle",
        routes: paddle_payment_router_1.default
    }
];
//# sourceMappingURL=route.js.map