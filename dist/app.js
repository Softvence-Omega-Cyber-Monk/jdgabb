"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./app/config/pasport");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFoundRoute_1 = require("./app/utils/notFoundRoute");
const route_1 = require("./app/route/route");
const global_error_handler_1 = require("./app/middleware/global.error.handler");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cookie_parser_1.default)());
// Passport Authentication
exports.app.use((0, express_session_1.default)({
    secret: "secrate",
    resave: false,
    saveUninitialized: false
}));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
// Module Route
route_1.moduleRoute.forEach(item => exports.app.use(`/api/v1${item.path}`, item.routes));
exports.app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server runing success"
    });
});
exports.app.use(global_error_handler_1.globalErrorhandler);
exports.app.use(notFoundRoute_1.notFound);
//# sourceMappingURL=app.js.map