"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collaborationController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const collaboration_services_1 = require("./collaboration.services");
const getCollabration = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const result = await collaboration_services_1.collabrationServices.findCollabrationByUserId(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Collabration retrived success",
        data: result
    });
});
const updateCollabration = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await collaboration_services_1.collabrationServices.updateCollabrationByUserID(id, updateData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Collabration Update success",
        data: result
    });
});
exports.collaborationController = {
    getCollabration,
    updateCollabration
};
//# sourceMappingURL=collaboration.controller.js.map