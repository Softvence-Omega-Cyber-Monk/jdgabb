"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectChatHistoryController_1 = require("./ProjectChatHistoryController");
const ProjectChatHisotryRouter = (0, express_1.Router)();
ProjectChatHisotryRouter.post("/create", ProjectChatHistoryController_1.createUpdateHistoryController);
ProjectChatHisotryRouter.get("/getProjectChat/:userId/:projectOrTaskId/:chatType", ProjectChatHistoryController_1.getUpdateHistoryController);
ProjectChatHisotryRouter.delete("/deleteProjectChat/:userId/:projectOrTaskId/:chatType", ProjectChatHistoryController_1.deleteMultipleUpdateHistoryController);
exports.default = ProjectChatHisotryRouter;
//# sourceMappingURL=ProjectChatRouter.js.map